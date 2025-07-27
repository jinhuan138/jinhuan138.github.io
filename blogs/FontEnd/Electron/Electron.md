## Electron
![winter](../../../.vuepress/public/img/winter.gif)

## 开始

+ 创建electron应用：`npx create-electron-app@latest my-app`
+ `electron-vue`创建`vue2.x`应用：`vue init simulatedgreg/electron-vue app`
+ `vue`项目变为`electron`项目:[vue add electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/)

---

## 主进程

```ts
//一个项目就一个主进程（main process），用于管理其他渲染进程（页面/窗口）和创建系统托盘、菜单等
import { app,BrowserWindow,globalShortcut } from 'electron'
import installExtension from 'electron-devtools-installer';
let win: any,devTools = true
app.on('ready', () => {//app启动时创建窗口
    createWindow()
})
//安装vue扩展程序
app.whenReady().then(() => {
  installExtension({
    id: 'ljjemllljcmogpfapbkkighbhhppjdbg',
    electron: '>=1.2.1'
  })
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});
async function createWindow() {
    //创建主窗口
    win = new BrowserWindow({//首选项设置
        width: 1100,
        height: 800,
        //frame: false,//无框窗口
        icon: join(__dirname,'../public/icon/icon.jpg'),//win.setIcon(join(__dirname, '../public/icon/newIcon.jpg'))//如果要更新图标
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        }
    })
    win.loadURL('http://localhost:8080')//加载页面process.env.WEBPACK_DEV_SERVER_URL
    //win.loadFile('../public/index.html')与auf类似也可以加载静态页面
    win.title='CloudMusic'//覆盖网页原生标题
    win.webContents.openDevTools()//打开开发者模式
    tray = creatTray(win)//创建系统托盘
    globalShortcut.register('f5', () => {//刷新
        win.reload()//BrowserWindow.getFocusedWindow()?.reload()
    })
    globalShortcut.register('Ctrl+f5', () => {//强制刷新
        win.webContents.reloadIgnoringCache()
    })
    //window不允许将f12设置为`全局`热键,通过菜单快捷键(仅程序被聚焦时触发)或渲染进程注册
    globalShortcut.register('F10', () => {//开发者工具
        if (devTools) win.closeDevTools()
        else win.openDevTools()
        devTools = !devTools
    })
}
```

---

## 生命周期

app控制应用程序的事件生命周期。  

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9fc1345d3f34b80886a00325b804b13~tplv-k3u1fbpfcp-watermark.awebp?" alt="lifecycle" style="zoom:50%;" />

---

## 使用node模块

```typescript
//main process
const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,//浏览器允许使用node模块
        contextIsolation:false,//解决require is not defined
        webSecurity:false,//跨域
    }
```

```typescript
//使用electron-builder配置
//vue.config.js
module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true
      }
    }
  }
```

---

## menu

```typescript
//menu.js 主进程
const { Menu ,BrowserWindow} = require('electron')
const template = [
    {
        label: "菜单1",
        submenu: [
            {
                label: '子菜单1',
                accelerator:'Ctrl+B',//快捷键
                click: () => {
                    console.log("...")
                    let win = new BrowserWindow({
                        width: 800,
                        height: 600,
                    })
                    win.loadURL('https://www.electronjs.org/blog/electron-14-0')
                    win.on('close', () => win = null)
                }

            },
            { label: '子菜单2' }
        ],
    },
    {
        label: "菜单2",
        submenu: [
            { label: '子菜单1' },
            { label: '子菜单2' }
        ],
    }
]
const menu = Menu.buildFromTemplate(template)//从模板中创建菜单
Menu.setApplicationMenu(menu)//设置为应用程序菜单
//main process
async function createWindow() {
    require('../src/menu.js')//主进程引入
}
```

---

## 右键菜单

`method1`

```typescript
// main process
const contextMenu = require('electron-context-menu');
contextMenu({
    prepend: (defaultActions: any, parameters: any, browserWindow: any) => [
        { label: '复制',
         accelerator:'Ctrl+C',
         click: () => { console.log("复制") }},
        {label: '粘贴'}
    ]
});
```

`method2`

```vue
<!-- 渲染进程发送所需的信息到主过程，并让主过程代替渲染器显示菜单。-->
<div class="main" @click.right="showMenu"></div>
<script>
    showMenu(){
        console.log('showMenu')
        ipcRenderer.send("show-context-menu");
    }
</script>
```

```typescript
// main process
import {BrowserWindow,Menu} from 'electron'
ipcMain.on('show-context-menu', (event) => {
    const template = [
        { label: 'Menu Item 1' },
        { label: 'Menu Item 2' }
    ]
    const menu = Menu.buildFromTemplate(template)
    menu.popup(BrowserWindow.fromWebContents(event.sender))//显示menu
})
```

---

## 系统托盘

