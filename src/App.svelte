<script>
// @ts-nocheck
  import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import { fitSize } from "./funcs/image";
  import { listen } from "@tauri-apps/api/event";
  import WinBtns from "./lib/winBtns.svelte";
  import Brand from "./lib/svgs/Brand.svelte";
  import TopBar from "./lib/TopBar.svelte";
  import ToolBar from "./lib/ToolBar.svelte";
  import { clearImage, dataStore, guiStore, imageStore, resetRotation, updateData, updateImage } from "./store";
  import { dragHandling, fileName } from "./funcs/file";
  import { register } from '@tauri-apps/api/globalShortcut';
  import Thumbs from "./lib/Thumbs.svelte";
  import { _ } from "svelte-i18n";
  import Infos from "./lib/Infos.svelte";
    import { openFile, openFolder } from "./funcs/biz";
    import { type } from "@tauri-apps/api/os";
    listen("openFile-menu-clicked",async()=>await openFile());
    listen("openFolder-menu-clicked",async()=>await openFolder());
    listen("close-menu-clicked",()=>clearImage())
  onMount(async () => {
    $guiStore.os=await type()
    await register("CommandOrControl+O",async()=>await openFile());
    await register("CommandOrControl+Shift+O",async()=>await openFolder());
    await register("CommandOrControl+Shift+C",()=>clearImage());
    const path = await invoke("init_file");
    
    if (path) {
      console.log(path)
      const re=await dragHandling(path);
      if(re){

        updateData({
          mode: re.mode,
          source: [
            ...re.source
          ]
        });
      }
    }
    const unlisten = await listen("tauri://file-drop", async (event) => {
      
        const result = await dragHandling(event.payload[0]);
        if(!result){
          isDragHover = false;
          return;
        }
        resetRotation();
        updateData({
          mode: result.mode,
          source: [...result.source]
        });
        isDragHover = false;
      
    });
    await listen("tauri://file-drop-hover", async (event) => {
      isDragHover = true;
    });
    await listen("tauri://file-drop-cancelled", (e) => {
      isDragHover = false;
    });
  });
  let panning
  let isDragHover = false;
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
        "px) scaleX(" +
        $imageStore.scaleX +
        ") scaleY(" +
        $imageStore.scaleY +
        ")" +
        "rotate(" +
        $imageStore.rotation +
        "deg)";
      console.log(transform);
    }
  }
</script>

<svelte:window class="" bind:innerHeight={osh} bind:innerWidth={osw} />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:contextmenu={e=>e.preventDefault()}
  style="border-radius: 8px;"
  class={`relative flex flex-col items-center justify-center h-screen py-10 px-8 bg-gray-50 dark:bg-gray-600 `}
