import React, { useEffect, useState } from 'react';
import { Button, FormControl, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { DocumentReadApi } from '../services/DocumentService';
import ImageUploader from '../components/common/ImageUploader';
import ResponsiveAppBar from '../layouts/ResponsiveAppBar';
import DocumentResult from '../components/DocumentResult';

const FirstPage: React.FC = () => {
    const [opt, setOpt] = useState("FullProcess");
    const [imgStr, setImgStr] = useState("");
    const [resData, setResData] = useState<any>();

    const handleOptionChange = (event: SelectChangeEvent<string>) => {
        setOpt(event.target.value);
    }

    useEffect(() => {
        handleDocumentRead();
    }, [imgStr, opt]);

    const handleImageChange = (image: string) => {
        setImgStr(image);
    }
    
    const handleDocumentRead = () => {
        if (imgStr.length < 2) return;
        DocumentReadApi(imgStr, opt)
        .then((res) => {
            setResData(res);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    return (
      <>
        <ResponsiveAppBar />
        <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
              <ImageUploader onImageChange={handleImageChange} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={2} sx={{marginTop:2, width:'80%'}}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <OutlinedInput placeholder="Use image URL" endAdornment={<Button>Go</Button>}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ mx: 0, minWidth: 120}} fullWidth>
                            <Select
                                value={opt}
                                onChange={handleOptionChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{textAlign:'left'}}
                                >
                                <MenuItem value="Locate">Locate</MenuItem>
                                <MenuItem value="Mrz">Mrz</MenuItem>
                                <MenuItem value="MrzOrLocate">MrzOrLocate</MenuItem>
                                <MenuItem value="MrzAndLocate">MrzAndLocate</MenuItem>
                                <MenuItem value="Barcode">Barcode</MenuItem>
                                <MenuItem value="MrzOrBarcode">MrzOrBarcode</MenuItem>
                                <MenuItem value="MrzOrOcr">MrzOrOcr</MenuItem>
                                <MenuItem value="MrzOrBarcodeOrOcr">MrzOrBarcodeOrOcr</MenuItem>
                                <MenuItem value="LocateVisual_And_MrzOrOcr">LocateVisual_And_MrzOrOcr</MenuItem>
                                <MenuItem value="DocType">DocType</MenuItem>
                                <MenuItem value="Ocr">Ocr</MenuItem>
                                <MenuItem value="FullProcess">FullProcess</MenuItem>
                                <MenuItem value="FullAuth">FullAuth</MenuItem>
                                <MenuItem value="CreditCard">CreditCard</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <DocumentResult data={resData} opt={opt}/>
            </Grid>
        </Grid>
      </>
    );
};

export default FirstPage;
