import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import BookmarkPreView from './BookmarkPreView';
class BookmarkView2 extends BookmarkPreView{
    _parElement = document.querySelector('.bookmark-list2');
    constructor(){
        super();
        this._parElement.addEventListener('click',this._hideModal.bind(this));
    }
    _hideModal(e){
            const button = e.target.closest('.recipe-Link');
            if(!button) return;
            $('#bookmark-list2').click();

    }
}

export default new BookmarkView2();