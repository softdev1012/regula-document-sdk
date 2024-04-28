import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ImageUploader from './common/ImageUploader';
import { faceDetectApi } from '../services/FaceService';
import { colorList, drawPoint, drawRect } from '../services';
import DetectResult from './FaceDetection/DetectResult';

interface ICrops {
    crop?: string,
    attributes?: any,
    landmarks?: any,
    quality?: any,
    roi?: number[],
    rotationAngle?: number,
}

const FaceDetection: React.FC = () => {
    const [crops, setCrops] = useState<ICrops[]>([]);
    const [resultImage, setResultImage] = useState("");
    const [imgStr, setImgStr] = useState("");

    const processImage = (imgStr: string, detect: any) => {
        const image = new Image();
        image.src = imgStr;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                for (let i in detect) {
                    const ic = parseInt(i);
                    drawRect(ctx, detect[i].roi[0], detect[i].roi[1], detect[i].roi[2], detect[i].roi[3], colorList[ic], image.width/250);
                    for (var j in detect[i].landmarks) {
                        drawPoint(ctx, detect[i].landmarks[j][0], detect[i].landmarks[j][1], colorList[ic], image.width/270);
                    }
                }
                const dataURL = canvas.toDataURL('image/jpeg');
                setResultImage(dataURL);
            }
        }
    }

    useEffect(() => {
        handleFaceDetection();
    }, [imgStr]);

    const handleImageChange = (image: string) => {
        setImgStr(image);
    }
    
    const handleFaceDetection = () => {
        if (imgStr.length < 2) return;
        faceDetectApi(imgStr)
        .then((res) => {
            if (res && res.results && res.results.detections) {
                setCrops(res.results.detections);
            }
            processImage(imgStr, res.results.detections);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
                <ImageUploader src={resultImage} onImageChange={handleImageChange} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={2} sx={{marginTop:2}}>
                    {crops?.map((row: ICrops, index: number) => (
                        <Grid item xs={12} key={index}>
                            <DetectResult data={row} _id={index}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FaceDetection;
