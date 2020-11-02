const msgBox = document.getElementById('msg-need-send')
const sendBtn = document.getElementById('send-btn')
const exit = document.getElementById('exit')
const receiveBox = document.getElementById('receive-box')

// 创建一个webSocket对象
const ws = new WebSocket('ws://127.0.0.1:3000/websocket/taxiStream')
ws.onopen = e => {
   // 连接后监听
  console.log(`WebSocket 连接状态： ${ws.readyState}`)
}

//// onmessage是当服务端给客户端发来消息的时候触发，res是MessageEvent对象，真正的消息数据是 res.data
ws.onmessage = res => {
  // 当服务端返回数据的时候，放到页面里
  console.log(`客户端传过来消息：${res.data}`);
  receiveBox.innerHTML += `<p>${res.data}</p>`
  receiveBox.scrollTo({
    top: receiveBox.scrollHeight,
    behavior: "smooth"
  })
}

ws.onclose = data => {
  // 监听连接关闭
  console.log('WebSocket连接已关闭')
  console.log(data);
}


sendBtn.onclick = () => {
  // 点击发送按钮。将数据发送给服务端
  ws.send(msgBox.value)  // send用于向服务端发送消息
}
exit.onclick = () => {
  // 客户端主动关闭连接
  ws.close()
}
