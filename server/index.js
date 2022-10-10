const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, { pingTimeout: 5000 });
const PORT = process.env.PORT || 3001;
const path = require('path');

process.env.NODE_ENV = 'production';
console.log('env', process.env.NODE_ENV);

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


let socketList = {};
let socketMap = {};
let questionMap = {}

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Route
app.get('/ping', (req, res) => {
  res
    .send({
      success: true,
    })
    .status(200);
});

// Socket
io.on('connection', (socket) => {
  console.log(`New User connected: ${socket.id}`);
  socketMap[socket.id] = socket;

  socket.on('disconnect', () => {
    const { roomId } = socketList[socket.id] || {}
    delete socketList[socket.id]
    delete socketMap[socket.id]
    console.log('discount socket id', socket.id)

    getUserList(roomId)

    socket.disconnect();
  });


  const getUserList = (roomId, otheMsg) => {
    if (!roomId) {
      return;
    }

    const users = Object.values(socketList).filter((p) => p.roomId == roomId)
    console.log('roomId:', roomId, users.length);
    if (users.length === 0) {

      socket.broadcast.to(roomId).emit('user-list', { users: [], questions: [] });
      return;
    }

    const rul = users.map((p) => ({ userId: p.userId, roomId, info: p }))
    socket.broadcast.to(roomId).emit('user-list', { users: rul, questions: questionMap[roomId] || [] });

    console.log('room current user list', rul.length)
    users.forEach((item) => {
      const clientUser = socketMap[item.userId];
      if (clientUser) {
        clientUser.emit('user-list', { users: rul, questions: questionMap[roomId] || [] })
        const { cmd, data } = otheMsg || {};
        if (cmd) {
          clientUser.emit(cmd, data)
        }
      }
    })
  }

  socket.on('get-user-list', ({ roomId }) => {
    getUserList(roomId)
  })

  socket.on('question-delete', ({ roomId, question }) => {
    const list = questionMap[roomId]
    if (!list || list.length === 0) {
      return;
    }
    const index = list.findIndex((p) => p.id === question.id)
    if (index === -1) {
      return;
    }
    list.splice(index, 1)
    questionMap[roomId] = list;
    getUserList(roomId)
  })

  socket.on('question-select', ({ roomId, question }) => {
    const list = questionMap[roomId]
    if (!list || list.length === 0) {
      return;
    }
    const index = list.findIndex((p) => p.id === question.id)
    if (index === -1) {
      return;
    }
    list[index].select = question.select;
    getUserList(roomId)
  })

  socket.on('BE-check-user', ({ roomId, userName }) => {
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      socket.emit('FE-error-user-exist', { error });
    });
  });

  /**
   * Join Room
   */
  socket.on('BE-join-room', ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { userId: socket.id, roomId, userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        console.log('---sockets in ', roomId)
        const users = [];
        clients.forEach((client, index) => {
          // Add User List
          users.push({ userId: client, roomId, info: socketList[client] });
          console.log('socketList[client]:', roomId, index, client)
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
        console.log('socketList[client]:', roomId, users.length)
        // io.sockets.in(roomId).emit('FE-user-join', users);
        getUserList(roomId)
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
    });
  });

  socket.on('BE-call-user', ({ userToCall, from, signal }) => {
    io.to(userToCall).emit('FE-receive-call', {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on('BE-accept-call', ({ signal, to }) => {
    io.to(to).emit('FE-call-accepted', {
      signal,
      answerId: socket.id,
    });
  });

  socket.on('BE-send-message', ({ type = 'message', roomId, msg, sender }) => {
    if (type === 'message') {
      io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
      return;
    }
    if (!questionMap[roomId]) {
      questionMap[roomId] = []
    }
    const exists = questionMap[roomId].filter((p) => p.sender == sender && p.question == msg).length > 0;

    if (exists) {
      return;
    }
    console.log('---send message--', roomId, sender, msg)
    questionMap[roomId].push({ id: guid(), sender, question: msg })
    getUserList(roomId, { cmd: 'alert-new-question', data: { msg: 'New Question!' } })
  });

  socket.on('BE-leave-room', ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);

    socketMap[socket.id]
    getUserList(roomId)
  });

  socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
    if (switchTarget === 'video') {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit('FE-toggle-camera', { userId: socket.id, switchTarget });
  });
});

http.listen(PORT, () => {
  console.log('Connected : 3001');
});
