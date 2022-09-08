export class Section {
    constructor( { renderer},  containerSelector){
            this._rendererItems = renderer;
            this._container = document.querySelector(containerSelector);
           // this._renderer = renderer;
    
        }
        addItem(element){
            this._container.prepend(element);
            
        }
            renderItems(items){
    //this.clear();
    //this._renderedItems = {};
    items.forEach(item => {this._rendererItems(item)
     
            });
    
        }
    
    
    }