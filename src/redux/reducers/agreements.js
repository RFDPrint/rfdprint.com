/*use concat(), slice(), or the spread operator for arrays
use Object.assign() or object spread of objects
https://www.valentinog.com/blog/redux/#React_Redux_tutorial_who_this_guide_is_for
*/

import {
	ADD_AGREEMENT,
	LOAD_AGREEMENT_DATA,
	DELETE_AGREEMENT
} from "../action-types";
import store from "../store";
const initialState = {
	data: [],
};

function agreementsReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_AGREEMENT:
			return Object.assign({}, state, {
				data: state.data.concat(action.payload)
			})
			break;
		case LOAD_AGREEMENT_DATA:
			return Object.assign({}, state, {
				data: state.data.concat(action.payload)
			});
			break;
		case DELETE_AGREEMENT:
			return Object.assign({}, state, {
				data: state.data.filter((doc) => doc.id !== action.id)
			});
			break;
		default:
			return state;
	}
}
export default agreementsReducer;
