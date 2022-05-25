import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import View from "./view";
class SideBarTabsView extends View{
    _parElement = document.querySelector('.sideBar--Tabs');
    _generateMarkUp(){
        return `<a href="/palettes/new" class="btn btn-Tabs">
        <svg class="svg--btnTab" data-tab="new">
          <use href="${icon}#star-fill"></use>
        </svg>
        جدید
      </a>
      <a href="/palettes/random" class="btn btn-Tabs" data-tab="random">
        <svg class="svg--btnTab">
          <use href="${icon}#hdmi"></use>
        </svg>
        تصادفی
      </a>
      <a href="/palettes/popular" class="btn btn-Tabs" data-tab="popular">
        <svg class="svg--btnTab">
          <use href="${icon}#heart-fill"></use>
        </svg>
        محبوب
      </a>`
    }
    _windowLoading(handler){
        window.addEventListener('load',function(){
            handler();
        })
    }
}

export default new SideBarTabsView();