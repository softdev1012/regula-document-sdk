import instance from './axiosInstance';

export const faceDetectApi = async (file: string) => {
  const img = file.split(/,(.*)/);
  if (img.length < 2) return;
  const param = {
    "processParam": {
        "outputImageParams": {"crop": {"type": 1, "size": [106,134]}},
        "attributes": {
            "config": [
                {"name": "Age"},
                {"name": "EyeRight"},
                {"name": "EyeLeft"},
                {"name": "Emotion"},
                {"name": "Smile"},
                {"name": "Glasses"},
                {"name": "HeadCovering"},
                {"name": "ForeheadCovering"},
                {"name": "Mouth"},
                {"name": "MedicalMask"},
                {"name": "Occlusion"},
                {"name": "StrongMakeup"},
                {"name": "Headphones"}
            ]
        },
        "onlyCentralFace": false
    },
    "image": img[1]
}
  const response = await instance.post('/api/detect', param);
  return response.data;
};

export const faceMatchingApi = async (file1: string, file2: string) => {
  const img1 = file1.split(/,(.*)/);
  const img2 = file2.split(/,(.*)/);
  if (img1.length < 2 || img2.length < 2) return;
  const param = {
    "outputImageParams": {
        "crop": {"type": 1,"size": [106,134]}
    },
    "images": [
        {
            "data": img1[1],
            "index": 0,
            "detectAll": true,
            "type": 3
        },
        {
            "data": img2[1],
            "index": 1,
            "detectAll": true,
            "type": 3
        }
    ]
  };
  const response = await instance.post('/api/match', param);
  return response.data;
};

export const faceQualityApi = async (file: string) => {
  const img = file.split(/,(.*)/);
  if (img.length < 2) return;
  const param = {
    "processParam": {
        "onlyCentralFace": true,
        "scenario": "QualityICAO",
        "outputImageParams": {
            "crop": {"type": 0,"size": [480,640]}
        }
    },
    "image": img[1]
  }
  const response = await instance.post('/api/detect', param);
  return response.data;
};

