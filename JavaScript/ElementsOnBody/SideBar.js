export default class SideBar{
    constructor(bodyElement,taskManager){
        this.bodyElement = bodyElement;
        this.taskManager = taskManager;
        this.createElements();
        this.setEevents();
    }
    createElements(){
        this.sideBarElement = this.bodyElement.querySelector('#sideBar');
        this.shapeButton = this.sideBarElement.querySelector('#ShapesButton');
        this.textButton = this.sideBarElement.querySelector('#TextButton');
        this.propertiesButton = this.sideBarElement.querySelector('#PropertiesButton');
        this.saveButton = this.sideBarElement.querySelector('#SaveButton');
        this.loadButton = this.sideBarElement.querySelector('#LoadButton');
        this.networkButton = this.sideBarElement.querySelector('#LoadNetwork');
    }
    setEevents(){
        this.shapeButton.addEventListener('click',this.clickOnShapesButton);
        this.textButton.addEventListener('click',this.clickOnTextButton);
        this.propertiesButton.addEventListener('click',this.clickOnPropertiesButton);
        this.saveButton.addEventListener('click',this.clickOnSaveButton);
        this.loadButton.addEventListener('click',this.clickOnLoadButton);
    }
    clickOnShapesButton=()=>{
        this.taskManager.emit('openSaveANDloadDiv','Close All')
        this.taskManager.emit('openWindows','Shapes');
        console.log('ShapesButton');
    }
    clickOnTextButton=()=>{
        this.taskManager.emit('openSaveANDloadDiv','Close All')
        this.taskManager.emit('addShape','Text')
        console.log('TextButton');
    }
    clickOnPropertiesButton=()=>{
        this.taskManager.emit('openSaveANDloadDiv','Close All')
        this.taskManager.emit('openWindows','Properties');
        console.log('PropertiesButton');
    }
    clickOnSaveButton=()=>{
        this.taskManager.emit('openWindows','Close Everything'); // if Shape Box or Properties Box , Close them
        this.taskManager.emit('openSaveANDloadDiv','Save')
        console.log('SaveButton');
    }
    clickOnLoadButton=()=>{
        this.taskManager.emit('openWindows','Close Everything'); // if Shape Box or Properties Box , Close them
        this.taskManager.emit('openSaveANDloadDiv','Load')
        console.log('LoadButton');
    }
    clickOnNetworkButton=()=>{
        this.taskManager.emit('openWindows','Close Everything'); // if Shape Box or Properties Box , Close them
        this.taskManager.emit('openSaveANDloadDiv','Close All')
        this.taskManager.emit('openOnlineAndHow','Network');
        console.log('NetworkButton');
    }
}