<script>
  import { open } from "@tauri-apps/api/dialog";
  import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
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
    import { dragHandling, fileName } from "./funcs/file";
    import Thumbs from "./lib/Thumbs.svelte";
  onMount(async () => {
    const file=await invoke("init_file");
    console.log(file);
    if(file){
      $dataStore={...$dataStore,mode:"file",source:[{path:file,name:fileName(file),url:convertFileSrc(file)}]}
    }
    const unlisten = await listen("tauri://file-drop", async (event) => {
      console.log($dataStore.mode)

      const result=await dragHandling(event.payload[0]);
      
          $dataStore={...$dataStore,mode:result.mode,source:[...result.source]}
     
      isDragHover=false;
      console.log(isDragHover)
    });
    await listen("tauri://file-drop-hover",async(event)=>{
      
        isDragHover=true;
    })
    await listen("tauri://file-drop-cancelled",e=>{
      isDragHover=false;
    })
  });
  let status = { inEdit: false, panning: false, rotating: false };
  let isDragHover=false;
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
  class={`relative flex flex-col items-center justify-center h-screen py-10 px-8 bg-gray-50 `}
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

  <div
    bind:clientWidth={w}
    bind:clientHeight={h}
    class={`w-full ${isDragHover?"border border-dashed border-pink-500 rounded-md":"border-t"} overflow-hidden h-full relative`}
  >
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
      on:load={() => {
        console.log(w, h);
        const result = fitSize(img, w, h, 36);
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
      src={$dataStore.source[$dataStore.currentIdx]?.url??""}
      bind:this={img}
      alt="show" title={$dataStore.source[$dataStore.currentIdx]?.name??""}  />
  </div>
 
  <div class={`w-full px-4 ${$dataStore.mode==="file"?"hidden":""}`}>
    <Thumbs/>
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


