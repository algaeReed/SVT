// src-tauri/scan_mod.rs

use tauri::Manager;

#[tauri::command]
pub async fn start_scan() {
    // Your C段扫描代码
    // ...

    // For demonstration purposes, you can print a message
    println!("Scanning C段...");
}
