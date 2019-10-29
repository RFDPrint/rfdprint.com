import {
	ADD_AGREEMENT,
	ADD_DESIGN,
	DELETE_AGREEMENT,
	DELETE_DESIGN
} from "./action-types";
import dbcloud from "../firebase/dbcloud";
import cuid from "cuid";

export function getNextAgreementIdMiddleware({ dispatch }) {
	return function(next) {
		return function(action) {
			// do your stuff
			if (action.type === ADD_AGREEMENT) {
				const db = dbcloud.firestore();
				//let nextId = db.collection("agreements").doc().id;
				let nextId = cuid();
				console.log("CUID " + nextId);

				console.log("Middlewares Next Id: " + nextId);
				action.payload.id = nextId;

				if (!action.payload.name) {
					action.payload.name = "Tester Testerson";
				}

				action.payload.title = "Tesitng Doc# " + nextId;

				db.collection("agreements")
					.doc(nextId)
					.set(action.payload)
					.then();
			}
			return next(action);
		};
	};
}

export function getNextDesignIdMiddleware({ dispatch }) {
	return function(next) {
		return function(action) {
			// do your stuff
			if (action.type === ADD_DESIGN) {
				const db = dbcloud.firestore();
				let nextId = db.collection("designs").doc().id;
				action.payload.id = nextId;

				db.collection("designs")
					.doc(nextId)
					.set(action.payload);
			}
			return next(action);
		};
	};
}
export function deleteDesignMiddleware({ dispatch }) {
	return function(next) {
		return function(action) {
			// do your stuff
			if (action.type === DELETE_DESIGN) {
				const db = dbcloud.firestore();
				db.collection("agreements")
					.doc(action.id)
					.delete();
				console.log(action.id);
			}
			return next(action);
		};
	};
}

export function deleteAgreementMiddleware({ dispatch }) {
	return function(next) {
		return function(action) {
			// do your stuff
			if (action.type === DELETE_AGREEMENT) {
				const db = dbcloud.firestore();
				db.collection("agreements")
					.doc(action.id)
					.delete();
				console.log(action.id);
			}
			return next(action);
		};
	};
}
