import CategoryByNamesPreView from "./CategoryByNamesPreView";
import View from "./view";

class CategoryByNamesView extends CategoryByNamesPreView{
    _parElement = document.querySelector('.category-ByNames');
    _generateMarkUp(){

      return this._data.names.map((name)=>{
            return `<li class="nav-item item-Tags"><a href="/paletes/all/${name}" data-categoryname='${name}' class="link-Tags nav-link">${name}</a></li>`;
        }).join('');
    }
}

export default new CategoryByNamesView();