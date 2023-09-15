<script>
  export let info
  const infoArr=[""]
</script>
<div class=" overflow-auto">
    <div>
      <h3 class="text-md font-medium leading-6 text-gray-900">Image EXIF Information</h3>
      <p class="mt-1 max-w-2xl text-xs text-gray-500">from current image</p>
    </div>
    <div class="mt-5 border-t border-gray-200">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Device</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.Model??""}</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Device manufacturer</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.Make??""}</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Software</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.Software??""}</dd>
        </div>
        {#if info?.Orientation}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Orientation</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.Orientation===1?"H":"V"}</dd>
        </div>
        {/if}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Resolution H</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.XResolution?.numerator??""} dpi</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Resolution V</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.YResolution?.numerator??""} dpi</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">X pixels</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.PixelXDimension??""} px</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Y pixels</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.PixelYDimension??""} px</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Time</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.DateTime??""}</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Original time</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.DateTimeOriginal??""}</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Save time</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.DateTimeDigitized??""}</dd>
        </div>
        {#if info?.ShutterSpeedValue?.toFixed(2)}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Shutter Speed</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.ShutterSpeedValue?.toFixed(2)??""}s</dd>
        </div>
        {/if}
        {#if info?.ExposureTime?.toFixed(4)}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Exposure time</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.ExposureTime?.toFixed(4)??""}s</dd>
        </div>
        {/if}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">F number</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">f/{info?.FNumber??""}</dd>
        </div>       
        {#if info?.ApertureValue?.toFixed(4)}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Aperture Value</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.ApertureValue?.toFixed(4)??""}</dd>
        </div>
        {/if}
        {#if info?.BrightnessValue?.toFixed(3)}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Brightness</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.BrightnessValue?.toFixed(3)??""}</dd>
        </div>
        {/if}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">ISO Speed</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.ISOSpeedRatings??""}</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">White Balance</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.WhiteBalance??""}</dd>
        </div>
        
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Flash</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.Flash??""}</dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Focus length</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.FocalLength??""}</dd>
        </div>
        {#if info?.GPSLongitude&&info.GPSLongitude.length===3}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Longitude</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.GPSLongitude[0]??""},{info?.GPSLongitude[1]??""},{info?.GPSLongitude[2]??""}</dd>
        </div>
        {/if}
        {#if info?.GPSLatitude&&info.GPSLatitude.length===3}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Latitude</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.GPSLatitude[0]??""},{info?.GPSLatitude[1]??""},{info?.GPSLatitude[2]??""}</dd>
        </div>
        {/if}
        {#if info?.GPSAltitude?.toFixed(3)}
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-xs font-medium text-gray-500">Altitude</dt>
          <dd class="mt-1 text-xs text-gray-900 sm:col-span-2 sm:mt-0">{info?.GPSAltitude?.toFixed(3)??""}m</dd>
        </div>
        {/if}
      </dl>
    </div>
  </div>