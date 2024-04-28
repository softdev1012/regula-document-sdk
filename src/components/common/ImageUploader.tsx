import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MuiAvatar from '@mui/material/Avatar';
import UploadIcon from '@mui/icons-material/Upload';
import { convertFileToString } from "../../services";
interface ImageUploaderProps {
    _id?: string;
    width?: number;
    height?: number;
    src?:string;
    onImageChange?: any;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({src, onImageChange}) => {
    const [selectedImg, setSelectedImg] = useState<string>("");
    useEffect(()=>{
        if (src) setSelectedImg(src);
    }, [src]);
    const handleSelecImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        const uploadFile = selectedFiles?.[0];
        convertFileToString(uploadFile).then((data: string) => {
            setSelectedImg(data);
            onImageChange(data);
        });
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
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
                    src={ selectedImg }
                />
            </Grid>
            <Grid item xs={12}>
                <label className="btn btn-default p-0">
                    <input
                        type="file" 
                        accept="image/*"
                        hidden
                        onChange={handleSelecImage}
                    />
                    <div>
                        <Button variant="contained" component="span" color="secondary" sx={{textTransform:"none"}} startIcon={<UploadIcon/>}>Upload Image</Button>
                    </div>
                </label>
            </Grid>
        </Grid>
    );
};

export default ImageUploader;
