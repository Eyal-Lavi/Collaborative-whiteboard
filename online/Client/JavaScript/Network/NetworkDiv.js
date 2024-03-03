class NetworkDiv{
    constructor(rootDiv ,onlineDrawingElement,howConnectionElement,TaskManger){
        this.root = rootDiv;
        this.onlineDrawingElement = onlineDrawingElement;
        this.howConnectionElement = howConnectionElement;
        this.taskManager = TaskManger;
        // this.setupDisplayNone();
        this.setupSubscribe();
        this.startDisplay()
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('openOnlineAndHow',this.openOnlineAndHow);
        this.taskManager.subscribe('closeWindowsNetwork',this.setupDisplayNone);
    }
    setupDisplayNone=()=>{
        this.root.style.display ='none';
        this.onlineDrawingElement.root.style.display = 'none';
        this.howConnectionElement.root.style.display = 'none';
    }
    startDisplay(){
        this.openOnlineAndHow('OnilneDrawing');
        this.openOnlineAndHow('Network');
    }
    openOnlineAndHow=(typeClick)=>{
        switch (typeClick) {
            case 'Network':
                if(this.root.style.display == 'none'){
                    this.root.style.display = 'flex';
                }
                else{
                    this.root.style.display = 'none';
                }
                break;
            case 'OnilneDrawing' :
                    this.root.style.display = 'flex';
                    this.onlineDrawingElement.root.style.display = 'flex';
                    this.howConnectionElement.root.style.display = 'none';
                break;
            case 'HowConnection' :
                    this.root.style.display = 'flex';
                    this.howConnectionElement.root.style.display = 'flex'; 
                    this.onlineDrawingElement.root.style.display = 'none';
                break;
            case 'Close All':
                    this.root.style.display ='none';
                    this.onlineDrawingElement.root.style.display = 'none';
                    this.howConnectionElement.root.style.display = 'none';
            default:
                console.log('Cheak the code openOnlineAndHow function in NetworkDiv OBJECT');
                break;
        }
    }
    // openOnlineAndHow=(typeClick)=>{
    //     switch (typeClick) {
    //         case 'Network':
    //             if(this.root.style.display == 'none'){
    //                 this.root.style.display = 'flex';
    //             }
    //             else{
    //                 this.root.style.display = 'none';
    //             }
    //             break;
    //         case 'OnilneDrawing' :
    //             if(this.root.style.display == 'none'){
    //                 this.root.style.display = 'flex';
    //                 this.onlineDrawingElement.root.style.display = 'flex';
    //                 this.howConnectionElement.root.style.display = 'none'; // מכבה את הload במידה והוא נשאר פתוח
                    
    //             }
    //             else if(this.root.style.display ='flex' && this.onlineDrawingElement.root.style.display == 'flex'){
    //                 this.root.style.display ='none';
    //                 this.onlineDrawingElement.root.style.display = 'none';
    //                 this.howConnectionElement.root.style.display = 'none'; // מכבה את הload במידה והוא נשאר פתוח
    //             }
    //             else if(this.root.style.display ='flex' &&  this.howConnectionElement.root.style.display == 'flex'){
    //                 this.onlineDrawingElement.root.style.display = 'flex';
    //                 this.howConnectionElement.root.style.display = 'none'; // מכבה את הload במידה והוא נשאר פתוח
    //             }
    //             break;
    //         case 'HowConnection' :
    //             if(this.root.style.display == 'none'){
    //                 this.root.style.display = 'flex';
    //                 this.howConnectionElement.root.style.display = 'flex'; 
    //                 this.onlineDrawingElement.root.style.display = 'none';// מכבה את Save במידה והוא נשאר פתוח
    //             }
    //             else if(this.root.style.display ='flex' &&  this.howConnectionElement.root.style.display == 'flex'){
    //                 this.root.style.display ='none';
    //                 this.onlineDrawingElement.root.style.display = 'none';
    //                 this.howConnectionElement.root.style.display = 'none';// מכבה את Save במידה והוא נשאר פתוח
    //             }
    //             else if(this.root.style.display ='flex' && this.onlineDrawingElement.root.style.display == 'flex'){
    //                 this.onlineDrawingElement.root.style.display = 'none';
    //                 this.howConnectionElement.root.style.display = 'flex';// מכבה את Save במידה והוא נשאר פתוח
    //             }
    //             break;
    //         case 'Close All':
    //                 this.root.style.display ='none';
    //                 this.onlineDrawingElement.root.style.display = 'none';
    //                 this.howConnectionElement.root.style.display = 'none';
    //         default:
    //             console.log('Cheak the code openOnlineAndHow function in NetworkDiv OBJECT');
    //             break;
    //     }
    // }
}