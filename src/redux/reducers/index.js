import {
	combineReducers
} from 'redux'

import designs from './designs'
import agreements from './agreements'
import dataLoaded from './dataLoaded'

const rootReducer = combineReducers({
	designs,
	agreements,
	dataLoaded
})

export default rootReducer;