```typescript
//main proces
import { Tray, Menu ,app} from 'electron'
let tray =null//定义全局变量，否则托盘会被会被垃圾回收机制回收
function creatTray(win:any) {
  tray = new Tray(path.join(__dirname, '../public/icon/Bee.jpg'))//托盘图标
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')//悬停内容
  tray.setContextMenu(contextMenu)//上下文菜单
  tray.on('click', () => {
    win.show()//win.hide()后可由托盘显示主窗口
  })
}
```

---

## [任务栏](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions)

+ 设置缩略图工具栏

  ```js
  //缩略图工具栏中的按钮数量不应超过 7 个,调用空数组清零
  win.setThumbarButtons([
      {
          tooltip: '上一首',//悬停文字
          icon: join(__dirname, '../public/icon/up.jpg'),
          click() { console.log('一路向北') }
      }, {
          tooltip: '下一首',
          icon: join(__dirname, '../public/icon/down.jpg'),
          click() { console.log('不能说的秘密') }
      }
  ])
  ```

+ 任务栏图标叠加

  ```js
  win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')//可用于未读消息数
  ```

+ 角标

  window

  ```js
  //window不提供bage,使用electron-windows-badge
  import Badge from 'electron-windows-badge'
  const badge = new Badge(win, {
      fontColor: 'white',
      Color: 'red',
  });
  ```

  ```js
  //改变消息数必须在渲染进程win中
  import { ipcRenderer } from "electron";
  ipcRenderer.sendSync('update-badge', 1);//null取消角标
  ```

  mac

  ```js
  // 方式一
  app.badgeCount = 1
  // 方式二
  app.dock.setBadge('1')
  ```

+ 弹出列表

  ```js
  //任务栏图标右键打开
  //设置任务列表
  app.setUserTasks([
      {
          program: 'C:\\Program Files (x86)\\Netease\\CloudMusic\\cloudmusic.exe',
          arguments: '',//给 program 这个程序执行时的命令行参数
          iconPath: '',//程序有icon可以不设置
          iconIndex: 0,
          title: '网易云音乐',
          description: 'CloudMusic'
      },
      {
          program: 'C:\\Program Files (x86)\\ChromeCore\\ChromeCoreLauncher.exe',
          arguments: '',
          iconPath: '',
          iconIndex: 0,
          title: '谷歌浏览器',
          description: 'ChromeCoreLauncher'
      }
  ])
  ```

  ```js
  //自定义列表
  app.setJumpList([
    {
      type: 'custom',
      name: 'Recent Projects',
      items: [
        { type: 'file', path: 'C:\\Projects\\project1.proj' },
        { type: 'file', path: 'C:\\Projects\\project2.proj' }
      ]
    },
    { // has a name so `type` is assumed to be "custom"
      name: 'Tools',
      items: [
        {
          type: 'task',
          title: 'Tool A',
          program: process.execPath,
          args: '--run-tool-a',
          icon: process.execPath,
          iconIndex: 0,
          description: 'Runs Tool A'
        },
        {
          type: 'task',
          title: 'Tool B',
          program: process.execPath,
          args: '--run-tool-b',
          icon: process.execPath,
          iconIndex: 0,
          description: 'Runs Tool B'
        }
      ]
    },
    { type: 'frequent' },
    { // has no name and no type so `type` is assumed to be "tasks"
      items: [
        {
          type: 'task',
          title: 'New Project',
          program: process.execPath,
          args: '--new-project',
          description: 'Create a new project.'
        },
        { type: 'separator' },
        {
          type: 'task',
          title: 'Recover Project',
          program: process.execPath,
          args: '--recover-project',
          description: 'Recover Project'
        }
      ]
    }
  ])
  ```

+ 进度条

  ```js
  //Windows上，每个窗口都可以有自己的进度条
  let c = 0
  setInterval(() => {
      win.setProgressBar(c/100)// 0 和 1之间显示进度，小于1删除，大于1表示不确定进度的活跃进度条
      if (c < 50) c += 5
  })
  ```

+ 任务栏闪烁

  ```js
  //需要调用win.flashFramework(false)关闭
  win.flashFrame(true)
  ```

---

## 快捷键

+ 全局快捷键

  ```typescript
  import { globalShortcut} from 'electron'
  app.on('ready', async () => {
      globalShortcut.register('Ctrl+E', () => {//注册
          console.log('Electron loves global shortcuts!')
      })
      console.log(globalShortcut.isRegistered("Ctrl+E"))//判断快捷键是否注册
  }
         app.on('will-quit', async () => {
      globalShortcut.unregisterAll()//取消快捷键
  })}
  ```

---

## remote

```typescript
//main process packjson main指向的文件
require('@electron/remote/main').initialize()//需要在主进程初始化@electron/remote模块
const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {enableRemoteModule:true}//使用remote
})
```

