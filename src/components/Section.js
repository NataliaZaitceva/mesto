export class Section {
    constructor( { renderer},  containerSelector){
            this._rendererItems = renderer;
            this._container = document.querySelector(containerSelector);
           
    
        }
        addItem(element){
            this._container.prepend(element);
            
        }

        addItemAppend(element){
            this._container.append(element); 
        }

        
            renderItems(items){
   
    items.forEach(item => {this._rendererItems(item)
     
            });
    
        }
    
    
    }