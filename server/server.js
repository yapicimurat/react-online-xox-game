const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);
const port = 3001;

const {Server} = require('socket.io');
const io = new Server(server,{
   cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"]
   }
});

const players = {
   socketIdMapper: [],
   playerPairGameState: {}
};

const generateShortCode = () => {
   var firstPart = (Math.random() * 46656) | 0;
   var secondPart = (Math.random() * 46656) | 0;
   firstPart = ("000" + firstPart.toString(36)).slice(-3);
   secondPart = ("000" + secondPart.toString(36)).slice(-3);
   return firstPart + secondPart;
};

io.on('connection', (socket) => {
   //yeni connection geldi ve bunu socketIdMapper kısmına ekle...
   players.socketIdMapper.push({
      id : socket.id,
      shortCode: generateShortCode()
   });

   socket.emit('CLIENT-SHORT_CODE', {
      shortCode : players.socketIdMapper.filter(mapper => mapper.id === socket.id)[0]?.shortCode
   });

   socket.on('SERVER-SEND_GAME_REQUEST', data => {
      let targetPlayerSocketId = players.socketIdMapper.filter(mapper => mapper.shortCode === data.targetShortCode)[0]?.id;
      const targetSocket = io.sockets.sockets.get(targetPlayerSocketId);

      targetSocket?.emit('CLIENT-RECEIVED_GAME_REQUEST', {
         targetShortCode: data.senderShortCode,
      });
   });

   socket.on('SERVER-REQUEST_ACCEPTED', data => {
      const socketIdWhoRequested = players.socketIdMapper.filter(mapper => mapper.shortCode === data.userShortCodeWhoRequested)[0]?.id;

      const {userShortCodeWhoAccepted, userShortCodeWhoRequested, userSocketIdWhoAccepted} = data;
      //eşleştirme yap, x oyuncusu ve O oyuncusunu belirle
      players.playerPairGameState[userShortCodeWhoRequested + userShortCodeWhoAccepted] = {
         isGameStarted : true,
         isGameFinished : false,
         boardState : [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
         ],
         turn : 'X',
         xPlayerSocketId : socketIdWhoRequested,
         oPlayerSocketId : userSocketIdWhoAccepted,
         theWinner : null,
         gameKey : userShortCodeWhoRequested + userShortCodeWhoAccepted
      };
      const toSend = players.playerPairGameState[userShortCodeWhoRequested + userShortCodeWhoAccepted];
      //kabul eden kişi
      socket.emit('CLIENT-GAME_CREATED', {
         gameState : toSend
      });


      const requestedUserSocket = io.sockets.sockets.get(socketIdWhoRequested);
      //isteği gönderen kişi
      requestedUserSocket.emit('CLIENT-GAME_CREATED', {
         gameState : toSend
      });
   });

   socket.on('SERVER-GAME_MOVE', data => {
      console.log(data);
      const xPlayerSocket = io.sockets.sockets.get(data.gameState.xPlayerSocketId);
      const oPlayerSocket = io.sockets.sockets.get(data.gameState.oPlayerSocketId);

      players.playerPairGameState[data.gameKey].boardState[data.row][data.col] = data.symbol;
      //hamleyi yapan kişi
      xPlayerSocket.emit('CLIENT-GAME_MOVE', {
         online : players.playerPairGameState[data.gameKey]
      });

      oPlayerSocket.emit('CLIENT-GAME_MOVE', {
         online : players.playerPairGameState[data.gameKey]
      });
   });


   socket.on('disconnect', () => {
      //disconnect olan kullanıcının arr içerisindeki alanını empty yani undefined yap...
      //delete players.socketIdMapper[socket.id];
   });
});


server.listen(port, () => {
   console.log(`Server ${port} portundan dinleniyor...`);
});

