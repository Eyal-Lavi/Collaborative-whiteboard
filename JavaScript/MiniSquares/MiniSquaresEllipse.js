export default class MiniSquaresEllipse{
    constructor(element ,TaskManager){
        this.root = element;
        this.taskManager= TaskManager;
        this.svg = this.root.svg;
        this.ellipseFather = this.root.element;

        this.createMiniSquares();
        this.setupSubscribe();
        this.setEvents();
        this.displayMini(false);
    }
    createMiniSquares(){
        const svgns = "http://www.w3.org/2000/svg";
        this.miniStyleWidth = 15;
        this.miniStyleHeight = 15;
        this.bunus = 5;

        this.MiniTop = document.createElementNS(svgns ,'rect');
        this.MiniTop.setAttribute('width',this.miniStyleWidth);
        this.MiniTop.setAttribute('height',this.miniStyleHeight);
        this.MiniTop.setAttribute('fill','red');
        this.setMiniTopX();
        this.setMiniTopY();

        this.MiniRight = document.createElementNS(svgns ,'rect');
        this.MiniRight.setAttribute('width',this.miniStyleWidth);
        this.MiniRight.setAttribute('height',this.miniStyleHeight);
        this.MiniRight.setAttribute('fill','red');
        this.setMiniRightX();
        this.setMiniRightY();
        
        this.svg.appendChild(this.MiniTop);
        this.svg.appendChild(this.MiniRight);

        this.setIsDraggingOnEllipseMini(false);
    }
    displayMini=(bool)=>{
        this.MiniTop.style.display = bool == true ? '': 'none' ;
        this.MiniRight.style.display = bool == true ? '' : 'none' ;
    }
    updateLocationMini=(id)=>{
        if(this.root.id == id){
            this.setMiniRightX();
            this.setMiniRightY();
            this.setMiniTopX();
            this.setMiniTopY();
        }
    }
    //---------------------------------------------------
    setEvents=()=>{
        this.MiniTop.addEventListener('mousedown',()=>{
            this.setIsDraggingOnEllipseMiniTop(true);
        });
        this.MiniRight.addEventListener('mousedown',()=>{
            this.setIsDraggingOnEllipseMiniRight(true);
        });
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('moveWithMouse',this.moveWithMouse);
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnEllipseMini);
        this.taskManager.subscribe('closeAllMini',this.displayMini);
        this.taskManager.subscribe('updateLocationMini',this.updateLocationMini);
    }
    //----------------------------------------------------
    moveWithMouse=(x,y)=>{// נקרא מה Board
        if(this.isDraggingMiniRight){
                this.moveMiniRight(x);
                this.taskManager.emit('updateInputValuesSIZEellipse',this.root);
        }
        if(this.isDraggingMiniTop){
                this.moveMiniTop(y);
                this.taskManager.emit('updateInputValuesSIZEellipse',this.root);
        }
    }
    moveMiniRight=(x)=>{
            debugger;
            const ellipseX = Number(this.ellipseFather.getAttribute('cx'));
            const newLocation = x + this.bunus;
            this.MiniRight.setAttribute('x', newLocation );

            let newRX = ellipseX - x ;
            if(newRX<0){
                newRX = Math.abs(newRX);
            }
            this.ellipseFather.setAttribute('rx' , newRX);
            this.taskManager.emit('send_IO_Resize',{id:this.root.id,size:{width:this.root.getWidth(),height:this.root.getHeight()}})// io
            this.updateLocationMini(this.root.id);

    }
    moveMiniTop=(y)=>{
            const ellipseY = Number(this.ellipseFather.getAttribute('cy'));
            const newLocation = y - (this.miniStyleHeight/2); // mouse loction - (height mini / 2) set the mouse center mini 
            this.MiniTop.setAttribute('y', newLocation );

            const newRY = ellipseY - y  - this.bunus - (this.miniStyleHeight/2);
            if(newRY<0){
                newRY = Math.abs(newRY);
            }
            this.ellipseFather.setAttribute('ry' , newRY);
            this.taskManager.emit('send_IO_Resize',{id:this.root.id,size:{width:this.root.getWidth(),height:this.root.getHeight()}})// io
            this.updateLocationMini(this.root.id);
    }
    //--------------------------------------------------
    setMiniTopX(){
        const EllipseX = Number(this.ellipseFather.getAttribute('cx'));

        const newLocation = EllipseX - (this.miniStyleWidth/2);
        this.MiniTop.setAttribute('x',newLocation);
    }
    setMiniTopY(){
        const EllipseY = Number(this.ellipseFather.getAttribute('cy'));
        const EllipseRY = Number(this.ellipseFather.getAttribute('ry'));

        const newLocation = EllipseY - EllipseRY - this.miniStyleHeight - this.bunus;
        this.MiniTop.setAttribute('y',newLocation);
    }
    setMiniRightX(){
        const EllipseX = Number(this.ellipseFather.getAttribute('cx'));
        const EllipseRX = Number(this.ellipseFather.getAttribute('rx'));

        const newLocation = EllipseX + EllipseRX + this.bunus;
        this.MiniRight.setAttribute('x',newLocation);
    }
    setMiniRightY(){
        const EllipseY = Number(this.ellipseFather.getAttribute('cy'));

        const newLocation = EllipseY - (this.miniStyleHeight/2);
        this.MiniRight.setAttribute('y',newLocation);
    }
   //--------------------------------------------------
    
    // moveWithMouse=(x,y)=>{// נקרא מה Board
    //     if(this.isDraggingMiniRight){
    //     debugger;

    //         // this.taskManager.emit('updateInputValuesSizeEllipse',this); לממש
    //         if(x>this.MiniRight.getAttribute('x')){
    //             if(this.MiniRight.getAttribute('x')>1){
    //                 const newWidth = this.root.getWidth() + 1;
    //                 this.root.setWidth(newWidth);
    //             }
    //         }
    //         else if(x<this.MiniRight.getAttribute('x')){
    //             if(this.MiniRight.getAttribute('x')>1){
    //                 const newWidth = this.root.getWidth() - 1;
    //                 this.root.setWidth(newWidth);
    //             }

    //         }
    //     }
    //     if(this.isDraggingMiniTop){
    //     debugger;

    //         // this.taskManager.emit('updateInputValuesSizeEllipse',this); לממש
    //         if(y>this.MiniRight.getAttribute('y')){
    //             const newHeigth = this.root.getHeight() - 2;
    //             this.root.setHeight(newHeigth);
    //         }
    //         else if(y<this.MiniRight.getAttribute('y')){
    //             const newHeigth = this.root.getHeight() + 2;
    //             this.root.setHeight(newHeigth);
    //         }
    //     }
    //     this.updateLocationMini();
    // }
    setIsDraggingOnEllipseMini=(bool)=>{
        this.isDraggingMiniRight = bool;
        this.isDraggingMiniTop = bool;
    }
    setIsDraggingOnEllipseMiniTop=(bool)=>{
        this.isDraggingMiniTop = bool;
    }
    setIsDraggingOnEllipseMiniRight=(bool)=>{
        this.isDraggingMiniRight = bool;
    }
}