class MiniSquaresSquare{
    constructor(element ,TaskManager){
        this.root = element;
        this.taskManager= TaskManager;
        this.svg = this.root.svg;
        this.squareFather = this.root.element;

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

        this.setIsDraggingOnSquareMini(false);
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
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnSquareMini);
        this.taskManager.subscribe('closeAllMini',this.displayMini);
        this.taskManager.subscribe('updateLocationMini',this.updateLocationMini);
    }
    //----------------------------------------------------
    moveWithMouse=(x,y)=>{// נקרא מה Board
        if(this.isDraggingMiniRight){
                this.moveMiniRight(x);
                this.taskManager.emit('updateInputValuesSIZEsquare',this.root);
                this.updateLocationMini(this.root.id);
        }
        if(this.isDraggingMiniTop){
                this.moveMiniLower(y);
                this.taskManager.emit('updateInputValuesSIZEsquare',this.root);
                this.updateLocationMini(this.root.id);
        }
        
    }
    moveMiniRight=(x)=>{
            const squareX = Number(this.squareFather.getAttribute('x'));
            const newLocation = x + this.bonus;
            this.MiniRight.setAttribute('x', newLocation );

            let newWidth = x - squareX - this.bonus;
            if(newWidth<0){
                newWidth = Math.abs(newWidth);
            }
            this.squareFather.setAttribute('width' , newWidth);
            this.taskManager.emit('send_IO_Resize',{id:this.root.id,size:{width:this.root.getWidth(),height:this.root.getHeight()}})// io
            this.updateLocationMini(this.root.id);

    }
    moveMiniLower=(y)=>{
            const squareY = Number(this.squareFather.getAttribute('y'));
            const squareHeight = Number(this.squareFather.getAttribute('height'));
            const newLocation = squareY+squareHeight+this.bonus; 
            this.MiniTop.setAttribute('y', newLocation );

            let newHeight = squareY - y;
            if(newHeight<0){
                newHeight = Math.abs(newHeight);
            }
            this.squareFather.setAttribute('height' , newHeight);
            this.taskManager.emit('send_IO_Resize',{id:this.root.id,size:{width:this.root.getWidth(),height:this.root.getHeight()}})// io
            this.updateLocationMini(this.root.id);

    }
    //--------------------------------------------------
    setMiniLowerX(){
        const squareX = Number(this.squareFather.getAttribute('x'));
        const squareWidth = Number(this.squareFather.getAttribute('width'));

        const newLocation = squareX + (squareWidth/2) - (this.miniStyleWidth/2);
        this.MiniTop.setAttribute('x',newLocation);
    }
    setMiniLowerY(){
        const squareY = Number(this.squareFather.getAttribute('y'));
        const squareHeight = Number(this.squareFather.getAttribute('height'));
        const newLocation = squareY+squareHeight+this.bonus;
        this.MiniTop.setAttribute('y',newLocation);
    }
    setMiniRightX(){
        const squareX = Number(this.squareFather.getAttribute('x'));
        const squareWidth = Number(this.squareFather.getAttribute('width'));

        const newLocation = squareX + squareWidth + this.bonus;
        this.MiniRight.setAttribute('x',newLocation);
    }
    setMiniRightY(){
        const squareY = Number(this.squareFather.getAttribute('y'));
        const squareHeight = Number(this.squareFather.getAttribute('height'));

        const newLocation = squareY + (squareHeight/2) - (this.miniStyleHeight/2);
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
    setIsDraggingOnSquareMini=(bool)=>{
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