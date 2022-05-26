import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import SideBarTabsPreView from './SidebarTabsPreView';
class SideBarTabsView2 extends SideBarTabsPreView{
    _parElement = document.querySelector('.sideBar--Tabs2');
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
   
}

export default new SideBarTabsView2();