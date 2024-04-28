import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Box, Collapse, Grid, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import { imageDataToDataURL } from '../../services';
interface QualityResultProps {
    _id?:number,
    data?: any
}

const MyRow = (props: {row: any}) => {
    const {row} = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            {
                row.totalCount === row.compliantCount ?
                <TableCell align="right">{row.compliantCount} / {row.totalCount}</TableCell>
                :
                <TableCell align="right" sx={{color:'#d4380d'}}><ReportProblemIcon sx={{verticalAlign:'middle', marginRight:1}}/> {row.compliantCount} / {row.totalCount}</TableCell>
            }
            
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      {row.details.map((detail: any) => (
                        <TableRow key={detail.name}>
                          <TableCell component="th" scope="row">{detail.name}</TableCell>
                          <TableCell align="right" sx={{color:`${detail.status ? 'black' : '#d4380d'}`}}>{Math.round(detail.value * 100) / 100}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
    );
}

const QualityResult: React.FC<QualityResultProps> = ({data}) => {
    if (!data) {
        return (<></>);
    }
    let rows = data && data.quality && data.quality.detailsGroups ? data.quality.detailsGroups : [];
    for (var i in rows) {
        rows[i].details = [];
        data && data.quality && data.quality.details && data.quality.details.map((detail: any) => {
            if (detail.groupId === rows[i].groupId) {
                rows[i].details.push(detail);
            }
        });
        rows[i].details = rows[i].details.sort((a: any, b: any) => a.status > b.status ? 1:-1);
    }
    rows = rows.sort((a: any, b: any) => a.totalCount - a.compliantCount < b.totalCount - b.compliantCount ? 1 : -1);

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
                            height: 150,
                            borderRadius: 0, // Set borderRadius to 0 for square corners
                        }}
                        alt="Select Image"
                        src={ imageDataToDataURL(data?.crop) }
                    />
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            {
                                data.quality.nonCompliant.length > 0 ?
                                <Typography variant='h5' align='left' marginLeft={2} marginTop={1} color='#d4380d' fontWeight='bold'>
                                    <CancelIcon sx={{verticalAlign:'middle', marginRight: 1, fontSize:30}}/>
                                    NON-COMPLIANT
                                </Typography> :
                                <Typography variant='h5' align='left' marginLeft={2} marginTop={1} color='#389e0d' fontWeight='bold'>
                                    <CheckCircleIcon sx={{verticalAlign:'middle', marginRight: 1, fontSize:30}}/>
                                    COMPLIANT
                                </Typography>
                            }
                            
                        </Grid>
                        {
                            data.quality.nonCompliant.length > 0 ?
                            <Grid item xs={9}>
                                <Typography variant='body1' align='left' marginLeft={2} marginTop={2}>
                                    Failed parameters
                                </Typography>
                            </Grid> 
                            :
                            <Grid item xs={12}>
                                <Typography variant='body1' align='left' marginLeft={2} marginTop={2}>
                                    All parameters successfully
                                </Typography>
                            </Grid>
                            
                        }
                        {
                            data.quality.nonCompliant.length > 0 ?
                            <Grid item xs={3}>
                                <Typography variant='body1' align='right' marginX={2}  marginTop={2}>
                                    {
                                        data.quality.nonCompliant.length
                                    }
                                </Typography>
                            </Grid> 
                            :
                            <></>
                        }
                        
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                    }}
                >
                    <Typography variant='h6'>Compliance check</Typography>
                    <Table sx={{ }} aria-label="simple table">
                        <TableBody>
                        {rows.map((row: any) => (
                            <MyRow key={row?.name} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                </Box>
            </Grid>
            
        </Grid>
    );
};

export default QualityResult;
