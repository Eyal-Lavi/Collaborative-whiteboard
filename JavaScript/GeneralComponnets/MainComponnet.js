import TaskManager from './TaskManager';
import Board from '../ElementsOnBody/Board';
import DivFatherShapProp from '../ElementsOnBody/DivFatherShapProp';
import ShapesBox from '../ElementsOnBody/ShapesBox';
import SideBar from '../ElementsOnBody/SideBar';
import PropertiesBox from '../ElementsOnBody/PropertiesBox';

import Save from '../SaveAndLoad/Save';
import Load from '../SaveAndLoad/Load';
import SaveANDloadDiv from '../SaveAndLoad/SaveANDloadDiv';
export default class MainComponnet{
    constructor(bodyElement){
        this.bodyElement = bodyElement;
        this.taskManager = new TaskManager();
        this.setup();
    }
    setup=()=>{
        this.boardElement = new Board(this.bodyElement.querySelector('#boardDiv'),this.taskManager);

        this.divFatherShapProp = new DivFatherShapProp(this.bodyElement.querySelector('#divFather-Shapes-Properties'),this.taskManager);

        this.boxShapesElement = new ShapesBox(this.bodyElement.querySelector('#divFather-Shapes-Properties'),this.taskManager);     
        this.sideBarElement = new SideBar(this.bodyElement,this.taskManager);        

        this.propertiesBarElement = new PropertiesBox(this.bodyElement.querySelector('#divFather-Shapes-Properties'),this.taskManager);  

        this.saveElement = new Save(this.bodyElement.querySelector('#saveDiv'),this.taskManager) ;
        this.loadElement = new Load(this.bodyElement.querySelector('#loadDiv'),this.taskManager) ;
        this.saveANDloadDiv = new SaveANDloadDiv(this.bodyElement.querySelector('#saveANDloadDiv'),this.saveElement,this.loadElement);
    }
}
