export default class InputsSquare{
    constructor(propertiesBox,TaskManager){
        this.propertiesBox = propertiesBox;
        this.taskManager = TaskManager;
        this.setupElements();
        this.setupSubscribe();
        this.setupEvents();
        this.elementSetting = null;
    }

    setupElements=()=>{
        this.squareXinput = this.propertiesBox.querySelector('#Setting-Square-X-Input');
        this.squareYinput = this.propertiesBox.querySelector('#Setting-Square-Y-Input');
        this.squareWidthInput = this.propertiesBox.querySelector('#Setting-Square-Width-Input');
        this.squareHeightInput = this.propertiesBox.querySelector('#Setting-Square-Height-Input');
        this.squareColorInput = this.propertiesBox.querySelector('#Setting-Square-Color-Input');
        
        this.squareSettingBox = this.propertiesBox.querySelector('#Setting-Square');
    }

    setupSubscribe=()=>{
        this.taskManager.subscribe('updateInputValuesMOVEsquare',this.updateInputValuesMOVEsquare);
        this.taskManager.subscribe('updateInputValuesSIZEsquare',this.updateInputValuesSIZEsquare);
        this.taskManager.subscribe('updateInputValuesCOLORsquare',this.updateInputValuesCOLORsquare);
        this.taskManager.subscribe('updateAllInputsVALUESsquare',this.updateAllInputsVALUESsquare);
    }

    setupEvents=()=>{
        this.squareSettingBox.addEventListener('input',this.cheakInputs);
    }

    setElementSetting=(element)=>{
        this.elementSetting = element;
        if(this.elementSetting!=null){
            this.squareXinput.value = element.getX();
            this.squareYinput.value = element.getY();
            this.squareWidthInput.value = element.getWidth();
            this.squareHeightInput.value = element.getHeight();
            this.squareColorInput.value = element.getColor();
        }
    }
    
    cheakInputs = (event) => {
        const target = event.target;
        const newValue = target.value;
    
        if (target == this.squareXinput) {
            if (this.elementSetting != null) {
                this.elementSetting.setX(newValue);
                this.taskManager.emit('send_IoMove', {
                    task: 'From-Input',
                    id: this.elementSetting.id,
                    location: {
                        x: newValue,
                        y: this.elementSetting.getY(),
                    },
                });
                this.taskManager.emit('updateLocationMini', this.elementSetting.id);
            }
        } else if (target == this.squareYinput) {
            if (this.elementSetting != null) {
                this.elementSetting.setY(newValue);
                this.taskManager.emit('send_IoMove', {
                    task: 'From-Input',
                    id: this.elementSetting.id,
                    location: {
                        x: this.elementSetting.getX(),
                        y: newValue,
                    },
                });
                this.taskManager.emit('updateLocationMini', this.elementSetting.id);
            }
        } else if (target == this.squareWidthInput) {
            if (this.elementSetting != null) {
                this.elementSetting.setWidth(newValue);
                this.taskManager.emit('send_IO_Resize', {
                    id: this.elementSetting.id,
                    size: {
                        width: this.elementSetting.getWidth(),
                        height: this.elementSetting.getHeight(),
                    },
                });
                this.taskManager.emit('updateLocationMini', this.elementSetting.id);
            }
        } else if (target == this.squareHeightInput) {
            if (this.elementSetting != null) {
                this.elementSetting.setHeight(newValue);
                this.taskManager.emit('send_IO_Resize', {
                    id: this.elementSetting.id,
                    size: {
                        width: this.elementSetting.getWidth(),
                        height: this.elementSetting.getHeight(),
                    },
                });
                this.taskManager.emit('updateLocationMini', this.elementSetting.id);
            }
        } else if (target == this.squareColorInput) {
            if (this.elementSetting != null) {
                this.elementSetting.setColor(newValue);
                this.taskManager.emit('send_IO_Color', { id: this.elementSetting.id, color: newValue });
            }
        }
    }
    
    updateInputValuesMOVEsquare=(element)=>{
        if(this.elementSetting!=null){
            this.squareXinput.value = element.getX();
            this.squareYinput.value = element.getY();
        }
    }
    updateInputValuesSIZEsquare=(element)=>{
        if(this.elementSetting!=null){
            this.squareWidthInput.value = element.getWidth();
            this.squareHeightInput.value = element.getHeight();
        }
    }
    updateInputValuesCOLORsquare=(element)=>{
        debugger;
        if(this.elementSetting !=null){
            this.squareColorInput.value = element.getColor();
        }
    }
    updateAllInputsVALUESsquare=(element)=>{
        if(this.elementSetting!=null){
            this.squareXinput.value = element.getX();
            this.squareYinput.value = element.getY();
            this.squareWidthInput.value = element.getWidth();
            this.squareHeightInput.value = element.getHeight();
            this.squareColorInput.value = element.getColor();
        }
    }
}
