// Define action types
export const LIVETV_DATA = 'LIVETV_DATA';
export const UPDATE_LIVETV = 'UPDATE_LIVETV';
export const ADD_LIVETV = 'ADD_LIVETV';

//Define action creators
/**
 * For settings the livetv data.
 *
 * @param lData The liveTvData object returned from DB.
 */
exports.setLiveTvData = (lData) => {
	return {
		type : exports.LIVETV_DATA,
		payload : { liveTvs : lData }
	};

}; /* setLiveTvData(). */

/**
 * For updating the live tv data.
 *
 * @param lData The liveTvData object returned from DB.
 */
exports.updateLiveTvData = (lData) => {
	return {
		type : exports.UPDATE_LIVETV,
		payload : { liveTvs : lData }
	};

}; /* updateLiveTvData(). */

/**
 * For adding liveTv to the article dataset.
 *
 * @param lData The liveTvData object returned from DB.
 */
 exports.addLiveTvData = (lData) => {
	return {
		type : exports.ADD_LIVETV,
		payload : { liveTv : lData }
	};

}; /* addLiveTvData(). */
