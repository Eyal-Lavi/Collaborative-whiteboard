class InputsRectangle{
    constructor(propertiesBox,TaskManager){
        this.propertiesBox = propertiesBox;
        this.taskManager = TaskManager;
        this.setupElements();
        this.setupSubscribe();
        this.setupEvents();
        this.elementSetting = null;
    }
    setupElements=()=>{
        this.rectangleXinput = this.propertiesBox.querySelector('#Setting-Rectangle-X-Input');
        this.rectangleYinput = this.propertiesBox.querySelector('#Setting-Rectangle-Y-Input');
        this.rectangleWidthInput = this.propertiesBox.querySelector('#Setting-Rectangle-Width-Input');
        this.rectangleHeightInput = this.propertiesBox.querySelector('#Setting-Rectangle-Height-Input');
        this.rectangleColorInput = this.propertiesBox.querySelector('#Setting-Rectangle-Color-Input');

        this.rectangleSettingBox = this.propertiesBox.querySelector('#Setting-Rectangle');

    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('updateInputValuesMOVErectangle',this.updateInputValuesMOVErectangle);
        this.taskManager.subscribe('updateInputValuesSIZErectangle',this.updateInputValuesSIZErectangle);
        this.taskManager.subscribe('updateInputValuesCOLORrectangle',this.updateInputValuesCOLORrectangle);
        this.taskManager.subscribe('updateAllInputsVALUESrectangle',this.updateAllInputsVALUESrectangle);
    }
    setupEvents=()=>{
        this.rectangleSettingBox.addEventListener('input',this.cheakInputs);
    }
    setElementSetting=(element)=>{
        this.elementSetting = element;
        if(this.elementSetting!=null){
            this.rectangleXinput.value = element.getX();
            this.rectangleYinput.value = element.getY();
            this.rectangleWidthInput.value = element.getWidth();
            this.rectangleHeightInput.value = element.getHeight();
            this.rectangleColorInput.value = element.getColor();
        }
    }
    cheakInputs=(event)=>{
        const target = event.target;
        const newValue = target.value;

        if(target == this.rectangleXinput){
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
        else if(target == this.rectangleYinput){
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
        else if(target == this.rectangleWidthInput){
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
        else if(target == this.rectangleHeightInput){
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
        else if(target == this.rectangleColorInput){
            if(this.elementSetting!=null){
                this.elementSetting.setColor(newValue);
                this.taskManager.emit('send_IO_Color',{id:this.elementSetting.id,color:newValue});
            }
        }
    }
    updateInputValuesMOVErectangle=(element)=>{
        if(this.elementSetting!=null){
            this.rectangleXinput.value = element.getX();
            this.rectangleYinput.value = element.getY();
        }
    }
    updateInputValuesSIZErectangle=(element)=>{
        if(this.elementSetting!=null){
            this.rectangleWidthInput.value = element.getWidth();
            this.rectangleHeightInput.value = element.getHeight();
        }
    }
    updateInputValuesCOLORrectangle=(element)=>{
        debugger;
        if(this.elementSetting !=null){
            this.rectangleColorInput.value = element.getColor();
        }
    }
    updateAllInputsVALUESrectangle=(element)=>{
        if(this.elementSetting!=null){
            this.rectangleXinput.value = element.getX();
            this.rectangleYinput.value = element.getY();
            this.rectangleWidthInput.value = element.getWidth();
            this.rectangleHeightInput.value = element.getHeight();
            this.rectangleColorInput.value = element.getColor();
        }
    }
}