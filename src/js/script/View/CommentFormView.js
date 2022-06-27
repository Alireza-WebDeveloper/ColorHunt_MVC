import View from './view';
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import Swal from 'sweetalert2';
class CommentFormView extends View {
  _parElement = document.querySelector('.custom_Form');
  _SectionComment = document.querySelector('.Section__Comment');
  _activeToggle = true;
  constructor() {
    super();
    this._parElement.addEventListener('click', this._dropForm.bind(this));
  }
  _generateMarkUp() {
    this._SectionComment.classList.add('bg-light');
    return `
        <section class="col comment--Tittle d-flex 
        flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column
        justify-content-xl-between  justify-content-lg-between  justify-content-md-between  justify-content-sm-between
        justify-content-column
        align-items-center">
          <button class="btn add--Comment  order-xl-first order-lg-first order-md-first order-sm-first order-last ">
                ${
                  this._activeToggle
                    ? `ارسال کامنت 
                 <svg class="svg--addplus">
                   <use href="${icon}#plus"></use>
                   </svg>`
                    : `  
                   <svg class="svg--addplus">
                   <use href="${icon}#x"></use>
                   </svg>
                   `
                }
             
          </button>
          <h4 class="info--comments   order-xl-last">
          <span>
          کامنت ثبت شده
          </span>
            <span>
            ${this._data.length}
            </span>
            <svg class="svg--infoComments">
             <use href="${icon}#chat-dots"></use>
           </svg>
          </h4>
        </section>
     <section class="col rounded mt-4">
      <div class="row d-flex justify-content-center">
        <div class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 ">
         <form class="row row-cols-1  gy-3 p-3 rounded" id="comment-Form">
           <div class="col comment-Form-Author">
             <input class="form-control form-control-lg" type="text" id="author-Name" name="author" placeholder="نام خود را وارد کنید">
             <div class='check_Author valid_Form p-2'></div>
           </div>
           <div class="col comment-Form-Title">
             <input class="form-control form-control-lg" type="text" id="author-Title" name="title" placeholder="عنوان">
             <div class='check_Title valid_Form p-2'></div>
           </div>
           <div class="col comment-Form-Message">
            <textarea class="form-control form-control-lg" id="author-Message" name="message" rows="4" placeholder="نظر خود را ثبت نمایید"></textarea>
            <div class='check_Message valid_Form p-2'></div>
           </div>
           <div class="col comment-Form-submit d-flex justify-content-center">
              <button type="submit" class="btn btn-light p-2" id="comment-Submit">ثبت دیدگاه</button>
            </div>
        </form> 
        </div>
      </div>
    </section>
    <div class="col"><h4 class="header--Comment">نظرات</h4></div>
    `;
  }
  _generateMarkUpAddComment(condition) {
    return !condition
      ? `بستن <svg class="svg--addplus"><use href="${icon}#x"></use></svg> `
      : `ارسال کامنت<svg class="svg--addplus"> <use href="${icon}#plus"></use></svg>
        `;
  }
  _dropForm(e) {
    const button = e.target.closest('.add--Comment');
    if (!button) return;
    $('#comment-Form').slideToggle('fast');
    this._activeToggle = !this._activeToggle;
    const markUp = this._generateMarkUpAddComment(this._activeToggle);
    button.innerHTML = '';
    button.insertAdjacentHTML('beforeEnd', markUp);
  }
  _addHandlerSendFormComment(handler) {
    this._parElement.addEventListener('submit', SendComment.bind(this));
    function SendComment(e) {
      e.preventDefault();
      const dataArr = [...new FormData(e.target.closest('#comment-Form'))];
      const dataObj = Object.fromEntries(dataArr);
      /// Check Doms
      let check_Author = this._parElement.querySelector('.check_Author');
      let check_Title = this._parElement.querySelector('.check_Title');
      const check_Message = this._parElement.querySelector('.check_Message');
      /// Functions Validation
      const validAuthor = this._validationAuthor(dataObj.author, check_Author);
      const validTitle = this._validationTitle(dataObj.title, check_Title);
      const validMessage = this._validationMessage(
        dataObj.message,
        check_Message
      );
      if (validAuthor && validTitle && validMessage) handler(dataObj);
    }
  }
  _validationAuthor(inputAuthor, check_Author) {
    let regexCharEnglish = /^[A-Za-z]+$/;
    let regexCharCharPersian = /^[\u0600-\u06FF\s]+$/;
    if (
      (regexCharCharPersian.test(inputAuthor) ||
        regexCharEnglish.test(inputAuthor)) &&
      inputAuthor.length >= 4
    ) {
      check_Author.style.display = 'block';
      check_Author.textContent = 'Correct';
      check_Author.classList.add('correct_Valid');
      return true;
    } else {
      check_Author.style.display = 'block';
      check_Author.textContent =
        'Your input character must be longer than 4 characters';
      check_Author.classList.remove('correct_Valid');
      return false;
    }
  }
  _validationTitle(inputTitle, checkTitle) {
    let regexCharEnglish = /^[A-Za-z]+$/;
    let regexCharCharPersian = /^[\u0600-\u06FF\s]+$/;
    if (
      (regexCharCharPersian.test(inputTitle) ||
        regexCharEnglish.test(inputTitle)) &&
      inputTitle.length >= 2
    ) {
      checkTitle.style.display = 'block';
      checkTitle.textContent = 'correct';
      checkTitle.classList.add('correct_Valid');
      return true;
    } else {
      checkTitle.style.display = 'block';
      checkTitle.textContent =
        'Your input character must be longer than 2 characters';
      checkTitle.classList.remove('correct_Valid');
      return false;
    }
  }
  _validationMessage(inputMessage, checkMessage) {
    const word = inputMessage.split(' ');
    if (word.length >= 1 && word[0] != '') {
      checkMessage.style.display = 'block';
      checkMessage.textContent = 'correct';
      checkMessage.classList.add('correct_Valid');
      return true;
    } else {
      checkMessage.style.display = 'block';
      checkMessage.textContent =
        'Your input must be longer than 1 word';
      checkMessage.classList.remove('correct_Valid');
      return false;
    }
  }
  _onblurForm() {
    /// Inputs
    let input_Author = this._parElement.querySelector('#author-Name');
    let input_Title = this._parElement.querySelector('#author-Title');
    let input_Message = this._parElement.querySelector('#author-Message');
    /// Check Validation
    let check_Author = this._parElement.querySelector('.check_Author');
    let check_Title = this._parElement.querySelector('.check_Title');
    const check_Message = this._parElement.querySelector('.check_Message');
    /// On Blur Validation
    input_Author.addEventListener('blur', onBlurAuthor.bind(this));
    input_Title.addEventListener('blur', onBlurAuthor.bind(this));
    input_Message.addEventListener('blur', onBlurAuthor.bind(this));
    function onBlurAuthor(e) {
      const dataArr = [...new FormData(e.target.closest('#comment-Form'))];
      const dataObj = Object.fromEntries(dataArr);
      /// Function Check Validation
      this._validationAuthor(dataObj.author, check_Author);
      this._validationTitle(dataObj.title, check_Title);
      this._validationMessage(dataObj.message, check_Message);
    }
  }
  _clearForm() {
    this._parElement.querySelector('#author-Name').value = '';
    this._parElement.querySelector('#author-Title').value = '';
    this._parElement.querySelector('#author-Message').value = '';
  }
  _clear() {
    this._parElement.innerHTML = '';
    this._SectionComment.classList.remove('bg-light');
  }
  _SucessAlertComment() {
    Swal.fire({
      title: 'پیام شما با موفقیت ثبت شد',
      color: 'black',
      timer: 1500,
      timerProgressBar: true,
      allowOutsideClick: false,
      footer: 'تا لحضاتی دیگر نمایش داده می شود',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
}

export default new CommentFormView();
