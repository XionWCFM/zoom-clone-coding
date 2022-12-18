import http from "http";
import WebSocket from 'ws';
import express from 'express';

const app = express();

/*
import - from 문법을 통해 express,http,websocket을 가져옴
*/



app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public" , express.static(__dirname + "/public"));
app.get("/", (req,res) => res.render("home"));
app.get("/*", (req,res) => res.redirect("/"));

/*
app.set() 메서드를 이용하면 설정하고자 하는 항목을 지정해
원하는 설정값을 입력할 수 있습니다.

express의 설정값을 지정해주는 건가..라고 이해했습니다.
dirname은 저번 바닐라크롬만들때 봤던 것이고

app.get() 메서드는 서버에 http 요청이 왔을때 지정된 콜백을 이용하여
라우팅 처리를 해주는 메서드입니다.

**여기에서 라우팅이란 ?  -> 주소를 보고 어떤 페이지(뷰)를 제공할지 결정하는 작업

구글링을 통한 추가 정보
app.use와 app.get은 동작자체는 비슷한데 무슨 차이가 있는가?

app.use → 일반적으로 응용 프로그램에 미들웨어를 도입하는 데 사용되며 모든 유형의 HTTP 요청을 처리 할 수 ​​있습니다.
app.get → GET HTTP 요청 만 처리합니다.


req,res가 궁금한데... 서칭이 살짝 어렵네요
res.render("home") res.render메서드로 home 탬플릿을 제공하는 것이며
app.get("/*", (req,res) => res.redirect("/"));는 사용자가 홈이 아닌 다른 주소로
get 요청을 보내더라도 홈으로 리다이렉션(우회)하는 코드

*/

const handleListen = () => console.log("Listening on http://localhost:3000");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = []

/*
haddleListen 변수는 맨밑줄의 Server.listen()에 사용됩니다.
server 는 express()를 이용해 서버 객체를 만드는 것같네요.. 너무 생소함
wss 는 웹소켓서버를 만들어주는데 http서버객체로 만든 server를 안에 넣어주네요
sockets는 데이터베이스역할을 위해 생성함
*/

wss.on("connection", (socket) => {
    sockets.push(socket)
    socket["nickname"] = "Anonymous"
    socket.on('close' , () => console.log("Disconnected from Browser"))

    socket.on("message" , (msg) => {
        const message = JSON.parse(msg)
        switch(message.type) {
            case "new_message" :
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${message.payload}`))
                break
            case "nickname" :
                socket["nickname"] = message.payload
                break
        }
    })
})

/*
wss.on("connection", (socket) => {})
이벤트 처리를 위한 콜백 함수가 on 메서드 안에 들어온 것임.
바깥에 함수를 선언한 다음 on메서드에 인자를 전달하는 방식으로 구현해도 무방하지만
직관성을 위해 on 메서드에 익명함수를 만들어 포함되는 형태로 코드 구성

sockets.push(socket)
웹소켓 서버에 connection 이벤트 (새사용자가 접속하는것)이 발생할 때마다 
sockets배열에 생성된 소켓을 push 해줌

socket["nickname"] = "Anonymous"
일단 socket의 nickname의 키에 모두 Anonymous를 할당해주고
나중에 자기 닉네임을 스스로 전달하는 경우 전달된 닉네임으로 바꿔주기위한 코드


socket.on('close' , () => console.log("Disconnected from Browser"))
소켓에 close 이벤트가 발생할 경우 console.log를 실행해줌


socket.on("message" , (msg) => {
    const message = JSON.parse(msg)

우리는 app.js에서 JSON을 stringify한 문자열을 담아서 send 했습니다.
socket에 message 이벤트가 발생했을때 안에 담긴 내용물은 우리가 stringfy한 문자열일테니
이걸 다시 parse()해줍니다.

        switch(message.type) {
            case "new_message" :
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${message.payload}`))
                break
            case "nickname" :
                socket["nickname"] = message.payload
                break
        }
message.type의 밸류가
new_message인 경우 sockets 배열에 forEach를 실행하고
각 소켓에 send를 해주는데 send하는 내용은 지금 전달받은 소켓의 닉네임과 메시지의 내용입니다.

nickname
socket의 닉네임에 내용을 할당해줍니다.


message, socket의 데이터가 어떻게 구성되어있는지
헷갈리기시작함... ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
*/

server.listen(3000, handleListen);

/*
server.listen() 메서드는 지정된 포트 또는 경로에 수신기를 만듭니다.
server.listen(port, hostname, backlog, callback);

*/