export default class MiniSquaresText{
    constructor(element ,TaskManager){
        this.root = element;
        this.taskManager= TaskManager;
        this.svg = this.root.svg;
        this.textFather = this.root.element;

        this.createMiniSquares();
        this.setupSubscribe();
        this.setEvents();
        // this.displayMini(false);
    }
    createMiniSquares(){
        const svgns = "http://www.w3.org/2000/svg";
        this.miniStyleWidth = 15;
        this.miniStyleHeight = 15;
        this.bonus = 5;

        this.MiniLeft = document.createElementNS(svgns ,'rect');
        this.MiniLeft.setAttribute('width',this.miniStyleWidth);
        this.MiniLeft.setAttribute('height',this.miniStyleHeight);
        this.MiniLeft.setAttribute('fill','red');
        this.setMiniLeftX();
        this.setMiniLeftY();
        
        this.svg.appendChild(this.MiniLeft);

        this.setIsDraggingOnTextMiniTop(false);
    }
    displayMini=(bool)=>{
        this.MiniLeft.style.display = bool == true ? '': 'none' ;
    }
    updateLocationMini=(id)=>{
        if(this.root.id == id){
            this.setMiniLeftX();
            this.setMiniLeftY();
        }
    }
    //---------------------------------------------------
    setEvents=()=>{
        this.MiniLeft.addEventListener('mousedown',()=>{
            this.setIsDraggingOnTextMiniTop(true);
        });
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('moveWithMouse',this.moveWithMouse);
        this.taskManager.subscribe('setIsDragging',this.setIsDraggingOnTextMiniTop);
        this.taskManager.subscribe('closeAllMini',this.displayMini);
        this.taskManager.subscribe('updateLocationMini',this.updateLocationMini);
    }
    //----------------------------------------------------
    moveWithMouse=(x,y)=>{// נקרא מה Board
        if(this.isDraggingMiniTop){
            debugger;
                this.moveMiniLeft(x);
                this.taskManager.emit('updateInputValuesSIZEtext',this.root); // לעדכן בinput 
        }
    }
    moveMiniLeft=(x)=>{
        debugger;
            const textX = Number(this.textFather.getAttribute('x'));
            const newLocation = textX - this.miniStyleWidth - this.bonus; // mouse loction - (height mini / 2) set the mouse center mini 
            this.MiniLeft.setAttribute('x', newLocation );

            const newSize = textX - x ;
            if(newSize<0){
                newSize = Math.abs(newSize);
            }
            this.textFather.setAttribute('font-size' , newSize);
            this.taskManager.emit('send_IO_Resize',{id:this.root.id,size:{fontSize:this.root.getFontSize()}})// io
            this.updateLocationMini(this.root.id);
    }
    //--------------------------------------------------
    setMiniLeftX(){
        const textX = Number(this.textFather.getAttribute('x'));
        const newLocation = textX - this.miniStyleWidth - this.bonus;
        this.MiniLeft.setAttribute('x',newLocation);
    }
    setMiniLeftY(){
        const textY = Number(this.textFather.getAttribute('y'));

        const newLocation = textY - this.miniStyleHeight;
        this.MiniLeft.setAttribute('y',newLocation);
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
    setIsDraggingOnTextMiniTop=(bool)=>{
        this.isDraggingMiniTop = bool;
    }
}