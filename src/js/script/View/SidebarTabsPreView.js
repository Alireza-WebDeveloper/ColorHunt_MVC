import View from './view';

export default class SideBarTabsPreView extends View {
  _windowLoading(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
  _addHandlerAllPalette(handler) {
    this._parElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn-Tabs');
      if (!button) return;
      const pathName = button.getAttribute('href');
      const tab = button.dataset.tab;
      let newUrl = new URL(location.origin);
      history.pushState({ tab }, null, `${pathName}`);
      newUrl.pathname = pathName;
      handler('all', tab);
    });
  }
  _windowLoadingAllPaletteView(handler) {
    window.addEventListener('load', function () {
      const pathName = location.pathname;
      let tab = pathName.split('/')[2];
      let length = pathName.split('/').length;
      const include = ['popular', 'random', 'new'].includes(tab);
      if (tab && length === 3 && include) handler('all', tab);
    });
  }
  _windowPopState(handler) {
    window.addEventListener('popstate', function (e) {
      const tab = e.state.tab;
      if (!e.state.tab) return;
      handler('all', tab);
    });
  }
}
