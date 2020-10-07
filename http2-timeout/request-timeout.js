
const http2 = require('http2');
let requestCount = 0;
const server = http2.createServer((request, response) => {
    if (requestCount%2) {
        response.end();
    }
    // We dont handle request in order to have a timeout
    console.log(`request ${request.headers.count} received`);
});
server.listen(8080);
const session = http2.connect('http://localhost:8080');
setInterval(()=>{
    requestCount++;
    const request = session.request({'count':requestCount});
    request.setTimeout(1000,()=>{
        console.log(`request ${requestCount} timeout`)
    });
    request.on('end',()=>{
        console.log(`request ${requestCount} ended`)
    })
}, 5000);