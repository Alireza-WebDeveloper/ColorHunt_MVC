import View from './view';
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import html2canvas from 'html2canvas';
import tippy from 'tippy.js';
import '../../../../node_modules/tippy.js/dist/tippy.css';
class SinglePalettView extends View {
  _parElement = document.querySelector('.main--SinglePalette');
  _getCanves;
  constructor() {
    super();
    this._parElement.addEventListener('click', this._copyColor.bind(this));
    this._parElement.addEventListener(
      'click',
      this._downloadImagePalette.bind(this)
    );
    this._parElement.addEventListener(
      'click',
      this._copyCodePalette.bind(this)
    );
  }

  _generateMarkUp() {
    return `<div class="col"><h1 class="header--singlePalette">جزییات پالت رنگی</h1></div>
    <section class="col col-xl-8 col-lg-10 col-md-8 col-sm-10 col-12 single--Palette">
      <div class="item">
      <section class="palette">
      <div class="recipe-Place c-1" data-index="1" style='background-color:${
        this._data.color1
      }'>
        <span class="copy-code">${this._data.color1}</span>
      </div>
      <div class="recipe-Place c-2" data-index="2" style='background-color:${
        this._data.color2
      }'>
       <span class="copy-code">${this._data.color2}</span>
      </div>
      <div class="recipe-Place c-3" data-index="3" style='background-color:${
        this._data.color3
      }'>
       <span class="copy-code">${this._data.color3}</span>
      </div>
      <div class="recipe-Place c-4" data-index="4" style='background-color:${
        this._data.color4
      }'>
       <span class="copy-code">${this._data.color4}</span>
      </div>
    </section>
        <section class="palette-Details mt-2">
          <button class="btn btn--Bookmark" data-code='${this._data.id}'>
           <svg class="svg--btnBookmark">
           <use href="${icon}#bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
           </svg>
           <span>ذخیره</span>
          </button>
          <button class='btn btn-Like' data-code='${this._data.id}'>
          <svg class="svg--btnLike">
          <use href="${icon}#heart${
      this._data.activeLike ? '-fill' : ''
    }"></use>
           </svg>
          <span class="num--Likes">${this._data.likes}</span>
          </button>
          <button class="btn btn--downloadPalette" >
            <svg class="svg--downloadPalette">
              <use href="${icon}#download"></use>
            </svg>
            <span>تصویر</span>
          </button>
          <button class="btn btn--btnsourePalette" data-code='${this._data.id}'>
            <svg class="svg--btnsourePalette">
              <use href="${icon}#link"></use>
            </svg>
            <span>لینک</span>
          </button>
          <span class="date">${this._calcDateCreatePalette(
            this._data.creationDate
          )}</span>
        </section>
       </div>
    </section>
    <section class="col pt-3 rounded table--SinglePalette">
      <table class="table  table-responsive table-hover">
        <thead>
          <tr class="single--Circle">
            <th class="col"><div class="circle-singPalette" style='background-color:${
              this._data.color1
            }'></div></th>
            <th class="col"><div class="circle-singPalette" style='background-color:${
              this._data.color2
            }'></div></th>
            <th class="col"><div class="circle-singPalette" style='background-color:${
              this._data.color3
            }'></div></th>
            <th class="col"><div class="circle-singPalette" style='background-color:${
              this._data.color4
            }'></div></th>
          </tr>
        </thead>
        <tbody>
          <tr class="single--CodeRgb">
            <td class=""><button class="btn rgb-Copy copy-code">${
              this._data.color1
            }</button></td>
            <td class=""><button class="btn rgb-Copy copy-code">${
              this._data.color2
            }</button></td>
            <td class=""><button class="btn rgb-Copy copy-code">${
              this._data.color3
            }</button></td>
            <td class=""><button class="btn rgb-Copy copy-code">${
              this._data.color4
            }</button></td>
          </tr>
          <tr class="single--CodeHex">
            <td class=""><button class="btn hex-Copy copy-code">${this._convertHexToRGBA(
              this._data.color1
            )}</button></td>
            <td class=""><button class="btn hex-Copy copy-code">${this._convertHexToRGBA(
              this._data.color2
            )}</button></td>
            <td class=""><button class="btn hex-Copy copy-code">${this._convertHexToRGBA(
              this._data.color3
            )}</button></td>
            <td class=""><button class="btn hex-Copy copy-code">${this._convertHexToRGBA(
              this._data.color4
            )}</button></td>
          </tr>
        </tbody>
      </table>
    </section>
    `;
  }
  /**
   *
   * @param {*} hex Ex:#FC526
   * @returns  Ex:rgb(234,255,134)
   */
  _convertHexToRGBA(hex) {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
  /**
   *
   * @param {*} e = button
   * @description copy code palette
   * @returns  rgb,hex
   */
  _copyColor(e) {
    const button = e.target.closest('.copy-code');
    if (!button) return;
    // copy on clipboard
    navigator.clipboard.writeText(`${button.textContent}`);
  }
  /**
   *
   * @param {*} string = string of date
   * @description create date
   * @returns Ex:04/03/2022 , today , week , ...
   */
  _calcDateCreatePalette(string) {
    const dateCreate = new Date(`${string}`);
    const newDate = new Date();
    const day = Math.floor((newDate - dateCreate) / (24 * 60 * 60 * 1000));
    const history = new Intl.DateTimeFormat(navigator.language, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(dateCreate);
    return day === 0
      ? 'امروز'
      : day < 7
      ? `روز پیش${day}`
      : day === 7
      ? 'یک هفته پیش'
      : day > 7
      ? history
      : '';
  }
  /**
   *
   * @param {*} e = button
   * @deprecated Download Image Palette
   * @returns file Image
   */
  _downloadImagePalette(e) {
    const button = e.target.closest('.btn--downloadPalette');
    const palette = e.target.closest('.item');
    if (!button) return;
    //  دانلود تصویر
    html2canvas(palette).then((canvas) => {
      this._getCanves = canvas;
      download();
    });
    const download = () => {
      const a = document.createElement('a');
      a.href = this._getCanves.toDataURL();
      a.download = `${this._data.id}.jpeg`;
      a.click();
    };
  }
  /**
   *
   * @param {*} e  = button
   * @description copy code rgb,hex
   * @returns  Ex : #Fc263 || rgb(245,233,241)
   */
  _copyCodePalette(e) {
    const button = e.target.closest('.btn--btnsourePalette');
    if (!button) return;
    //  Copy on ClipBoard
    let code = button.dataset.code;
    console.log(code);
    navigator.clipboard.writeText(`${code}`);
  }
  /**
   *
   * @param {*} handler = controlUpadeLikePalette()
   */
  _addHandlerLikePalette(handler) {
    this._parElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn-Like');
      if (!button) return;
      const id = button.dataset.code;
      handler(id);
    });
  }
  /**
   *
   * @param {*} handler = controlUpdateBookMarkList()
   */
  _addHandlerBookmarkPalette(handler) {
    this._parElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--Bookmark');
      if (!button) return;
      const id = button.dataset.code;
      handler(id);
    });
  }

  _toolTips() {
    tippy('.copy-code', {
      content: 'کپی کد',
      duration: 400,
    });
    tippy('.btn--btnsourePalette', {
      content: 'کپی کد',
      duration: 400,
    });
  }
  /**
   *
   * @param {*} handler = controlGetSinglePalett()
   */
  _windowLoading(handler) {
    window.addEventListener('load', function () {
      let pathName = location.pathname;
      let id = pathName.split('/')[2];
      let length = pathName.split('/').length;
      const include = ['popular', 'random', 'new'].includes(id);
      if (id && length === 3 && pathName.startsWith('/palettes/') && !include)
        handler(id);
    });
  }
  /**
   *
   * @param {*} handler = controlGetSinglePalett()
   */
  _windowPopState(handler) {
    window.addEventListener('popstate', function (e) {
      let id = e?.state?.id;
      if (!id) return;
      handler(id);
    });
  }
}

export default new SinglePalettView();
