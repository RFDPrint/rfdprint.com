import dbcloud from "../firebase/dbcloud";

export const firebaseFindParam = (id) => {
	let aprvDocument = [];
	const db = dbcloud.firestore();

	let citiesRef = db.collection("approval-docs");
	let query = citiesRef
		.where("id", "==", id)
		.limit(1)
		.get()
		.then(snapshot => {
			if (snapshot.empty) {
				console.log("No matching documents.");
				return;
			}

			snapshot.forEach(doc => {
				aprvDocument.push(doc.data());
			});
		})
		.catch(err => {
			console.log("Error getting documents", err);
		});

	return aprvDocument;
}
