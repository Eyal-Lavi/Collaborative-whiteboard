class InputsCircle{
    constructor(propertiesBox ,TaskManager){
        this.propertiesBox = propertiesBox;
        this.taskManager = TaskManager;
        this.setupElements();
        this.setupEvents();
        this.setupSubscribe();
        this.elementSetting = null;
    }
    setupElements=()=>{
        this.circleXinput = this.propertiesBox.querySelector('#Setting-Circle-X-Input');
        this.circleYinput = this.propertiesBox.querySelector('#Setting-Circle-Y-Input');
        this.circleRadiusInput = this.propertiesBox.querySelector('#Setting-Circle-Radius-Input');
        this.circleColorInput = this.propertiesBox.querySelector('#Setting-Circle-Color-Input');

        this.circleSettingBox = this.propertiesBox.querySelector('#Setting-Circle');
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('updateInputValuesMOVEcircle',this.updateInputValuesMOVEcircle);
        this.taskManager.subscribe('updateInputValuesSIZEcircle',this.updateInputValuesSIZEcircle);
        this.taskManager.subscribe('updateInputValuesCOLORcircle',this.updateInputValuesCOLORcircle);
        this.taskManager.subscribe('updateAllInputsVALUEScircle',this.updateAllInputsVALUEScircle);

    }
    setupEvents=()=>{
        this.circleSettingBox.addEventListener('input',this.cheakInputs);
        
    }
    setElementSetting=(element)=>{
        this.elementSetting = element;
        if(this.elementSetting!=null){
            this.circleXinput.value = element.getX();
            this.circleYinput.value = element.getY();
            this.circleRadiusInput.value = element.getRadius();
            this.circleColorInput.value = element.getColor();
        }
    }
    cheakInputs=(event)=>{
        const target = event.target;
        const newValue = target.value;

        if(target == this.circleXinput){
            if(this.elementSetting!=null){
                this.elementSetting.setX(newValue);
                this.taskManager.emit('send_IoMove',{
                    id:this.elementSetting.id,
                    location:{
                        x:this.elementSetting.getX(),
                        y:this.elementSetting.getY(),
                    },
                });
                this.taskManager.emit('updateLocationMini',this.elementSetting.id);
            }
        }
        else if(target == this.circleYinput){
            if(this.elementSetting!=null){
                this.elementSetting.setY(newValue);
                this.taskManager.emit('send_IoMove',{
                    id:this.elementSetting.id,
                    location:{
                        x:this.elementSetting.getX(),
                        y:this.elementSetting.getY(),
                    },
                });
                this.taskManager.emit('updateLocationMini',this.elementSetting.id);
            }
        }
        else if(target == this.circleRadiusInput){
            if(this.elementSetting!=null){
                this.elementSetting.setRadius(newValue);
                this.taskManager.emit('send_IO_Resize',{id:this.elementSetting.id,size:{radius:this.elementSetting.getRadius()}})// io
                this.taskManager.emit('updateLocationMini',this.elementSetting.id);
            }
        }
        else if(target == this.circleColorInput){
            if(this.elementSetting!=null){
                this.elementSetting.setColor(newValue);
                this.taskManager.emit('send_IO_Color',{id:this.elementSetting.id,color:newValue});
            }
        }
    }
    cheakCircleSettingBox=()=>{ //Cheak if its open
        // return this.circleSettingBox.display == 'flex';
        return true;
    }
    updateInputValuesMOVEcircle=(element)=>{
        if(this.elementSetting!=null){
            this.circleXinput.value = element.getX();
            this.circleYinput.value = element.getY();
        }
    }
    updateInputValuesSIZEcircle=(element)=>{
        if(this.elementSetting!=null){
            this.circleRadiusInput.value = element.getRadius();
        }
    }
    updateInputValuesCOLORcircle=(element)=>{
        if(this.elementSetting!=null){
            this.circleColorInput.value = element.getColor();
        }
    }
    updateAllInputsVALUEScircle=(element)=>{
        if(this.elementSetting!=null){
            this.circleColorInput.value = element.getColor();
            this.circleRadiusInput.value = element.getRadius();
            this.circleRadiusInput.value = element.getRadius();
            this.circleXinput.value = element.getX();
            this.circleYinput.value = element.getY();
        }
    }
}