import React from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import { imageDataToDataURL } from '../../services';
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
interface FullProcessProps {
    data?: any
}
const FullProcess: React.FC<FullProcessProps> = ({data}) => {
    if (!data) {
        return <></>
    }
    let fieldList = [] ;
    let pFieldMaps = [];
    const getDocumentType = () : string => {
        const list = data?.ContainerList?.List;
        for(let i in list) {
            if (list[i].result_type === 9) {
                return list[i].OneCandidate?.DocumentName;
            }
        }
        return "";
    }

    const list = data?.ContainerList?.List;
    for(let i in list) {
        if (list[i].result_type === 37) {
            fieldList = list[i]?.Images?.fieldList;
        } else if (list[i].result_type === 36) {
            pFieldMaps = list[i]?.Text?.fieldList;
        }
    }

    for (let i in pFieldMaps) {
        for (let j in pFieldMaps[i]?.valueList) {
            if (pFieldMaps[i]?.valueList[j]?.source === "MRZ") {
                pFieldMaps[i].Field_MRZ = pFieldMaps[i]?.valueList[j]?.value;
            } else if (pFieldMaps[i]?.valueList[j]?.source === "VISUAL") {
                pFieldMaps[i].Field_Visual = pFieldMaps[i]?.valueList[j]?.value;
            }
        }
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                    <Typography variant='h6' sx={{color:"GrayText"}}>Document category</Typography>
                    <Typography variant='h6' sx={{fontWeight:'bold'}}>PASSPORT</Typography>
                    <Typography variant='h6' sx={{color:"GrayText"}}>Document type</Typography>
                    <Typography variant='h6' sx={{fontWeight:'bold'}}>{getDocumentType()}</Typography>
                    {
                        fieldList.map((item: any) => (
                            <>
                            <Typography variant='h6' sx={{color:"GrayText"}}>{item.fieldName}</Typography>
                            <MuiAvatar
                                sx={{
                                    marginBottom: 1,
                                    marginTop: 3,
                                    marginX:'25%',
                                    width: "auto",
                                    height:"auto",
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    borderRadius: 0, // Set borderRadius to 0 for square corners
                                }}
                                alt="Select Image"
                                src={imageDataToDataURL(item.valueList[0].value)}
                            />
                            </>
                            
                        ))
                    }
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Table sx={{ }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Field type</TableCell>
                            <TableCell align="left">MRZ</TableCell>
                            <TableCell align="left">Visual zone</TableCell>
                            <TableCell align="left">MRZ-Viz</TableCell>
                            <TableCell align="left">Valid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {pFieldMaps.map((row: any) => (
                        <TableRow key={row?.fieldName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{maxWidth:'100px', wordWrap: "break-word", color: `${row?.status ? '' : '#b73b43'}`}}>{row?.fieldName}</TableCell>
                            <TableCell align="left" sx={{maxWidth:'100px', wordWrap: "break-word", color: `${row?.status ? '' : '#b73b43'}`}}>{row.Field_MRZ}</TableCell>
                            <TableCell align="left" sx={{maxWidth:'100px', wordWrap: "break-word", color: `${row?.status ? '' : '#b73b43'}`}}>{row.Field_Visual}</TableCell>
                            <TableCell align="left" sx={{maxWidth:'100px', wordWrap: "break-word"}}>{row?.comparisonStatus === 1 ? <CheckIcon sx={{color:'#51e0c6'}} /> : <></>}</TableCell>
                            <TableCell align="left" sx={{maxWidth:'100px', wordWrap: "break-word"}}>{row?.status ? <CheckIcon sx={{color:'#51e0c6', fontWeight:'bold'}} /> : <PriorityHighIcon sx={{color:'#b73b43'}}  />}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

export default FullProcess;
