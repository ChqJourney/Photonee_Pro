<script>
    import { _ } from "svelte-i18n";
    import wechat from "./svgs/wechat.jpg";
    import alipay from "./svgs/alipay.jpg";
</script>
<div class="h-full text-sky-500 dark:text-white text-center">
    {$_("please_donate")}
    <div class="flex gap-2 justify-center mt-4">
        <img src={wechat} width="180" alt="wechat qr code"/>
        <img src={alipay} width="180" alt="alipay qr code"/>
    </div>
</div>