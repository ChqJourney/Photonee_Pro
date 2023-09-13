import { readDir } from "@tauri-apps/api/fs";
import { isImageFormat } from "./image";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export const ext=(filePath)=>{
    const idx=filePath.lastIndexOf('.');
    if(idx===-1){
        return;
    }
    const ext=filePath.substring(idx+1);
    return ext;
}
export const fileName=(fPath)=>{
  
  const arr= fPath.split("\\");
  return arr[arr.length-1];
}
export const dragHandling=async(path)=>{
  try{

    const entries=await readDir(path);
    const files= entries.filter(f=>isImageFormat(f.path)).map(v=>{
      return {name:v.name,path:v.path,url:convertFileSrc(v.path)}
    })
    return {mode:"folder",source:files}
  }catch(ex){
    console.log(ex);
    if(isImageFormat(path)){
      return {mode:"file",source:[{name:fileName(path),path:path,url:convertFileSrc(path)}]}
    }
  }
     
}