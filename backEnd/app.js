const express = require('express')
const app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
server.listen(3001, err => {
    if (!err) {
        console.log('server is running at http://localhost:3001')
        console.log('server is running at http://127.0.0.1:3001')
    } else {
        console.log(err)
    }
})
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
  })
app.get('/', (req, res, next) => {
    res.sendfile(__dirname + '/chat.html')
})
var users = {}
var count = 0
// 使用中间件，获取用户传递过来的信息，作为用户的唯一标识
io.use((socket, next) => {
    // 用户身份，
    var uName = socket.handshake.query.name
    if (uName) {
        users[socket.id] = uName
        return next()
    }
    return next(new Error('非法连接'))
})
io.on('connection', function (socket) {
    io.to(socket.id).emit('chat message', 'surprise chat message')
    count += 1
    console.log(users[socket.id] + ' 进入了聊天室')
    console.log(count)
    let msg = {
        content: users[socket.id] + '进入了聊天室',
        type: 3
    }
    io.emit('sendMessage', msg)
    io.emit('getCount', count)
    socket.on('disconnect', () => {
        count -= 1
        // 离开后就在users数组中删除
        let msg = {
            content: users[socket.id] + '离开了聊天室',
            type: 3
        }
        console.log(msg)
        socket.broadcast.emit('sendMessage', msg)
        io.emit('getCount', count)
        delete users[socket.id]
    })
    socket.on('sendMessage', function (msg) {
        socket.broadcast.emit('sendMessage', msg)
        console.log(msg)
    })
})