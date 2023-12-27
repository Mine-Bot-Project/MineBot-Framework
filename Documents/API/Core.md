# 目錄
* [Core](#core)
  * [dataPath](#datapath)
  * [options](#options)
  * [state](#state)
  * [frameworkInfo](#frameworkinfo)
  * [info](#info)
<br><br>
  * [start()](#start)
  * [checkFiles()](#checkfiles)
<br><br>
  * [Timer](#timer)
  * [TranslationManager](#translationmanager)
  * [SlashCommandManager](#slashcommandmanager)
  * [ClusterManager](#clustermanager)
  * [WorkerManager](#workermanager)
  * [PluginManager](#pluginmanager)
  * [CLI](#cli)
  * [Log](#log)

# Core
> [!WARNING]
> 如果你只是想要用 MineBot-Framework 製作一個機器人，並且沒有打算自己寫功能，我們建議你直接使用 [Bot API](#bot)。如果你想要自己寫功能，我們建議你使用插件系統。
```js
const { Core } = require('./MineBot-Framework/API.js')

new Core(<dataPath>, <options>) // 使用 Core 創建一個機器人
```
* `dataPath <string>` | 儲存機器人資料的路徑 (必須是一個資料夾) [必要]
* `options <object>` | 機器人的選項 (與 [Bot API](#bot) 一樣)

### dataPath
```js
.dataPath // 取得機器人的資料路徑
```

### options
```js
.options // 取得機器人的選項
```

### state
```js
.state // 取得機器人的狀態
```

### frameworkInfo
```js
.frameworkInfo // 取得框架的資訊
```

### info
```js
.info // 取得機器人的資訊 (跟資料路徑裡的 Info.json 一樣)
```

## start
```js
.start() // 啟動機器人
```

## checkFiles
```js
.checkFiles() // 檢查機器人的資料檔案
```
