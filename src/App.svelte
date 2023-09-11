<script>
  import { open } from "@tauri-apps/api/dialog";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { onMount, tick } from "svelte";
  import { fitSize, isImageFormat } from "./funcs/image";
  import { listen } from "@tauri-apps/api/event";
  import WinBtns from "./lib/winBtns.svelte";
  import Brand from "./lib/svgs/Brand.svelte";
  import SimpleBrand from "./lib/svgs/SimpleBrand.svelte";
  import TopBar from "./lib/TopBar.svelte";
    import ToolBar from "./lib/ToolBar.svelte";
    import { clearImage, dataStore, imageStore } from "./store";
    import { exists, readDir } from "@tauri-apps/api/fs";
    import { isFolder } from "./funcs/file";
  onMount(async () => {
    const unlisten = await listen("tauri://file-drop", async (event) => {
      console.log($dataStore.mode)
      if($dataStore.mode==="file"){

        let dropPath = event.payload;
        if (!dropPath) return;
        // clearImage();
        if (isImageFormat(dropPath[0])) {
          $dataStore.source=[convertFileSrc(dropPath[0])];
        }
      }else{
        const entries = await readDir(event.payload[0]);
        // clearImage()
        $dataStore={...$dataStore,source:[...entries.map(v=>{return convertFileSrc(v.path)})]}
        console.log($dataStore.source);
      }
      console.log(isFileHover)
      isFileHover=false;
      console.log(isFileHover)
    });
    await listen("tauri://file-drop-hover",async(event)=>{
      console.log(event)
      if(isFolder(event.payload[0])){
        $dataStore.mode="folder";
      }else{
        $dataStore.mode="file";
        isFileHover=true;
      }
      console.log(isFileHover)
    })
    await listen("tauri://resize",e=>{
      console.log(e)
    })
  });
  let status = { inEdit: false, panning: false, rotating: false };
  let isFileHover=false;
  let w, h;
  let img;
  let osh, osw;
  let start = { x: 0, y: 0 };
  
  let transform;
  $: {
    if (img) {
      transform =
        "translate(" +
        $imageStore.pointX +
        "px, " +
        $imageStore.pointY +
        "px) scale(" +
        $imageStore.scale +
        ") rotate(" +
        $imageStore.rotation +
        "deg)";
      console.log(transform);
    }
  }
  
</script>

<svelte:window class="" bind:innerHeight={osh} bind:innerWidth={osw} />
<div
  style="border-radius: 10px;"
  class={`relative flex items-center justify-center h-screen py-10 px-8 bg-gray-50 `}
