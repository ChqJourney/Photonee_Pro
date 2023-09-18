<script>
  import { clearImage, closeModal, guiStore } from "./store";
  import { _ } from "svelte-i18n";
  import Modal from "./lib/Modal.svelte";
  import Viewer from "./pages/Viewer.svelte";
  import { onMount } from "svelte";
  import { register } from "@tauri-apps/api/globalShortcut";
  import { openFile, openFolder } from "./funcs/biz";
    import Processor from "./pages/Processor.svelte";
  let osh, osw;
  // const pages=[Viewer,Processor]
  let currentPage=Viewer;
  let compProps = { osh: osh, osw: osw };

  onMount(async () => {
    await register("CommandOrControl+O", async () => await openFile());
    await register("CommandOrControl+Shift+O", async () => await openFolder());
    await register("CommandOrControl+Shift+C", () => clearImage());
  });
</script>

<svelte:window class="" bind:innerHeight={osh} bind:innerWidth={osw} />
<Modal
  width={"w-2/3"}
  on:negitive={() => closeModal()}
  isOpen={$guiStore.modalShow}
  component={$guiStore.modalComponent}
/>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:contextmenu={(e) => e.preventDefault()}
  style="border-radius: 8px;"
  class={`relative flex flex-col items-center justify-center h-screen py-10 px-8 bg-gray-50 dark:bg-gray-600 `}
>
  <svelte:component on:switch_page={e=>{currentPage=e.detail.page}} this={currentPage} {...compProps} />
  <!-- <Viewer {osh} {osw} /> -->
</div>
