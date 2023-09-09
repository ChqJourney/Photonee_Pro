import { ext } from "./file";

export const imageFormatArr=["jpg","jpeg","png","gif","JPG","JPEG","GIF","PNG","ICO","ico",".apng","APNG","avif","AVIF","bmp","BMP","cur","CUR","svg","SVG","tif","TIF","TIFF","tiff","webp","WEBP","jfif","pjpeg","pjp","JFIF","PJPEG","PJP"]

export const isImageFormat=(filePath)=>{
    const extension=ext(filePath);
    console.log(extension);
    console.log(imageFormatArr)
    if(imageFormatArr.includes(extension)){
        return true
    }
    return false;
}
// natural size
export const nSize = (img) => {
    return { w: img?.naturalWidth ?? 0, h: img?.naturalHeight ?? 0 };
}

export const size = (img) => {
    console.log(img.height)
    return { w: img?.width ?? 0, h: img?.height ?? 0 };
}
// fit to container at center based on default transform-origin:center
export const fitSize = (img, w, h, margin) => {
    console.log(w, h)
    
    const wRatio = (w - margin) / img.naturalWidth;
    const hRatio = (h - margin) / img.naturalHeight;
    if(wRatio>1&&hRatio>1){
        return {ratio:1,offsetX:((w-margin)/2-img.naturalWidth/2),offsetY:((h-margin)/2-img.naturalHeight/2)}
    }
    if (wRatio > hRatio) {
        const offsetX = -(img.naturalWidth-w) / 2;
        const offsetY = -(img.naturalHeight-h) / 2;
        return { ratio: hRatio, offsetX: offsetX, offsetY: offsetY };
    } else {
        const offsetX = -(img.naturalWidth-w) / 2;
        const offsetY = -(img.naturalHeight-h) / 2;
        return { ratio: wRatio, offsetX: offsetX, offsetY: offsetY };
    }
}