>
  <TopBar>
    <Brand color="fill-[#0EA5E9]" width="w-20" height="h-10" />

    <div class="flex items-center justify-center gap-4">
      <ToolBar
        {img}
        containerH={h}
        containerW={w}
      />
    </div>

    <WinBtns />
  </TopBar>
  
  {#if $dataStore.source.length === 0}
  <div>
    <div class="font-sans text-gray-400 -translate-x-1/2 -translate-y-1/2 items-center absolute top-[50%] flex flex-col justify-center">
      <svg class="h-24 w-24 fill-violet-500 dark:fill-slate-400" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M928 128H96C42.98 128 0 170.98 0 224v576c0 53.02 42.98 96 96 96h832c53.02 0 96-42.98 96-96V224c0-53.02-42.98-96-96-96z m-12 672H108a12 12 0 0 1-12-12V236a12 12 0 0 1 12-12h808a12 12 0 0 1 12 12v552a12 12 0 0 1-12 12zM256 304c-44.182 0-80 35.818-80 80s35.818 80 80 80 80-35.818 80-80-35.818-80-80-80zM192 704h640v-160l-175.03-175.03c-9.372-9.372-24.568-9.372-33.942 0L384 608l-79.03-79.03c-9.372-9.372-24.568-9.372-33.942 0L192 608v96z"></path></svg>
      {$_('drag_notice')}
    </div>
  </div>
  {/if}
 
  <div on:contextmenu={async(e)=>{
    e.preventDefault();
    e.stopPropagation();
    await invoke("plugin:context_menu|show_context_menu",{
      items:[
        {
          label:"Open file",
          shortcut:`${$guiStore.os==="Darwin"?"":"Ctrl+O"}`,
          event:"openFile-menu-clicked"
        },
        {
          label:"Open folder",
          shortcut:`${$guiStore.os==="Darwin"?"":"Ctrl+Shift+O"}`,
          event:"openFolder-menu-clicked"
        },
        {
          is_separator:true
        },
        {
          label:"Close",
          shortcut:`${$guiStore.os==="Darwin"?"":"Ctrl+Shift+C"}`,
          event:"close-menu-clicked"
        },
      ]
    })
  }}
    bind:clientWidth={w}
    bind:clientHeight={h}
    class={`w-full ${
      isDragHover
        ? "border border-dashed dark:border-sky-400 border-orange-500 rounded-md"
        : "border-t dark:border-0"
    } overflow-hidden h-full relative`}
  >
  {#if $dataStore.source.length !== 0 && $imageStore.exif}
  <div class="absolute w-2/5 z-40 h-full top-0 right-0 bg-gray-50 pl-4 py-4 overflow-auto">
    <button on:click={()=>{
      $imageStore.exif=undefined;
    }} class="absolute right-1 top-1 w-6 h-6 rounded-md items-center hover:bg-slate-400 hover:fill-white flex justify-center" >
      <svg class="h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
    </button>
    <Infos info={$imageStore.exif}/>
  </div>
{/if}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img 
      on:load={() => {
        console.log(w, h);
        const result = fitSize(img, w, h, 36);
        updateImage({
          scaleX: result.ratio,
          scaleY: result.ratio,
          pointX: result.offsetX,
          pointY: result.offsetY,
        })
        
      }}
      on:wheel={(e) => {
        e.preventDefault();
        var xs = (e.clientX - $imageStore.pointX) / $imageStore.scaleX,
          ys = (e.clientY - $imageStore.pointY) / $imageStore.scaleY,
          delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
        
          if (delta > 0) {
            updateImage({
              pointX: e.clientX - xs * $imageStore.scaleX,
          pointY: e.clientY - ys * $imageStore.scaleY,
          scaleX:$imageStore.scaleX *1.1,
          scaleY:$imageStore.scaleY *1.1
            })
            
         
        } else {
          updateImage({
            pointX: e.clientX - xs * $imageStore.scaleX,
          pointY: e.clientY - ys * $imageStore.scaleY,
          scaleX:$imageStore.scaleX /1.1,
          scaleY:$imageStore.scaleY /1.1
          })
        }
       
      }}
      on:mousedown={(e) => {
        e.preventDefault();
        start = {
          x: e.clientX - $imageStore.pointX,
          y: e.clientY - $imageStore.pointY,
        };
        console.log(start);
        panning=true;
      }}
      on:mouseup={(e) => {
        panning=false;
      }}
      on:mousemove={(e) => {
        e.preventDefault();
        if (!panning) {
          return;
        }
        updateImage({
          pointX: e.clientX - start.x,
          pointY: e.clientY - start.y,
        })
        
      }}
      style="max-width:1000%;transform: {transform};"
      class={`z-10 cursor-grab absolute object-cover ${
        $dataStore.source[$dataStore.currentIdx] ? "" : "hidden"
      }`}
      src={$dataStore.source[$dataStore.currentIdx]?.url ?? ""}
      bind:this={img}
      alt="show"
      title={$dataStore.source[$dataStore.currentIdx]?.name ?? ""}
    />
  </div>

  <div class={`w-full px-4 ${($dataStore.mode === "folder"&&$dataStore.source.length>0)? "" : "hidden"}`}>
    <Thumbs />
  </div>
  {#if $dataStore.source.length > 1}
    <div class="absolute z-50 left-4" style="top:{osh / 2 - 24}px">
      <button
        on:click={() => {
          if ($dataStore.currentIdx > 0) {
            $dataStore.currentIdx -= 1;
          }
        }}
        class="h-10 rounded-full w-10 dark:bg-gray-400 dark:hover:bg-gray-300 hover:bg-gray-400 fill-gray-600 hover:fill-graty-400 bg-gray-100 flex justify-center items-center"
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
  {#if $dataStore.source.length > 1}
    <div class="absolute z-50 right-4" style="top:{osh / 2 - 24}px">
      <button
        on:click={() => {
          if ($dataStore.currentIdx < $dataStore.source.length - 1) {
            $dataStore.currentIdx += 1;
          }
        }}
        class="h-10 rounded-full dark:bg-gray-400 dark:hover:bg-gray-300 w-10 hover:bg-gray-400 fill-gray-600 hover:fill-white bg-gray-100 flex justify-center items-center"
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
