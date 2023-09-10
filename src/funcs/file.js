export const ext=(filePath)=>{
    const idx=filePath.lastIndexOf('.');
    if(idx===-1){
        throw new Error("it's not a file path")
    }
    const ext=filePath.substring(idx+1);
    return ext;
}
export const isFolder=(path)=>{
   
      const slash=path.split("\\");
      console.log(slash)
      const last=slash[slash.length-1];
      console.log(last)
      if(!last.includes(".")){
        return true;
      }
      return false;
}