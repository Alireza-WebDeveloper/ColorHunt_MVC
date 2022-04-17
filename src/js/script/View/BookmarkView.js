import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import BookmarkPreView from './BookmarkPreView';
class BookmarkView extends BookmarkPreView{
    _parElement = document.querySelector('.bookmark-list'); 
}

export default new BookmarkView();