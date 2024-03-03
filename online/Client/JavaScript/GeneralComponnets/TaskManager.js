class TaskManager{
     constructor(){
        this.handlers = {};
     }

     subscribe(eventName,funcToDo){
        if(!this.handlers[eventName]){
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(funcToDo);
        return ()=>{
            this.handlers[eventName] = this.handlers[eventName].filter((x) => x !== funcToDo);
        }
     }
     
     emit(eventName,...info){
        const handlers = (this.handlers[eventName] || []);
        for(let handler of handlers){
            handler(...info);
        }
     }
}