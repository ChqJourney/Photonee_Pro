import { writable } from "svelte/store";

export const guiStore=writable({winWidth:800,winHeight:600,currentImgElement:undefined,underDrop:false})

export const dataStore=writable({source:undefined,currentIdx:0});