```vue
<!--renderer process -->
<el-button @click="openNewbrowser">打开新页面</el-button>
<script lang="ts">
    const { BrowserWindow } = require('@electron/remote')
    openNewbrowser() {
        let win = new BrowserWindow({
            width: 500,
            height: 500,
        });
        win.loadURL("https://www.bilibili.com/video/BV177411s7Lt?p=5");
        //win.loadFile("index.html");
        win.on('close',()=>{
            win=null
        })
    },
</script>
```

---

## 进程通信

+ `ipc`模块

  ```typescript
  //渲染进程发送消息
  const { ipcRenderer } = require("electron");
  ipcRenderer.on('main-reply', function (event, reply) { // 接收到Main进程返回的消息
    console.log('主进程的回复:'+reply)
  })
  ipcRenderer.send("play", name);//ipcRenderer.sendSync发送同步
  ```

  ```typescript
  //主进程监听
  const { ipcMain } = require("electron");
  ipcMain.on('play', (event, name) => {
      event.sender.send('main-reply', 'pong')//主进程没有向渲染进程发送的方法
      tray.setToolTip(name)//设置托盘悬浮文字
  })
  ```
  
+ webContents.send

  ```ts
  //主进程发送消息
  setTimeout(() => {
      win.webContents.send('mainMsg', '我是主线程发送的消息')
  }, 3000)
  ```

  ```ts
  //渲染进行监听
  ipcRenderer.on('mainMsg',(e,data)=>{//ipcRenderer.once监听一次
      console.log(data);
  })
  ```

+ ipcRenderer.sendTo

  ```ts
  //渲染进程向渲染进程发送消息
  ipcRenderer.sendTo('webContentsId', 'channel', ...args)
  ```

---

## dialog

+ 消息框

  ```typescript
  //需要有一个主窗口
  mainWindow.on('close', (e) => {
      e.preventDefault()
      dialog.showMessageBox(mainWindow, {
        buttons: ["取消", "退出"],
        type: 'warning',
        title: '关闭'
      }).then(res => {
        const { response } = res
        if (response == 1) app.exit()//quit为点击`x`,会进入循环
      })
    });
  ```

+ 打开文件

  ```vue
  <el-button @click="openFile">打开文件</el-button>
  <script lang="ts">
      openFile() {
          dialog.showOpenDialog({
              title:"选择文件",
              buttonLabel:"选择图片",
              filters:[{name:"img",extensions:['jpg']}]
          }).then((res:any)=>{
              console.log(res.filePaths[0])
          })
      },
  </script>
  ```
  
+ 保存文件

  ```vue
  <el-button @click="saveFile">保存文件</el-button>
  <script lang="ts">
      saveFile() {
          dialog.showSaveDialog({
              title:"保存文件",
              buttonLabel:"保存",
          }).then((res:any)=>{
              console.log(res.filePath)//C:\Users\ling\Desktop\abc.txt
          })
      },
  </script>
  ```

---

## shell

+ 默认浏览器打开

  ```vue
  <router-link @click="openInbrowser($event)" :to="'https://www.baidu.com'">在浏览器打开</router-link>
  <script lang="ts">
      openInbrowser(e:any) {
          e.preventDefault();
          const href=e.target.getAttribute("to")
          shell.openExternal(href)
      },
  </script>
  ```
  
+ 打开文件选中它

  ```js
  shell.showItemInFolder(join(process.cwd(), "./public/icon/icon.jpg"));
  ```

+ other

  ```js
  shell.moveItemToTrash(fullPath)//删除路径文件
  shell.beep()//播放 beep 声音
  shell.openPath(fullPath)//打开文件
  ```

---

## `BrowserView`

```ts
//main process
import { app, protocol, BrowserWindow, dialog,BrowserView } from 'electron'
async function createWindow() {
    const view=new BrowserView()
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.setBrowserView(view)//主窗口挂载BrowserWindow,不是 DOM 的一部分
    view.setBounds({x:0,y:120,height:300,width:300})
    view.webContents.loadURL('https://www.baidu.com')//设置属性,window.open为打开子窗口
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
}
```

---

## 剪切板

```vue
<el-tag ref="tag">Tag 1</el-tag>
<el-button @click="copy">复制</el-button>
<script lang="ts">
    //https://cloud.tencent.com/developer/section/1116102
    const { clipboard } = require("electron");//可以在渲染进程使用
    copy() {
        const txt = this.$refs["tag"].$el.innerText;
        clipboard.writeText(txt,'selection');//'selection' | 'clipboard'
        new window.Notification("消息提示", { body: "复制成功" });
        console.log(clipboard.readText('selection'));//读取剪切板
    },
</script>
```

---

## 资源下载