>
  <TopBar>
      <Brand color="fill-slate-600" width="w-20" height="h-10" />
    

    <div class="flex items-center justify-center gap-4" >
     <ToolBar
      on:view-action={e=>{
          $imageStore={...$imageStore,scale:e.detail.scale,pointX:e.detail.pointX, pointY:e.detail.pointY,rotation:e.detail.rotation}
      }}
      on:source-action={e=>{
        // clearImage()
        $dataStore={...$dataStore,source:[...e.detail.source],mode:e.detail.mode,currentIdx:e.detail.currentIdx}
     
      console.log($dataStore)
     }} img={img} containerH={h} containerW={w}></ToolBar>
    </div>
    
      <WinBtns/>
  </TopBar>
  {#if $dataStore.source.length===0}
    <div class="font-sans text-gray-400 absolute top-[50%]">
      please drag image or folder to this window and drop
    </div>
  {/if}
  <!-- {#if isFileHover}
  <div class="absolute">
    <svg class="h-48 w-48" viewBox="0 0 1097 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M365.714286 329.142857a109.750857 109.750857 0 0 1-219.428572 0 109.750857 109.750857 0 0 1 219.428572 0z m585.142857 219.428572v256H146.285714v-109.714286l182.857143-182.857143 91.428572 91.428571 292.571428-292.571428z m54.857143-402.285715h-914.285715c-9.728 0-18.285714 8.557714-18.285714 18.285715v694.857142c0 9.728 8.557714 18.285714 18.285714 18.285715h914.285715c9.728 0 18.285714-8.557714 18.285714-18.285715v-694.857142c0-9.728-8.557714-18.285714-18.285714-18.285715z m91.428571 18.285715v694.857142c0 50.285714-41.142857 91.428571-91.428571 91.428572h-914.285715A91.684571 91.684571 0 0 1 0 859.428571v-694.857142C0 114.285714 41.142857 73.142857 91.428571 73.142857h914.285715C1056 73.142857 1097.142857 114.285714 1097.142857 164.571429z" ></path></svg>
  </div>
  {:else}
  <div class="absolute">
    <svg class="h-48 w-48" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M0 184.32a81.92 81.92 0 0 1 81.92-81.92h189.57312a81.92 81.92 0 0 1 69.90848 39.19872L373.76 194.56H839.68a81.92 81.92 0 0 1 81.92 81.92v634.88H40.96a40.96 40.96 0 0 1-40.96-40.96V184.32z" fill="#40A9FF"></path><path d="M210.95424 307.2h725.54496a81.92 81.92 0 0 1 80.66048 96.23552l-87.21408 491.52A81.92 81.92 0 0 1 849.28512 962.56H71.68l57.7536-581.5296A81.92 81.92 0 0 1 210.95424 307.2z" fill="#69C0FF"></path><path d="M0 880.64a41.35936 41.35936 0 0 0 70.656 5.53984L81.92 870.4v92.16a81.92 81.92 0 0 1-81.92-81.92z" fill="#69C0FF"></path><path d="M552.96 450.56L419.84 614.4h71.68v133.12h122.88V614.4h71.68L552.96 450.56zM491.52 768h122.88v40.96H491.52zM491.52 829.44h122.88v20.48H491.52z" fill="#91D5FF"></path></svg>
  </div>
  {/if} -->
  <!-- <div>
    {#each $dataStore.source as thumb}
      <img src={thumb} alt="thumbnails" style=""/>
    {/each}
  </div> -->
  <div
    bind:clientWidth={w}
    bind:clientHeight={h}
    class={`w-full ${isFileHover?"border border-dashed border-pink-500 rounded-md":"border-t"} overflow-hidden h-full relative`}
  >
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
      on:load={() => {
        console.log(w, h);
        const result = fitSize(img, w, h, 0);
        console.log(result)
        $imageStore={...$imageStore,scale:result.ratio,pointX:result.offsetX,pointY:result.offsetY}
      }}
      on:wheel={(e) => {
        e.preventDefault();
        var xs = (e.clientX - $imageStore.pointX) / $imageStore.scale,
          ys = (e.clientY - $imageStore.pointY) / $imageStore.scale,
          delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
        delta > 0 ? ($imageStore.scale *= 1.1) : ($imageStore.scale /= 1.1);
        $imageStore ={...$imageStore,pointX:e.clientX - xs * $imageStore.scale,pointY: e.clientY - ys * $imageStore.scale};
        
      }}
      on:mousedown={(e) => {
        e.preventDefault();
        start = { x: e.clientX - $imageStore.pointX, y: e.clientY - $imageStore.pointY };
        console.log(start);
        status = { ...status, panning: true };
      }}
      on:mouseup={(e) => {
        status = { ...status, panning: false };
      }}
      on:mousemove={(e) => {
        e.preventDefault();
        if (!status.panning) {
          return;
        }
        $imageStore ={...$imageStore,pointX: e.clientX - start.x,pointY:e.clientY - start.y};
        
      }}
      style="max-width:1000%;transform: {transform};"
      class={`z-10 cursor-grab absolute object-cover ${$dataStore.source[$dataStore.currentIdx] ? "" : "hidden"}`}
      src={$dataStore.source[$dataStore.currentIdx]}
      bind:this={img}
      alt="show"
    />
  </div>
  {#if $dataStore.source.length>1}
    <div class="absolute z-50 left-4" style="top:{osh / 2 - 24}px">
      <button on:click={()=>{
        if($dataStore.currentIdx>0){
          $dataStore.currentIdx-=1
        }
      }}
        class="h-10 rounded-full w-10 hover:bg-gray-400 fill-gray-600 hover:fill-white bg-gray-100 flex justify-center items-center"
      >
        <svg
          class="h-8 w-8"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          ><path
            d="M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z"
          /></svg
        >
      </button>
    </div>
  {/if}
  {#if $dataStore.source.length>1}
    <div class="absolute z-50 right-4" style="top:{osh / 2 - 24}px">
      <button on:click={()=>{
        if($dataStore.currentIdx<$dataStore.source.length-1){
          $dataStore.currentIdx+=1
        }
      }}
        class="h-10 rounded-full w-10 hover:bg-gray-400 fill-gray-600 hover:fill-white bg-gray-100 flex justify-center items-center"
      >
        <svg
          class="h-8 w-8"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          ><path
            d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
          /></svg
        >
      </button>
    </div>
  {/if}
</div>


