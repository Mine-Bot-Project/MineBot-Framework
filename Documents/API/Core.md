# 目錄
* [Core](#core)
  * [start()](#start)
  * [checkFiles()](#checkfiles)
<br><br>
  * [Timer](#timer)
    * [createInterval()](#createinterval)
    * [createLoop()](#createloop)
    * [deleteTimer()](#deletetimer)
  * [TranslationManager](#translationmanager)
  * [SlashCommandManager](#slashcommandmanager)
  * [ClusterManager](#clustermanager)
  * [WorkerManager](#workermanager) (Planning to merge into ClusterManager)
  * [PluginManager](#pluginmanager)
  * [CLI](#cli)
  * [Log](#log)

# Core
> [!WARNING]
> 如果你只是想要用 MineBot-Framework 製作一個機器人，並且沒有打算自己寫功能，我們建議你直接使用 [Bot API](./Bot.md)。如果你想要自己寫功能，我們建議你使用插件系統 (插件系統也會讓每個插件訪問 Core，但與直接使用 Core 不一樣，它可以讓你的機器人更模塊化，甚至將你的功能分享給其他人使用)。
```js
const { Core } = require('./MineBot-Framework/API.js')

new Core(<dataPath>, <options>) // 使用 Core 創建一個機器人
```
* `dataPath <string>` | 儲存機器人資料的路徑 (必須是一個資料夾) [必要]
* `options <object>` | 機器人的選項 (與 [Bot API](#bot) 一樣)

### Getters

> * `.dataPath <string>` | 取得機器人的資料路徑
> * `.options <object>` | 取得機器人的選項
> * `.state <string>` | 取得機器人的狀態
> * `.frameworkInfo <object>` | 取得框架的資訊
> * `.info <object>` | 取得機器人的資訊 (跟資料路徑裡的 Info.json 一樣)
```js
let core = new Core(<dataPath>, <options>) // 使用 Core 創建一個機器人

console.log(core.dataPath)                 // 輸出機器人的資料路徑
```

## start()
```js
.start() // 啟動機器人
```
> 回傳 `<undefined>`

## checkFiles()
```js
.checkFiles() // 檢查機器人的資料檔案
```
> 回傳 `<undefined>`

# Timer
```js
.Timer // 提供了類似 setInterval 與 setTimeout 的功能，但擁有更高的準確性，且更好管理。
```

## createInterval()
```js
.Timer.createInterval(<interval>, <callback>) // 創建間隔迴圈 (Interval)
```
* `interval <number>` | 每次重複的間隔 (毫秒)
* `callback <function>` | 重複時呼叫的函數
> 回傳 `計時器的 ID <string>`

## createLoop()
```js
.Timer.createLoop(<interval>, <times>, <callback>, <callback2>) // 創建間隔迴圈 (只重複特定次數)
```
* `interval <number>` | 每次重複的間隔 (毫秒)
* `times <number>` | 重複的次數
* `callback <function>` | 重複時呼叫的函數
* `callback2 <function>` | 重複完時呼叫的函數
> 回傳 `計時器的 ID <string>`

## deleteTimer()
```js
.Timer.deleteTimer(<id>) // 刪除計時器
```
* `id <string>` | 要刪出的計時器的 ID
> 回傳 `<undefined>`
