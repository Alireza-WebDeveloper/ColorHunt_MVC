import SinglePalettePreView from "./SinglePalettePreView";
import View from "./view";
export default class BookmarkPreView extends SinglePalettePreView{
    /**
     * 
     * @param {*} handler = controlBookMarkView() 
     */
    _windowLoading(handler){
        window.addEventListener('load',function(){
            handler();
        })
    }
    /**
     * 
     * @param {*} handler = controlUpdateBookMarkList() 
     * @description Delete Palette Of Bookmark
     */
    _addHandlerRemove(handler){
        this._parElement.addEventListener('click',function(e){
            const button = e.target.closest('.remove--BookMark');
            if(!button) return;
            const id = button.dataset.code;
            handler(id);
        })
    }
}