import View from "./view.js";

import icons from "url:../../img/icons.svg";
import PreviewView from "./previewView.js";

class ResultView extends View {
 _parentEl = document.querySelector('.results');

 _generateMarkup() {
    return this._data.map(result => PreviewView.render(result,false)).join(' ');
 };
};

export default new ResultView();