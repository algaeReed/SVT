use log::LevelFilter;
use tauri::Manager;


mod model {
    pub mod log_mod;
    pub mod scan_mod; // 导入 scan_mod 模块

}
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    // 初始化日志记录器
      model::log_mod::initialize_logging("logs"); // 2MB as max_file_size
  
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet
            ,model::scan_mod::start_scan //  注册 start_scan command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
