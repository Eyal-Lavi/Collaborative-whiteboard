class SquareElement{
    constructor(svg,TaskManager,id=null){
        this.svg = svg;
        this.taskManager = TaskManager;

        this.id = id != null ? id : `Square_${counter++}`;

        this.element = this.createSquare();

        this.MiniSquares = new MiniSquaresSquare(this,this.taskManager);

        this.setEvents();
        this.setupSubscribe();
    }

    createSquare=()=>{
        const svgns = "http://www.w3.org/2000/svg";
        const square = document.createElementNS(svgns , 'rect'); 
        square.setAttribute('width',150);
        square.setAttribute('height',150);
        square.setAttribute('x',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        square.setAttribute('y',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        square.setAttribute('fill','black');
        square.classList.add('SquareElement');
        square.id = this.id ;

        this.isDragging = false; ;
        
        this.svg.appendChild(square);
        return square;
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
            this.setX(x-(this.getWidth()/2));
            this.setY(y-(this.getHeight()/2));

            this.MiniSquares.updateLocationMini(this.id);
            // this.taskManager.emit('updateInputValuesMOVEsquare',this);
            this.taskManager.emit('updateAllInputsVALUESsquare',this);

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
            // this.taskManager.emit('updateInputValuesMOVEsquare',this);
            this.taskManager.emit('updateAllInputsVALUESsquare',this);
            this.MiniSquares.updateLocationMini(this.id);
        }
    }
    changeSizeFromServer=(size,id)=>{
        if(id==this.id){
            this.setWidth(size.width);
            this.setHeight(size.height);

            // this.taskManager.emit('updateInputValuesSIZEsquare',this);
            this.taskManager.emit('updateAllInputsVALUESsquare',this);
            this.MiniSquares.updateLocationMini(this.id);

        }
    }
    changeColorFromServer=(color,id)=>{
        debugger;
        if(id==this.id){
            this.setColor(color);
            // this.taskManager.emit('updateInputValuesCOLORsquare',this);
            this.taskManager.emit('updateAllInputsVALUESsquare',this);
        }
    }
    setIsDraggingOnEllipseElement=(bool)=>{
        this.isDragging = bool;
    }
    //-----------------------------------
    
    sendTheObject=()=>{
        if((Date.now()-this.startDragTime)<150){
        this.taskManager.emit('openShapeSetting','Square',this);
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
    setX=(x)=>{
        // this.element.setAttribute('x',x+(this.getWidth()/2));
        this.element.setAttribute('x',x);

    }
    setY(y){
        // this.element.setAttribute('y',y+(this.getHeight()/2));
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