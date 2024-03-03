export default class ShapesBox{
    constructor(DivFatherShapProp,TaskManager){
        this.divFather = DivFatherShapProp;
        this.ShapesBox = DivFatherShapProp.querySelector('#box-shapes');
        this.taskManager = TaskManager;
        
        this.ShapesBox.addEventListener('click',this.cheakerClicks);
        
        this.setElements();
        this.setEvents();
    }
    cheakerClicks=(event)=>{
        const classList = event.target.classList;
        switch(true){
            case classList.contains('CircleButtonClass'):
                this.taskManager.emit('addShape','Circle')
                console.log('circleBtn');
                break;
            case classList.contains('SquareButtonClass'):
                this.taskManager.emit('addShape','Square')
                console.log('squareBtn');
                break;
            case classList.contains('RectangleButtonClass'):
                this.taskManager.emit('addShape','Rectangle')
                console.log('rectangleBtn');
                break;
            case classList.contains('EllipseButtonClass'):
                this.taskManager.emit('addShape','Ellipse')
                console.log('ellipseBtn');
                break;
            case classList.contains('TextButtonClass'):
                this.taskManager.emit('addShape','Text')
                console.log('textBtn');
                break;
            default:
                console.log('No Buttons');
        }
    }
    setElements=()=>{
        this.circle = this.ShapesBox.querySelector('#circleBtn');
        this.imgCircle = this.ShapesBox.querySelector('#circleBtn img');

        this.square = this.ShapesBox.querySelector('#squareBtn');
        this.imgSquare = this.ShapesBox.querySelector('#squareBtn img');

        this.rectangle = this.ShapesBox.querySelector('#rectangleBtn');
        this.imgRectangle = this.ShapesBox.querySelector('#rectangleBtn img');

        this.ellipse = this.ShapesBox.querySelector('#ellipseBtn');
        this.imgEllipse = this.ShapesBox.querySelector('#ellipseBtn img');

    }
    setEvents=()=>{
        this.circle.addEventListener('mouseenter',this.hoverCircle);
        this.circle.addEventListener('mouseleave',this.leaveCircle);

        this.square.addEventListener('mouseenter',this.hoverSquare);
        this.square.addEventListener('mouseleave',this.leaveSquare);

        this.rectangle.addEventListener('mouseenter',this.hoverRectangle);
        this.rectangle.addEventListener('mouseleave',this.leaveRectangle);

        this.ellipse.addEventListener('mouseenter',this.hoverEllipse);
        this.ellipse.addEventListener('mouseleave',this.leaveEllipse);
    }

    hoverCircle=()=>{
        this.imgCircle.src='Style/imgShapes/ImgAfterClick/Circle.png';
    }
    leaveCircle=()=>{
        this.imgCircle.src='Style/imgShapes/ImgBeforeClick/Circle.png';
    }

    hoverSquare=()=>{
        this.imgSquare.src='Style/imgShapes/ImgAfterClick/Square.png';
    }
    leaveSquare=()=>{
        this.imgSquare.src='Style/imgShapes/ImgBeforeClick/Square.png';
    }

    hoverRectangle=()=>{
        this.imgRectangle.src='Style/imgShapes/ImgAfterClick/Rectangle.png';
    }
    leaveRectangle=()=>{
        this.imgRectangle.src='Style/imgShapes/ImgBeforeClick/Rectangle.png';
    }

    hoverEllipse=()=>{
        this.imgEllipse.src='Style/imgShapes/ImgAfterClick/Ellipse.png';
    }
    leaveEllipse=()=>{
        this.imgEllipse.src='Style/imgShapes/ImgBeforeClick/Ellipse.png';
    }
}