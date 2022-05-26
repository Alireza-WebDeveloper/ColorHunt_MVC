import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import View from "./view";
class SideBarTabsView extends View{
    _parElement = document.querySelector('.sideBar--Tabs');
    _generateMarkUp(){
        return `<a href="/palettes/new" class="btn btn-Tabs" data-tab="new">
        <svg class="svg--btnTab" data-tab="new">
          <use href="${icon}#star${this._data === 'new' ? '-fill' : ''}"></use>
        </svg>
        جدید
      </a>
      <a href="/palettes/random" class="btn btn-Tabs" data-tab="random">
        <svg class="svg--btnTab">
          <use href="${icon}#hdmi"></use>
        </svg>
        تصادفی
      </a>
      <a href="/palettes/popular" class="btn btn-Tabs " data-tab="popular">
        <svg class="svg--btnTab">
          <use href="${icon}#heart${this._data === 'popular' ? '-fill' : ''}"></use>
        </svg>
        محبوب
      </a>`
    }
    _windowLoading(handler){
        window.addEventListener('load',function(){
            handler();
        })
    }
    _addHandlerAllPalette(handler){
      this._parElement.addEventListener('click',function(e){
        const button = e.target.closest('.btn-Tabs');
        if(!button) return;
        const pathName = button.getAttribute('href');
        const tab = button.dataset.tab;
        let newUrl = new URL(location.origin);
        history.pushState({tab},null,`${pathName}`)
        newUrl.pathname = pathName;
        handler('all',tab);
      })
    }
    _windowLoadingAllPaletteView(handler){
      window.addEventListener('load',function(){
        const pathName = location.pathname;
        let tab = pathName.split('/')[2];
        let length = pathName.split('/').length;
        const include = ['popular','random','new'].includes(tab); 
        if(tab && length === 3 && include) handler('all',tab);
      })
    }
    _windowPopState(handler){
      window.addEventListener('popstate',function(e){
        const tab = e.state.tab;
        if(!e.state.tab) return;
        handler('all',tab);
      })
    }
}

export default new SideBarTabsView();