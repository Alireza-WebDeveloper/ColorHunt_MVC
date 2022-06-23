import HeaderPreView from './HeaderPreview';
class HeaderView2 extends HeaderPreView {
  _parElement = document.querySelector('.nav-Tabs');
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
  }
}

export default new HeaderView2();
