import View from "./view";
export default class BookmarkPreView extends View{
 
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