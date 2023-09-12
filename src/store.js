import { writable } from "svelte/store";

export const guiStore=writable({winWidth:800,winHeight:600,currentImgElement:undefined,underDrop:false})

export const dataStore=writable({mode:"file",source:[],currentIdx:0});

export const imageStore=writable({scale:1.0,rotation:0,pointX:0,pointY:0});

export const clearImage=()=>{
    imageStore.update(val=>{
    val.scale=1.0;
    val.rotation=0;
    val.pointX=0;
    val.pointY=0;
    return val;
});
    dataStore.update(val=>{
        val.source=[]
        val.currentIdx=0
        val.mode="file"
        return val;
    })
}