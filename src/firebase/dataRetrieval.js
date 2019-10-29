import dbcloud from "../firebase/dbcloud";

/*
export const getImage = (setState, image) => {
	const storage = dbcloud.storage().ref();

	storage
		.child(`images/approvals/${image}.png`)
		.getDownloadURL()
		.then(url => {
			image["image"] = url;
			setState(image);
		})
		.catch(error => {
			console.log(error);
		});
}
*/

export const firebaseFindParam = (setState, id, collection) => {
	let aprvDocument = [];
	let templateParts = {};
	let docInformation = {};
	const db = dbcloud.firestore();

	db.collection(collection)
		.where("id", "==", id)
		.limit(1)
		.get()
		.then(snapshot => {
			if (snapshot.empty) {
				console.log("No matching documents.");
				setState({
					redirect: true
				});
				return;
			}

			snapshot.forEach(doc => {
				aprvDocument.push(doc.data());
			});
			templateParts = {
				type: aprvDocument[0].templateType,
				title: aprvDocument[0].title,
				subTitle: aprvDocument[0].subtitle
			};
			docInformation = {
				id: aprvDocument[0].id,
				date: aprvDocument[0].date,
				name: aprvDocument[0].name,
				signature: aprvDocument[0].signature,
				imageURL: aprvDocument[0].imageURL
			};
			setState({
				signature: aprvDocument,
				documentInfo: docInformation,
				templateParts: templateParts
			});

		})
		.catch(err => {
			console.log("Error getting documents", err);
		});

}
