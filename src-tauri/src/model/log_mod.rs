// src-tauri/logger.rs

use log::{Record, Level, Metadata};
use std::fs::File;
use std::io::{Write, Seek, SeekFrom};
use std::sync::Mutex;
use std::path::Path;
use chrono::{Local, Timelike, Datelike};
use std::cmp;

pub struct FileLogger {
    file: Mutex<File>,
    max_log_size: usize,
}

impl FileLogger {
    pub fn new(folder_path: &str, max_log_size: usize) -> Result<Self, std::io::Error> {
        let now = Local::now();
        let filename = format!(
            "{}/app_{:04}{:02}{:02}_{:02}{:02}{:02}.log",
            folder_path,
            now.year(),
            now.month(),
            now.day(),
            now.hour(),
            now.minute(),
            now.second()
        );

        let file = File::create(&filename)?;
        Ok(Self {
            file: Mutex::new(file),
            max_log_size,
        })
    }
}

impl log::Log for FileLogger {
    fn enabled(&self, metadata: &Metadata) -> bool {
        metadata.level() <= Level::Info
    }

    fn log(&self, record: &Record) {
        if self.enabled(record.metadata()) {
            let log_line = format!("{} - {}\n", record.level(), record.args());

            let mut file = self.file.lock().expect("锁定日志文件时出错");

            // Check log size and roll over if needed
            if let Ok(file_size) = file.metadata().map(|meta| meta.len() as usize) {
                if file_size + log_line.len() > self.max_log_size {
                    if let Err(err) = file.seek(SeekFrom::Start(0)) {
                        eprintln!("Error rolling over log: {}", err);
                        return;
                    }
                    if let Err(err) = file.set_len(0) {
                        eprintln!("Error truncating log: {}", err);
                        return;
                    }
                }
            }

            if let Err(err) = file.write_all(log_line.as_bytes()) {
                eprintln!("Error writing log: {}", err);
            }
        }
    }

    fn flush(&self) {
        let mut file = self.file.lock().expect("锁定日志文件时出错");
        if let Err(err) = file.flush() {
            eprintln!("Error flushing log: {}", err);
        }
    }
}

pub fn initialize_logging(folder_name: &str) {
    // Create the logs directory if it doesn't exist
    if !Path::new(folder_name).exists() {
        std::fs::create_dir(folder_name).expect("无法创建日志文件夹");
    }

    let max_log_size = 2 * 1024 * 1024; // 2MB
    let file_logger = FileLogger::new(folder_name, max_log_size).expect("无法创建日志文件");
    log::set_boxed_logger(Box::new(file_logger)).expect("无法设置自定义日志记录器");
    log::set_max_level(log::LevelFilter::Info);
}
