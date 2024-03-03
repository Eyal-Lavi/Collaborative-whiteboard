class MiniSquaresCircle{
    constructor(element ,TaskManager){
        this.root = element;
        this.taskManager= TaskManager;
        this.svg = this.root.svg;
        this.circleFather = this.root.element;

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
        
        this.svg.appendChild(this.MiniTop);

        this.setIsDraggingOnCircleMiniTop(false);
    }
    displayMini=(bool)=>{
        this.MiniTop.style.display = bool == true ? '': 'none' ;
    }
    updateLocationMini=(id)=>{
        if(this.root.id == id){
            this.setMiniTopX();
            this.setMiniTopY();
        }
    }
    //---------------------------------------------------
    setEvents=()=>{
        this.MiniTop.addEventListener('mousedown',()=>{
            this.setIsDraggingOnCircleMiniTop(true);
        });
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('moveWithMouse',this.moveWithMouse);
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnCircleMiniTop);
        this.taskManager.subscribe('closeAllMini',this.displayMini);
        this.taskManager.subscribe('updateLocationMini',this.updateLocationMini);
    }
    //----------------------------------------------------
    moveWithMouse=(x,y)=>{// נקרא מה Board
        if(this.isDraggingMiniTop){
                this.moveMiniTop(y);
                this.taskManager.emit('updateInputValuesSIZEcircle',this.root); // לעדכן בinput 
        }
    }
    moveMiniTop=(y)=>{
            const circleY = Number(this.circleFather.getAttribute('cy'));
            const newLocation = y - (this.miniStyleHeight/2); // mouse loction - (height mini / 2) set the mouse center mini 
            this.MiniTop.setAttribute('y', newLocation );

            const newR = circleY - y  - this.bunus - (this.miniStyleHeight/2);
            if(newR<0){
                newR = Math.abs(newR);
            }
            this.circleFather.setAttribute('r' , newR);
            this.taskManager.emit('send_IO_Resize',{id:this.root.id,size:{radius:this.root.getRadius()}})// io
    }
    //--------------------------------------------------
    setMiniTopX(){
        const circleX = Number(this.circleFather.getAttribute('cx'));

        const newLocation = circleX - (this.miniStyleWidth/2);
        this.MiniTop.setAttribute('x',newLocation);
    }
    setMiniTopY(){
        const circleY = Number(this.circleFather.getAttribute('cy'));
        const circleR = Number(this.circleFather.getAttribute('r'));

        const newLocation = circleY - circleR - this.miniStyleHeight - this.bunus;
        this.MiniTop.setAttribute('y',newLocation);
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
    setIsDraggingOnCircleMiniTop=(bool)=>{
        this.isDraggingMiniTop = bool;
    }
}