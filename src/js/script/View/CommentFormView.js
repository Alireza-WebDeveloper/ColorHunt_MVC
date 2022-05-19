import View from "./view";
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
class CommentFormView extends View{
    _parElement = document.querySelector('.custom_Form');
    _SectionComment = document.querySelector('.Section__Comment');
    _activeToggle = false;
    constructor(){
        super();
        this._parElement.addEventListener('click',this._dropForm.bind(this));
    }
    _generateMarkUp(){
       this._SectionComment.classList.add('bg-light');
        return `<section class="col comment--Tittle d-flex 
        flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column
        justify-content-xl-between  justify-content-lg-between  justify-content-md-between  justify-content-sm-between
        justify-content-column
        align-items-center
        ">
          <button class="btn add--Comment  order-xl-first order-lg-first order-md-first order-sm-first order-last ">
            افزودن دیدگاه
                <svg class="svg--addplus">
             <use href="${icon}#plus"></use>
           </svg>
          </button>
          <h4 class="info--comments   order-xl-last">
            <span>
              دیدگاه ثبت شده
              <bdo dir="right">...</bdo>
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
           </div>
           <div class="col comment-Form-Title">
             <input class="form-control form-control-lg" type="text" id="author-Title" name="title" placeholder="عنوان">
           </div>
           <div class="col comment-Form-Message">
            <textarea class="form-control form-control-lg" id="author-Message" name="message" rows="4" placeholder="نظر خود را ثبت نمایید"></textarea>
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
    _generateMarkUpAddComment(condition){
      return condition ? 
        `بستن <svg class="svg--addplus"><use href="${icon}#x"></use></svg> ` 
        : 
        `افزودن دیدگاه <svg class="svg--addplus"> <use href="${icon}#plus"></use></svg>
        `;
    }
    _dropForm(e){
      const button = e.target.closest('.add--Comment');
      if(!button) return;
      $('#comment-Form').slideToggle('fast');
      this._activeToggle = !this._activeToggle;
      const markUp = this._generateMarkUpAddComment(this._activeToggle);
      button.innerHTML  = '';
      button.insertAdjacentHTML('beforeEnd',markUp);
    }
}

export default new CommentFormView();