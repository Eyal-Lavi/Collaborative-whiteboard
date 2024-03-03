class HowConnection{
    constructor(rootDiv , io,TaskManger){
        this.root = rootDiv;
        this.io= io;
        this.taskManager = TaskManger;
        this.setupSubscribe();
        this.setupElements();
        this.setupEvents();
    }
    setupSubscribe(){
        this.taskManager.subscribe('userDisconnect',this.userDisconnect);
        this.taskManager.subscribe('userJoin',this.userJoin);
        this.taskManager.subscribe('addAllUsersToList',this.addAllUsersToList);
    }
    setupElements(){
        this.ul_ListConnections = this.root.querySelector('.listOfConnections');
        this.btn_Logout = this.root.querySelector('.logoutBtn');
    }
    setupEvents=()=>{
        this.btn_Logout.addEventListener('click',()=>{
            debugger;
            this.taskManager.emit('send_IO_Disconnect');
            this.removeAllUsersFromConnectionList();
            this.taskManager.emit('clearShapes');
            this.taskManager.emit('openOnlineAndHow','OnilneDrawing');
            this.taskManager.emit('setNetworkStatus',false);
        });
    }
    userJoin=(data)=>{
        this.addToConnectionList(data.userName);
    }
    userDisconnect=(data)=>{
        debugger;
        this.removeFromConnectionList(data.userName);
    }
    addToConnectionList(username){
        const userLI = document.createElement('li');
        userLI.id=username;
        userLI.textContent=username;
        this.ul_ListConnections.appendChild(userLI);
    }
    removeFromConnectionList(id){
        const AllUsers = this.ul_ListConnections.children;

        for(let user of AllUsers){
            if(user.id == id){
                this.ul_ListConnections.removeChild(user);
                break;
            }
        }
    }
    removeAllUsersFromConnectionList(){
        const AllUsers = this.ul_ListConnections.children;
        const usersToRemove =[];
        for(let user of AllUsers){
            usersToRemove.push(user);
        }
        for(let user of usersToRemove){
            this.ul_ListConnections.removeChild(user);
        }
    }
    addAllUsersToList=(usersArray)=>{
        const fragEl = document.createDocumentFragment();

        for(let userName of usersArray){
            const userLI = document.createElement('li');
            userLI.id=userName;
            userLI.textContent=userName;
            fragEl.appendChild(userLI);
        }
        this.ul_ListConnections.appendChild(fragEl);
    }
}