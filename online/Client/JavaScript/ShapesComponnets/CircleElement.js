class CircleElement{
    constructor(svg ,TaskManager,id=null){
        debugger;
        this.svg = svg;
        this.taskManager = TaskManager;
        this.id = id != null ? id : `Circle_${counter++}`;
        console.log('id -> ' ,this.id);
        // if(id == null ){
        //     counter++;
        // }
        this.element = this.createCircle();
        
        this.MiniSquares = new MiniSquaresCircle(this,this.taskManager);

        this.setEvents();
        this.setupSubscribe();
    }
    createCircle(){
        const svgns = "http://www.w3.org/2000/svg";
        const circle = document.createElementNS(svgns , 'circle'); 
        circle.setAttribute('r',30);
        circle.setAttribute('cx',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        circle.setAttribute('cy',500);//חצי מהרוחב והגובה שהגדרתי בview box 
        circle.setAttribute('fill','black');
        circle.classList.add('CircleElement');
 
        circle.id = this.id ;
        this.isDragging = false; 

        this.svg.appendChild(circle);
        return circle;
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('moveWithMouse',this.moveWithMouse);
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnCircleElement);

        this.taskManager.subscribe('move',this.move);
        this.taskManager.subscribe('changeSizeFromServer',this.changeSizeFromServer);
        this.taskManager.subscribe('changeColorFromServer',this.changeColorFromServer);
    }
    setEvents=()=>{
        this.element.addEventListener('click',this.sendTheObject);

        this.element.addEventListener('mousedown',()=>{
            if(this.isDragging==false){
                this.taskManager.emit('closeAllMini',false);
                this.MiniSquares.displayMini(true);
                
                this.startDragTime = Date.now();
            }
            this.setIsDraggingOnCircleElement(true);
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
            // this.taskManager.emit('updateInputValuesMOVEcircle',this);
            this.taskManager.emit('updateAllInputsVALUEScircle',this);

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
            // this.taskManager.emit('updateInputValuesMOVEcircle',this);
            this.taskManager.emit('updateAllInputsVALUEScircle',this);

        }
    }
    changeSizeFromServer=(size,id)=>{
        if(id==this.id){
            this.setRadius(size.radius);

            // this.taskManager.emit('updateInputValuesSIZEcircle',this);
            this.taskManager.emit('updateAllInputsVALUEScircle',this);

            this.MiniSquares.updateLocationMini(this.id);
        }
    }
    changeColorFromServer=(color,id)=>{
        if(id==this.id){
            this.setColor(color);
            // this.taskManager.emit('updateInputValuesCOLORcircle',this);
            this.taskManager.emit('updateAllInputsVALUEScircle',this);
        }
    }
    setIsDraggingOnCircleElement=(bool)=>{
        this.isDragging = bool;
    }
    //-----------------------------------

    sendTheObject=()=>{
        if((Date.now()-this.startDragTime)<150){
            this.taskManager.emit('openShapeSetting','Circle',this);
        }
    }
    setAllInfo(singleShapeInfo){
        this.setX(singleShapeInfo.x);
        this.setY(singleShapeInfo.y);
        this.setRadius(singleShapeInfo.radius);
        this.setColor(singleShapeInfo.color);
        this.MiniSquares.updateLocationMini(this.getId());
    }
    setX(x){
        this.element.setAttribute('cx',x);
    }
    setY(y){
        this.element.setAttribute('cy',y);
    }
    setRadius(r){
        this.element.setAttribute('r',r);
    }
    setColor(color){
        this.element.setAttribute('fill',color);
    }
    setId(id){
        this.element.id=id;
    }

    getX(){
        return this.element.getAttribute('cx');
    }
    getY(){
        return this.element.getAttribute('cy');
    }
    getRadius(){
        return this.element.getAttribute('r');
    }
    getColor(){
        return this.element.getAttribute('fill');
    }
    getId(){
        return this.element.id;
    }
}

