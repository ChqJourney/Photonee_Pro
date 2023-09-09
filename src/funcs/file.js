export const ext=(filePath)=>{
    const idx=filePath.lastIndexOf('.');
    if(idx===-1){
        throw new Error("it's not a file path")
    }
    const ext=filePath.substring(idx+1);
    return ext;
}
export const isFolder=(path)=>{
    
}