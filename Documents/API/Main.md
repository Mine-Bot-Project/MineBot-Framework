# API
MineBot-Framework 的 API。

## 範例

```js
const { Bot } = require('./MineBot-Framework/API.js')

let bot = new Bot(`${__dirname}/Data`, {    // 創建一個機器人
  token: '<token>',                         // 設定 Token
  clientID: '<clientID>'                    // 設定 Client ID
})

bot.start()                                 // 啟動機器人
```

## 目錄
* [Bot](#bot)
  * [start()](#start)
  * [addPlugin()](#addplugin)
* [Core](#core)
  * [dataPath](#datapath)
  * [options](#options)
  * [state](#state)
  * [frameworkInfo](#frameworkinfo)
  * [info](#info)

# Bot
```js
const { Bot } = require('./MineBot-Framework/API.js')

new Bot(<dataPath>, <options>) // 創建一個機器人
```
* `dataPath <string>` | 儲存機器人資料的路徑 (必須是一個資料夾) [必要]
* `options <object>` | 選項
  * `token <string>` | 機器人的 Token [必要]
  * `clientID <string>` | 機器人的 Client ID [必要]
  * `clusters <number>` | 機器人的集群數

## start
```js
.start() // 創建一個機器人
```

## addPlugin
```js
.addPlugin(<Plugin>) // 添加插件
```
* `Plugin <class>` | 要添加的插件，必須為一個 [Constructor Class](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes/constructor) [必要]

# Core
> [!WARNING]
> 如果你只是想要用 MineBot-Framework 製作一個機器人，並且沒有打算自己寫功能，我們建議你直接使用 [Bot API](#bot)。如果你想要自己寫功能，我們建議你使用插件系統。
```js
const { Core } = require('./MineBot-Framework/API.js')

new Core(<dataPath>, <options>) // 使用 Core 創建一個機器人
```
* `dataPath <string>` | 儲存機器人資料的路徑 (必須是一個資料夾) [必要]
* `options <object>` | 選項 (與 [Bot API](#bot) 一樣)
