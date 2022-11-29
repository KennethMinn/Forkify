import View from "./view";

class UploadRecipeView extends View {

  _parentEl = document.querySelector('.upload');
  _successMessage = 'Recipe was successfully uploaded :)';

  _overlay = document.querySelector('.overlay');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _closeWindowBtn = document.querySelector('.btn--close-modal');
  _openWindowBtn = document.querySelector('.nav__btn--add-recipe');
  _uploadBtn = document.querySelector('.nav__btn--add-recipe');
  _uploadForm = document.querySelector('.upload');

  constructor(){
    super();
    this.addCloseWindowHandler();
    this.addOpenWindowHandler();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._recipeWindow.classList.toggle('hidden');
  };

  addOpenWindowHandler() {
    this._openWindowBtn.addEventListener('click',this.toggleWindow.bind(this));
  };

  addCloseWindowHandler() {
    this._overlay.addEventListener('click',this.toggleWindow.bind(this));
    this._closeWindowBtn.addEventListener('click',this.toggleWindow.bind(this));
  };

  addUploadRecipeHandler(handler) {
    this._uploadForm.addEventListener('submit',function(e){
        e.preventDefault();
        const dataArray = [...new FormData(this)];
        const data = Object.fromEntries(dataArray);
        handler(data);
    })
  }
};

export default new UploadRecipeView();