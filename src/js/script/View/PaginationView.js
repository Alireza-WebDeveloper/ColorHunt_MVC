import View from "./view";
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
class PaginationView extends View{
    _parElement = document.querySelector('.pagination');
    _generateMarkUp(){
        const numPage = Math.floor(this._data.result.length / this._data.resultPerPage);
         
        // اولین صفحه 
       if(this._data.page === 1 && numPage > 1 ){
           return `
       <li class="active-Page mt-1" data-goToPage="${this._data.page}">صفحه ${this._data.page} از ${numPage}</li>
       <li class="page-item mt-1" data-goToPage="${this._data.page+1}">${this._data.page+1}</li>
       <li class="page-item mt-1" data-goToPage="${this._data.page+2}">${this._data.page+2}</li>
       <li class="page-item mt-1" data-goToPage="${this._data.page+1}">
           <svg class="svg--nextPage">
             <use href="${icon}#arrow-right-short"></use>
           </svg>
       </li>
       <li class='mt-1'>...</li>
       <li class="page-item mt-1" data-goToPage="${numPage}">${numPage}</li>`;
       }
        //// یک صفحه مونده به آخر
       if(this._data.page === numPage -1 ){
           return `
           <li class="page-item mt-1 start" data-goToPage="${1}">${1}</li>
           <li class="page-item mt-1"  id='prevState' data-goToPage="${this._data.page-1}">
           <svg class="svg--PrevPage">
             <use href="${icon}#arrow-left-short"></use>
           </svg>
           </li>  
           <li class="active-Page mt-1" data-goToPage="${this._data.page}">صفحه ${this._data.page} از ${numPage}</li>
           <li class="page-item mt-1" data-goToPage="${this._data.page+1}">${this._data.page+1}</li>
           <li class="page-item mt-1" data-goToPage="${this._data.page+1}">
           <svg class="svg--nextPage">
             <use href="${icon}#arrow-right-short"></use>
           </svg>
          </li>
           <li class='mt-1'>...</li>
           `
       }
       // آخرین صفحه
       if(this._data.page === numPage){
           console.log(this._data.page);
          return `
          <li class="page-item mt-1 start" data-goToPage="${1}">${1}</li>
           <li class="page-item mt-1" id='prevState' data-goToPage="${this._data.page-1}">
           <svg class="svg--PrevPage">
             <use href="${icon}#arrow-left-short"></use>
           </svg>
           </li> 
           <li class="active-Page mt-1" data-goToPage="${this._data.page}">صفحه ${this._data.page} از ${numPage}</li>   
           `
       }
       // دو صفحه مونده به آخر 
       if(this._data.page === numPage-2){
        return `
        <li class="page-item mt-1 start" data-goToPage="${1}">${1}</li>
        <li class="page-item mt-1"  id='prevState'  data-goToPage="${this._data.page-1}">
                    <svg class="svg--PrevPage">
                      <use href="${icon}#arrow-left-short"></use>
                    </svg>
                    </li>         
      <li class="active-Page mt-1" data-goToPage="${this._data.page}">صفحه ${this._data.page} از ${numPage}</li>
      <li class="page-item mt-1" data-goToPage="${this._data.page+1}">${this._data.page+1}</li>
      <li class="page-item mt-1" data-goToPage="${this._data.page+2}">${this._data.page+2}</li>
      <li class="page-item mt-1" data-goToPage="${this._data.page+1}">
          <svg class="svg--nextPage">
            <use href="${icon}#arrow-right-short"></use>
          </svg>
      </li>
      <li class='mt-1'>...</li>
      <li class="page-item mt-1" data-goToPage="${numPage}">${numPage}</li>`;
       }
       //  صفحات بعد از یک
       if(this._data.page <numPage && this._data.page > 1){
        return `
        <li class="page-item mt-1 start" data-goToPage="${1}">${1}</li>
          <li class="page-item mt-1"  id='prevState' data-goToPage="${this._data.page-1}">
                      <svg class="svg--PrevPage">
                        <use href="${icon}#arrow-left-short"></use>
                      </svg>
                      </li>         
        <li class="active-Page mt-1" data-goToPage="${this._data.page}">صفحه ${this._data.page} از ${numPage}</li>
        <li class="page-item mt-1" data-goToPage="${this._data.page+1}">${this._data.page+1}</li>
        <li class="page-item mt-1" data-goToPage="${this._data.page+2}">${this._data.page+2}</li>
        <li class="page-item mt-1" data-goToPage="${this._data.page+1}">
            <svg class="svg--nextPage">
              <use href="${icon}#arrow-right-short"></use>
            </svg>
        </li>
        <li class='mt-1'>...</li>
        <li class="page-item mt-1" data-goToPage="${numPage}">${numPage}</li>`;
       }
      
    }
    /**
     * 
     * @param {*} handler فانکشن که کار لود پالت های رنگی رو انجام میده 
     * @description از این طریق وقتی روی صفحه 2 کلیک کنیم ، ایتم های بین 10 و 20 لود می شوند
     */
    _addHandler(handler){
      this._parElement.addEventListener('click',function(e){
          const button = e.target.closest('.page-item');
          if(!button) return;
          const goToPage = +button.dataset.gotopage;
           handler(goToPage);
      })
    }
}

export default new PaginationView();