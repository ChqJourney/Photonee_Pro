<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
  export let isOpen;
  export let component;
  export let data = {};
  export let width = "w-full";
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-100 bg-gray-500 bg-opacity-75 transition-opacity"
  />
{/if}
{#if isOpen}
  <div
    transition:fade={{ delay: 0, duration: 100 }}
    class={`fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2  z-50 rounded-lg bg-white dark:bg-gray-500 px-4 pt-5 pb-4 text-left shadow-xl ${width}`}
  >
    <div class={`relative h-[360px] py-6 px-4`}>
      <button
        class="absolute z-100 top-0 right-0 dark:fill-gray-100 fill-sky-700 hover:bg-gray-200 text-gray-500 dark:text-white hover:text-blue-gray-600"
        on:click={() => dispatch("negitive")}
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          ><path
            d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
          /></svg
        >
      </button>
      <svelte:component this={component} {...data} />
    </div>

  </div>
{/if}
