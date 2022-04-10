import { ARTICLE_DATA, CATEGORIES_DATA, ADD_ARTICLE, ADD_CATEGORY, UPDATE_ARTICLE, UPDATE_CATEGORY } from '../actions/articleAction';

const initialState = {
    articles: [],
    categories: []
};

function articleReducer(state = initialState, action) {
    
    switch (action.type) {
        case ARTICLE_DATA: {
            return { ...state, ...{ articles : action.payload.articles } };
        }            
        case CATEGORIES_DATA: { 
            return { ...state, ...{ categories : action.payload.categories } };
        }
        case UPDATE_ARTICLE: {
            let nuArticle = [];
            
            state.articles.map((item, index) => {
                if (item._id !== action.payload.articles._id) {
                    // This isn't the item we care about - keep it as-is
                    nuArticle.push(item);
                } else {
                    nuArticle.push(action.payload.articles)
                }		
            });
            // update VOD data.
            return { ...state, ...{ articles : nuArticle } };
        }
        case UPDATE_CATEGORY: {
            let nuCat = [];
            
            state.articles.map((item, index) => {
                if (item._id !== action.payload.category._id) {
                    // This isn't the item we care about - keep it as-is
                    nuCat.push(item);
                } else {
                    nuCat.push(action.payload.category)
                }		
            });
            // update VOD data.
            return { ...state, ...{ categories : nuCat } };
        }
        case ADD_ARTICLE: {
            let nuArticle = state.articles;
            let nuArticleLen = nuArticle.length;

            // IF ARTICLE IS MORE THAN 3000
            if(nuArticleLen > 3000){
                // remove 1000 + (articleLen - 3000)
                let numberOfOldArticleToRemove = 1000 + (nuArticleLen - 3000);
                numberOfOldArticleToRemove = parseInt('-'+numberOfOldArticleToRemove);
                
                nuArticle.slice(0, numberOfOldArticleToRemove)
            }
                
            // add the new one
            nuArticle.unshift(action.payload.articles);
            
            return { ...state, ...{ articles : nuArticle } };
        }
        case ADD_CATEGORY: {
            let nuCat = state.categories;
                
            // add the new one
            nuCat.unshift(action.payload.category);
            
            return { ...state, ...{ categories : nuCat } };
        }
        default: {
            return state;
        }
            
    }
  }
  
  export default articleReducer;