+ [electron-dl](https://www.npmjs.com/package/electron-dl)

  ```ts
  import { download }  from "electron-dl"
  import { join } from 'path'
  download(win,'http://localhost:3000/files',{//需要一个窗口，使用窗口的下载能力
      directory: join(__dirname,'./public'), //必须是绝对路径
      onProgress:({percent,transferredBytes,totalBytes})=>{//跟踪下载进度
          console.log(percent);
          //const stream = createReadStream(join(__dirname, './dist.rar'))
          //stream.pipe(res)
          //后端返回文件流totalBytes为0
      },
      onCompleted:(filename)=>{console.log('下载完成')},//完成回调
      overwrite:ture//覆盖
  })
  ```

  https://runebook.dev/zh-CN/docs/electron/api/download-item
  
+ axios

  ```js
  //使用后端axios下载
  this.$http({
      method: "get",
      url: songSource,
      responseType: "stream",//文件流形式
  }).then(function (res: any) {
      const file = path.join(process.cwd(), `/public/music/${name}.mp3`);
      res.data.pipe(fs.createWriteStream(file));
      res.data.on("end", () => {
          self.$message.success("下载成功");
      });
  });
  ```
  
+ downloadURL

  ```ts
  https://www.yuque.com/ezg6c4/op375w/dzis0y#a4f30d12
  const Store = require('electron-store');
  const store = new Store();
  win.webContents.downloadURL('http://localhost:3000/files')//触发will-download
  //监听 will-download
  win.webContents.session.on('will-download', (e: any, item: any, webContents: any) => {//downloadItem控制来自于远程资源的文件下载https://runebook.dev/zh-CN/docs/electron/api/download-item。
      item.setSavePath(join(process.cwd(), './public/', item.getFilename()))//文件保存路径,不指定默认跳出弹框用户指定路径
      let prevReceivedBytes = 0// 记录上一次下载的字节数据
      item.on('updated', (event: any, state: string) => {//当下载正在执行但还没完成的时候发出
          if (state === 'progressing') {//progressing - 下载正在进行中,interrupted - 下载已经中断，可以恢复
              console.log('下载进度:', item.getReceivedBytes() / item.getTotalBytes() * 100);
              const receivedBytes = item.getReceivedBytes()
              console.log('下载速度b/s', (receivedBytes - prevReceivedBytes) * 2);//updated 事件执行的时间约 500ms 一次
              prevReceivedBytes = receivedBytes
          }
      })
      item.on('done', (event: any, state: string) => {
          if (state === 'completed') {
              console.log('文件下载完成')
              store.set('filename', item.getFilename());//持久存储
          } else {
              console.log(`Download failed: ${state}`)
          }
      })
  })
  ```

---

## <img src="https://raw.githubusercontent.com/vueuse/vueuse/main/packages/public/logo-vertical.png" alt="VueUse" style="zoom:25%; width:120px" />[VueUse](https://vueuse.org/)

---

## demo

+ 拖拽

  ```typescript
  let fs = require('fs')
  let drop = document.querySelector(".drop")
  drop.addEventListener('drop', e => {
      e.preventDefault()
      e.stopPropagation()
      const file = e.dataTransfer.files//拖入文件数组
      const { path, name } = file[0] 
      fs.readFile(path, (err, data) => {//读取拖入区域文件内容
          if (err) console.log(err)
          let div = document.createElement("div")
          div.innerHTML = `
          <h3>${name}<h3>
          <div>${data}</div>
          `
          document.body.appendChild(div)
      })
  
  })
  drop.addEventListener('dragover', e => {
      e.preventDefault()
      e.stopPropagation()
  })
  ```

+ `webview`

  ```html
  <!--类似iframe-->
  <webview src="https://www.baidu.com" style="width: 500px;height: 300px; border: 1px dotted skyblue;"></webview>
  <script>
      onload = () => {
          const webview = document.querySelector('webview')
          webview.addEventListener('did-stop-loading', () => {//加载完毕
              let code = `
  const ipt = document.querySelector('#kw')
  const btn = document.querySelector('#su')
  ipt.value="兰亭序"
  btn.click()
  `
              webview.executeJavaScript(code)//添加js代码
          })
      }
  </script>
  ```
  

---

## 参考

+ https://www.electronjs.org/zh/docs/latest
+ https://www.electronforge.io/
+ [Electron Builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/)
+ [electron-vue](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)
+ https://www.bilibili.com/video/BV1QB4y1F722
+ https://vue-js.com/topic/6022286496b2cb0032c389c6
+ [electron 中文文档](https://wizardforcel.gitbooks.io/electron-doc/content/faq/electron-faq.html)
+ [腾讯云](https://cloud.tencent.com/developer/section/1116155)
+ [Electron 中文文档](https://wizardforcel.gitbooks.io/electron-doc/content/faq/electron-faq.html)
+ [w3c](https://www.w3cschool.cn/electronmanual/electronmanual-shell.html)
+ https://apimirror.com/electron

