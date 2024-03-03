import CircleElement from "../ShapesComponnets/CircleElement";
import EllipseElement from "../ShapesComponnets/EllipseElement";
import RectangleElement from "../ShapesComponnets/RectangleElement";
import SquareElement from "../ShapesComponnets/SquareElement";
import TextElement from "../ShapesComponnets/TextElement";
export default class Save {
    constructor(divSave,TaskManger){
        this.taskManager = TaskManger;
        this.root = divSave;
        this.setupElements();
        this.setupSubscribes();
        this.setupEvents();
    }
    setupElements=()=>{
        this.buttonSave = this.root.querySelector('button');
        this.inputSave = this.root.querySelector('input');
        this.allShapesOnSvg = [];
        this.svg = null;
    }
    setupEvents=()=>{
        this.buttonSave.addEventListener('click',()=>{
            if(this.inputSave.value.length>0){
                this.SaveProject();
                this.taskManager.emit('closeWindowsLoadAndSave');
            }
        })
    }
    setupSubscribes=()=>{
        this.taskManager.subscribe('setAllShapesElements',this.setAllShapesElements);
    }


    setAllShapesElements=(allShapes)=>{
        this.allShapesOnSvg = allShapes;
    }

    SaveProject=()=>{
        this.taskManager.emit('sendAllShapesOnSvgToSave'); // get all shapes from the Board to this class 


        const arrInformation = this.transformShapesElementsToArrInformation(); // trasform the shapes to Information

        this.sendToLocalstorage(arrInformation);
    }
    transformShapesElementsToArrInformation=()=>{
        debugger;
        const arr = [];
        for(let shape of this.allShapesOnSvg){
            const el ={}
            switch (true) {
                case shape instanceof CircleElement :
                    el.type = 'Circle';
                    el.x = shape.getX();
                    el.y = shape.getY();
                    el.radius = shape.getRadius();
                    el.color = shape.getColor();
                    break;
                case shape instanceof EllipseElement :
                    el.type = 'Ellipse';
                    el.x = shape.getX();
                    el.y = shape.getY();
                    el.width = shape.getWidth();
                    el.height = shape.getHeight();
                    el.color = shape.getColor();
                    break;
                case shape instanceof RectangleElement :
                    el.type = 'Rectangle';
                    el.x = shape.getX();
                    el.y = shape.getY();
                    el.width = shape.getWidth();
                    el.height = shape.getHeight();
                    el.color = shape.getColor();
                    break;
                case shape instanceof SquareElement :
                    el.type = 'Square';
                    el.x = shape.getX();
                    el.y = shape.getY();
                    el.width = shape.getWidth();
                    el.height = shape.getHeight();
                    el.color = shape.getColor();
                    break;
                case shape instanceof TextElement :
                    el.type = 'Text';
                    el.x = shape.getX();
                    el.y = shape.getY();
                    el.value = shape.getValue();
                    el.size = shape.getFontSize();
                    el.color = shape.getColor();
                    break;
            }
            arr.push(el);
        }
        return arr;
    }
    sendToLocalstorage(arr){
        const jsonData = JSON.stringify(arr);
        localStorage.setItem(this.inputSave.value , jsonData);
    }
}