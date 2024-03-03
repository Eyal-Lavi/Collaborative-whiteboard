const {
    socketRemoveAllListener,
    valueTextOnDataBoard,
    colorShapeOnDataBoard,
    resizeShapeOnDataBoard,
    moveLoactionShapeOnDataBoard,
    addShapeToDataBoard,
    removeShapeFromDataBoard,
    getAllShapesArray,
    clearDataBoard } = require('./HelpFunctions');

const dataBoards = {
    // boardOneZ:{
    //     counter:5,
    //     onlineUsers:[{user:"Eyal",socket:"Demo Socket Data"},{user:"Or",socket:"Demo Socket Data 2"}],
    //     items:{  "id_shape_1":{blalalal},  },
    // }
};

class BoardManager {
    constructor() {

    }

    handleJoin = (dataJoin, socket) => {
        this.socket = socket;
        const userNameJ = dataJoin.userName;
        const boardNameJ = dataJoin.boardName;

        let status = '';

        if(!dataBoards[boardNameJ]){
            dataBoards[boardNameJ] = {};
            dataBoards[boardNameJ].counter = 0;
            dataBoards[boardNameJ].onlineUsers = [];
            dataBoards[boardNameJ].items = {};

            status = 'OK-First-Connection';
        }
        else{
            status = 'OK-Get-Data';
            for(let temp of dataBoards[boardNameJ].onlineUsers){
                if(temp.user==userNameJ){
                    status = 'User-in-use';
                }
            }
        }

        if(status != 'User-in-use'){
            dataBoards[boardNameJ].onlineUsers.push({user:userNameJ,socket:this.socket});
        }

        const allUsersConnection = dataBoards[dataJoin.boardName].onlineUsers.map((obj)=>{
            return obj.user;
        });

        if(status == 'OK-First-Connection'){
            socket.emit('join',{
                status,
                users:allUsersConnection,
            });
            console.log('User create online board');
        }
        else if(status=='OK-Get-Data'){

            console.log(`All users Conncetions ->${allUsersConnection}`);
            console.log(getAllShapesArray(dataJoin.boardName,dataBoards));
            socket.emit('join',{
                status,
                data:getAllShapesArray(dataJoin.boardName,dataBoards),
                counter:dataBoards[dataJoin.boardName].counter,
                users:allUsersConnection,
            });

            for(let temp of dataBoards[dataJoin.boardName].onlineUsers){
                if(temp.user != dataJoin.userName){
                    temp.socket.emit('userJoin',dataJoin);
                }
            }
        }
        else if(status == 'User-in-use'){
            socket.emit('join',{
                status,
            });
        }
    }

    handleCreate = (dataCreate) => {
           console.log('create');
           dataBoards[dataCreate.boardName].counter++;

           if(dataBoards[dataCreate.boardName]){
               
               if(dataBoards[dataCreate.boardName].onlineUsers.length>1){
               
                   for(let temp of dataBoards[dataCreate.boardName].onlineUsers){
                       if(temp.user != dataCreate.userName){
                           temp.socket.emit('create',{id:dataCreate.id,type:dataCreate.type,counter:dataBoards[dataCreate.boardName].counter});
                       }
                   }
               }
               for(let temp of dataBoards[dataCreate.boardName].onlineUsers){
                   temp.socket.emit('updateCounter',dataBoards[dataCreate.boardName].counter);
               }
               let copyDataCreate = {...dataCreate};
               addShapeToDataBoard(copyDataCreate,dataBoards);
           }
          
    }

    handleMove = (dataMove) => {
          if(dataBoards[dataMove.boardName].onlineUsers.length>1){
                
            for(let temp of dataBoards[dataMove.boardName].onlineUsers){
                if(temp.user != dataMove.userName){
                    temp.socket.emit('move',{id:dataMove.id,location:dataMove.location,task:dataMove.task});
                }
            }
        }
        moveLoactionShapeOnDataBoard(dataMove,dataBoards);
    }

    handleResize = (dataResize) => {
         if(dataBoards[dataResize.boardName].onlineUsers.length>1){
                
            for(let temp of dataBoards[dataResize.boardName].onlineUsers){
                if(temp.user != dataResize.userName){
                    temp.socket.emit('resize',{id:dataResize.id,size:dataResize.size});
                }
            }
        }
        resizeShapeOnDataBoard(dataResize,dataBoards);
    }

    handleColor = (dataColor) => {
                if(dataBoards[dataColor.boardName].onlineUsers.length>1){
                
                    for(let temp of dataBoards[dataColor.boardName].onlineUsers){
                        if(temp.user != dataColor.userName){
                            temp.socket.emit('color',{id:dataColor.id,color:dataColor.color});
                        }
                    }
                }
                colorShapeOnDataBoard(dataColor,dataBoards);
            // });
    }

    handleTextValue = (dataTextValue) => {
                console.log('textValue-work')
                if(dataBoards[dataTextValue.boardName].onlineUsers.length>1){
                    
                    for(let temp of dataBoards[dataTextValue.boardName].onlineUsers){
                        if(temp.user != dataTextValue.userName){
                            temp.socket.emit('textValue',{id:dataTextValue.id,value:dataTextValue.value});
                        }
                    }
                }
                valueTextOnDataBoard(dataTextValue,dataBoards);
    }

    handleDisconnect = (dataJoin) => {
                    console.log('User Disconect');

                    if(dataBoards[dataJoin.boardName]){
                        dataBoards[dataJoin.boardName].onlineUsers = dataBoards[dataJoin.boardName].onlineUsers.filter((obj)=>{
                            return obj.user !== dataJoin.userName;
                        });
                        for(let temp of dataBoards[dataJoin.boardName].onlineUsers){
                            if(temp.user!=dataJoin.userName){
                                temp.socket.emit('dis',dataJoin);
                            }
                        }
                    }
        
                    this.socket.removeAllListeners();
        
                    clearDataBoard(dataJoin.boardName,dataBoards);
    }

    handleDis = (dataJoin) => {
                    console.log('User Disconect');

                    console.log(dataBoards);
                    if(dataBoards[dataJoin.boardName]){
                        dataBoards[dataJoin.boardName].onlineUsers = dataBoards[dataJoin.boardName].onlineUsers.filter((obj)=>{
                            return obj.user !== dataJoin.userName;
                        });
            
                        for(let temp of dataBoards[dataJoin.boardName].onlineUsers){
                            if(temp.user!=dataJoin.userName){
                                temp.socket.emit('dis',dataJoin);
                            }
                        }
                    }
                    socketRemoveAllListener(this.socket,dataBoards);
                    clearDataBoard(dataJoin.boardName,dataBoards);
    }
}
module.exports = BoardManager;