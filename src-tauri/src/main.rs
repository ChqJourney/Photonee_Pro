// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::env;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn init_file(state: tauri::State<para_state>) -> String {
    state.input_file_path.clone()
}
struct para_state{
    current_path:String,
    input_file_path:String
}
fn main() {
    let args:Vec<String>=env::args().collect();
    // println!("{:#?}",args);
    let mut state=para_state{current_path:String::from(""),input_file_path:String::from("")};

    if args.len()==2{

        state.current_path=args[0].clone();
        state.input_file_path=args[1].clone();
    }
    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![init_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
