import icons from "url:../../img/icons.svg";

export default class View {
 _data;

 render (data,render = true) {
    this._data = data;

    if(!this._data && (Array.isArray(this._data) && this._data.length)) return;
    
    const markup = this._generateMarkup();

    if(!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin",markup);
  };

  update(data) {
    this._data = data;
    
    const newMarkup = this._generateMarkup();
    
    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDom.querySelectorAll("*"));

    const currentElements = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl,i) => {
      const currentEl = currentElements[i];


      if(!newEl.isEqualNode(currentEl) && newEl.firstChild?.nodeValue.trim() !== ''){
        currentEl.textContent = newEl.textContent;
      };

      if(!newEl.isEqualNode(currentEl)){
        Array.from(newEl.attributes).forEach(newElAtt => {
          currentEl.setAttribute(newElAtt.name,newElAtt.value);
        })
      }
    })

  };

  renderErrorMessage(errorMessage = this._errorMessage) {
    const markup =  `
     <div class="error">
       <div>
         <svg>
           <use href="${icons}#icon-alert-triangle"></use>
         </svg>
       </div>
       <p>${errorMessage}</p>
     </div>
    `
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin",markup);
  };

  renderSuccessMessage(successMessage = this._successMessage) {
    const markup =  `
     <div class="">
       <div>
         <svg>
           <use href="${icons}#icon-alert-triangle"></use>
         </svg>
       </div>
       <p>${successMessage}</p>
     </div>
    `
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin",markup);
  };

  _clear () {
    this._parentEl.innerHTML = "";
  };

  renderSpinner = ()=>{
    const spinner = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin",spinner);
  };
};
