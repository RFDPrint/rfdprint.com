import React, { Component } from "react";
import {
	firebaseAddRecord,
	addImageToStorage,
	watchFirebaseTicketsRef
} from "../firebase/dataSave";
import dbcloud from "../firebase/dbcloud";

import { connect } from "react-redux";
import { addAgreement, addDesign } from "../redux/actions";

class DocumentSubmitForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "agreements",
			signed: false,
			signedBy: "",
			signature: "",
			dateSigned: null
		};
		this.setRef = ref => {
			this.file = ref;
		};
		this.myFormRef = ref => {
			this.form = ref;
		};
	}
	cancelCourse = () => {
		this.form.reset();
	};

	myChangeHandler = event => {
		let nam = event.target.name;
		let val = event.target.value;
		if (nam === "age") {
			if (!Number(val)) {
				alert("Your age must be a number");
			}
		}
		if (nam === "services") {
			let val = event.target.value;
			val = event.target.value.replace("\\n", "\n");
		}
		this.setState({ [nam]: val });
	};

	addImageToStorage() {
		//Adds file to server and returns the url to setSate ImageURL
		const file = this.file.files[0];
		const fileName = this.file.files[0].name;

		const storageRef = dbcloud.storage().ref();
		const mainImage = storageRef.child(`images/designs/${fileName}`);

		mainImage.put(file).then(snapshot => {
			mainImage
				.getDownloadURL()
				.then(url => {
					console.log(url);
					this.setState(
						{
							imageURL: url
						},
						() => {
							this.props.addDesign(this.state);
						}
					);
				})
				.catch(error => {
					console.log(error);
				});
		});
	}

	mySubmitHandler = event => {
		//Sends State to action (after detour for designs)
		//Ids generated via firebase using middelwares
		//getNext[TYPE]IdMiddleware
		event.preventDefault();
		if (this.state.type == "designs") {
			this.addImageToStorage();
		} else {
			let prevStatewData = this.props.agreements;
			this.props.addAgreement(this.state, prevStatewData);
		}
	};

	render() {
		return (
			<form
				ref={el => (this.myFormRef = el)}
				onSubmit={this.mySubmitHandler}>
				<p>Document Type</p>
				<select
					name="type"
					value={this.state.value}
					onChange={this.myChangeHandler}>
					<option value="agreements">Agreement</option>
					<option value="designs">Design</option>
				</select>
				<p>Enter your name:</p>
				<input
					placeholder="Tester Testerson"
					type="text"
					name="name"
					onChange={this.myChangeHandler}
				/>
				<p>Enter the title:</p>
				<input
					placeholder="Tesitng Doc#"
					type="text"
					name="title"
					onChange={this.myChangeHandler}
				/>
				<p>Enter the sub-title:</p>
				<input
					placeholder="Tesitng Subtitle"
					type="text"
					name="subTitle"
					onChange={this.myChangeHandler}
				/>
				<p>Enter the price:</p>
				<input
					placeholder="$50"
					type="text"
					name="price"
					onChange={this.myChangeHandler}
				/>
				<p>Enter the product:</p>
				<input
					defaultValue="Business Boost"
					type="text"
					name="product"
					onChange={this.myChangeHandler}
				/>
				<p>Enter the duration:</p>
				<input
					placeholder="Duration"
					type="text"
					name="duration"
					onChange={this.myChangeHandler}
				/>
				<p>Enter services:</p>
				<textarea
					className="form__fields__services"
					placeholder="Services"
					type="text"
					name="services"
					onChange={this.myChangeHandler}
				/>
				{this.state.type == "designs" ? (
					<div>
						<p>Upload Design File</p>{" "}
						<input type="file" name="image" ref={this.setRef} />
					</div>
				) : null}
				<div>
					<input type="submit" onClick={this.mySubmitHandler} />
				</div>
			</form>
		);
	}
}
const mapStateToProps = state => {
	return {
		agreements: state.agreements
	};
};

export default connect(
	mapStateToProps,
	{ addAgreement, addDesign }
)(DocumentSubmitForm);
