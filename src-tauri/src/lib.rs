use std::path::Path;
use serde::Serialize;
use tauri::Manager;

#[derive(Serialize)]
struct EditorInfo {
    name: String,
    path: String,
    icon: String, // Just a placeholder for now, or finding generic icons
}

#[tauri::command]
fn detect_editors() -> Vec<EditorInfo> {
    let mut editors = Vec::new();
    
    #[cfg(target_os = "macos")]
    let candidates = vec![
        ("Visual Studio Code", "/Applications/Visual Studio Code.app"),
        ("Cursor", "/Applications/Cursor.app"),
        ("Windsurf", "/Applications/Windsurf.app"),
        ("Sublime Text", "/Applications/Sublime Text.app"),
        ("IntelliJ IDEA", "/Applications/IntelliJ IDEA.app"),
        ("Atom", "/Applications/Atom.app"),
        ("Fleet", "/Applications/Fleet.app"),
        ("Zed", "/Applications/Zed.app"),
        ("Xcode", "/Applications/Xcode.app"),
        ("Android Studio", "/Applications/Android Studio.app"),
        ("WebStorm", "/Applications/WebStorm.app"),
        ("PyCharm", "/Applications/PyCharm.app"),
        ("GoLand", "/Applications/GoLand.app"),
        ("Nova", "/Applications/Nova.app"),
        ("BBEdit", "/Applications/BBEdit.app"),
        ("TextMate", "/Applications/TextMate.app"),
        ("MacVim", "/Applications/MacVim.app"),
        ("Rider", "/Applications/Rider.app"),
        ("CLion", "/Applications/CLion.app"),
        ("PhpStorm", "/Applications/PhpStorm.app"),
        ("RubyMine", "/Applications/RubyMine.app"),
        ("DataGrip", "/Applications/DataGrip.app"),
        ("CotEditor", "/Applications/CotEditor.app"),
        ("Antigravity", "/Applications/Antigravity.app"),
    ];

    #[cfg(target_os = "windows")]
    let candidates = vec![
        ("Visual Studio Code", r"C:\Program Files\Microsoft VS Code\Code.exe"),
        ("Visual Studio Code (User)", r"C:\Users\%USERNAME%\AppData\Local\Programs\Microsoft VS Code\Code.exe"),
        ("Cursor", r"C:\Users\%USERNAME%\AppData\Local\Programs\cursor\Cursor.exe"),
        ("Windsurf", r"C:\Users\%USERNAME%\AppData\Local\Programs\Windsurf\Windsurf.exe"),
        ("Sublime Text", r"C:\Program Files\Sublime Text 3\sublime_text.exe"),
        ("Notepad++", r"C:\Program Files\Notepad++\notepad++.exe"),
        ("Atom", r"C:\Users\%USERNAME%\AppData\Local\atom\atom.exe"),
        ("Fleet", r"C:\Users\%USERNAME%\AppData\Local\Programs\Fleet\Fleet.exe"),
        ("Android Studio", r"C:\Program Files\Android\Android Studio\bin\studio64.exe"),
        ("IntelliJ IDEA Global", r"C:\Program Files\JetBrains\IntelliJ IDEA\bin\idea64.exe"),
        ("PyCharm Global", r"C:\Program Files\JetBrains\PyCharm\bin\pycharm64.exe"),
        ("WebStorm Global", r"C:\Program Files\JetBrains\WebStorm\bin\webstorm64.exe"),
        ("GoLand Global", r"C:\Program Files\JetBrains\GoLand\bin\goland64.exe"),
        ("Rider Global", r"C:\Program Files\JetBrains\JetBrains Rider\bin\rider64.exe"),
        ("CLion Global", r"C:\Program Files\JetBrains\CLion\bin\clion64.exe"),
        ("Antigravity", r"C:\Program Files\Antigravity\Antigravity.exe"),
    ];

    #[cfg(target_os = "linux")]
    let candidates = vec![
        ("Visual Studio Code", "/usr/bin/code"),
        ("Visual Studio Code (Snap)", "/snap/bin/code"),
        ("Cursor", "/usr/bin/cursor"), // AppImage often linked here or alias
        ("Windsurf", "/usr/bin/windsurf"),
        ("Sublime Text", "/usr/bin/subl"),
        ("Atom", "/usr/bin/atom"),
        ("Vim", "/usr/bin/vim"),
        ("Nano", "/usr/bin/nano"),
        ("Gedit", "/usr/bin/gedit"),
        ("Fleet", "/usr/bin/fleet"),
        ("Zed", "/usr/bin/zed"),
        ("Android Studio", "/usr/bin/android-studio"),
        ("Android Studio (Snap)", "/snap/bin/android-studio"),
        ("IntelliJ IDEA", "/usr/bin/idea"),
        ("IntelliJ IDEA (Snap)", "/snap/bin/idea"),
        ("PyCharm", "/usr/bin/pycharm-community"),
        ("PyCharm (Snap)", "/snap/bin/pycharm-community"),
        ("WebStorm", "/usr/bin/webstorm"),
        ("WebStorm (Snap)", "/snap/bin/webstorm"),
        ("GoLand", "/usr/bin/goland"),
        ("GoLand (Snap)", "/snap/bin/goland"),
        ("Rider", "/usr/bin/rider"),
        ("Rider (Snap)", "/snap/bin/rider"),
        ("CLion", "/usr/bin/clion"),
        ("CLion (Snap)", "/snap/bin/clion"),
        ("Antigravity", "/usr/bin/antigravity"),
    ];

    for (name, path_str) in candidates {
        // Expand environment variables for Windows
        #[cfg(target_os = "windows")]
        let path_str_expanded = path_str.replace("%USERNAME%", &std::env::var("USERNAME").unwrap_or_default());
        #[cfg(not(target_os = "windows"))]
        let path_str_expanded = path_str.to_string();

        if Path::new(&path_str_expanded).exists() {
             editors.push(EditorInfo {
                name: name.to_string(),
                path: path_str_expanded,
                icon: "code".to_string(),
            });
        }
    }
    
    editors
}

#[derive(Serialize)]
struct FileInfo {
    name: String,
    is_dir: bool,
    size: u64,
    modified: u64,
}

#[tauri::command]
fn list_local_files(path: String) -> Result<Vec<FileInfo>, String> {
    use std::fs;
    use std::time::UNIX_EPOCH;

    let paths = fs::read_dir(&path).map_err(|e| e.to_string())?;
    let mut files = Vec::new();

    for entry in paths {
        if let Ok(entry) = entry {
            let metadata = entry.metadata().map_err(|e| e.to_string())?;
            let name = entry.file_name().to_string_lossy().to_string();
            let is_dir = metadata.is_dir();
            let size = metadata.len();
            let modified = metadata.modified()
                .unwrap_or(UNIX_EPOCH)
                .duration_since(UNIX_EPOCH)
                .unwrap_or_default()
                .as_millis() as u64;

            files.push(FileInfo {
                name,
                is_dir,
                size,
                modified,
            });
        }
    }

    // Sort: Directories first, then files (alphabetical)
    files.sort_by(|a, b| {
        if a.is_dir == b.is_dir {
            a.name.cmp(&b.name)
        } else {
            b.is_dir.cmp(&a.is_dir)
        }
    });

    Ok(files)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![detect_editors, list_local_files])
    .setup(|app| {
      #[cfg(desktop)]
      app.handle().plugin(tauri_plugin_dialog::init())?;

      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
