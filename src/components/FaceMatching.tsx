import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ImageUploader from './common/ImageUploader';
import { colorList, drawPoint, drawRect, faceMatchingApi } from '../services';
import MatchingResult from './FaceMatching/MatchingResult';

const FaceMatching: React.FC = () => {
    const [crops, setCrops] = useState<any[]>([]);
    const [faces, setFaces] = useState<any>();
    const [resultImage1, setResultImage1] = useState("");
    const [resultImage2, setResultImage2] = useState("");
    const [imgStr1, setImgStr1] = useState("");
    const [imgStr2, setImgStr2] = useState("");

    const getBorderColor = (idx: number, faceIdx: number) : string => {
        if (!faces || !faces[0] || !faces[0].faces) return colorList[faceIdx];
        const _id = idx * (faces[0].faces.length) + faceIdx;
        return colorList[_id];
    }

    const processImage = (imgStr: string, detect: any, setFile: any) => {
        const image = new Image();
        image.src = imgStr;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                if (detect.faces) {
                    for (let i in detect.faces) {
                        const color = getBorderColor(detect.imageIndex, detect.faces[i].faceIndex);
                        drawRect(ctx, detect.faces[i].roi[0], detect.faces[i].roi[1], detect.faces[i].roi[2], detect.faces[i].roi[3], color, image.width/250);
                        for (var j in detect.faces[i].landmarks) {
                            drawPoint(ctx, detect.faces[i].landmarks[j][0], detect.faces[i].landmarks[j][1], color, image.width/270);
                        }
                    }
                }
                
                const dataURL = canvas.toDataURL('image/jpeg');
                setFile(dataURL);
            }
        }
    }

    useEffect(() => {
        handleFaceDetection();
    }, [imgStr1, imgStr2]);

    const handleImage1Change = (imgStr: string) => {
        setImgStr1(imgStr);
    }
    const handleImage2Change = (imgStr: string) => {
        setImgStr2(imgStr);
    }

    const handleFaceDetection = () => {
        if (imgStr1.length < 2 || imgStr2.length < 2) return;
        faceMatchingApi(imgStr1, imgStr2)
        .then((res) => {
            if (res && res.results) {
                setCrops(res.results);
            }
            if (res && res.detections) {
                setFaces(res.detections);
            }
            processImage(imgStr1, res.detections[0], setResultImage1);
            processImage(imgStr2, res.detections[1], setResultImage2);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={6} md={4}>
                <ImageUploader src={resultImage1} onImageChange={handleImage1Change} />
            </Grid>
            <Grid item xs={6} md={4}>
                <ImageUploader src={resultImage2} onImageChange={handleImage2Change} />
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2} sx={{marginTop:2}}>
                    {crops?.map((row: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <MatchingResult data={row} faces={faces} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FaceMatching;
