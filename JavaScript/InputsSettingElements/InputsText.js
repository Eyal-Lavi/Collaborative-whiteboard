export default class InputsText{
    constructor(propertiesBox,TaskManager){
        this.propertiesBox = propertiesBox;
        this.taskManager = TaskManager;
        this.setupElements();
        this.setupSubscribe();
        this.setupEvents();
        this.elementSetting = null;
    }
    setupElements=()=>{
        this.textValueinput = this.propertiesBox.querySelector('#Setting-Text-Value-Input');
        this.textXinput = this.propertiesBox.querySelector('#Setting-Text-X-Input');
        this.textYinput = this.propertiesBox.querySelector('#Setting-Text-Y-Input');
        this.textSizeInput = this.propertiesBox.querySelector('#Setting-Text-Size-Input');
        this.textColorInput = this.propertiesBox.querySelector('#Setting-Text-Color-Input');

        this.textSettingBox = this.propertiesBox.querySelector('#Setting-Text');

    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('updateInputValuesMOVEtext',this.updateInputValuesMOVEtext);
        this.taskManager.subscribe('updateInputValuesSIZEtext',this.updateInputValuesSIZEtext);
        this.taskManager.subscribe('updateInputValuesCOLORtext',this.updateInputValuesCOLORtext);
        this.taskManager.subscribe('updateInputValuesVALUEtext',this.updateInputValuesVALUEtext);
        this.taskManager.subscribe('updateAllInputsVALUEStext',this.updateAllInputsVALUEStext);
    }
    setupEvents=()=>{
        this.textSettingBox.addEventListener('input',this.cheakInputs);
    }
    setElementSetting=(element)=>{
        this.elementSetting = element;
        if(this.elementSetting!=null){
            this.textValueinput.value = element.getValue();
            this.textXinput.value = element.getX();
            this.textYinput.value = element.getY();
            this.textSizeInput.value = element.getFontSize();
            this.textColorInput.value = element.getColor();
        }
    }
    cheakInputs=(event)=>{
        const target = event.target;
        const newValue = target.value;

        if(target == this.textValueinput){
            if(this.elementSetting!=null){
                this.elementSetting.setValue(newValue);
                this.taskManager.emit('send_IO_TextValue',{id:this.elementSetting.id,value:newValue});
            }
        }
        else if(target == this.textXinput){
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
        else if(target == this.textYinput){
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
        else if(target == this.textSizeInput){
            if(this.elementSetting!=null){
                this.elementSetting.setFontSize(newValue);
                this.taskManager.emit('send_IO_Resize',{
                    id:this.elementSetting.id,
                    size:{
                        fontSize:this.elementSetting.getFontSize()
                    }
                });// io
                this.taskManager.emit('updateLocationMini',this.elementSetting.id);
            }
        }

        else if(target == this.textColorInput){
            if(this.elementSetting!=null){
                this.elementSetting.setColor(newValue);
                this.taskManager.emit('send_IO_Color',{id:this.elementSetting.id,color:newValue});
            }
        }
    }
    updateInputValuesMOVEtext=(element)=>{
        if(this.elementSetting!=null){
            this.textXinput.value = element.getX();
            this.textYinput.value = element.getY();
        }
    }
    updateInputValuesSIZEtext=(element)=>{
        if(this.elementSetting!=null){
            this.textSizeInput.value = element.getFontSize();
        }
    }
    updateInputValuesCOLORtext=(element)=>{
        if(this.elementSetting !=null){
            this.textColorInput.value = element.getColor();
        }
    }
    updateInputValuesVALUEtext=(element)=>{
        if(this.elementSetting !=null){
            this.textValueinput.value = element.getValue();
        }
    }
    updateAllInputsVALUEStext=(element)=>{
        if(this.elementSetting!=null){
            this.textXinput.value = element.getX();
            this.textYinput.value = element.getY();
            this.textSizeInput.value = element.getFontSize();
            this.textColorInput.value = element.getColor();
            this.textValueinput.value = element.getValue();
        }
    }
}