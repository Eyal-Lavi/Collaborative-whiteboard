export default class MiniSquaresRectangle{
    constructor(element ,TaskManager){
        this.root = element;
        this.taskManager= TaskManager;
        this.svg = this.root.svg;
        this.rectangleFather = this.root.element;

        this.createMiniSquares();
        this.setupSubscribe();
        this.setEvents();
        this.displayMini(false);
    }
    createMiniSquares(){
        const svgns = "http://www.w3.org/2000/svg";
        this.miniStyleWidth = 15;
        this.miniStyleHeight = 15;
        this.bonus = 5;

        this.MiniTop = document.createElementNS(svgns ,'rect');
        this.MiniTop.setAttribute('width',this.miniStyleWidth);
        this.MiniTop.setAttribute('height',this.miniStyleHeight);
        this.MiniTop.setAttribute('fill','red');
        this.setMiniLowerX();
        this.setMiniLowerY();

        this.MiniRight = document.createElementNS(svgns ,'rect');
        this.MiniRight.setAttribute('width',this.miniStyleWidth);
        this.MiniRight.setAttribute('height',this.miniStyleHeight);
        this.MiniRight.setAttribute('fill','red');
        this.setMiniRightX();
        this.setMiniRightY();
        
        this.svg.appendChild(this.MiniTop);
        this.svg.appendChild(this.MiniRight);

        this.setIsDraggingOnRectangleMini(false);
    }
    displayMini=(bool)=>{
        this.MiniTop.style.display = bool == true ? '': 'none' ;
        this.MiniRight.style.display = bool == true ? '' : 'none' ;
    }
    updateLocationMini=(id)=>{
        if(this.root.id == id){
            this.setMiniRightX();
            this.setMiniRightY();
            this.setMiniLowerX();
            this.setMiniLowerY();
        }
    }
    //---------------------------------------------------
    setEvents=()=>{
        this.MiniTop.addEventListener('mousedown',()=>{
            this.setIsDraggingOnRectangleMiniTop(true);
        });
        this.MiniRight.addEventListener('mousedown',()=>{
            this.setIsDraggingOnRectangleMiniRight(true);
        });
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('moveWithMouse',this.moveWithMouse);
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnRectangleMini);
        this.taskManager.subscribe('closeAllMini',this.displayMini);
        this.taskManager.subscribe('updateLocationMini',this.updateLocationMini);
    }
    //----------------------------------------------------
    moveWithMouse=(x,y)=>{// נקרא מה Board
        if(this.isDraggingMiniRight){
                debugger;
                this.moveMiniRight(x);
                this.taskManager.emit('updateInputValuesSIZErectangle',this.root);
        }
        if(this.isDraggingMiniTop){
                this.moveMiniLower(y);
                this.taskManager.emit('updateInputValuesSIZErectangle',this.root);
        }
        // this.updateLocationMini();
    }
    moveMiniRight=(x)=>{
            const rectangleX = Number(this.rectangleFather.getAttribute('x'));
            const newLocation = x + this.bonus;
            this.MiniRight.setAttribute('x', newLocation );

            let newWidth = x - rectangleX - this.bonus;
            if(newWidth<0){
                newWidth = Math.abs(newWidth);
            }
            this.rectangleFather.setAttribute('width' , newWidth);
            this.taskManager.emit('send_IO_Resize',{id:this.root.id,size:{width:this.root.getWidth(),height:this.root.getHeight()}})// io
            this.updateLocationMini(this.root.id);
    }
    moveMiniLower=(y)=>{
            const rectangleY = Number(this.rectangleFather.getAttribute('y'));
            const rectangleHeight = Number(this.rectangleFather.getAttribute('height'));
            const newLocation = rectangleY+rectangleHeight+this.bonus; 
            this.MiniTop.setAttribute('y', newLocation );

            let newHeight = rectangleY - y  ;
            if(newHeight<0){
                newHeight = Math.abs(newHeight);
            }
            this.rectangleFather.setAttribute('height' , newHeight);
            this.taskManager.emit('send_IO_Resize',{id:this.root.id,size:{width:this.root.getWidth(),height:this.root.getHeight()}})// io
            this.updateLocationMini(this.root.id);
    }
    //--------------------------------------------------
    setMiniLowerX(){
        const rectangleX = Number(this.rectangleFather.getAttribute('x'));
        const rectangleWidth = Number(this.rectangleFather.getAttribute('width'));

        const newLocation = rectangleX + (rectangleWidth/2) - (this.miniStyleWidth/2);
        this.MiniTop.setAttribute('x',newLocation);
    }
    setMiniLowerY(){
        const rectangleY = Number(this.rectangleFather.getAttribute('y'));
        const rectangleHeight = Number(this.rectangleFather.getAttribute('height'));
        const newLocation = rectangleY+rectangleHeight+this.bonus;
        this.MiniTop.setAttribute('y',newLocation);
    }
    setMiniRightX(){
        const rectangleX = Number(this.rectangleFather.getAttribute('x'));
        const rectangleWidth = Number(this.rectangleFather.getAttribute('width'));

        const newLocation = rectangleX + rectangleWidth + this.bonus;
        this.MiniRight.setAttribute('x',newLocation);
    }
    setMiniRightY(){
        const rectangleY = Number(this.rectangleFather.getAttribute('y'));
        const rectangleHeight = Number(this.rectangleFather.getAttribute('height'));

        const newLocation = rectangleY + (rectangleHeight/2) - (this.miniStyleHeight/2);
        this.MiniRight.setAttribute('y',newLocation);
    }
    setIsDraggingOnRectangleMini=(bool)=>{
        this.isDraggingMiniRight = bool;
        this.isDraggingMiniTop = bool;
    }
    setIsDraggingOnRectangleMiniTop=(bool)=>{
        this.isDraggingMiniTop = bool;
    }
    setIsDraggingOnRectangleMiniRight=(bool)=>{
        this.isDraggingMiniRight = bool;
    }
}