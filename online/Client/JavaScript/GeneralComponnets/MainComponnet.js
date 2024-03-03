class MainComponnet{
    constructor(bodyElement){
        this.bodyElement = bodyElement;
        this.taskManager = new TaskManager();

        this.serverUrl = 'http://localhost:8080';
        this.io = new io(this.serverUrl);
  

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

        this.onlineDrawingElement = new OnlineDrawing(this.bodyElement.querySelector('#sharingDiv'),this.io,this.taskManager);
        this.howConnectionElement = new HowConnection(this.bodyElement.querySelector('#howConnectionDiv'),this.io,this.taskManager);
        this.networkDiv = new NetworkDiv(this.bodyElement.querySelector('#NetworkDiv'),this.onlineDrawingElement,this.howConnectionElement,this.taskManager);
    }
}
