import React from 'react';
import { Grid, Typography } from '@mui/material';
import FullProcess from './documentresult/FullProcess';
interface DocumentResultProps {
    _id?:number,
    data?: any,
    opt?: string
}
const DocumentResult: React.FC<DocumentResultProps> = ({data, opt}) => {

    return (
        <Grid container spacing={1} sx={{marginTop:2, width:'90%', marginX: 'auto'}}>
            <Grid item xs={12}><Typography variant='body1' sx={{textAlign:'left'}}>Processing time: <b>{data?.elapsedTime ? (data.elapsedTime / 1000).toFixed(3):""}</b></Typography></Grid>
            {opt === 'FullProcess' && <FullProcess data={data} />}
        </Grid>
    );
};

export default DocumentResult;
