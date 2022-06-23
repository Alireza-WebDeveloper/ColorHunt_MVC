import View from './view';
export default class HeaderPreView extends View {
  constructor() {
    super();
  }
  _generateMarkUp() {
    return `<li class="nav-item list-Tabs">
    <a
      class="link-Tabs nav-link"
      data-tab="create"
      data-text="پالت ها"
      >پالت ها</a
    >
  </li>
  <li class="nav-item list-Tabs">
    <a
      class="link-Tabs nav-link"
      data-tab="create-Pallete"
      data-bs-toggle="modal"
      data-bs-target="#createPallete"
      data-text="ساخت پالت"
      >ساخت پالت</a
    >
  </li>
  <li class="nav-item list-Tabs">
    <a
      class="link-Tabs dropdown-item nav-link"
      data-tab="bookmark-list2"
      data-bs-toggle="modal"
      data-bs-target="#bookmark-list2"
      data-text="لیست ذخیره پالت"
      >لیست ذخیره پالت</a
    >
  </li>
  <li class="nav-item list-Tabs">
    <a
      class="link-Tabs dropdown-item nav-link"
      data-tab="createPalette-View"
      data-bs-toggle="modal"
      data-bs-target="#createPalette-View"
      data-text="لیست پالت ساخته شده"
      >لیست پالت ساخته شده</a
    >
  </li>`;
  }
  _animateTabs(e) {
    const target = e.target.closest('.list-Tabs');
    const ul = this._parElement.querySelectorAll('.list-Tabs');
    if (!target) return;
    ul.forEach((element) => {
      const { opacity, blur } = this;
      element.style.opacity = `${opacity}`;
      element.style.filter = `blur(${blur}px)`;
    });
    target.style.opacity = '1';
    target.style.filter = 'blur(0)';
  }
  _windowLoading(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
}
