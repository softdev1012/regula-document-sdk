import instance from './axiosInstance';
// import { documentReadApiMock } from './DocumentServiceMock';

export const DocumentReadApi = async (file: string, opt: string) => {
//   return documentReadApiMock();
  const img = file.split(/,(.*)/);
  if (img.length < 2) return;
  const param = {
    "processParam": {
        "scenario": opt,
        "doublePageSpread": true,
        "measureSystem": 0,
        "dateFormat": "M/d/yyyy"
    },
    "List": [
        {
            "ImageData": {
                "image": img[1]
            },
            "light": 6,
            "page_idx": 0
        }
    ]
}
  const response = await instance.post('/api/process', param);
  return response.data;
};

