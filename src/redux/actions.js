import {
	ADD_AGREEMENT,
	ADD_DESIGN,
	LOAD_AGREEMENT_DATA,
	LOAD_DESIGN_DATA,
	DELETE_AGREEMENT,
	DELETE_DESIGN,
	DATA_LOADED,
	DOC_NOT_FOUND,
	GET_ACTIVE_DOC
} from "./action-types";

import dbcloud from "../firebase/dbcloud";

export function addAgreement(payload) {
	return {
		type: ADD_AGREEMENT,
		payload
	};
}

export function addDesign(payload) {
	return {
		type: DOC_NOT_FOUND,
		payload
	};
}

export function getActiveDoc(payload) {
	return {
		type: GET_ACTIVE_DOC,
		payload
	};
}

export function deleteAgreement(id) {
	return {
		type: DELETE_AGREEMENT,
		id
	};
}

export function deleteDesign(id) {
	return {
		type: DELETE_DESIGN,
		id
	};
}

export function getData() {
	return function(dispatch) {
		const db = dbcloud.firestore();
		dispatch({ type: DATA_LOADED });
		db.collection("agreements")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					console.log("Grabbed Data");
					dispatch({
						type: LOAD_AGREEMENT_DATA,
						payload: doc.data()
					});
				});
			});

		db.collection("designs")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					dispatch({ type: LOAD_DESIGN_DATA, payload: doc.data() });
				});
			});
	};
}

export function getDocument(collection, docNumber) {
	return function(dispatch) {
		const db = dbcloud.firestore();
		dispatch({ type: DATA_LOADED });
		db.collection(collection)
			.where("id", "==", docNumber)
			.get()
			.then(querySnapshot => {
				if (querySnapshot.empty) {
					console.log("No matching documents.");
					return;
				}

				querySnapshot.forEach(doc => {
					console.log("Retrieved Document# " + docNumber);
					dispatch({
						type: LOAD_AGREEMENT_DATA,
						payload: doc.data()
					});
				});
			})
			.catch(err => {
				console.log("Error getting documents", err);
			});
	};
}
