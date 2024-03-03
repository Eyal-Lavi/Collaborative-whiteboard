let counter = 0;
import MiniSquaresEllipse from "../MiniSquares/MiniSquaresEllipse";
export default class EllipseElement{
    constructor(svg,TaskManager,id=null){
        this.svg = svg;
        this.taskManager = TaskManager;
        this.id = id != null ? id : `Ellipse_${counter++}`; // counter growup in OnlineDrawing.fs file in function -> send_IO_createElement()
        
        this.element = this.createEllipse();
        this.MiniSquares = new MiniSquaresEllipse(this,this.taskManager);

        this.setEvents();
        this.setupSubscribe();

    }
    createEllipse(){
        const svgns = "http://www.w3.org/2000/svg";
        const ellipse = document.createElementNS(svgns , 'ellipse'); 
        ellipse.setAttribute('cx',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        ellipse.setAttribute('cy',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        ellipse.setAttribute('rx',80);
        ellipse.setAttribute('ry',40);
        ellipse.setAttribute('fill','black');
        ellipse.classList.add('EllipseElement');

        ellipse.id = this.id ;
        this.isDragging = false; 

        this.svg.appendChild(ellipse);        
        return ellipse;
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('moveWithMouse',this.moveWithMouse);
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnEllipseElement);

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
            this.setIsDraggingOnEllipseElement(true);
        });
    }
    
    //----------------------------------
    setIsDraggingTrue=()=>{
        this.isDragging = true;
    }
    moveWithMouse=(x,y)=>{// נקרא מה Board
        if(this.isDragging){
            this.setX(x);
            this.setY(y);

            this.MiniSquares.updateLocationMini(this.id);
            // this.taskManager.emit('updateInputValuesMOVEellipse',this);
            this.taskManager.emit('updateAllInputsVALUESellipse',this);
            
            this.taskManager.emit('send_IoMove',{
                id:this.id,
                location:{
                    x,
                    y,
                },
            });
        }
    }
    move=(x,y,id)=>{
        if(id==this.id){
            this.setX(x);
            this.setY(y);
            
            this.MiniSquares.updateLocationMini(this.id);
            // this.taskManager.emit('updateInputValuesMOVEellipse',this);
            this.taskManager.emit('updateAllInputsVALUESellipse',this);
        }
    }
    changeSizeFromServer=(size,id)=>{
        if(id==this.id){
            this.setWidth(size.width);
            this.setHeight(size.height);

            // this.taskManager.emit('updateInputValuesSIZEellipse',this);
            this.taskManager.emit('updateAllInputsVALUESellipse',this);
            this.MiniSquares.updateLocationMini(this.id);
        }
    }
    changeColorFromServer=(color,id)=>{
        if(id==this.id){
            this.setColor(color);
            // this.taskManager.emit('updateInputValuesCOLORellipse',this);
            this.taskManager.emit('updateAllInputsVALUESellipse',this);
        }
    }
    setIsDraggingOnEllipseElement=(bool)=>{
        this.isDragging = bool;
    }
    //-----------------------------------
    
    sendTheObject=()=>{
        if((Date.now()-this.startDragTime)<150){
        this.taskManager.emit('openShapeSetting','Ellipse',this);
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
        this.element.setAttribute('cx',x);
    }
    setY(y){
        this.element.setAttribute('cy',y);
    }
    setWidth(y){
        this.element.setAttribute('rx',y);
    }
    setHeight(y){
        this.element.setAttribute('ry',y);
    }
    setColor(color){
        this.element.setAttribute('fill',color);
    }
    setId(id){
        this.element.id=id;
    }

    getX(){
        return Number(this.element.getAttribute('cx'));
    }
    getY(){
        return Number(this.element.getAttribute('cy'));
    }
    getWidth(){
        return Number(this.element.getAttribute('rx'));
    }
    getHeight(){
        return Number(this.element.getAttribute('ry'));
    }
    getColor(){
        return this.element.getAttribute('fill');
    }
    getId(){
        return this.element.id;
    }
}