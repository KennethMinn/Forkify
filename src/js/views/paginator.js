import View from "./view.js";

import icons from "url:../../img/icons.svg";

class PaginatorView extends View {
 _parentEl = document.querySelector('.pagination');

 addPaginatorClick(handler) {
   this._parentEl.addEventListener('click', function (e){
      const btn = e.target.closest('.btn--inline');
      const page = +btn.dataset.gotopage;
      handler(page);
   })
};

 _generateMarkup() {
  const currentPage = this._data.page;
  const totalPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

 if(currentPage === 1 && totalPages > 1) {
    return `
         <button data-goToPage='${currentPage + 1}' class="btn--inline pagination__btn--next">
             <span>Page ${currentPage + 1}</span>
             <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
             </svg>
         </button>
    `
 };

 if(currentPage === totalPages && totalPages > 1) {
    return `
        <button data-goToPage='${currentPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${totalPages - 1}</span>
        </button>
    `
 };

 if(currentPage > 1){
   return `
         <button data-goToPage='${currentPage - 1}' class="btn--inline pagination__btn--prev">
             <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
             </svg>
             <span>Page ${currentPage - 1}</span>
         </button>

         <button data-goToPage='${currentPage + 1}' class="btn--inline pagination__btn--next">
         <span>Page ${currentPage + 1}</span>
         <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
         </svg>
        </button>
   `
 }

 return ''
 }
};

export default new PaginatorView();