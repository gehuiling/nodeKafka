// 创建一个webSocket对象
const ws = new WebSocket('ws://127.0.0.1:3000/websocket/taxiStream')
ws.onopen = e => {
  // 连接后监听
  console.log(`WebSocket 连接状态： ${ws.readyState}`)
}

// onmessage是当服务端给客户端发来消息的时候触发，res是MessageEvent对象，真正的消息数据是 res.data
ws.onmessage = res => {
  // 当服务端返回数据的时候，放到页面里
  // console.log(`客户端传过来消息：${res.data}`);
  //  lng:[4]
  //  lat:[5]
  console.log(+res.data.split(',')[4], +res.data.split(',')[5]);
  var taxiEvevts_layer = new L.layerGroup();

  (L.circle(L.latLng(+res.data.split(',')[5], +res.data.split(',')[4]), 1, {
    color: '#CAFF70',
    fillColor: '#CAFF70',
    fillOpacity: 0.2
  })).addTo(taxiEvevts_layer);

  var tag = taxiEvevts_layer.addTo(leafletMap);
}

ws.onclose = data => {
  // 监听连接关闭
  console.log('WebSocket连接已关闭')
  console.log(data);
}
