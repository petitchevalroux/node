
const http2 = require('http2');
const server = http2.createServer((request, response) => {
    console.log('request received');
    response.end();
});
server.on('session',()=>{
    console.log('session received');
})
server.listen(8080);
const session = http2.connect('http://localhost:8080');
let sessionTimeout = 0;
setInterval(()=>{
    console.log(Date());
    session.setTimeout(500,()=>{
       sessionTimeout++;
       console.log(`session timeout ${sessionTimeout}`); 
    });
}, 5000);