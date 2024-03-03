import InputsCircle from '../InputsSettingElements/InputsCircle'
import InputsEllipse from '../InputsSettingElements/InputsEllipse'
import InputsRectangle from '../InputsSettingElements/InputsRectangle'
import InputsSquare from '../InputsSettingElements/InputsSquare'
import InputsText from '../InputsSettingElements/InputsText'

export default class PropertiesBox{
    constructor(DivFatherShapProp,TaskManager){
        this.divFather = DivFatherShapProp;
        this.taskManager = TaskManager;

        this.propertiesBox = DivFatherShapProp.querySelector('#PropertiesBox');
        this.allSettingShapesArr = this.propertiesBox.children;

        this.setEventsInputs();
        this.setSubscribe();
        this.setEvents();
        
        this.elementSetting = null;
        
        this.TurnOffEverythingExcept('Nothing');
    }
    setEventsInputs(){
        this.inputsCircle = new InputsCircle(this.propertiesBox,this.taskManager);
        this.inputsEllipse = new InputsEllipse(this.propertiesBox,this.taskManager);
        this.inputsRectangle = new InputsRectangle(this.propertiesBox,this.taskManager);
        this.inputsSquare = new InputsSquare(this.propertiesBox,this.taskManager);
        this.inputsText = new InputsText(this.propertiesBox,this.taskManager);
    }
    setSubscribe=()=>{
        this.taskManager.subscribe('openShapeSetting',this.openShapeSetting);
        this.taskManager.subscribe('TurnOffEverythingExcept',this.TurnOffEverythingExcept);
    }
    setEvents=()=>{
        this.propertiesBox.addEventListener('click',this.cheakerClicks);
    }
    
    cheakerClicks=(event)=>{
        switch(event.target.id){
            case 'circleBtn':
                this.taskManager.emit('addShape','Circle')
                console.log('circleBtn');
                break;
            case 'squareBtn':
                this.taskManager.emit('addShape','Square')
                console.log('squareBtn');
                break;
            case 'rectangleBtn':
                this.taskManager.emit('addShape','Rectangle')
                console.log('rectangleBtn');
                break;
            case 'ellipseBtn':
                this.taskManager.emit('addShape','Ellipse')
                console.log('ellipseBtn');
                break;
            case 'textBtn':
                this.taskManager.emit('addShape','Text')
                console.log('textBtn');
                break;
            default:
                console.log('No Buttons');
        }
    }

    openShapeSetting=(typeShape,shapeElement)=>{
        if(typeShape == 'Circle' || typeShape == 'Square'|| typeShape == 'Rectangle'|| typeShape == 'Ellipse'|| typeShape =='Text'){
            if(this.elementSetting == shapeElement){
                this.taskManager.emit('openWindows','Properties');
                this.cheakWereToSendTheElements(typeShape , this.elementSetting);
                this.TurnOffEverythingExcept(typeShape);
            }
            else{
                this.elementSetting = shapeElement;
                this.taskManager.emit('openWindows','Close');
            }
        }
        else{
            this.elementSetting = null;
            this.taskManager.emit('openWindows','Close');
            this.TurnOffEverythingExcept(typeShape);
        }
    }
    TurnOffEverythingExcept=(typeShape)=>{ // מכבה את הכל חוץ מ 
        for(let element of this.allSettingShapesArr){
            if(element.id.endsWith(typeShape)){
                element.style.display = 'flex'; // לבדוק יכול להיות שבהמשך אני ארצה שיהיה flex          
            }
            else{
                element.style.display = 'none';
            }
        }
    }
    cheakWereToSendTheElements(typeShape , element){
        if(element == null){
            this.inputsCircle.setElementSetting(null);
            this.inputsEllipse.setElementSetting(null);
            this.inputsRectangle.setElementSetting(null);
            this.inputsSquare.setElementSetting(null);
            this.inputsText.setElementSetting(null);
        }
        else {
            if(typeShape=='Circle'){
                this.inputsCircle.setElementSetting(element);
            }
            else if(typeShape == 'Square'){
                this.inputsSquare.setElementSetting(element);

            }
            else if(typeShape == 'Rectangle'){
                this.inputsRectangle.setElementSetting(element);

            }
            else if(typeShape == 'Ellipse'){
                this.inputsEllipse.setElementSetting(element);

            }
            else if(typeShape =='Text'){
                this.inputsText.setElementSetting(element);

            }
        }
    }

}