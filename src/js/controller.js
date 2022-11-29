import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import BookmarkView from "./views/bookmarkView.js";
import PaginatorView from "./views/paginator.js";
import RecipeView from "./views/recipeView.js";
import ResultView from "./views/resultView.js";
import SearchView from "./views/searchView.js";
import UploadRecipeView from "./views/uploadRecipeView.js";

import {MODEL_WAITING_TIME} from './config.js';

const controlRecipe = async function () {
   try{
    const id = window.location.hash.slice(1);
    
    if(!id) return;
   
    RecipeView.renderSpinner();

    await model.loadRecipe(id);
    
    ResultView.update(model.searchResultsPerPage());

    BookmarkView.update(model.state.bookmarks);
 
    model.state.bookmarks.some((bookmark)=> model.state.recipe.id === bookmark.id) ? 
    model.state.recipe.bookmarked = true : model.state.recipe.bookmarked = false;
    
    RecipeView.render(model.state.recipe);
    
   }catch (error) {
      RecipeView.renderErrorMessage();
   }
};


const controlSearchResults = async () => {
  try{
   const query = SearchView.getQuery();

   if(!query) return;
   
   await model.searchRecipe(query);
  
   ResultView.render(model.searchResultsPerPage());

   PaginatorView.render(model.state.search);

  }catch(error){
    console.log(error);
  }
  
};

const controlPaginateResults = (goToPage) => {
  ResultView.render(model.searchResultsPerPage(goToPage));

  PaginatorView.render(model.state.search);
};

const controlServing = (newServing) => {
  model.updateServings(newServing);

  RecipeView.update(model.state.recipe);
}

const controlBookmark = () => {
   if(!model.state.recipe.bookmarked){
    model.addBookMark(model.state.recipe)
   }else{
    model.removeBookMark(model.state.recipe.id);
   };
   RecipeView.update(model.state.recipe);
   BookmarkView.render(model.state.bookmarks);
};

const controlUploadRecipe =async (newRecipe) => {
  try{
   await model.uploadRecipe(newRecipe);
 
   RecipeView.update(model.state.recipe);

   BookmarkView.render(model.state.bookmarks);

   UploadRecipeView.toggleWindow();

   window.history.pushState(null,'',`#${model.state.recipe.id}`);
 
  }catch(error){
    console.error(error.message)
  }
}

const initialRenderBookMark = () => {
  BookmarkView.render(model.state.bookmarks);
}

const init = () => {
  BookmarkView.addHandlerBookmark(initialRenderBookMark)
  RecipeView.addHandlerRender(controlRecipe);
  RecipeView.addHandlerServings(controlServing);
  RecipeView.addHandlerBookmark(controlBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginatorView.addPaginatorClick(controlPaginateResults);
  UploadRecipeView.addUploadRecipeHandler(controlUploadRecipe);
};
init();


