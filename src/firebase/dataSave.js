import dbcloud from "../firebase/dbcloud";

export const addImageToStorage = (file, bucket, that) => {
	const storageRef = dbcloud.storage().ref();
	const mainImage = storageRef.child(bucket);

	mainImage.put(file).then(snapshot => {
		mainImage
			.getDownloadURL()
			.then(url => {
				that.setState({
					imageURL: url
				}, that.firebaseAddRecord("designs"))
				console.log('Image succefully uploaded: ' + bucket + ': ' + file.name);
			})
			.catch(error => {
				console.log(error);
			});
	});
};

export const firebaseAddRecord = (collection, data, that) => {
	const db = dbcloud.firestore();
	let nextId = db.collection(collection).doc().id;


	that.setState({
			id: nextId
		},
		() => {
			that.updateDashbordState();
		}
	);

	// Add a new document with a generated id.
	console.log(that.state)
	db.collection(collection).doc(nextId).set(data);
	console.log(nextId);

}
