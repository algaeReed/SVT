// src-tauri/scan_mod.rs

use std::net::SocketAddr;
use tokio::net::TcpStream;
use tokio::time::Duration;

use tauri::Manager;
use tokio::sync::mpsc;

#[tauri::command]
pub async fn start_scan(target: String) -> Result<Vec<String>, String> {
    println!("开始扫描目标: {}", target);
    log::info!("Scanning IP: {}", target);

    let c_segment = extract_c_segment(&target);
    if c_segment.is_none() {
        return Err(String::from("无法解析 C 段"));
    }
    let c_segment = c_segment.unwrap();

    let (tx, mut rx) = mpsc::channel(32); // 创建连接池
    for i in 1..255 {
        let ip = format!("{}.{}", c_segment, i);
        let tx = tx.clone(); // 每个任务共享连接池

        tokio::spawn(async move {
            let result = scan_ip(&ip).await;
            tx.send(result).await.expect("发送结果失败");
        });
    }

    drop(tx); // 所有任务完成后关闭连接池

    let mut scan_results = Vec::new();
    while let Some(result) = rx.recv().await {
        scan_results.push(result);
    }

    println!("Scan results:\n{}", scan_results.join("\n"));

    Ok(scan_results)
}

async fn scan_ip(ip: &str) -> String {
    let port_to_scan = 80;
    let addr = format!("{}:{}", ip, port_to_scan);

    match tokio::time::timeout(Duration::from_secs(1), TcpStream::connect(addr)).await {
        Ok(_) => format!("IP {} 的端口 {} 开放", ip, port_to_scan),
        Err(_) => format!("IP {} 的端口 {} 未开放", ip, port_to_scan),
    }
}

fn extract_c_segment(ip: &str) -> Option<String> {
    let parts: Vec<&str> = ip.split('.').collect();
    if parts.len() == 4 {
        Some(format!("{}.{}.{}", parts[0], parts[1], parts[2]))
    } else {
        None
    }
}
