
<script>
      import { appWindow } from '@tauri-apps/api/window';
      import { hide,show } from '@tauri-apps/api/app';
      import { type } from '@tauri-apps/api/os';
    import { onMount } from 'svelte';
    import { guiStore } from '../store';
      let toMax,fromMax;
      onMount(async()=>{
        fromMax.style.display="none";
        toMax.style.display="";
        
      })
</script>
<div class="flex gap-2">
  <div class="w-6"></div>
    <button on:click={async()=>{
      if($guiStore.os==="Darwin"){
        await hide();
      }else{
        await appWindow.minimize();
      }
      }} class="w-6 h-6 rounded-md items-center flex hover:bg-slate-400 dark:fill-slate-200 hover:fill-white justify-center" id="titlebar-minimize">
      <svg class="h-3 w-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="200" height="200"><path d="M960 544H64a32 32 0 1 1 0-64h896a32 32 0 1 1 0 64"></path></svg>
    </button>
    {#if $guiStore.os!=="Darwin"}
    <button on:click={async()=>{
      let state=await appWindow.isMaximized();
      if(state){
        fromMax.style.display="none";
        toMax.style.display="";
      }else{
        fromMax.style.display="";
        toMax.style.display="none";
      }
      if($guiStore.os==="Darwin"){
        await show();
      }else{
        await appWindow.toggleMaximize();
      }

    }} class="reletive rounded-md dark:fill-slate-200 flex items-center justify-center hover:bg-slate-400 hover:fill-white w-6 h-6" id="titlebar-maximize">
      <svg id="toMax" bind:this={toMax} class="h-4 w-4 " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="200" height="200"><path d="M233.301333 128A105.301333 105.301333 0 0 0 128 233.301333v557.397334A105.301333 105.301333 0 0 0 233.301333 896h557.397334A105.301333 105.301333 0 0 0 896 790.698667V233.301333A105.301333 105.301333 0 0 0 790.698667 128H233.301333z m-18.602666 105.301333c0-10.24 8.32-18.602667 18.602666-18.602666h557.397334c10.24 0 18.602667 8.32 18.602666 18.602666v557.397334c0 10.24-8.32 18.602667-18.602666 18.602666H233.301333a18.56 18.56 0 0 1-18.602666-18.602666V233.301333z" ></path></svg>
      <svg id="fromMax" class=" h-4 w-4" bind:this={fromMax} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="200" height="200"><path d="M794.432 983.552H51.2a25.6 25.6 0 0 1-25.6-25.6V214.784a25.6 25.6 0 0 1 25.6-25.6h152.768V66.112a25.6 25.6 0 0 1 25.6-25.6H972.8a25.6 25.6 0 0 1 25.6 25.6v743.232a25.6 25.6 0 0 1-25.6 25.6h-152.768v123.008a25.6 25.6 0 0 1-25.6 25.6z m-717.632-51.2h692.032V240.384H76.8v691.968z m743.232-148.672H947.2V91.648H255.168v97.472h539.264a25.6 25.6 0 0 1 25.6 25.6v568.96z" ></path></svg>
    </button>
    {/if}
    <button class="w-6 h-6 rounded-md dark:fill-slate-200 items-center hover:bg-slate-400 hover:fill-white flex justify-center" on:click={async()=>await appWindow.close()} id="titlebar-close">
      <svg class="h-4 w-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
    </button>
  </div>