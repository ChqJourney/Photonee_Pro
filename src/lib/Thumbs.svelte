<script>
    import { dataStore } from "../store";

</script>


<div title="press shift key to scroll images with  your mouse wheel" on:scroll={e=>console.log(e)} class="h-24 overflow-x-auto rounded-lg w-full flex justify-start items-center gap-4 py-2 px-10 bg-slate-100">
    {#each $dataStore.source as th,idx}
        <img loading="lazy" on:keyup={()=>{}} on:keydown={()=>{}} 
        src={th.url} on:click={()=>$dataStore.currentIdx=idx} style="height: 100%;" 
        class="hover:scale-105 hover:ring-sky-500 hover:ring-2 hover:ring-offset-2 hover:shadow-lg" alt="thumb"/>
    {/each}
</div>