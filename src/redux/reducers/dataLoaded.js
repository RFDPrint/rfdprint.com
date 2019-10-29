/*use concat(), slice(), or the spread operator for arrays
use Object.assign() or object spread of objects
https://www.valentinog.com/blog/redux/#React_Redux_tutorial_who_this_guide_is_for
*/

import {
	DATA_LOADED
} from "../action-types";
import store from "../store";
const initialState = {
	data: false,
};

function dataLoadedReducer(state = initialState, action) {

	switch (action.type) {
		case DATA_LOADED:
			return Object.assign({}, state, {
				data: !state.data
			});
			break;
		default:
			return state;
	}
}
export default dataLoadedReducer;
