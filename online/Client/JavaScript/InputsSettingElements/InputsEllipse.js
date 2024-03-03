class InputsEllipse{
    constructor(propertiesBox,TaskManager){
        this.propertiesBox = propertiesBox;
        this.taskManager = TaskManager;
        this.setupElements();
        this.setupEvents();
        this.setupSubscribe();
        this.elementSetting = null;
    }
    setupElements=()=>{
        this.ellipseXinput = this.propertiesBox.querySelector('#Setting-Ellipse-X-Input');
        this.ellipseYinput = this.propertiesBox.querySelector('#Setting-Ellipse-Y-Input');
        this.ellipseWidthInput = this.propertiesBox.querySelector('#Setting-Ellipse-Width-Input');
        this.ellipseHeightInput = this.propertiesBox.querySelector('#Setting-Ellipse-Height-Input');
        this.ellipseColorInput = this.propertiesBox.querySelector('#Setting-Ellipse-Color-Input');
        
        this.ellipseSettingBox = this.propertiesBox.querySelector('#Setting-Ellipse');

    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('updateInputValuesMOVEellipse',this.updateInputValuesMOVEellipse);
        this.taskManager.subscribe('updateInputValuesSIZEellipse',this.updateInputValuesSIZEellipse);
        this.taskManager.subscribe('updateInputValuesCOLORellipse',this.updateInputValuesCOLORellipse);
        this.taskManager.subscribe('updateAllInputsVALUESellipse',this.updateAllInputsVALUESellipse);
    }
    setupEvents=()=>{
        this.ellipseSettingBox.addEventListener('input',this.cheakInputs);
    }
    setElementSetting=(element)=>{
        this.elementSetting = element;
        if(this.elementSetting!=null){
            this.ellipseXinput.value = element.getX();
            this.ellipseYinput.value = element.getY();
            this.ellipseWidthInput.value = element.getWidth();
            this.ellipseHeightInput.value = element.getHeight();
            this.ellipseColorInput.value = element.getColor();
        }
    }
    cheakInputs=(event)=>{
        const target = event.target;
        const newValue = target.value;

        if(target == this.ellipseXinput){
            if(this.elementSetting!=null){
                this.elementSetting.setX(newValue);
                this.taskManager.emit('send_IoMove',{
                    task:'From-Input',
                    id:this.elementSetting.id,
                    location:{
                        x:newValue,//cheak
                        y:this.elementSetting.getY(),
                    },
                });
                this.taskManager.emit('updateLocationMini',this.elementSetting.id);
            }
        }
        else if(target == this.ellipseYinput){
            if(this.elementSetting!=null){
                this.elementSetting.setY(newValue);
                this.taskManager.emit('send_IoMove',{
                    task:'From-Input',
                    id:this.elementSetting.id,
                    location:{
                        x:this.elementSetting.getX(),
                        y:newValue,//cheak
                    },
                });
                this.taskManager.emit('updateLocationMini',this.elementSetting.id);
            }
        }
        else if(target == this.ellipseWidthInput){
            if(this.elementSetting!=null){
                this.elementSetting.setWidth(newValue);
                this.taskManager.emit('send_IO_Resize',{
                    id:this.elementSetting.id,
                    size:{
                        width:this.elementSetting.getWidth(),
                        height:this.elementSetting.getHeight()
                    }
                });// io
                this.taskManager.emit('updateLocationMini',this.elementSetting.id);
            }
        }
        else if(target == this.ellipseHeightInput){
            if(this.elementSetting!=null){
                this.elementSetting.setHeight(newValue);
                this.taskManager.emit('send_IO_Resize',{
                    id:this.elementSetting.id,
                    size:{
                        width:this.elementSetting.getWidth(),
                        height:this.elementSetting.getHeight()
                    }
                });// io
                this.taskManager.emit('updateLocationMini',this.elementSetting.id);
            }
        }
        else if(target == this.ellipseColorInput){
            if(this.elementSetting!=null){
                this.elementSetting.setColor(newValue);
                this.taskManager.emit('send_IO_Color',{id:this.elementSetting.id,color:newValue});
            }
        }
    }
    updateInputValuesMOVEellipse=(element)=>{
        if(this.elementSetting!=null){
            this.ellipseXinput.value = element.getX();
            this.ellipseYinput.value = element.getY();
        }
    }
    updateInputValuesSIZEellipse=(element)=>{
        if(this.elementSetting!=null){
            this.ellipseWidthInput.value = element.getWidth();
            this.ellipseHeightInput.value = element.getHeight();
        }
    }
    updateInputValuesCOLORellipse=(element)=>{
        if(this.elementSetting !=null){
            this.ellipseColorInput.value = element.getColor();
        }
    }
    updateAllInputsVALUESellipse=(element)=>{
        if(this.elementSetting!=null){
            this.ellipseXinput.value = element.getX();
            this.ellipseYinput.value = element.getY();
            this.ellipseWidthInput.value = element.getWidth();
            this.ellipseHeightInput.value = element.getHeight();
            this.ellipseColorInput.value = element.getColor();
        }
    }
}