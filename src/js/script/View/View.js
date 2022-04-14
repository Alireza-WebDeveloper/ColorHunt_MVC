export default class View{
    _data;
    _update(){}
    /**
     * 
     * @param {*} data آبجکت از اطالاعات 
     * @description نمایش روی صفحه برای کاربر
     * @returns 
     */
    _render(data){
        if(!data) return;
        this._data = data;
        this._clear();
       const markUp =  this._generateMarkUp();
       this._parElement.insertAdjacentHTML('beforeEnd',markUp); 
    }
    /**
     * 
     * @param {*} message  رشته String
     * @description پیام ضعیفی اینترنت
     */
    _renderError(message ='اینترنت شما ضعیف است، دوباره تلاش کنید'){
       this._clear();
        const markUp = `
        <div class="row d-flex justify-content-center mb-3">
        <div class="col col-12 col-sm-12 col-md-8 col-lg-6  col-xl-4">
          <div class="error">
            <h4 class="error--Message d-flex flex-column">
           <span>${message}</span><span>😣</span>
            </h4>
          </div>
        </div>
      </div>`;
      this._parElement.insertAdjacentHTML('beforeEnd',markUp);
       
    }
    /**
     * پیام موفقیت آمیز
     */
    _renderSuccess(){}
    /**
     * 
     * @param {*} message  پیام خطا
     */
    _renderLoading(message ='در حال لود شدن'){
      this._clear();
        const markUp = `<div class="col d-flex justify-content-center">
        <div class="spinner">
        <span class="text--Sp">${message}</span>
        <div class="sp" style="--sp:1"></div>
        <div class="sp" style="--sp:2"></div>
        <div class="sp" style="--sp:3"></div>
        <div class="sp" style="--sp:4"></div>
        <div class="sp" style="--sp:5"></div>
        <div class="sp" style="--sp:6"></div>
        <div class="sp" style="--sp:7"></div>
        <div class="sp" style="--sp:8"></div>
        <div class="sp" style="--sp:9"></div>
        <div class="sp" style="--sp:10"></div>
        <div class="sp" style="--sp:11"></div>
        <div class="sp" style="--sp:12"></div>
        <div class="sp" style="--sp:13"></div>
        <div class="sp" style="--sp:14"></div>
        <div class="sp" style="--sp:15"></div>
        <div class="sp" style="--sp:16"></div>
        <div class="sp" style="--sp:17"></div>
        <div class="sp" style="--sp:18"></div>
        </div>
        </div>`;
        this._parElement.insertAdjacentHTML('beforeEnd',markUp);
    }
    /**
     * پاک کردن یک عنصر اصلی
     */
    _clear(){
        this._parElement.innerHTML ='';
    }
    
}