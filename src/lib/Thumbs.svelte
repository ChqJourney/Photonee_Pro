<script>
    import { dataStore } from "../store";

</script>


<div title="press shift key to scroll images with  your mouse wheel" on:scroll={e=>console.log(e)} 
    class="h-24 thumbs_container overflow-x-auto rounded-md w-full flex justify-start items-center gap-4 py-2 px-10 bg-slate-100 dark:bg-slate-500 shadow-lg">
    {#each $dataStore.source as th,idx}
        <img loading="lazy" on:keyup={()=>{}} on:keydown={()=>{}} 
        src={th.url} on:click={()=>$dataStore.currentIdx=idx} style="height: 100%;" 
        class="hover:scale-105 hover:ring-sky-500 hover:ring-2 hover:ring-offset-4 hover:shadow-lg" alt="thumb"/>
    {/each}
</div>

<!-- <style>
    .thumbs_container::-webkit-scrollbar {
          width: 0.5rem;
          height: 0.5rem;
      }
      .thumbs_container::-webkit-scrollbar-thumb {
          border-radius: 0.5rem;
          background-color: #0004;
          visibility: hidden;
      }
  
      .thumbs_container:hover::-webkit-scrollbar-thumb {
          visibility: visible;
      }
  </style> -->