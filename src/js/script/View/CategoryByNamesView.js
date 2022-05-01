import View from "./view";

class CategoryByNamesView extends View{
    _parElement = document.querySelector('.category-ByNames');
    _generateMarkUp(){

      return this._data.names.map((name)=>{
            return `<li class="nav-item item-Tags"><a href="/paletes/all/${name}" data-categoryname='${name}' class="link-Tags nav-link">${name}</a></li>`;
        }).join('');
    }
    _addHandlerAllPaletteCategoryByName(handler){
        this._parElement.addEventListener('click',runCategoryByName.bind(this));
         function runCategoryByName(e){
            e.preventDefault();
            const button = e.target.closest('.link-Tags');
            if(!button) return;
            //// new Url() -> searchParams->pageSize,pageNumber,categoryName,pathName
            const categoryName = button.dataset.categoryname;
            const createUrl = new URL(location.href);
            createUrl.pathname = `/palettes/all/${categoryName}`
            createUrl.searchParams.set('pageSize',`${this._data.resultPerPage}`);
            createUrl.searchParams.set('pageNumber',`1`);
            const ObjectPushState =
            {
                id:undefined,
                ...(categoryName ? {categoryName} : {categoryName:this._data.query}),
                pathname:createUrl.pathname,
                pageSize:createUrl.searchParams.get('pageSize'),
                pageNumber:createUrl.searchParams.get('pageNumber')
            }
            history.pushState(ObjectPushState,null,`${createUrl.pathname}/${createUrl.search}`);
            handler(categoryName);
        }
    }
    _windowLoading(handler){
        const createUrl = new URL(location.href);
        const pathName = createUrl.pathname;
        const categoryName =createUrl.pathname.split('/').filter((char)=>char!='').slice(-1).join('');
        const pageSize = createUrl.searchParams.get('pageSize');
        const pageNumber = createUrl.searchParams.get('pageNumber');
        if(pathName.startsWith('/palettes/all/') && pageSize && pageNumber && categoryName) handler(categoryName,+pageNumber);
         
    }
    _windowPopState(handler){
        window.addEventListener('popstate',runPopState.bind(this));
        function runPopState(e){
            const cateGoryName = location?.pathname.split('/').filter((char)=>char!='').slice(-1).join('');
            const pageNumber = e?.state?.pageNumber;
            const pageSize = e?.state?.pageSize;
            if(!cateGoryName || !pageNumber || !pageSize)return; 
            handler(cateGoryName,+pageNumber);
        }
      }
    
}

export default new CategoryByNamesView();