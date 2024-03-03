let counter = 0;
import MiniSquaresRectangle from "../MiniSquares/MiniSquaresRectangle";
export default class RectangleElement{
    constructor(svg,TaskManager,id=null){
        this.svg = svg;
        this.taskManager = TaskManager;

        this.id = id != null ? id : `Rectangle_${counter++}`;
        
        this.element = this.createSquare();

        this.MiniSquares = new MiniSquaresRectangle(this,this.taskManager);

        this.setEvents();
        this.setupSubscribe();
    }
    createSquare(){
        const svgns = "http://www.w3.org/2000/svg";
        const rectangle = document.createElementNS(svgns , 'rect'); 
        rectangle.setAttribute('width',300);
        rectangle.setAttribute('height',150);
        rectangle.setAttribute('x',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        rectangle.setAttribute('y',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        rectangle.setAttribute('fill','black');
        rectangle.classList.add('RectangleElement');

        rectangle.id = this.id ;

        this.isDragging = false; 

        this.svg.appendChild(rectangle);
        return rectangle;
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('moveWithMouse',this.moveWithMouse);
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnRectangleElement);
        
        this.taskManager.subscribe('move',this.move);
        this.taskManager.subscribe('changeSizeFromServer',this.changeSizeFromServer);
        this.taskManager.subscribe('changeColorFromServer',this.changeColorFromServer);
    }
    setEvents=()=>{
        this.element.addEventListener('click',this.sendTheObject);

        this.element.addEventListener('mousedown',()=>{
            if(this.isDragging == false){
                this.taskManager.emit('closeAllMini',false);
                this.MiniSquares.displayMini(true);
                
                this.startDragTime = Date.now();
             }
            this.setIsDraggingOnRectangleElement(true);
        });
    }
    
    //----------------------------------
    setIsDraggingTrue=()=>{
        this.isDragging = true;
    }
    moveWithMouse=(x,y)=>{// נקרא מה Board
        if(this.isDragging){
            this.setX(x-(this.getWidth()/2));
            this.setY(y-(this.getHeight()/2));

            this.MiniSquares.updateLocationMini(this.id);
            // this.taskManager.emit('updateInputValuesMOVErectangle',this);
            this.taskManager.emit('updateAllInputsVALUESrectangle',this);

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
            if(task == 'From-Input' || task == 'From-Mouse'){
                this.setX(x);
                this.setY(y);
            }
            // if(task == 'From-Input'){
            //     this.setX(x);
            //     this.setY(y);
            // }
            // else if(task == 'From-Mouse'){
            //     this.setX(x-(this.getWidth()/2));
            //     this.setY(y-(this.getHeight()/2));
            // }
            // this.taskManager.emit('updateInputValuesMOVErectangle',this);
            this.taskManager.emit('updateAllInputsVALUESrectangle',this);
            this.MiniSquares.updateLocationMini(this.id);
        }
    }
    // move_from_input=(x,y,id)=>{
    //     if(id==this.id){
    //         this.setX(x);
    //         this.setY(y);
    //         debugger;
    //         this.taskManager.emit('updateInputValuesMOVErectangle',this);
    //         this.MiniSquares.updateLocationMini(this.id);
    //     }
    // }
    changeSizeFromServer=(size,id)=>{
        if(id==this.id){
            this.setWidth(size.width);
            this.setHeight(size.height);

            // this.taskManager.emit('updateInputValuesSIZErectangle',this);
            this.taskManager.emit('updateAllInputsVALUESrectangle',this);
            this.MiniSquares.updateLocationMini(this.id);

        }
    }
    changeColorFromServer=(color,id)=>{
        if(id==this.id){
            this.setColor(color);
            // this.taskManager.emit('updateInputValuesCOLORrectangle',this);
            this.taskManager.emit('updateAllInputsVALUESrectangle',this);
        }
    }
    setIsDraggingOnRectangleElement=(bool)=>{
        this.isDragging = bool;
    }
    //-----------------------------------
    
    sendTheObject=()=>{
        if((Date.now()-this.startDragTime)<150){
        this.taskManager.emit('openShapeSetting','Rectangle',this);
        }
    }
    setAllInfo(singleShapeInfo){
        this.setX(singleShapeInfo.x);
        this.setY(singleShapeInfo.y);
        this.setWidth(singleShapeInfo.width);
        this.setHeight(singleShapeInfo.height);
        this.setColor(singleShapeInfo.color);
        this.MiniSquares.updateLocationMini(this.getId());
    }
    setX(x){
        this.element.setAttribute('x',x);
    }
    setY(y){
        this.element.setAttribute('y',y);
    }
    setWidth(width){
        this.element.setAttribute('width',width);
    }
    setHeight(height){
        this.element.setAttribute('height',height);
    }
    setColor(color){
        this.element.setAttribute('fill',color);
    }
    setId(id){
        this.element.id=id;
    }

    getX(){
        return this.element.getAttribute('x');
    }
    getY(){
        return this.element.getAttribute('y');
    }
    getWidth(){
        return this.element.getAttribute('width');
    }
    getHeight(){
        return this.element.getAttribute('height');
    }
    getColor(){
        return this.element.getAttribute('fill');
    }
    getId(){
        return this.element.id;
    }
}