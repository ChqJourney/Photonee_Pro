import "./app.postcss";
import "./styles.css";
import App from "./App.svelte";
import { getLocaleFromNavigator, init, register } from 'svelte-i18n';
import { invoke } from "@tauri-apps/api/tauri";
import { addMessages } from 'svelte-i18n';
import en from "./i18n/en-US.json";
import zh from "./i18n/zh-CN.json";
let app;
addMessages("en-US",en);
addMessages("zh-CN",zh);
invoke("fetch_locale").then(locale=>{
  init({
    fallbackLocale:"en-US",
    initialLocale:locale
  })
  
  app = new App({
    target: document.getElementById("app"),
  });
  
})
export default app;
