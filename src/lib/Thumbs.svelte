<script>
    import { dataStore } from "../store";

</script>


<div class="h-24 overflow-x-auto rounded-lg w-full flex justify-center items-center gap-4 py-2 px-2 bg-slate-200">
    {#each $dataStore.source as th,idx}
        <img on:keydown={()=>{}} src={th.url} on:click={()=>$dataStore.currentIdx=idx} style="height: 100%;" class="hover:shadow-lg hover:scale-105 hover:border border-red-600" alt="thumb"/>
    {/each}
</div>