import HeaderPreview from './HeaderPreview';
class HeaderView extends HeaderPreview {
  _parElement = document.querySelector('.nav-Tabs2');
  _dropdownMenuTabs = document.querySelector('#dropdownMenuTabs');
  constructor() {
    super();
    this._parElement.addEventListener(
      'mouseover',
      this._animateTabs.bind({ opacity: 0.2, blur: 2, ...this })
    );
    this._parElement.addEventListener(
      'mouseout',
      this._animateTabs.bind({ opacity: 1, blur: 0, ...this })
    );
    this._dropdownMenuTabs.addEventListener(
      'click',
      this._dropdownActiveMenuTabs.bind(this)
    );
    document.addEventListener(
      'click',
      this._dropDownUnActiveMenuTabs.bind(this)
    );
  }
  _dropdownActiveMenuTabs(e) {
    const button = e.target.closest('#dropdownMenuTabs');
    if (!button) return;

    const childrens = Array.from(
      e.target.closest('#dropdownMenuTabs').querySelectorAll('span')
    );
    if (!button) return;
    button.classList.toggle('active');
    childrens.forEach((el, index) =>
      el.classList.toggle(`activeRolle-${index}`)
    );
  }
  _dropDownUnActiveMenuTabs(e) {
    const button = e.target.closest('#dropdownMenuTabs');
    if (!button && dropdownMenuTabs.classList.contains('active')) {
      dropdownMenuTabs.classList.toggle('active');
      dropdownMenuTabs
        .querySelectorAll('span')
        .forEach((el, index) => el.classList.toggle(`activeRolle-${index}`));
    }
  }
}

export default new HeaderView();
