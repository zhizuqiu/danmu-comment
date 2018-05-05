# danmu-comment
js实现的弹幕评论插件，可嵌入任意网页，与基于nodejs的websocket实现的后端

## Features
 - 对原网页代码做少量修改，添加danmu-comment.js和danmu-comment.css文件
 - 快捷键召唤出评论框
 - 通过title标签区分评论域
 - 基于nodejs的websocket后端
 - 弹幕实时
 - 提供docker服务端实现
 
## Example
样式一

- [示例网页1][1]
- [示例网页2][2]

样式二

 - [示例网页1][3]

测试方式：

打开多个相同的示例页面，演示弹幕交流

打开多个不同的示例页面，演示弹幕隔离

打开不同样式的示例页面，演示样式差异

## Usage
### `server.js`: 后端代码

要运行后端代码，nodejs是必须的：
[https://nodejs.org/en/][4]

然后安装两个必须的模块：
``` ruleslanguage
cd <server.js所在目录>
npm install ws
npm install node-uuid
```

运行后端：
``` ruleslanguage
node server.js
```
tip:运行之前你可能需要修改一下端口，默认是8003

可以使用[foreverjs/forever][5]去保证nodejs运行的连续性
``` ruleslanguage
[sudo] npm install forever -g
forever start server.js
```
#### 如果你的服务器有docker环境，这里提供了[docker版本][6]的服务端

### `danmu-comment.css` ： 要引入网页的css

``` vbscript-html
<link rel="stylesheet" href="css/danmu-comment.css">
```

### `danmu-comment.js` ： 要引入网页的js

``` vbscript-html
<script src="js/danmu-comment.js"></script>
```
tip:并做必要的参数配置：

``` ruleslanguage
window.onload = function () {
    var danmu = new Danmu_comment();
    danmu.init("localhost","8003","1","1","13","0");
    danmu.onEvent('onopen',function (event) {
        console.log(event);
    });
    danmu.onEvent('onmessage',function (event) {
        console.log(event);
    });
    danmu.onEvent('onclose',function (event) {
        console.log(event);
    });
};
```

 - "localhost" : 服务端ip; 
 - "8003" : 端口; 
 - "1" : 用于区分房间; 
 - "1" : 弹幕速度;
 -  '13' : 调出评论框的键值，13为enter; 
 -  "0" : 弹幕样式，现在提供两种，0为运动型，1为tip型;


  [1]: http://45.77.135.111:81/index.html
  [2]: http://45.77.135.111:81/index2.html
  [3]: http://45.77.135.111:81/index3.html
  [4]: https://nodejs.org/en/
  [5]: https://github.com/foreverjs/forever
  [6]: https://github.com/zhizuqiu/danmu-comment/tree/master/docker
