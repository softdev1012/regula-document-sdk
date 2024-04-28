import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../layouts/ResponsiveAppBar';
import FaceDetection from '../components/FaceDetection';
import FaceImageQuality from '../components/FaceImageQuality';
import FaceMatching from '../components/FaceMatching';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
                {children}
          </Box>
        )}
      </div>
    );
}
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const FirstPage: React.FC = () =>{
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(event.timeStamp);
    };
    return(
        <>
        <ResponsiveAppBar />
        <Box sx={{ marginX:'2rem', marginTop:"2rem"}}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab {...a11yProps(0)} label="Face detection" style={{textTransform: 'none', fontSize: 16, fontWeight:'bold'}}/>
                <Tab {...a11yProps(1)} label="Face matching" style={{textTransform: 'none', fontSize: 16, fontWeight:'bold'}}/>
                <Tab {...a11yProps(2)} label="Face image quality" style={{textTransform: 'none', fontSize: 16, fontWeight:'bold'}}/>
            </Tabs>
            <CustomTabPanel value={value} index={0}>
                <FaceDetection />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <FaceMatching />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <FaceImageQuality />
            </CustomTabPanel>
        </Box>
        </>
    );
}
export default FirstPage;