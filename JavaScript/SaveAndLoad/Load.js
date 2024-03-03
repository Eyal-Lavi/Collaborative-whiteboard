export default class Load {
    constructor(loadDiv , TaskManager , svg){
        this.taskManager = TaskManager;
        this.root = loadDiv;
        this.svg =svg;
        this.setupElements();
        this.setOptions();
        this.setupEvents();
    }
    setupElements=()=>{
        this.inputLoad = this.root.querySelector('input');
        this.buttonLoad = this.root.querySelector('button');
        this.datalistOptions = this.root.querySelector('datalist');
    }
    setupEvents=()=>{
        this.buttonLoad.addEventListener('click',this.parseEl);
    }
    parseEl=()=>{
        const nameProject = this.inputLoad.value;
        if(localStorage.hasOwnProperty(nameProject)){
            const projectInformation = JSON.parse(localStorage.getItem(nameProject));
            this.taskManager.emit('startLoadProject',projectInformation);//Board
            this.taskManager.emit('closeWindowsLoadAndSave');
        }
        else{
            alert(`Have not project with name - ${nameProject} !`)
        }
    }

    setOptions=()=>{
        const allKeys = Object.keys(localStorage);
        for(let i =0;i<allKeys.length;i++){
            const op = document.createElement('option');
            op.value = allKeys[i];
            this.datalistOptions.appendChild(op)
        }
    }
    
}