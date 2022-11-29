import { getJSON,sendJSON } from "./helpers.js";
import { API_KEY,REC_PER_PAGE,KEY } from "./config.js";

export const state = {
  recipe: {},
  search:{
    query:'',
    page:1,
    resultsPerPage: REC_PER_PAGE,
    results:[]
  },
  bookmarks:[]
};

const createRecipeObject = (data) => {
  let {recipe} = data.data;
    
  state.recipe = {
    id : recipe.id,
    title:recipe.title,
    cookingTime:recipe.cooking_time,
    servings:recipe.servings,
    publisher:recipe.publisher,
    ingredients:recipe.ingredients,
    image:recipe.image_url,
    sourceUrl:recipe.source_url,
    ...(recipe.key && {key : recipe.key})
  };
}

export const loadRecipe = async (id) => {
 try {
    
    const data = await getJSON(`${API_KEY}/${id}?key=${KEY}`);
    
   createRecipeObject(data);

 }catch(error){
    throw error;
 }
};

export const searchRecipe = async (query) => {
  try{
    const data = await getJSON(`${API_KEY}?search=${query}&key=${KEY}`);
    state.search.query = query;
    state.search.results = data.data.recipes.map((recipe)=> {
      return {
        id : recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        image:recipe.image_url,
        ...(recipe.key && {key : recipe.key})
      }
    } 
  );
  }catch(error)
  {
    console.log(error);
  }
};

export const searchResultsPerPage = (currentPage = state.search.page) => {
  state.search.page = currentPage;

  const start = (currentPage - 1) * 10 ;
  const end = currentPage * 10 ;
  state.search.page = 1;
  return state.search.results.slice(start,end);
};

export const updateServings = (newServing) => {
   state.recipe.ingredients.forEach(ing => {
    return ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
   });
   state.recipe.servings = newServing;
}

const setLocalStorage = () => {
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}

export const addBookMark = (recipe) => {
   state.recipe.bookmarked = true;
   state.bookmarks.push(recipe);
   setLocalStorage();
};

export const removeBookMark = (id) => {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index,1);
  state.recipe.bookmarked = false;
  setLocalStorage();
};

export const uploadRecipe = async (newRecipe) => {
  const ingredients = Object.entries(newRecipe)
  .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
  .map(ing => {
   const array  =  ing[1].replaceAll(' ','').split(',');

   if(array.length !== 3) throw new Error('Please fill as format');

   const [quantity,unit,description] =array;
   return {
    quantity : +quantity,
    unit,
    description
   }
  });

  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
  };
 
  const data = await sendJSON(`${API_KEY}?key=${KEY}`,recipe);
  createRecipeObject(data);
  addBookMark(state.recipe);
}

const init = () => {
 const storageBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

 if(storageBookmarks) state.bookmarks = storageBookmarks;
};
init();


