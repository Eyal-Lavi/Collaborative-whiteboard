class Board{
    constructor(BoardElement,TaskManager){
        this.board = BoardElement;
        this.taskManager = TaskManager;
        this.ShapesOnSvgArr = [];

        this.svg = this.createSvg();
        this.setEvents();
        this.setupSubscribe();
        
    }
    setupSubscribe=()=>{
        this.taskManager.subscribe('addShape',this.createShape);
        this.taskManager.subscribe('clearShapes',this.clearShapes);
        this.taskManager.subscribe('sendAllShapesOnSvgToSave',this.sendAllShapesOnSvgToSave);
        this.taskManager.subscribe('startLoadProject',this.startLoadProject);
        this.taskManager.subscribe('findElementOnBoardTo',this.findElementOnBoardTo);
        this.taskManager.subscribe('createShapeFromServer',this.createShapeFromServer);
    }
    setEvents=()=>{
        this.board.addEventListener('click',this.cheakerClicks);

        //------  SetEvents for move Shapes --------
        this.board.addEventListener('mousemove',this.updateXandY);

        this.board.addEventListener("mouseup", () => {
            this.taskManager.emit('setIsDragging',false);
        });
        
        this.board.addEventListener("mouseleave", () => {
            this.taskManager.emit('setIsDragging',false);
        });
        //-----------------------------------------
    }
    toSVGPoint=(svg, x, y)=>{
        let p = new DOMPoint(x, y);
        return p.matrixTransform(svg.getScreenCTM().inverse());
      };
    updateXandY=(event)=>{
        // const svgRect = this.svg.getBoundingClientRect();
        const xy = this.toSVGPoint(this.svg,event.clientX,event.clientY);
        this.MouseX = xy.x;   
        this.MouseY = xy.y;
        this.taskManager.emit('moveWithMouse',this.MouseX,this.MouseY);
    }
    findElementOnBoardTo=(data,task)=>{
        for(let el of this.ShapesOnSvgArr){
            if(el.id == data.id){
                switch (task){
                    case 'Move':
                        console.log(`OK ,data.id = ${data.id} data.location.x = ${data.location.x},${data.location.y} = data.location.y`);
                        this.taskManager.emit('move',data.location.x,data.location.y,data.id,data.task);//Circle Element
                        break;
                    case 'Resize':
                        this.taskManager.emit('changeSizeFromServer',data.size,data.id);
                        break;
                    case 'Color':
                        this.taskManager.emit('changeColorFromServer',data.color,data.id);
                        break;
                    case 'Value':
                        this.taskManager.emit('changeValueFromServer',data.value,data.id);
                        break;
                }
            }
        }
    }
    createSvg(){
        const svgns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgns , 'svg'); 
        svg.setAttribute('viewBox', '0 0 1000 1000');
        this.board.appendChild(svg);
        return svg; 
    }
    clearShapes=()=>{
        const allSvgChild = this.svg.children;
        const elementsToRemove = [];

        for(let child of allSvgChild){
             elementsToRemove.push(child);
        }
        for(let child of elementsToRemove){
             this.svg.removeChild(child);
        }
        this.ShapesOnSvgArr=[];
        counter = 0;
    }
    cheakerClicks=(event)=>{
        if(event.target == this.svg){
                this.taskManager.emit('openShapeSetting','-Nothing-',event.target) // send to Properties class and close all windows that open
                this.taskManager.emit('closeAllMini', false);
                console.log('Click on Nothing');
        }
    }
    createShape=(type)=>{
        switch (type) {
            case 'Circle':
                const circle = new CircleElement(this.svg,this.taskManager);
                this.ShapesOnSvgArr.push(circle);
                this.taskManager.emit('send_IO_createElement',{type,id:circle.id}); //OnlineDrawing
                break;
            case 'Square':
                const square = new SquareElement(this.svg,this.taskManager);
                this.ShapesOnSvgArr.push(square);
                this.taskManager.emit('send_IO_createElement',{type,id:square.id}); //OnlineDrawing
                break;
            case 'Rectangle':
                const rectangle = new RectangleElement(this.svg,this.taskManager);
                this.ShapesOnSvgArr.push(rectangle);
                this.taskManager.emit('send_IO_createElement',{type,id:rectangle.id}); //OnlineDrawing
                break;
            case 'Ellipse':
                const ellipse = new EllipseElement(this.svg,this.taskManager);
                this.ShapesOnSvgArr.push(ellipse);
                this.taskManager.emit('send_IO_createElement',{type,id:ellipse.id}); //OnlineDrawing
                break;
            case 'Text':
                const text = new TextElement(this.svg,this.taskManager);
                this.ShapesOnSvgArr.push(text);
                this.taskManager.emit('send_IO_createElement',{type,id:text.id}); //OnlineDrawing
                break;
        }
    }
    createShapeFromServer=(type,id)=>{
        switch (type) {
            case 'Circle':
                const circle = new CircleElement(this.svg,this.taskManager,id);
                this.ShapesOnSvgArr.push(circle);
                break;
            case 'Square':
                const square = new SquareElement(this.svg,this.taskManager,id);
                this.ShapesOnSvgArr.push(square);
                break;
            case 'Rectangle':
                const rectangle = new RectangleElement(this.svg,this.taskManager,id);
                this.ShapesOnSvgArr.push(rectangle);
                break;
            case 'Ellipse':
                const ellipse = new EllipseElement(this.svg,this.taskManager,id);
                this.ShapesOnSvgArr.push(ellipse);
                break;
            case 'Text':
                const text = new TextElement(this.svg,this.taskManager,id);
                this.ShapesOnSvgArr.push(text);
                break;
        }
    }
    sendAllShapesOnSvgToSave=()=>{
        this.taskManager.emit('setAllShapesElements',this.ShapesOnSvgArr);
    }
    startLoadProject=(arrInformation)=>{
        this.clearShapes();

        const shapeTypes = {
            Circle: CircleElement,
            Square: SquareElement,
            Rectangle: RectangleElement,
            Ellipse: EllipseElement,
            Text: TextElement,
          };

          console.log(arrInformation);
          for(let singleShapeInfo of arrInformation){
            if(!singleShapeInfo.id){
                singleShapeInfo.id=null;
            }
           const shape =  new shapeTypes[singleShapeInfo.type](this.svg, this.taskManager, singleShapeInfo.id);
           shape.setAllInfo(singleShapeInfo);
           this.ShapesOnSvgArr.push(shape);
          }
    }
   
}