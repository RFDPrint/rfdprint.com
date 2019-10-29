// src/js/store/index.js
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import {
	getNextAgreementIdMiddleware,
	getNextDesignIdMiddleware,
	deleteAgreementMiddleware,
	deleteDesignMiddleware
} from "./middleware";
import thunk from "redux-thunk";

const storeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		trace: true,
		traceLimit: 25
	}) || compose;

const store = createStore(
	rootReducer,
	storeEnhancers(
		applyMiddleware(
			getNextAgreementIdMiddleware,
			getNextDesignIdMiddleware,
			deleteAgreementMiddleware,
			deleteDesignMiddleware,
			thunk
		)
	)
);
export default store;
