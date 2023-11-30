# 語法風格規範
在更改 MineBot-Framework 時我們希望您遵守此語法規範。

## 目錄
* [命名](#命名)
* [引號](#引號)
* [排版](#排版)
* [迴圈](#迴圈)

## 命名
使用 [小駝峰式命名法](https://zh.wikipedia.org/zh-tw/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB) 來命名變數, 函數，但在命名 `<Class>` 時使用 [大駝峰式命名法](https://zh.wikipedia.org/zh-tw/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB)。

✅ `sayHello`<br>
❌ `say_hello`

如果該名稱包含了縮寫，則必須根據位置為全部或全部小寫。

✅ `gameFPS`<br>
❌ `gameFps`<br>
✅ `fpsCount`<br>
❌ `FPSCount`

## 引號
使用 `'` 而非 `"` 來定義 <string>。

✅ `'A string'`<br>
❌ `"A String"`

## 排版
1. 縮排: 我們使用兩格作為縮排的寬度

2. 空格
```js
[1, 2, 3, 4, 5]
{ a: 1, b: 2, c: 3 }
{ a: { b: { c: [1, 2, 3] }}}
```
3. 在可以時不換行
```js
if (true) console.log(true)
else return false

if (true) {
  console.log(true)

  return true
} else return false

[1, 2, 3, 4, 5].forEach((item) => console.log(item))

[[1, 1.5], [2, 2.5], [3, 3.5], [4, 4.5], [5, 5.5]].forEach((item) => {
  item.forEach((item2) => console.log(item2)) //如果保持為單行，該行會變得太難閱讀。
})
```
3. 空行
```js
class Test {
  static get a () {return 'a'}
  static get b () {return 'b'}
  static get c () {return 'b'}

  static set a (value) {console.log(value)}
  static set b (value) {console.log(value)}
  static set c (value) {console.log(value)}

  static sayHello () {
    let array = ['h', 'e', 'l', 'l' 'o']
    array.push('!')

    console.log(array.join('')) //輸出內容跟創建 array 與對 array 進行操作是不同 "類型" 的指令。

    return array
  }
}
```
