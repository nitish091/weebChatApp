const socket = io.connect('http://localhost:3000');

const form = document.getElementById('sendContainer');
const sentMessage = document.getElementById('msgToSend');
const messageContainer = document.querySelector('.msgContainer');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

const name = prompt("Enter your name to join: ");
append("You joined the chat", "left");
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    console.log(messageContainer);
    append( `${name} joined the chat`, `left` );
});
socket.on('receive', data =>{
    console.log(messageContainer);
    append( `${data.user}: ${data.message}`, `left` );
});

socket.on('leave', user=>{
    append( `${user} has left`, 'left' );
});

form.addEventListener( 'submit', (e) =>{
    e.preventDefault();
    const message = sentMessage.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    sentMessage.value = '';
});

// try{

// }
// catch(err){
//     alert('ERROR: socket.io encountered a problem:\n\n' + err);
// }
