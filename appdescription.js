const messageList = document.querySelector('ul');
const nickForm = document.querySelector("#nick")
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

/*
messageList = 채팅이 올라올 채팅창을 만들어줌
nickForm = 닉네임을 정할 수 있는 form 설정
messageForm = 채팅내용을 쓸 수 있는 form 설정
socket = 연결할 WebSocket 객체를 생성해주고 주소는 window.location.host로 지정
*/

function makeMessage(type, payload) {
    const msg = { type, payload};
    return JSON.stringify(msg)
}
/*
makeMessage 함수는 type, payload를 매개인자로 받아서
JSON 데이터로 만들어준다음
JSON을 문자열형태로 변환해서 서버로 보내줍니다.

이유는 send메서드는 문자열,이진데이터만 보낼수있으니까요!

*/

socket.addEventListener("open" , () => {
    console.log("Connected to Server");
})

/*
웹소켓 서버와 연결 이벤트가 발생했을때 
Connected to Server를 콘솔에 출력해주는 이벤트리스너
*/

socket.addEventListener("message", (message) => {
    const li = document.createElement("li")
    li.innerText = message.data
    console.log(message)
    messageList.append(li)
})

/*
소켓에 message 이벤트가 발생했을때 
li태그를 생성하고 li의 내용으로 message.data를 넣어줍니다.
messageList의 마지막 자식요소로 li를 넣어줍니다.

!! 중요 message 이벤트는 send 메서드를 통해 일어납니다.
이 경우에는 server.js의 socket.send() 코드를 app.js가 eventListener를 통해 받는 것
*/

socket.addEventListener("close" , () => {
    console.log("Disconnected from Server")
})

/*
웹소켓 연결이 끝나면 콘솔에 내용을 출력합니다.
*/

messageForm.addEventListener("submit" , handleSubmit)
nickForm.addEventListener("submit" , handleNickSubmit)

/*
messageForm의 submit 이벤트 발생시 handleSubmit을 호출합니다.
nickForm의 submit 이벤트 발생시 handleNickSubmit을 호출합니다.
*/

function handleSubmit(event) {
    event.preventDefault()
    const input = messageForm.querySelector("input")
    socket.send(makeMessage("new_message" , input.value));
    input.value = "";
}

/*
submit의 기본동작을 실행하지 않도록 preventDefault()해줍니다.
input에 MessageForm 안의 input 태그를 할당해주고
send 메서드를 이용해 서버에게 makeMessage()를 통해
input.value를 JSON.stringfy하여 전송해주고 type은 new_message라는 정보도 함께 담아서 전달합니다.
*/

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input")
    socket.send(makeMessage("nickname" , input.value))
    input.value = ""
}

/*
handleSubmit과 비슷하게 동작하지만
type을 nickname으로 지정해주어 둘을 구분할 수 있게 했습니다.

입력내용을 읽은 다음 소켓을 통해 서버로 보내는 기능은 같지만
입력값의 목적이 다르기에 구분해줍니다

근데.. 이렇게 비슷한 일을 하는 함수면 어떻게 일원화할 수도 있을것같은데.. 일단 넘어가겠습니다

*/
