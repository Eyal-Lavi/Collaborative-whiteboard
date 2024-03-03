let counter = 0;
import MiniSquaresText from "../MiniSquares/MiniSquaresText";
export default class TextElement{
    constructor(svg,TaskManager,id=null){
        this.svg = svg;
        this.taskManager = TaskManager;

        this.id = id != null ? id : `Text_${counter++}`;

        this.element = this.createText();

        this.MiniSquares = new MiniSquaresText(this,this.taskManager);

        this.setEvents();
        this.setupSubscribe();
    }
    createText(){
        const svgns = "http://www.w3.org/2000/svg";
        const text = document.createElementNS(svgns , 'text'); 
        text.setAttribute('x',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        text.setAttribute('y',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        text.setAttribute('fill','black');
        text.setAttribute("font-size", "20");
        text.textContent = "Enter Text Here";
        text.classList.add('TextElement');
        text.id = this.id ;

        this.isDragging = false; 

        this.svg.appendChild(text);
        return text;
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('moveWithMouse',this.moveWithMouse);
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnTextElement);

        this.taskManager.subscribe('move',this.move);
        this.taskManager.subscribe('changeSizeFromServer',this.changeSizeFromServer);
        this.taskManager.subscribe('changeColorFromServer',this.changeColorFromServer);
        this.taskManager.subscribe('changeValueFromServer',this.changeValueFromServer);
    }
    setEvents=()=>{
        this.element.addEventListener('click',this.sendTheObject);

        this.element.addEventListener('mousedown',()=>{
            if(this.isDragging == false){
                this.taskManager.emit('closeAllMini',false);
                this.MiniSquares.displayMini(true);
                
                this.startDragTime = Date.now();
             }
            this.setIsDraggingOnTextElement(true);
        });
    }
    
    //----------------------------------
    setIsDraggingTrue=()=>{
        this.isDragging = true;
    }
    moveWithMouse=(x,y)=>{// נקרא מה Board
        if(this.isDragging){
            const elementRect = this.element.getBoundingClientRect();
            this.setX(x - ( elementRect.width / 2));
            this.setY(y + (elementRect.height / 2));

            this.MiniSquares.updateLocationMini(this.id);
            // this.taskManager.emit('updateInputValuesMOVEtext',this);
            this.taskManager.emit('updateAllInputsVALUEStext',this);

            this.taskManager.emit('send_IoMove',{
                task:'From-Mouse',
                id:this.id,
                location:{
                    x:this.getX(),
                    y:this.getY(),
                },
            });
        }
    }
    move=(x,y,id,task)=>{
        if(id==this.id){
            // const elementRect = this.element.getBoundingClientRect();
            if(task == 'From-Mouse' || task== 'From-Input'){
                this.setX(x);
                this.setY(y);
            }

            this.MiniSquares.updateLocationMini(this.id);
            // this.taskManager.emit('updateInputValuesMOVEtext',this);
            this.taskManager.emit('updateAllInputsVALUEStext',this);
        }
    }
    changeSizeFromServer=(size,id)=>{
        if(id==this.id){
            console.log(size+" "+id);
            this.setFontSize(size.fontSize);
            // this.taskManager.emit('updateInputValuesSIZEtext',this);
            this.taskManager.emit('updateAllInputsVALUEStext',this);
            this.MiniSquares.updateLocationMini(this.id);
        }
    }
    changeColorFromServer=(color,id)=>{
        if(id==this.id){
            this.setColor(color);
            // this.taskManager.emit('updateInputValuesCOLORtext',this);
            this.taskManager.emit('updateAllInputsVALUEStext',this);
        }
    }
    changeValueFromServer=(value,id)=>{
        debugger;
        if(id==this.id){
            this.setValue(value);
            // this.taskManager.emit('updateInputValuesVALUEtext',this);
            this.taskManager.emit('updateAllInputsVALUEStext',this);
        }
    }
    setIsDraggingOnTextElement=(bool)=>{
        this.isDragging = bool;
    }
    //-----------------------------------
    
    sendTheObject=()=>{
        if((Date.now()-this.startDragTime)<150){
        this.taskManager.emit('openShapeSetting','Text',this);
        }
    }
    setAllInfo(singleShapeInfo){
        this.setValue(singleShapeInfo.value);
        this.setX(singleShapeInfo.x);
        this.setY(singleShapeInfo.y);
        this.setFontSize(singleShapeInfo.size);
        this.setColor(singleShapeInfo.color);
        this.MiniSquares.updateLocationMini(this.getId());
    }
    setValue(val){
        this.element.textContent = val;
    }
    setX(x){
        this.element.setAttribute('x',x);
    }
    setY(y){
        this.element.setAttribute('y',y);
    }
    setFontSize(size){
        this.element.setAttribute('font-size',size);
    }
    setColor(color){
        this.element.setAttribute('fill',color);
    }
    setId(id){
        this.element.id=id;
    }

    getValue(){
        return this.element.textContent;
    }
    getX(){
        return this.element.getAttribute('x');
    }
    getY(){
        return this.element.getAttribute('y');
    }
    getFontSize(){
        return this.element.getAttribute('font-size');
    }
    getColor(){
        return this.element.getAttribute('fill');
    }
    getId(){
        return this.element.id;
    }
}