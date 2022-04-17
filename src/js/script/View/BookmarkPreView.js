import View from "./view";
export default class BookmarkPreView extends View{
    _generateMarkUp(){
        return this._data.map((ObjectData)=>{
            return ` <section class="palette mt-2">
            <button type="button" class="btn remove--BookMark btn-close" data-code="${ObjectData.id}">
            </button>
            <a class="recipe-Link" href="/palettes/${ObjectData.id}" data-code="${ObjectData.id}">
            <div class="recipe-Place c-1" data-index="1"  style='background-color:${ObjectData.color1}'>
            </div>
            <div class="recipe-Place c-2" data-index="2"  style='background-color:${ObjectData.color2}'>
            </div>
            <div class="recipe-Place c-3" data-index="3"  style='background-color:${ObjectData.color3}'>
            </div>
            <div class="recipe-Place c-4" data-index="4"   style='background-color:${ObjectData.color4}'>
            </a>
            </section>`
        }).join('');
    }
    /**
     * 
     * @param {*} handler = controlBookMarkView
     * @description زمانی که صفحه لود می شود تمامی لیست ذخیره شده از ماژول  گرفته و نمایش داده می شود
     */
    _addHandler(handler){
        window.addEventListener('load',function(){
            handler();
        })
    }
    /**
     * 
     * @param {*} handler = controlUpdateBookMarkList
     * @description برای حذف پالت از لیست ذخیره شده 
     */
    _addHandlerRemove(handler){
        this._parElement.addEventListener('click',function(e){
            const button = e.target.closest('.remove--BookMark');
            if(!button) return;
            const id = button.dataset.code;
            handler(id);
        })
    }
    /**
     * 
     * @param {*} handler = = controlUpdateBookMarkList
     * @description برای اضافه کردن  پالت به لیست ذخیره
     */
    _addHandlerSinglePalette(handler){
        this._parElement.addEventListener('click',function(e){
            e.preventDefault();
            const button = e.target.closest('.recipe-Link');
            if(!button) return;
            let newUrl = new URL(location.origin);
            let pathName = button.getAttribute('href');
            let id =pathName.split('/')[2];
            history.pushState({id},null,`${pathName}`)
            newUrl.pathname = pathName;
            const code = button.dataset.code;
            handler(code);
        })
    }
}