import { open } from "@tauri-apps/api/dialog";
import { dragHandling } from "./file";
import { updateData } from "../store";

export const openFile=async () => {
    let imgSrc = await open({
      multiple: false,
      filters: [
        {
          name: "Image",
          extensions: ["png", "bmp", "jpeg", "jpg", "git", "webp", "svg"],
        },
      ],
    });

    if (imgSrc) {
      const result = await dragHandling(imgSrc.toString());
      updateData({
        mode: "file",
        currentIdx: 0,
        source: [...result.source]
      })
    }
  }

  export const openFolder=async () => {
    let imgSrc = await open({
      directory: true,
      multiple: false,
    });

    if (imgSrc) {
        const result = await dragHandling(imgSrc.toString());
        updateData({
          mode: result.mode,
          source: [...result.source],
          currentIdx: 0,
        })
      
    }
  }