import View from './view';
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import tippy from 'tippy.js';
import '../../../../node_modules/tippy.js/dist/tippy.css';
import SinglePalettePreView from './SinglePalettePreView';
import Swal from 'sweetalert2';
class createPaletteCategory extends View {
  _parElement = document.querySelector('.create--Palette');
  _cateGoryName;
  constructor() {
    super();
    this._parElement.addEventListener('click', this._changeColor.bind(this));
  }
  _generateMarkUp() {
    return `<div class="item">
        <section class="palette">
          <div class="recipe-Place c-1" data-index="2" data-code="..." style='background-color:#969696'>
            <input type="color" class="form-control form-control-color" value="#969696" title="Choose your color" name="color1">
          </div>
          <div class="recipe-Place c-2" data-index="3" data-code="..." style='background-color:#CCCCCC'>
            <input type="color" class="form-control form-control-color" value="#CCCCCC" title="Choose your color" name="color2">
          </div>
          <div class="recipe-Place c-3" data-index="4" data-code="..." style='background-color:#DDDDDD'>
            <input type="color" class="form-control form-control-color" value="#DDDDDD" title="Choose your color" name="color3">
          </div>
          <div class="recipe-Place c-4" data-index="4" data-code="..." style='background-color:#EEEEEE'>
            <input type="color" class="form-control form-control-color" value="#EEEEEE" title="Choose your color" name="color4">
          </div>
        </section>
       </div>
       <div class="col information-CategoryNamePalette mt-3">
           <select class="form-select form-select-lg">
           ${this._data.map((name) => this._generateMarkFormSelect(name))}
           </select>
       </div>
       <div class="col information-CreatePalette d-flex justify-content-center mt-3">
          <button type="submit" class="btn" id="btn--CreatePalette">ثبت پالت</button>
       </div>`;
  }
  /**
   *
   * @param {*} name =  Category names
   * @returns EX : <option value='pastel'>pastel</option>
   */
  _generateMarkFormSelect(name) {
    return `<option value="${name}">${name}</option>`;
  }
  /**
   *
   * @param {*} e = change background color input , recipe
   * @returns
   */
  _changeColor(e) {
    const colorPicker = e.target.closest('.form-control-color');
    if (!colorPicker) return;
    colorPicker.addEventListener('input', function (e) {
      const recipePalette = e.target.closest('.recipe-Place');
      if (!recipePalette) return;
      recipePalette.style.backgroundColor = `${e.target.value}`;
      this.value = e.target.value;
    });
  }
  /**
   *
   * @param {*} handler =  controlCreatePaletteCategory()
   * @description create Category {color1,color2,color3,color4} , name Category,EX : pastel ,...
   */
  _addHandlerCreatePalette(handler) {
    this._parElement.addEventListener(
      'submit',
      createPaletteCategory.bind(this)
    );
    function createPaletteCategory(e) {
      e.preventDefault();
      this._cateGoryName = this._getCategoryName();
      const dataArr = [...new FormData(this._parElement)];
      const dataObj = Object.fromEntries(dataArr);
      handler(this._cateGoryName, dataObj);
    }
  }
  /// return Category name Ex:Pastel,...
  _getCategoryName() {
    const name = this._parElement.querySelector('select').value;
    return name;
  }
  /// Success(100%)->Completed Create Palette
  _successMessage() {
    Swal.fire({
      title: 'ساخت پالت',
      text: 'پالت  با موفقیت ساخته شد',
      icon: 'success',
      confirmButtonColor: 'green',
      confirmButtonText: 'Ok',
      allowOutsideClick: false,
      allowEnterKey: true,
      backdrop: 'black',
    }).then((result) => {
      if (result.isConfirmed) {
        $('#createPallete').click();
        this._clearData();
      }
    });
  }
  /// Wrong(0%)->Create Palette
  _errorOnMessage(error) {
    Swal.fire({
      title: 'ساخت پالت',
      text: `${error}`,
      icon: 'error',
      confirmButtonColor: 'red',
      confirmButtonText: 'Ok',
      allowOutsideClick: false,
      allowEnterKey: true,
      backdrop: 'black',
    });
  }
  /// Refresh Background Color Recipes , Inputs
  _clearData() {
    const [r1, r2, r3, r4] = Array.from(
      this._parElement.querySelectorAll('.recipe-Place')
    );
    const [inp1, inp2, inp3, inp4] = Array.from(
      this._parElement.querySelectorAll('.form-control-color')
    );
    inp1.value = r1.style.backgroundColor = '#969696';
    inp2.value = r2.style.backgroundColor = '#CCCCCC';
    inp3.value = r3.style.backgroundColor = '#DDDDDD';
    inp4.value = r4.style.backgroundColor = '#EEEEEE';
  }
  _windowLoading(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
  /// When Create Completed -> /palette/${id} on location
  _pushState(data) {
    const { id } = data;
    history.pushState({ id }, null, `/palettes/${id}`);
  }
}

export default new createPaletteCategory();
