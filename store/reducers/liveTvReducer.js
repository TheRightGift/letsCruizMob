import { LIVETV_DATA, ADD_LIVETV, UPDATE_LIVETV } from '../actions/liveTvAction';

const initialState = {
    liveTvs: [],
};

function liveTvReducer(state = initialState, action) {
    
    switch (action.type) {
        case LIVETV_DATA: {
            return { ...state, ...{ liveTvs : action.payload.liveTvs } };
        }   
        case UPDATE_LIVETV: {
            let nuLiveTvs = [];
            
            state.liveTvs.map((item, index) => {
                if (item._id !== action.payload.liveTvs._id) {
                    // This isn't the item we care about - keep it as-is
                    nuLiveTvs.push(item);
                } else {
                    nuLiveTvs.push(action.payload.liveTvs)
                }		
            });
            // update VOD data.
            return { ...state, ...{ liveTvs : nuLiveTvs } };
        }
        case ADD_LIVETV: {
            let nuLiveTvs = state.liveTvs;
                
            // add the new one
            nuLiveTvs.unshift(action.payload.liveTv);
            
            return { ...state, ...{ liveTvs : nuLiveTvs } };
        }
        default: {
            return state;
        }
            
    }
  }
  
  export default liveTvReducer;