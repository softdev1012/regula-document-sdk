import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import { colorList, imageDataToDataURL } from '../../services';
import EqualSVG from '../common/EqualSVG';
import UnEqualSVG from '../common/UnEqualSVG';
interface MatchingResultProps {
    data?: any,
    faces?: any
}
const MatchingResult: React.FC<MatchingResultProps> = ({data, faces}) => {
    if (!data || !faces) {
        return (<></>);
    }

    const getFaceImage = (idx: number, faceIdx: number) : string => {
        for (let i in faces) if (faces[i].imageIndex == idx) {
            for (let j in faces[i].faces) {
                if (faces[i].faces[j].faceIndex == faceIdx) {
                    return imageDataToDataURL(faces[i].faces[j].crop);
                }
            }
        }
        return "";
    }

    const getBorderColor = (idx: number, faceIdx: number) : string => {
        if (!faces[0].faces) return colorList[faceIdx];
        const _id = idx * (faces[0].faces.length) + faceIdx;
        return colorList[_id];
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={5} textAlign='left'>
                <MuiAvatar 
                    sx={{
                        width: "auto",
                        height: 140,
                        borderRadius: 0, // Set borderRadius to 0 for square corners
                    }}
                    style={{ border: `3px solid ${getBorderColor(data?.firstIndex, data?.firstFaceIndex)}`, display: 'inline-block' }}
                    alt="Select Image"
                    src={ getFaceImage(data?.firstIndex, data?.firstFaceIndex) }
                />
            </Grid>
            <Grid item xs={2}>
                <Typography variant='h5' align='center' marginTop={6}>{data.similarity > 0.7 ? <EqualSVG/> : <UnEqualSVG />}</Typography>
            </Grid>
            <Grid item xs={5} textAlign='right'>
                <MuiAvatar 
                    sx={{
                        width: "auto",
                        height: 140,
                        borderRadius: 0, // Set borderRadius to 0 for square corners
                    }}
                    style={{ border: `3px solid ${getBorderColor(data?.secondIndex, data?.secondFaceIndex)}`, display: 'inline-block' }}
                    alt="Select Image"
                    src={ getFaceImage(data?.secondIndex, data?.secondFaceIndex) }
                />
            </Grid>
            <Grid item xs={12} textAlign='left'>
                <Box
                    height='1.3em'
                    width='100%'
                    my={1}
                    display="flex"
                    alignItems="left"
                    gap={4}
                    p={1}
                    sx={{ border: `1px solid ${data.similarity > 0.7 ? '#b7eb8f':'#ffa39e'}`, bgcolor: `${data.similarity > 0.7 ? '#f6ffed' : '#fff1f0'}` }}
                >
                    <Typography>Similarity rate: {Math.round(data.similarity * 100).toFixed(0)}%</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default MatchingResult;
