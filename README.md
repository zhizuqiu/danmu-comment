# danmu-comment
js实现的弹幕评论插件，可嵌入任意网页，与基于nodejs的websocket实现的后端
## Features
 - 不用对原网页代码做任何修改，只需添加引用js
 - 快捷键召唤出评论框
 - 通过title区分评论区域
 - nodejs实现的后端
## example

- [示例网页1][1]
- [示例网页2][2]

打开多个示例页面
在相同title标签的示例网页中，将显示的相同的弹幕。
## usage
<1>`server.js`: 后端代码
 1. 要运行后端代码，nodejs是必须的：
[https://nodejs.org/en/][3]
 2. 然后安装两个必须的模块：
``` ruleslanguage
cd <server.js所在目录>
npm install ws
npm install node-uuid
```
 3. 运行后端：
``` ruleslanguage
node server.js
```

tip:运行之前你可能需要修改一下端口，默认是8002
 4. 可以使用[foreverjs/forever][4]去保证nodejs运行的连续性
``` ruleslanguage
[sudo] npm install forever -g
forever start server.js
```

<2>`danmu-comment.js` ： 要引入网页的js

``` vbscript-html
<script src="danmu-comment.js"></script>
```
tip:加入网页前确保title已设置，并修改danmu-comment.js中必要的配置参数：

``` ruleslanguage
var server_ip = "localhost";	//服务端ip
var server_port = "8002";	//端口
var danmu_speed = 1;	//弹幕速度
var keycode = '13';		//调出评论框的键值，13为enter
```




  [1]: http://renfuheng.com/nodejs/danmu/
  [2]: http://renfuheng.com/nodejs/danmu/index2.html
  [3]: https://nodejs.org/en/
  [4]: https://github.com/foreverjs/forever
