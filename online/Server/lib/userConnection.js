const BoardManager = require('./BoardManager');

class UserConnection{
    constructor(socket){
        this.socket = socket;
        this.dataJoin = null; 
        this.boardManager = new BoardManager();
    }
    join = (dataJoin)=>{
        this.dataJoin = dataJoin ; 
        this.boardManager.handleJoin(dataJoin, this.socket);
    }
    create = (dataCreate)=>{
        this.boardManager.handleCreate(dataCreate);
     
    }
    move = (dataMove)=>{
        this.boardManager.handleMove(dataMove);
    }
    resize = (dataResize) => {
        this.boardManager.handleResize(dataResize);
    }

    color = (dataColor) => {
        this.boardManager.handleColor(dataColor);
    }

    textValue = (dataTextValue) => {
        this.boardManager.handleTextValue(dataTextValue);
    }

    disconnect = () => {
        this.boardManager.handleDisconnect(this.dataJoin);
    }

    dis = () => {
        this.boardManager.handleDis(this.dataJoin);
    }
}

module.exports = UserConnection;
