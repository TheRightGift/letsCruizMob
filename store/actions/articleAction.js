// Define action types
export const ARTICLE_DATA = 'ARTICLE_DATA';
export const CATEGORIES_DATA = 'CATEGORIES_DATA';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

//Define action creators
/**
 * For settings the article data.
 *
 * @param aData The articleData object returned from DB.
 */
exports.setArticleData = (aData) => {
	return {
		type : exports.ARTICLE_DATA,
		payload : { articles : aData }
	};

}; /* setArticleData(). */

/**
 * For settings the article category data.
 *
 * @param cData The categoryData object returned from DB.
 */
 exports.setCategoryData = (cData) => {
	return {
		type : exports.CATEGORIES_DATA,
		payload : { categories : cData }
	};

}; /* setCategoryData(). */

/**
 * For updating the article data.
 *
 * @param aData The articleData object returned from DB.
 */
exports.updateArticleData = (aData) => {
	return {
		type : exports.UPDATE_ARTICLE,
		payload : { articles : aData }
	};

}; /* updateArticleData(). */

/**
 * For updating the category data.
 *
 * @param aData The categoryData object returned from DB.
 */
 exports.updateCategoryData = (cData) => {
	return {
		type : exports.UPDATE_CATEGORY,
		payload : { category : cData }
	};

}; /* updateCategoryData(). */

/**
 * For adding article to the article dataset.
 *
 * @param aData The articleData object returned from DB.
 */
 exports.addArticleData = (aData) => {
	return {
		type : exports.ADD_ARTICLE,
		payload : { articles : aData }
	};

}; /* addArticleData(). */

/**
 * For adding cat to the categories dataset.
 *
 * @param cData The categoryData object returned from DB.
 */
 exports.addCategoryData = (cData) => {
	return {
		type : exports. ADD_CATEGORY,
		payload : { category : cData }
	};

}; /* addCategoryData(). */
