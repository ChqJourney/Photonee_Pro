import { writable } from "svelte/store";



export const guiStore=writable({locale:"en-US",os:"Windows_NT",modalShow:false,modalComponent:undefined})
export const showModal=(component)=>{
    guiStore.update(val=>{
        val={...val,modalShow:true,modalComponent:component}
        return val;
    })
}
export const closeModal=()=>{
    guiStore.update(val=>{
        val={...val,modalShow:false,modalComponent:undefined}
        return val
    })
}
export const dataStore=writable({mode:"file",source:[],currentIdx:0});
export const updateData=(obj)=>{
    dataStore.update(val=>{
        val={...val,...obj};
        return val;
    })
}
export const imageStore=writable({scaleX:1.0,scaleY:1.0,rotation:0,pointX:0,pointY:0,exif:undefined});
export const updateImage=(obj)=>{
    imageStore.update(val=>{
        val={...val,...obj};
        return val;
    })
}
export const clearImage=()=>{
    imageStore.update(val=>{
    val.scaleX=1.0;
    val.scaleY=1.0;
    val.rotation=0;
    val.pointX=0;
    val.pointY=0;
    val.exif=undefined;
    return val;
});
    dataStore.update(val=>{
        val.source=[]
        val.currentIdx=0
        val.mode="file"
        return val;
    })
}
export const resetRotation=()=>{
    imageStore.update(val=>{
        val.rotation=0;
        return val;
    })
}