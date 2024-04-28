export const imageDataToDataURL = (imageData: string):string => {
    return `data:image/jpeg;base64,${imageData}`;
};

export const colorList = [
    '#00ff00',
    '#ff00ff',
    '#7f00ff',
    '#ff0000',
    '#00ffff',
    '#3fff2f',
    '#2fff00',
];

export const drawRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string, depth: number) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = depth;
    ctx.stroke();
}
  
export const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, depth: number) =>{
    ctx.beginPath();
    ctx.arc(x, y, depth, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

export const convertFileToString = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};