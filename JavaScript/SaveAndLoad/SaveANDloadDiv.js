export default class SaveANDloadDiv{
    constructor(SaveANDloadDiv , Save , Load){
        this.saveANDloadDiv = SaveANDloadDiv;
        this.saveElement = Save;
        this.loadElement = Load;
        this.taskManager = this.loadElement.taskManager;
        this.setupSubscribe();
        this.setupDisplayNone();
        this.networkStatus = false
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('openSaveANDloadDiv',this.openSaveANDloadDiv);
        this.taskManager.subscribe('closeWindowsLoadAndSave',this.setupDisplayNone);
        this.taskManager.subscribe('setNetworkStatus',this.setNetworkStatus);
    }
    setupDisplayNone=()=>{
        this.saveANDloadDiv.style.display ='none';
        this.saveElement.root.style.display = 'none';
        this.loadElement.root.style.display = 'none';
    }
    setNetworkStatus=(bool)=>{
        this.networkStatus = bool;
    }
    openSaveANDloadDiv=(typeClick)=>{
        switch (typeClick) {
            case 'Save' :
                if(this.saveANDloadDiv.style.display == 'none'){
                    this.saveANDloadDiv.style.display = 'flex';
                    this.saveElement.root.style.display = 'flex';
                    this.loadElement.root.style.display = 'none'; // מכבה את הload במידה והוא נשאר פתוח
                    
                }
                else if(this.saveANDloadDiv.style.display ='flex' && this.saveElement.root.style.display == 'flex'){
                    this.saveANDloadDiv.style.display ='none';
                    this.saveElement.root.style.display = 'none';
                    this.loadElement.root.style.display = 'none'; // מכבה את הload במידה והוא נשאר פתוח
                }
                else if(this.saveANDloadDiv.style.display ='flex' &&  this.loadElement.root.style.display == 'flex'){
                    this.saveElement.root.style.display = 'flex';
                    this.loadElement.root.style.display = 'none'; // מכבה את הload במידה והוא נשאר פתוח
                }
                break;
            case 'Load' :
                if(this.networkStatus == false){
                    if(this.saveANDloadDiv.style.display == 'none'){
                        this.saveANDloadDiv.style.display = 'flex';
                        this.loadElement.root.style.display = 'flex'; 
                        this.saveElement.root.style.display = 'none';// מכבה את Save במידה והוא נשאר פתוח
                    }
                    else if(this.saveANDloadDiv.style.display ='flex' &&  this.loadElement.root.style.display == 'flex'){
                        this.saveANDloadDiv.style.display ='none';
                        this.saveElement.root.style.display = 'none';
                        this.loadElement.root.style.display = 'none';// מכבה את Save במידה והוא נשאר פתוח
                    }
                    else if(this.saveANDloadDiv.style.display ='flex' && this.saveElement.root.style.display == 'flex'){
                        this.saveElement.root.style.display = 'none';
                        this.loadElement.root.style.display = 'flex';// מכבה את Save במידה והוא נשאר פתוח
                    }
                }
                else{
                    alert('Cannot load board becoause you are in Online Board Mode ! , discconect from Online Board and try again . ')
                }
                break;
            case 'Close All':
                    this.saveANDloadDiv.style.display ='none';
                    this.saveElement.root.style.display = 'none';
                    this.loadElement.root.style.display = 'none';
            default:
                console.log('Cheak the code openSaveANDloadDiv function in SaveANDloadDiv OBJECT');
                break;
        }
    }
}