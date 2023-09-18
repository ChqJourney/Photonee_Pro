<script>
    import { message, open } from "@tauri-apps/api/dialog";
    import { fitSize } from "../funcs/image";
    import { clearImage,imageStore, guiStore, updateData, updateImage, showModal } from "../store";
    import { dragHandling } from "../funcs/file";
    import { _, locale } from "svelte-i18n";
    import * as EXIF from "exif-js";
      import { openFile, openFolder } from "../funcs/biz";
      import Donate from "./Donate.svelte";
    export let img;
    export let containerW, containerH;
    let isMenuShow = false;
  </script>
  
  <div class="flex items-center gap-4 fill-violet-500">
    <button
      data-tooltip={$_("open_image_file")}
      title="open image"
      on:click={async()=>await openFile()}
      class="hover:bg-gray-500 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M928 144H96a32 32 0 0 0-32 32v672a32 32 0 0 0 32 32h478.08v-64h-105.6l233.6-259.52L768 611.84l41.28-48.64-89.6-75.52a32 32 0 0 0-44.48 2.88l-177.92 197.76-139.2-120.64a32 32 0 0 0-43.52 1.6L128 755.84V208h768v273.92h64V176a32 32 0 0 0-32-32zM338.56 635.84L454.4 736l-67.2 74.56 6.08 5.44H160z"
        /><path d="M448 384m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z" /><path
          d="M848 640h-64v112H672v64h112V928h64v-112H960v-64h-112V640z"
        /></svg
      >
    </button>
    <button
      data-tooltip={$_("open_folder")}
      on:click={async()=>await openFolder()}
      class="hover:bg-gray-300 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 1170 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M34.677862 1020.942998a42.224834 42.224834 0 0 1-14.71182-3.343595c-0.573188 0-1.241907-0.668719-1.910626-1.337438s-1.337438-0.668719-2.006158-1.337438a26.748764 26.748764 0 0 1-8.024629-6.687191c-0.668719-0.668719-1.337438-0.668719-1.337438-1.337439s-0.668719-0.668719-0.668719-1.337438-0.668719-1.337438-0.668719-2.006157a34.295737 34.295737 0 0 1-3.343596-8.597817c-0.668719-2.006157-0.668719-3.343595-1.337438-5.349753a2.483814 2.483814 0 0 0-0.668719-2.006157V121.32475C0 54.643903 60.662375 0 134.699132 0h248.381379c74.705476 0 134.699132 54.643903 134.699133 121.32475v8.693349h364.929564c46.714805 0 84.736263 34.677862 84.736263 78.049071v138.806979h166.033398a33.531486 33.531486 0 0 1 27.321952 13.947569 35.442112 35.442112 0 0 1 4.681034 30.665548l-179.598844 543.477563c-17.291165 51.395839-68.687004 85.97817-128.776191 85.978169H34.677862zM309.521411 414.223715c-29.996828 0-56.076873 15.953727-63.337252 39.358895L82.061386 952.542588h777.051591c30.092359 0 56.076873-16.049258 64.101502-39.358895l164.027241-498.959978zM135.367851 68.018285c-36.684019 0-66.87191 23.978356-66.871909 53.306465v637.098237l4.681033 0.668719L181.509469 432.183599c16.717977-51.300308 68.687004-85.97817 128.107473-85.978169h590.192369V207.398451c0-4.012315-6.59166-10.030786-15.953727-10.030786H484.248157a34.104674 34.104674 0 0 1-34.009142-34.009143v-42.702491c0-29.328109-29.996828-53.306465-66.87191-53.306465h-248.381379z"
        /></svg
      >
    </button>
    <button
      data-tooltip={$_("zoom_in")}
      on:click={() => {
        updateImage({
          scaleX: $imageStore.scaleX * 1.05,
          scaleY: $imageStore.scaleY * 1.05,
        })
      }}
      class="hover:bg-gray-300 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
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
      data-tooltip={$_("zoom_out")}
      on:click={() => {
        updateImage({
          scaleX: $imageStore.scaleX * 0.95,
          scaleY: $imageStore.scaleY * 0.95,
        })
      }}
      class="hover:bg-gray-300 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
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
    
    <button
      data-tooltip={$_("rotate_anti-clockwise")}
      on:click={() => {
        if ($imageStore.rotation === -270) {
          updateImage({
            rotation:0
          })
        } else {
          updateImage({
            rotation:$imageStore.rotation-90
          })
        }
      }}
      class="hover:bg-gray-300 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M118.102838 172.97354c-8.577353 1.840928-16.083304 5.950526-21.635763 13.023618s-7.763824 15.340383-6.63307 24.801872l17.483186 99.467409c1.001817 15.07637 5.414313 18.541285 18.651802 28.933983 12.355399 9.699919 26.732851 9.555633 34.616402 8.598842l84.314291-3.829212c17.342993-2.103918 30.53034-18.902512 28.458145-36.248575-2.072195-17.347087-18.84009-30.510898-36.183083-28.40698l-28.250415-2.172479C341.179496 112.313995 582.402443 83.048461 747.434104 212.611306c165.91375 130.254599 194.743356 371.529735 64.947197 536.8602-130.490983 166.213579-371.020128 194.593953-536.933878 64.339354-89.135086-69.977771-142.622278-176.275749-145.846716-290.272059 1.834788-11.42112-3.520173-22.77061-12.345166-29.698393-15.002692-11.778254-36.193317-8.407484-47.298236 5.737678-2.082428 2.65241-6.057973 9.534144-6.057973 9.534144l-0.128936 5.614881c-1.011027 4.922103-0.446162 9.652847 0.813528 13.499455 4.602831 132.22651 66.469877 255.107165 170.607656 336.862168 195.037045 153.11833 477.252615 118.880551 629.953436-75.624375s118.973672-476.781894-76.063373-629.901247C603.749634 14.066367 344.053963 35.973306 184.489828 206.514447c-3.470031 4.420683-20.694321 20.908192-25.047466 24.636097l-4.462638-30.655184c-9.379625-31.658024-36.876885-27.52182-36.876886-27.52182z"
        /></svg
      >
    </button>
    <button
      data-tooltip={$_("rotate_clockwise")}
      on:click={() => {
        if ($imageStore.rotation === 270) {
          updateImage({
            rotation:0
          })
        } else {
          updateImage({
            rotation:$imageStore.rotation-90
          })
        }
      }}
      class="hover:bg-gray-300 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M512 64c160 0 304 83.2 384 217.6L896 256c0-19.2 12.8-32 32-32s32 12.8 32 32l0 128c0 19.2-12.8 32-32 32l-128 0c-19.2 0-32-12.8-32-32s12.8-32 32-32l60.8 0c-64-137.6-198.4-224-348.8-224C300.8 128 128 300.8 128 512s172.8 384 384 384c153.6 0 294.4-92.8 352-233.6 6.4-16 25.6-22.4 41.6-16 16 6.4 22.4 25.6 16 41.6C854.4 854.4 691.2 960 512 960 265.6 960 64 758.4 64 512S265.6 64 512 64z"
        /></svg
      >
    </button>
    <button
      data-tooltip={$_("fit_to")}
      on:click={() => {
        const result = fitSize(img, containerW, containerH, 36);
        updateImage({
          scaleX: result.ratio,
          scaleY:result.ratio,
          pointX: result.offsetX,
          pointY: result.offsetY
        })yarn
      }}
      class="hover:bg-gray-400 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M912 648v232c0 17.673-14.327 32-32 32H648c0-35.346 28.654-64 64-64h136V712c0-34.993 28.084-63.426 62.942-63.991L912 648z m-792 0c30.619 0 55.498 24.573 55.992 55.074L176 704v144h144c30.619 0 55.498 24.573 55.992 55.074L376 904v8H144c-17.496 0-31.713-14.042-31.996-31.47L112 880V648h8z m537-313c17.496 0 31.713 14.042 31.996 31.47l0.004 0.53v290c0 17.496-14.042 31.713-31.47 31.996L657 689H367c-17.496 0-31.713-14.042-31.996-31.47L335 657V367c0-17.496 14.042-31.713 31.47-31.996L367 335h290z m-32 64H399v226h226V399z m255-287c17.496 0 31.713 14.042 31.996 31.47l0.004 0.53v232h-8c-30.619 0-55.498-24.573-55.992-55.074L848 320V176H704c-30.619 0-55.498-24.573-55.992-55.074L648 120v-8h232z m-504 0v8c0 30.928-25.072 56-56 56H176v144c0 30.928-25.072 56-56 56h-8V144c0-17.673 14.327-32 32-32h232z"
          
        /></svg
      >
    </button>
    <button
      data-tooltip={$_("restore_to_origin")}
      on:click={() => {
        if (img.naturalWidth <= containerW && img.naturalHeight <= containerH) {
          const result = fitSize(img, containerW, containerH, 36);
          updateImage({
            scaleX: result.ratio,
            scaleY: result.ratio,
            pointX: result.offsetX,
            pointY: result.offsetY,
          })
        } else {
          updateImage({
            scaleX: 1.0,
            scaleY: 1.0,
            pointX: 0,
            pointY: 0,
          })
        }
      }}
      class="hover:bg-gray-400 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M864 128H160c-19.2 0-32 12.8-32 32v704c0 19.2 12.8 32 32 32h704c19.2 0 32-12.8 32-32V160c0-19.2-12.8-32-32-32z m-32 704H192V192h640v640z"
        /><path
          d="M320 384v288c0 19.2 12.8 32 32 32s32-12.8 32-32V352c0-19.2-12.8-32-32-32h-32c-19.2 0-32 12.8-32 32s12.8 32 32 32zM640 384v288c0 19.2 12.8 32 32 32s32-12.8 32-32V352c0-19.2-12.8-32-32-32h-32c-19.2 0-32 12.8-32 32s12.8 32 32 32z"
        /><path d="M512 384m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" /><path
          d="M512 640m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        /></svg
      >
    </button>
    <button
      on:click={() => {
        updateImage({
          scaleX: $imageStore.scaleX * -1,
          scaleY: $imageStore.scaleY,
        })
      }}
      data-tooltip={$_("flip_h")}
      class="hover:bg-gray-400 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M483.03214242 164.38571167h57.93571516v695.22857666h-57.93571516zM627.87142966 512l231.74285867 231.74285867V280.25714133z m202.77500109 161.93032287L668.71610854 512 830.64643075 350.06967713zM164.38571167 743.74285867l231.74285867-231.74285867-231.74285867-231.74285867zM193.35356925 350.06967713L355.28389146 512 193.35356925 673.93032287z"
        /></svg
      >
    </button>
    <button
      on:click={() => {
        updateImage({
          scaleX: $imageStore.scaleX,
          scaleY: $imageStore.scaleY * -1,
        })
      }}
      data-tooltip={$_("flip_v")}
      class="hover:bg-gray-400 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 tooltip rounded-md p-1 hover:fill-white"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        ><path
          d="M164.38571167 483.03214242h695.22857666v57.93571516H164.38571167zM512 396.12857034l231.74285867-231.74285867H280.25714133z m161.93032287-202.77500109L512 355.28389146 350.06967713 193.35356925zM743.74285867 859.61428833l-231.74285867-231.74285867-231.74285867 231.74285867zM350.06967713 830.64643075L512 668.71610854 673.93032287 830.64643075z"
        /></svg
      >
    </button>
    
    <div class="relative">
      <button
        on:click={() => (isMenuShow = !isMenuShow)}
        class="hover:bg-gray-400 dark:fill-slate-200 dark:hover:fill-sky-500 dark:hover:bg-gray-400 rounded-md p-1 hover:fill-white"
      >
        <svg
          class="h-5 w-5"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          ><path
            d="M576 192a64 64 0 1 0-128 0 64 64 0 0 0 128 0z m0 320a64 64 0 1 0-128 0 64 64 0 0 0 128 0z m-64 384a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
          /></svg
        >
      </button>
      <!-- dropdown menu -->
  
      <div
        id="dropdownDivider"
        class={`z-10 ${
          isMenuShow ? "" : "hidden"
        } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul on:mouseleave={()=>setTimeout(()=>isMenuShow=false,500)}
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDividerButton"
        >
          <li>
            <a
              on:click={() => {
                EXIF.getData(img, function () {
                  const allMetaData = EXIF.getAllTags(this);
                  $imageStore.exif=allMetaData;
                  console.log(allMetaData);
                });
                isMenuShow=false;
              }}
              href="#"
              class="flex px-4 py-1 gap-1 hover:bg-gray-100 fill-violet-500 dark:hover:bg-gray-600 dark:hover:text-white dark:fill-orange-500" 
              >
              <svg class="h-5 w-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M580.27008 273.07008c0 37.66272-30.5664 68.27008-68.27008 68.27008s-68.27008-30.59712-68.27008-68.27008a68.27008 68.27008 0 0 1 136.54016 0zM546.12992 750.94016v-307.2A34.10944 34.10944 0 0 0 512 409.6H375.47008v68.27008h102.4v273.07008h-102.4V819.2h273.05984v-68.25984h-102.4z"></path></svg>
              {$_("show_exif")}</a
            >
          </li>
          <li>
            <a on:click={()=>{
              if($guiStore.locale==="en-US"){
  
                locale.set("zh-CN");
                $guiStore.locale="zh-CN";
              }else{
                locale.set("en-US");
                $guiStore.locale="en-US";
              }
            }}
              href="#"
              class="flex px-4 py-1 gap-2 dark:fill-orange-500 fill-violet-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
              <svg class="h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M511.488 0C228.864 0 0 229.376 0 512s228.864 512 511.488 512C794.624 1024 1024 794.624 1024 512S794.624 0 511.488 0z m354.816 307.2h-151.04a801.28 801.28 0 0 0-70.656-182.272A411.136 411.136 0 0 1 866.304 307.2zM512 104.448c42.496 61.44 75.776 129.536 97.792 202.752H414.208C436.224 233.984 469.504 165.888 512 104.448zM115.712 614.4C107.52 581.632 102.4 547.328 102.4 512s5.12-69.632 13.312-102.4h173.056c-4.096 33.792-7.168 67.584-7.168 102.4 0 34.816 3.072 68.608 7.168 102.4H115.712z m41.984 102.4h151.04c16.384 64 39.936 125.44 70.656 182.272A408.9344 408.9344 0 0 1 157.696 716.8z m151.04-409.6H157.696a408.9344 408.9344 0 0 1 221.696-182.272A801.28 801.28 0 0 0 308.736 307.2zM512 919.552c-42.496-61.44-75.776-129.536-97.792-202.752h195.584c-22.016 73.216-55.296 141.312-97.792 202.752zM631.808 614.4H392.192c-4.608-33.792-8.192-67.584-8.192-102.4 0-34.816 3.584-69.12 8.192-102.4h239.616c4.608 33.28 8.192 67.584 8.192 102.4 0 34.816-3.584 68.608-8.192 102.4z m12.8 284.672c30.72-56.832 54.272-118.272 70.656-182.272h151.04a411.136 411.136 0 0 1-221.696 182.272zM735.232 614.4c4.096-33.792 7.168-67.584 7.168-102.4 0-34.816-3.072-68.608-7.168-102.4h173.056c8.192 32.768 13.312 67.072 13.312 102.4s-5.12 69.632-13.312 102.4h-173.056z"></path></svg>
              {$_("change_locale")} {$guiStore.locale==="en-US"?"Chinese":"英文界面"}</a
            >
          </li>
          <li>
            <a on:click={()=>{
              showModal(Donate);
              isMenuShow=false;
            }}
              class="flex px-4 py-1 gap-1 dark:fill-orange-500 fill-violet-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
              <svg class="h-5 w-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M670.72 94.72a32 32 0 0 1 45.226667 45.226667L663.850667 192h93.44c13.568 0 25.6 8.533333 30.165333 21.248l53.333333 149.333333A32 32 0 0 1 810.666667 405.333333h-44.586667l-67.712 428.8c-8.96 62.506667-62.293333 104.533333-126.72 104.533334h-119.296c-64.469333 0-117.802667-42.026667-126.677333-104.106667L257.877333 405.333333H213.333333a32 32 0 0 1-30.165333-42.752l53.333333-149.333333A32 32 0 0 1 266.666667 192h306.688l97.322666-97.28z m30.549333 310.613333H322.645333l66.346667 419.712c4.224 29.653333 29.525333 49.621333 63.317333 49.621334h119.338667c33.792 0 59.093333-19.968 63.402667-50.090667L701.269333 405.333333z m33.493334-149.333333H289.194667l-30.464 85.333333h506.496l-30.464-85.333333z"></path></svg>
              {$_("donate")}</a
            >
          </li>
          <li>
            <a target="_blank"
              href="https://github.com/ChqJourney/ImageProc"
              class="flex px-4 py-1 gap-1 hover:bg-gray-100 fill-violet-500 dark:fill-orange-500 dark:hover:bg-gray-600 dark:hover:text-white"
              >
              <svg class="h-5 w-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 128a384 384 0 1 1 0 768 384 384 0 0 1 0-768z m0 85.333333a298.666667 298.666667 0 1 0 0 597.333334 298.666667 298.666667 0 0 0 0-597.333334z m21.333333 234.666667a21.333333 21.333333 0 0 1 21.333334 21.333333v212.992a21.333333 21.333333 0 0 1-21.333334 21.333334h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333334V469.333333a21.333333 21.333333 0 0 1 21.333334-21.333333h42.666666z m0-128a21.333333 21.333333 0 0 1 21.333334 21.333333v42.325334a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333333V341.333333a21.333333 21.333333 0 0 1 21.333334-21.333333h42.666666z"></path></svg>
              {$_("about")}</a
            >
          </li>
        </ul>
        <div class="py-1">
          <a on:click={()=>{
            clearImage();
            isMenuShow=false;
          }}
            href="#"
            class="flex items-center dark:fill-orange-500 gap-1 px-4 py-1 fill-violet-500 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
            <svg class="h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
            {$_("close_img")}</a
          >
        </div>
      </div>
    </div>
  </div>
  
  <style>
    button {
      position: relative;
    }
  
    .tooltip::before,
    .tooltip::after {
      --scale: 0;
      --arrow-size: 10px;
      --tooltip-color: rgb(156 163 175 / var(--tw-bg-opacity));
      position: absolute;
      bottom: -0.25rem;
      left: 50%;
      transform: translateX(-50%) translateY(var(--translate-y, 0))
        scale(var(--scale));
      transition: 150ms transform;
      transform-origin: top center;
    }
  
    .tooltip::before {
      --translate-y: calc(100% + var(--arrow-size));
  
      content: attr(data-tooltip);
      color: white;
      padding-top: 2px;
      padding-bottom: 2px;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 0.3rem;
      text-align: center;
      font-size: 10px;
      width: max-content;
      background: var(--tooltip-color);
    }
  
    .tooltip:hover::before,
    .tooltip:hover::after {
      --scale: 1;
    }
  
    .tooltip::after {
      --translate-y: calc(1 * var(--arrow-size));
      content: "";
      border: var(--arrow-size) solid transparent;
      border-bottom-color: var(--tooltip-color);
      transform-origin: bottom center;
    }
  </style>
  