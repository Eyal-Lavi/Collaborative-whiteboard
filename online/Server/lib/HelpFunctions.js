//-------------- Hellp Functions ----------------

function socketRemoveAllListener(socket){
    socket.removeAllListeners('disconnect');
    socket.removeAllListeners('dis');
    socket.removeAllListeners('textValue');
    socket.removeAllListeners('color');
    socket.removeAllListeners('resize');
    socket.removeAllListeners('move');
    socket.removeAllListeners('create');
}
function valueTextOnDataBoard(data,dataBoards){
    const boardName = data.boardName;
    const id = data.id;
    dataBoards[boardName].items[id].value = data.value;
}
function colorShapeOnDataBoard(data,dataBoards){
    const boardName = data.boardName;
    const id = data.id;
    dataBoards[boardName].items[id].color = data.color;
}
function resizeShapeOnDataBoard(data,dataBoards){
    const boardName = data.boardName;
    const id = data.id;

    switch (dataBoards[boardName].items[id].type){
        case 'Circle':
            dataBoards[boardName].items[id].radius = data.size.radius;
            break;
        case 'Square':
            dataBoards[boardName].items[id].width = data.size.width;
            dataBoards[boardName].items[id].height = data.size.height;
            break;
        case 'Rectangle':
            dataBoards[boardName].items[id].width = data.size.width;
            dataBoards[boardName].items[id].height = data.size.height;
            break;
        case 'Ellipse':
            dataBoards[boardName].items[id].width = data.size.width;
            dataBoards[boardName].items[id].height = data.size.height;
            break;
        case 'Text':
            dataBoards[boardName].items[id].size = data.size.fontSize;
            break;
        default:
            console.log('Error on resizeShapeOnDataBoard Function');
    }

}
function moveLoactionShapeOnDataBoard(data,dataBoards){
    const boardName = data.boardName;
    const id = data.id;

    dataBoards[boardName].items[id].x = data.location.x;
    dataBoards[boardName].items[id].y = data.location.y;
}
function addShapeToDataBoard(data,dataBoards){
    const boardName = data.boardName;
    
    const id = data.id;
    delete data.counter;
    delete data.userName;
    delete data.boardName;

    switch (data.type){
        case 'Circle':
            data.radius = 30;
            data.x = 500;
            data.y = 500;
            data.color= 'black';
            break;
        case 'Square':
            data.width = 150;
            data.height = 150;
            data.x = 500;
            data.y = 500;
            data.color= 'black';
            break;
        case 'Rectangle':
            data.width = 300;
            data.height = 150;
            data.x = 500;
            data.y = 500;
            data.color= 'black';
            break;
        case 'Ellipse':
            data.width = 80;
            data.height = 40;
            data.x = 500;
            data.y = 500;
            data.color= 'black';
            break;
        case 'Text':
            data.value = 'Enter Text Here';
            data.size = 20;
            data.x = 500;
            data.y = 500;
            data.color= 'black';
            break;
        default:
            console.log('Error on resizeShapeOnDataBoard Function');
    }
    dataBoards[boardName].items[id] = data;
}
function removeShapeFromDataBoard(data,dataBoards){
    const boardName = data.boardName;
    const id = data.id;

    delete dataBoards[boardName].items[id];
}
function getAllShapesArray(boardName,dataBoards){
    let shapes = Object.keys(dataBoards[boardName].items).map(key=>dataBoards[boardName].items[key])
    return shapes;
}
function clearDataBoard(boardName,dataBoards){
    if(dataBoards[boardName]){
        if(dataBoards[boardName].onlineUsers.length==0){
            delete dataBoards[boardName];
        }
    }
}
module.exports = {
    socketRemoveAllListener,
    valueTextOnDataBoard,
    colorShapeOnDataBoard,
    resizeShapeOnDataBoard,
    moveLoactionShapeOnDataBoard,
    addShapeToDataBoard,
    removeShapeFromDataBoard,
    getAllShapesArray,
    clearDataBoard
};