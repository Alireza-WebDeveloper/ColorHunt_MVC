import CategoryByNamesPreView from './CategoryByNamesPreView';
import View from './view';

class CategoryByNamesView extends CategoryByNamesPreView {
  _parElement = document.querySelector('.category-ByNames');
  _generateMarkUp() {
    return this._data.names
      .map((name) => {
        return `<li class="nav-item item-Tags rounded-3 ${
          this._data.query === name ? 'bg-danger' : ''
        }">
            <a href="/paletes/all/${name}" data-categoryname='${name}' class="link-Tags nav-link ${
          this._data.query === name ? 'text-dark' : ''
        }">${name}</a>
            </li>`;
      })
      .join('');
  }
}

export default new CategoryByNamesView();
