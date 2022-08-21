export class Section {
       constructor({ items, renderer} , conteinerSelector){
        this._renderedItems = items;
        this._container = document.querySelector(conteinerSelector);
        this._renderer = renderer;

    }

 /*clear(){
        this._container.innerHTML = '';
    }*/

        renderItems(){
//this.clear();

        this._renderedItems.forEach(item => this._renderer(item));
    }
    addItem(cardElement){
        this._container.prepend(cardElement);
    }
}