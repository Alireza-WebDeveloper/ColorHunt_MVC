import View from "./view";

export default class SinglePalettePreView extends View{
  /**
   * 
   * @param {*} handler = controlGetSinglePalette() 
   */
    _addHandlerSinglePalette(handler){
        this._parElement.addEventListener('click',function(e){
          const a = e.target.closest('.recipe-Link');
          if(!a) return;
          let newUrl = new URL(location.origin);
          let pathName = a.getAttribute('href');
          let id =pathName.split('/')[2];
          history.pushState({id},null,`${pathName}`)
          newUrl.pathname = pathName;
          handler(id);
        })
      }
}