// 一些贯穿始终的变量
var editor, statusline, saveButton, idletimer;
window.onload = function() {
  // 第一次载入时，初始化本地存储
  if(localStorage.note == null) localStorage.note = "";
  if(localStorage.lastModified == null) localStorage.lastModified = 0;
  if(localStorage.lastSaved == null) localStorage.lastSaved = 0;

  // 查找编辑器UI元素，并初始化全局变量
  editor = document.getElementById("editor");
  statusline = document.getElementById("statusline");
  saveButton = document.getElementById("savebutton");

  editor.value = localStorage.note;
  editor.disabled = true;    //同步前禁止编辑

  // 一旦文本区有内容输入
  editor.addEventListener("input", function(e) {
    localStorage.note = editor.value;
    localStorage.lastModified = Date.now();

    // 重置闲置计时器
    if (idletimer) clearTimeout(idletimer);
    idletimer = setTimeout(save, 5000);

    // 启动保存按钮
    saveButton.disabled = false;
  }, false);

  // 每次载入应用程序时，尝试同步服务器
  sync();

  // 离开页面前保存数据到服务器
  window.onbeforeunload = function() {
    if(localStorage.lastModified > localStorage.lastSaved)
      save();
  };

  // 离线时，通知用户
  window.onoffline = function() {
    status("Offline");
  };

  // 再次返回在线状态时，进行同步
  window.ononline = function() {sync();};

  // 当有新版本应用的时候，提醒用户
  // 这里我们也可以采用location.reload()方法来强制重新载入应用
  window.applicationCache.onupdateready = function() {
    status("A new version of this application is availabel. Reload to run it");
  };

  // 当没有新版本的时候也通知用户
  window.applicationCache.onnoupdate = function() {
    status("You are running the latest version of the application");
  };

  // 用于在状态栏中显示状态消息的一个函数
  function status(msg) {
    statusline.innerHTML = msg;
  }

  // 每当笔记内容更新后，如果用户停止编辑超过5分钟
  // 就会自动将笔记文本上传到服务器
  function save() {
    if (idletimer) clearTimeout(idletimer);
    idletimer = null;
    if(navigator.online) {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", "note");
      xhr.send(editor.value);
      xhr.onload = function() {
        localStorage.lastSaved = Data.now();
        savebutton.disabled = true;
      };
    }
  }

  // 检查服务端是否有新版本的笔记，
  // 如果没有，则将当前版本保存到服务器端
  function sync() {
    if(navigator.onLine) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/note");
      xhr.send();
      xhr.onload = function() {
        var remoteModTime = 0;
        if(xhr.status == 200) {
          remoteModTime = xhr.getResponseHeader("Last-Modified");
          remoteModTime = new Date(remoteModTime).getTime();
        }
        if (remoteModTime > localStorage.lastModified) {
          status("Newer note found on server");
          var useit = confirm("a newer version");
          var now = Date.now();
          if(useit) {
            editor.value = localStorage.note = xhr.responseText();
            localStorage.lastSaved = now;
            status("Newest version downloaded.");
          } else {
            status("Ignoring newer version of the note.");
          }
          localStorage.lastModified = now;
        } else {
          status("you are editing newer version of the note");
        }
        if(localStorage.lastModified > localStorage.lastSaved) {
          save();
        }

        editor.disabled = false;
        editor.focus();
      };
    } else {
      status("Can't sync while offline");
      editor.disabled = false;
      editor.focus();
    }
  }
};
