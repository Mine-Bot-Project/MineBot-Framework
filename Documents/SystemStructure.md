# 系統架構
MineBot Framework 的系統架構。

## 目錄
* [基礎](#基礎)
  * [Core](#core) 
  * [多線程](#多線程)

## 基礎
MineBot Framework 架構的基礎知識。

### Core
MineBot Framework 使用 Core 來作為系統的最核心，Core 將不同的模塊集成到一起 (如插件管理器, 資料庫, 集群管理器)，Core 不能被一般的開發者存取，但能被插件存取。且因為 MineBot Framework 使用多線程，所以該 Core 還分為主線程與子線程。

### 多線程
MineBot Framework 使用多線程來分擔負載，不同的線程有不同的工作，主要分為主線程與子線程。

> [!NOTE]
> 建議您先了解 Node.js 中的 [Worker](https://nodejs.org/api/worker_threads.html)

主線程:<br>
命令行介面, 插件管理器, 集群管理器, Worker 管理器

子線程<br>
頁面
