import React, { useState } from 'react';
import { Box, Button, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { colorList, imageDataToDataURL } from '../../services';
interface DetectResultProps {
    _id?:number,
    data?: any
}
const DetectResult: React.FC<DetectResultProps> = ({_id, data}) => {
    const [btnState, setBtnState] = useState(false);
    if (!data) {
        return (<></>);
    }

    const getDetailValueStr = (details: any[], type: string) : string => {
        for (var i in details) {
            if (details[i]?.name === type) {
                if (type === "Age") {
                    return `${details[i].value[0]}-${details[i].value[1]} years old`;
                } else {
                    return details[i].value;
                }
            }
        }
        return "";
    }

    const toggleButton = () => {
        setBtnState(!btnState);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                    }}
                >
                    <MuiAvatar 
                        sx={{
                            width: "auto",
                            height: 130,
                            borderRadius: 0, // Set borderRadius to 0 for square corners
                        }}
                        style={{ border: `3px solid ${colorList[_id as number]}`, display: 'inline-block' }}
                        alt="Select Image"
                        src={ imageDataToDataURL(data?.crop) }
                    />
                    <Grid container spacing={0} sx={{marginTop:1}}>
                        <Grid item xs={5}>
                            <Typography variant='body1' align='left' marginLeft={2}>Age</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='body1' align='right' marginLeft={2}>{getDetailValueStr(data.attributes.details, 'Age')}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='body1' align='left' marginLeft={2}>Emotion</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='body1' align='right' marginLeft={2}>{getDetailValueStr(data.attributes.details, 'Emotion')}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop:3, marginLeft:2,  textAlign: 'left'}} >
                            <Button sx={{textTransform:'none'}} endIcon={btnState?<KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={toggleButton}>
                                {btnState?"Hide all attributes" : "Show all attributes"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            {
                btnState &&
                <Grid item xs={12} sx={{}}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                        }}
                    >
                        <Typography variant='h6'>Attributes</Typography>
                        <Table sx={{ }} aria-label="simple table">
                            <TableBody>
                            {data && data.attributes && data.attributes.details && data.attributes.details.map((row: any) => (
                                <TableRow key={row?.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="left">{row.name === 'Age' ? `${row.value[0]}-${row.value[1]} years old` : row.value}</TableCell>
                                    <TableCell align="right">{row.confidence && (Math.round(row.confidence * 100) / 100).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
            }
            
        </Grid>
    );
};

export default DetectResult;
