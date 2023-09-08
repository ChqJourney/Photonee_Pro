<script>
  import { open } from "@tauri-apps/api/dialog";
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import { appWindow } from '@tauri-apps/api/window'
    import { tick } from "svelte";
    import { fitSize, nSize, size } from "./funcs/image";
  let status={inEdit:false,panning:false,rotating:false}
  let w,h;
  let img;
  let imgInitWidth;
  let osh, osw;
  let canvas;
  let path;
  let ctx;
  let start={x:0,y:0}
  let scale = 1.0;
  let rotation=0;
  let pointX=0;
  let pointY=0;
  let transform;
  let transPoint="0% 0%";
  $:{
    if(img){
      transform="translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
      console.log(transform)
    }
  }
//  $:{
//   if(status.rotating){
//     transPoint=`${scale*100}% ${scale*100}%`
//   }else{
//     transPoint="0% 0%";
//   }
//   console.log(transPoint)
//  }
 
  $: console.log(pointX,pointY)
  const render = () => {
    img = new Image();
    img.src = path;
    ctx = canvas.getContext("2d");
    imgInitWidth=img.naturalWidth;
    img.onload = () => {
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };
</script>

<svelte:window class="" bind:innerHeight={osh} bind:innerWidth={osw} />
<div style="border-radius: 10px;" class={`relative flex items-center justify-center h-screen py-8 px-8 bg-slate-100 `}>
  <div data-tauri-drag-region  class="fixed top-0 z-50 h-8 w-full flex justify-between items-center px-4">
    
    <div></div>
    <div class="flex gap-4">
    <button
      on:click={async () => {
        let imgSrc = await open({
          multiple: false,
          filters: [
            {
              name: "Image",
              extensions: ["png", "jpeg"],
            },
          ],
        });

        if (imgSrc) {
          if(status.inEdit){
            path = convertFileSrc(imgSrc.toString());
            render()
          }else{
            path = convertFileSrc(imgSrc.toString());
            scale=1.0;
            rotation=0;
            pointX=0;
            pointY=0;
            // setTransform()
          }
        }
      }}
      class="hover:bg-gray-300 hover:fill-white"
    >
      <svg
        class="h-4 w-4"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M757.938 202H567c-24.852 0-45-20.148-45-45S542.148 112 567 112h300c24.852 0 45 20.148 45 45v300c0 24.852-20.148 45-45 45S822 481.852 822 457v-191.78L540.73 544.91c-17.622 17.524-46.116 17.444-63.64-0.18-17.524-17.622-17.444-46.116 0.18-63.64L757.938 202zM867 652c24.852 0 45 20.148 45 45V762c0 82.842-67.158 150-150 150H262c-82.842 0-150-67.158-150-150V262c0-82.842 67.158-150 150-150h65c24.852 0 45 20.148 45 45S351.852 202 327 202H262c-33.138 0-60 26.862-60 60v500c0 33.138 26.862 60 60 60h500c33.138 0 60-26.862 60-60v-65c0-24.852 20.148-45 45-45z"
        /></svg
      >
    </button>
    <button
      on:click={() => {
        scale *= 1.05;
        // render()
      }}
      class="hover:bg-gray-300 hover:fill-white"
    >
      <svg
        class="h-4 w-4"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"
        /><path
          d="M597.333333 437.333333h-96V341.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h96V597.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-96H597.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
        /></svg
      >
    </button>
    <button
      on:click={() => {
        scale *= 0.95;
        // render()
      }}
      class="hover:bg-gray-300 hover:fill-white"
    >
      <svg
        class="h-4 w-4"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"
        /><path
          d="M921 867L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"
        /></svg
      >
    </button>
    <button class="hover:bg-gray-300 hover:fill-white">
      <svg class="h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M853.333333 501.333333c-17.066667 0-32 14.933333-32 32v320c0 6.4-4.266667 10.666667-10.666666 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V213.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h320c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666666-74.666667V533.333333c0-17.066667-14.933333-32-32-32z" ></path><path d="M405.333333 484.266667l-32 125.866666c-2.133333 10.666667 0 23.466667 8.533334 29.866667 6.4 6.4 14.933333 8.533333 23.466666 8.533333h8.533334l125.866666-32c6.4-2.133333 10.666667-4.266667 14.933334-8.533333l300.8-300.8c38.4-38.4 38.4-102.4 0-140.8-38.4-38.4-102.4-38.4-140.8 0L413.866667 469.333333c-4.266667 4.266667-6.4 8.533333-8.533334 14.933334z m59.733334 23.466666L761.6 213.333333c12.8-12.8 36.266667-12.8 49.066667 0 12.8 12.8 12.8 36.266667 0 49.066667L516.266667 558.933333l-66.133334 17.066667 14.933334-68.266667z"></path></svg>
    </button>
    <button on:click={()=>{
      status={...status,rotating:true}
      rotation-=5
      // status={...status,rotating:false}
      // transformOri="0% 0%"
    }} class="hover:bg-gray-300 hover:fill-white">
      <svg class="h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M118.102838 172.97354c-8.577353 1.840928-16.083304 5.950526-21.635763 13.023618s-7.763824 15.340383-6.63307 24.801872l17.483186 99.467409c1.001817 15.07637 5.414313 18.541285 18.651802 28.933983 12.355399 9.699919 26.732851 9.555633 34.616402 8.598842l84.314291-3.829212c17.342993-2.103918 30.53034-18.902512 28.458145-36.248575-2.072195-17.347087-18.84009-30.510898-36.183083-28.40698l-28.250415-2.172479C341.179496 112.313995 582.402443 83.048461 747.434104 212.611306c165.91375 130.254599 194.743356 371.529735 64.947197 536.8602-130.490983 166.213579-371.020128 194.593953-536.933878 64.339354-89.135086-69.977771-142.622278-176.275749-145.846716-290.272059 1.834788-11.42112-3.520173-22.77061-12.345166-29.698393-15.002692-11.778254-36.193317-8.407484-47.298236 5.737678-2.082428 2.65241-6.057973 9.534144-6.057973 9.534144l-0.128936 5.614881c-1.011027 4.922103-0.446162 9.652847 0.813528 13.499455 4.602831 132.22651 66.469877 255.107165 170.607656 336.862168 195.037045 153.11833 477.252615 118.880551 629.953436-75.624375s118.973672-476.781894-76.063373-629.901247C603.749634 14.066367 344.053963 35.973306 184.489828 206.514447c-3.470031 4.420683-20.694321 20.908192-25.047466 24.636097l-4.462638-30.655184c-9.379625-31.658024-36.876885-27.52182-36.876886-27.52182z"></path></svg>
    </button>
    <button on:click={()=>{
      status={...status,rotating:true}
      rotation+=5;
      // status={...status,rotating:false}
      // transformOri="0% 0%"
    }} class="hover:bg-gray-300 hover:fill-white">
      <svg class="h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 64c160 0 304 83.2 384 217.6L896 256c0-19.2 12.8-32 32-32s32 12.8 32 32l0 128c0 19.2-12.8 32-32 32l-128 0c-19.2 0-32-12.8-32-32s12.8-32 32-32l60.8 0c-64-137.6-198.4-224-348.8-224C300.8 128 128 300.8 128 512s172.8 384 384 384c153.6 0 294.4-92.8 352-233.6 6.4-16 25.6-22.4 41.6-16 16 6.4 22.4 25.6 16 41.6C854.4 854.4 691.2 960 512 960 265.6 960 64 758.4 64 512S265.6 64 512 64z"></path></svg>
    </button>
  </div>
  <div class="flex">
    <div class="titlebar-button" id="titlebar-minimize">
      <img
        src="https://api.iconify.design/mdi:window-minimize.svg"
        alt="minimize"
      />
    </div>
    <div class="titlebar-button" id="titlebar-maximize">
      <img
        src="https://api.iconify.design/mdi:window-maximize.svg"
        alt="maximize"
      />
    </div>
    <div class="titlebar-button" id="titlebar-close">
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </div>
  </div>
  </div>
  
    <div bind:clientWidth={w} bind:clientHeight={h} class="w-full h-full relative">

    
      <!-- {#if path} -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img on:load={()=>{
        console.log(w,h)
        scale=fitSize(img,w,h,66)
        console.log(scale)
      }}
       on:wheel={e=>{
        e.preventDefault();
        var xs = (e.clientX - pointX) / scale,
          ys = (e.clientY - pointY) / scale,
          delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        (delta > 0) ? (scale *= 1.1) : (scale /= 1.1);
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;
      }} 
      on:mousedown={e=>{
        e.preventDefault();
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        console.log(start)
        status={...status,panning:true}
      }}
      on:mouseup={e=>{
        status={...status,panning:false}
      }}
      on:mousemove={e=>{
        e.preventDefault();
        if (!status.panning) {
          return;
        }
        pointX = (e.clientX - start.x);
        pointY = (e.clientY - start.y);
      }}
      style="max-width:1000%;transform: {transform};"
        class={`z-10 origin-top-right cursor-grab absolute object-cover`}
        bind:naturalWidth={imgInitWidth}
        src={"glass.jpeg"}
        bind:this={img}
        alt="show"
      />

   </div>
    {#if path}
  <div class="absolute z-50 left-4" style="top:{osh / 2 - 24}px">

    <button
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
  {#if path}
  <div class="absolute z-50 right-4" style="top:{osh / 2 - 24}px">
    <button
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
