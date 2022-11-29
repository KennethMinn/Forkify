import View from "./view.js";

class SearchView extends View{
  parentEl = document.querySelector(".search");

  getQuery () {
    const query = document.querySelector(".search__field").value;
    this._clearInput();
    return query;
  };

  _clearInput(){
    document.querySelector(".search__field").value = "";
  };

  addHandlerSearch(handler) {
    this.parentEl.addEventListener('submit',function(e){
       e.preventDefault();
       handler()
    })
  }
};
export default new SearchView();