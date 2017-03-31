# danmu-comment
js实现的弹幕评论插件，可嵌入任意网页，与基于nodejs的websocket实现的后端

## Features
 - 不用对原网页代码做任何修改，只需添加引用danmu-comment.js文件
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
 
打开多个示例页面
在相同title标签的示例网页中，将显示的相同的弹幕。

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

### `danmu-comment.js` ： 要引入网页的js

``` vbscript-html
<script src="js/danmu-comment.js"></script>
```
tip:加入网页前确保title已设置，并修改danmu-comment.js中必要的配置参数：

``` ruleslanguage
var server_ip = "localhost";	//服务端ip
var server_port = "8003";	//端口
var danmu_speed = 1;	//弹幕速度
var keycode = '13';		//调出评论框的键值，13为enter
var danmu_style = 0;	//弹幕样式，现在提供两种，0为运动型，1为tip型
```


  [1]: http://renfuheng.com/nodejs/danmu/index.html
  [2]: http://renfuheng.com/nodejs/danmu/index2.html
  [3]: http://renfuheng.com/nodejs/danmu/index3.html
  [4]: https://nodejs.org/en/
  [5]: https://github.com/foreverjs/forever
  [6]: https://github.com/zhizuqiu/danmu-comment/tree/master/docker
