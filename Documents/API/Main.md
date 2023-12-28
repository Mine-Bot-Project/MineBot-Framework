# API
MineBot-Framework 有兩個主要的 API，分別為 [Bot](./Bot.md) 和 [Core](./Core.md)，[Core](./Core.md) 包含了整個 MineBot-Framework 的功能，但有些操作可能會導致整個系統無法正常運作，所以除非你在做插件，不然我們不建議你使用該 API。

## Bot
此 API 提供給一般開發者使用，只會暴露 Core 的部分功能。

[[查看文檔](./Bot.md)]

## Core
此 API 主要提供給插件開發者使用，包含了 MineBot-Framwork 的所有功能。

> [!WARNING]
> 如果你只是想要用 MineBot-Framework 製作一個機器人，並且沒有打算自己寫功能，我們建議你直接使用 [Bot API](./Bot.md)。如果你想要自己寫功能，我們建議你使用插件系統。

[[查看文檔](./Core.md)]
