try{
    const io = require('socket.io')(3000);
    const users = {};
    
    io.on('connection', socket =>{
        socket.on('new-user-joined',name =>{
            console.log( name, ' joined' );
            users[socket.id] = name;
            socket.broadcast.emit('user-joined', name);
        });
        socket.on('send', message =>{
            socket.broadcast.emit('receive', { message:message, user:users[socket.id]});
        });
        socket.on('disconnect', message =>{
            socket.broadcast.emit('leave', users[socket.id]);
            delete users[socket.id];
        });
    })   
}
catch(err){
    alert("The server side couldn't be initialised!\n\n", err)
}
   