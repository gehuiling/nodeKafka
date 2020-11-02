const fs = require('fs');
const http = require('http');

var server = http.createServer();

var wwwDir = 'C:/Users/gehuiling/Desktop/server'
server.on('request', function (req, res) {
    var url = req.url;

    var filePath = '/index.html'
    if (url !== '/') {
        filePath = url
    }

    fs.readFile(wwwDir + filePath, function (err, data) {
        if (err) {
            return res.end('404 Not Found.')
        }
        // data = data.toString();
        // data = data.replace('首页','替换的首页')
        res.end(data)
    })

})

server.listen(3000, function () {
    console.log('服务器启动成功！');
})