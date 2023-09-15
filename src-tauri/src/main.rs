// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::env;
use sys_locale::get_locale;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn init_file(state: tauri::State<para_state>) -> String {
    state.input_file_path.clone()
}
#[tauri::command]
fn fetch_locale(state: tauri::State<para_state>) -> String {
    state.current_locale.clone()
}
struct para_state{
    current_path:String,
    input_file_path:String,
    current_locale:String
}
fn main() {
    let mut state=para_state{current_path:String::from(""),input_file_path:String::from(""),current_locale:String::from("")};
    let locale = get_locale().unwrap_or_else(|| String::from("en-US"));
    state.current_locale=locale.clone();
    let args:Vec<String>=env::args().collect();
    // println!("{:#?}",args);

    if args.len()==2{

        state.current_path=args[0].clone();
        state.input_file_path=args[1].clone();
    }
    tauri::Builder::default()
        .plugin(tauri_plugin_context_menu::init())
        .manage(state)
        .invoke_handler(tauri::generate_handler![init_file,fetch_locale])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
