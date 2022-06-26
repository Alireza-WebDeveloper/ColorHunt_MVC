import View from './view';
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
class CommentView extends View {
  _parElement = document.querySelector('.comment--List');
  _generateMarkUp() {
    return this._data
      .map((ObjectData, index) => {
        return `<!-- Commnet ${index}  -->
            <section class="col bg-dark rounded" data-tab="..." data-cmd="${index}" data-info="cmd">
              <div class="row row-cols-1">
                <div class="col d-flex justify-content-end">
                     <div class="author--Information d-flex flex-column w-100">
                      <div class="author--name d-flex justify-content-end w-100   gap-2">
                        <span>${ObjectData.author}</span>
                         <svg class="svg--commentList bg-light rounded">
                        <use href="${icon}#person"></use>
                      </svg>
                      </div>
                      <div class="author--title d-flex justify-content-end w-100   gap-2">
                        <span>${ObjectData.title}</span>
                        <svg class="svg--dataTitle bg-light rounded">
                          <use href="${icon}#card-text"></use>
                        </svg>
                      </div>
                     </div>
                </div>
                <div class="col comment-List-Description">
                  <p class="text--Description">${ObjectData.message}</p>
                </div>
              </div>
              </section>`;
      })
      .join('');
  }
}

export default new CommentView();
