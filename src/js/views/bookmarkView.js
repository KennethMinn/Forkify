import View from "./view.js";

import icons from "url:../../img/icons.svg";
import PreviewView from "./previewView.js";

class BookmarkView extends View {
 _parentEl = document.querySelector('.bookmarks');

 addHandlerBookmark(handler) {
   window.addEventListener('load',handler);
 };
 
 _generateMarkup() {
    return this._data.map(bookmark => PreviewView.render(bookmark,false)).join(' ');
 };

};

export default new BookmarkView();