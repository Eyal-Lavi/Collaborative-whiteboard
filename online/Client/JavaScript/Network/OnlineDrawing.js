let counter = 0;
class OnlineDrawing{
    constructor(rootDiv , io,TaskManger){
        this.root = rootDiv;
        this.io= io;
        this.taskManager = TaskManger;

        this.setupSubscribes();
        this.setupElements();
        this.setupEvents();

        this.networkStatus = false;
    }
    setupElements(){
        this.input_UserName = this.root.querySelector('.UserNameInput');
        this.input_BoardName = this.root.querySelector('.BoardNameInput');
        this.button_Create_Join = this.root.querySelector('.btnCreateJoin');
    }
    setupSubscribes=()=>{
        this.taskManager.subscribe('send_IoMove',this.send_IoMove);
        this.taskManager.subscribe('send_IO_createElement',this.send_IO_createElement);
        this.taskManager.subscribe('send_IO_Resize',this.send_IO_Resize);
        this.taskManager.subscribe('send_IO_Color',this.send_IO_Color);
        this.taskManager.subscribe('send_IO_TextValue',this.send_IO_TextValue);
        this.taskManager.subscribe('send_IO_Disconnect',this.send_IO_Disconnect);
        this.taskManager.subscribe('send_IO_Focus',this.send_IO_Focus);
        this.taskManager.subscribe('setNetworkStatus',this.setNetworkStatus);
    }
    setNetworkStatus=(bool)=>{
        this.networkStatus = bool;
    }
    setupEvents(){
        this.button_Create_Join.addEventListener('click',this.send_IO_Join);

        this.io.on('join',(data)=>{
            if(data.status=='OK-First-Connection'){
                this.taskManager.emit('clearShapes');
                this.taskManager.emit('openOnlineAndHow','HowConnection');
                this.taskManager.emit('addAllUsersToList',data.users);
                debugger;
                this.taskManager.emit('setNetworkStatus',true); // 1 Here and 1 On - Save And load Div -
            }
            else if(data.status=='OK-Get-Data'){
                this.taskManager.emit('clearShapes');
                this.taskManager.emit('openOnlineAndHow','HowConnection');
                this.taskManager.emit('startLoadProject',data.data);
                counter = data.counter;
                this.taskManager.emit('addAllUsersToList',data.users);
                this.taskManager.emit('setNetworkStatus',true); // 1 Here and 1 On - Save And load Div -
            }
            else if(data.status=='User-in-use'){
                alert('This user name in use try another name');
            }

        });
        this.io.on('create',(data)=>{
            counter = data.counter;
            this.taskManager.emit('createShapeFromServer',data.type,data.id);//Board
        });

        this.io.on('move',(data)=>{
            debugger;
            this.taskManager.emit('findElementOnBoardTo',data,'Move');// Board
            console.log(data);
        });

        this.io.on('updateCounter',(dataCounter)=>{
            counter = dataCounter;
            console.log(counter);
        });

        this.io.on('resize',(data)=>{
            this.taskManager.emit('findElementOnBoardTo',data,'Resize');// Board
            console.log(data);
        });
        this.io.on('color',(data)=>{
            this.taskManager.emit('findElementOnBoardTo',data,'Color');// Board
        });
        this.io.on('textValue',(data)=>{
            this.taskManager.emit('findElementOnBoardTo',data,'Value');// Board
        });
        this.io.on('dis',(data)=>{
            console.log(`"${data.userName}" DISCONNECT FROM "${data.boardName}" Board`);
            this.taskManager.emit('userDisconnect',data);
        });
        this.io.on('userJoin',(data)=>{
            console.log(`"${data.userName}" Join To "${data.boardName}" Board`);
            this.taskManager.emit('userJoin',data);
        });
    }
    send_IO_Join=()=>{
        this.userName = this.input_UserName.value;
        this.boardName = this.input_BoardName.value;
        this.io.emit('join',{userName:this.userName,boardName:this.boardName});
    }
    send_IO_createElement=(data)=>{
        data.boardName = this.boardName;
        data.userName = this.userName;
        data.counter = counter;
        this.io.emit('create',data);
        // counter++;
    }
    send_IoMove=(data)=>{
        data.boardName =this.boardName;
        data.userName =this.userName;
        this.io.emit('move',data);
    }
    send_IO_Resize=(data)=>{
        data.boardName =this.boardName;
        data.userName =this.userName;
        this.io.emit('resize',data);
    }
    send_IO_Color=(data)=>{
        data.boardName =this.boardName;
        data.userName =this.userName;
        this.io.emit('color',data);
    }
    send_IO_TextValue=(data)=>{
        data.boardName =this.boardName;
        data.userName =this.userName;
        this.io.emit('textValue',data);
    }
    send_IO_Disconnect=()=>{
        this.io.emit('dis');
    }
}