export const nSize = (img) => {
    return { w: img?.naturalWidth ?? 0, h: img?.naturalHeight ?? 0 };
}
export const size = (img) => {
    console.log(img.height)
    return { w: img?.width ?? 0, h: img?.height ?? 0 };
}
// fit to container at center based on default transform-origin:center
export const fitSize = (img, w,h, margin) => {
    console.log(w,h)
    const wRatio = (w - margin)/img.naturalWidth;
    const hRatio =  (h - margin)/img.naturalHeight;
    
    if (wRatio > hRatio) {
        return hRatio;
    } else {
        return wRatio;
    }
}