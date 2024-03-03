export default class DivFatherShapProp{
    constructor(divFather ,TaskManager){
        this.divFather = divFather;
        this.taskManager = TaskManager;
        this.setupElements();

        this.openWindows('Close');

        this.setupSubscribe();
    }
    setupSubscribe(){
        this.taskManager.subscribe('openWindows',this.openWindows);
    }
    setupElements(){
        this.boxProperties = this.divFather.querySelector('#PropertiesBox');
        this.boxShapes = this.divFather.querySelector('#box-shapes');
    }
    openWindows=(task)=>{
        const divFatherDisplay = this.divFather.style.display;
        const boxPropertiesDisplay = this.boxProperties.style.display;
        const boxShapesDisplay = this.boxShapes.style.display;

        if(task == 'Father'){
            if(divFatherDisplay == 'block'){
                this.divFather.style.display = 'none';
                this.boxProperties.style.display = 'none';
                this.boxShapes.style.display = 'none';
            }
            else if(this.divFather.style.display == 'none'){
                this.divFather.style.display == 'block';
            }
        }

        else if(task == 'Shapes'){
            if(divFatherDisplay == 'none' && boxShapesDisplay == 'none'){
                this.divFather.style.display = 'block';
                this.boxShapes.style.display = 'flex';
                this.boxProperties.style.display = 'none';
            }
            else if(divFatherDisplay == 'none' && boxShapesDisplay == 'flex'){
                this.divFather.style.display == 'block';
                this.boxProperties.style.display = 'none';
            }
            else if (divFatherDisplay == 'block' && boxShapesDisplay == 'none'){
                this.boxShapes.style.display = 'flex';
                this.boxProperties.style.display = 'none';
            }
            else{
                this.divFather.style.display = 'none';
                this.boxShapes.style.display = 'none';
                this.boxProperties.style.display = 'none';
            }
        }

        else if(task == 'Properties'){
            if(divFatherDisplay == 'none' && boxPropertiesDisplay == 'none'){
                this.divFather.style.display = 'block';
                this.boxShapes.style.display = 'none';
                this.boxProperties.style.display = 'flex';
            }
            else if(divFatherDisplay == 'none' && boxPropertiesDisplay == 'flex'){
                this.divFather.style.display == 'block';
                this.boxShapes.style.display = 'none';
            }
            else if (divFatherDisplay == 'block' && boxPropertiesDisplay == 'none'){
                this.boxProperties.style.display = 'flex';
                this.boxShapes.style.display = 'none';
            }
            else{
                this.divFather.style.display = 'none';
                this.boxShapes.style.display = 'none';
                this.boxProperties.style.display = 'none';
            }
        }
        
        else if(task == 'Close'){
            this.divFather.style.display = 'none';
            this.boxShapes.style.display = 'none';
            this.boxProperties.style.display = 'none';
        }

        else if (task == 'Close Everything'){
            this.divFather.style.display = 'none';
            this.boxShapes.style.display = 'none';
            this.boxProperties.style.display = 'none';
            this.taskManager.emit('TurnOffEverythingExcept','-Nothing-');
        }
    }
}