import React, { Component } from "react";
import Link from "gatsby-link";
import { Route, Redirect } from "react-router-dom";
import fire from "../fire";
//import boardfax from "../boardfax";
import FatherTime from "../utils/fatherTime";
import FileUploader from "react-firebase-file-uploader";
import { connect } from "react-redux";
import Moment from "react-moment";

import "../layouts/css/login.css";
import "../layouts/css/listing.css";
import "../layouts/css/tables.css";
import "../layouts/css/fcss.css";
import "../layouts/css/button.css";

class ListABoard extends Component {
	constructor(props) {
		super(props);

		this.handleListing = this.handleListing.bind(this);
		this.handleUploadStart = this.handleUploadStart.bind(this);
		this.handleProgress = this.handleProgress.bind(this);
		this.handleUploadError = this.handleUploadError.bind(this);
		this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
		this.handlePostAnother = this.handlePostAnother.bind(this);

		this.state = {
			region: 'Southern California',
			city: 'San Diego',
			listingTitle: '1',
			brandShaper: '2',
			model: '3',
			dimensions: '4',
			fins: '5',
			condition: '6',
			dimensions: '7',
			height: '',
			volume: '',

			shaperInfo: '8',
			price: '655',

			avatar: '',
			photoOne: '',
			photoTwo: '',
			photoThree: '',
			photoFour: '',
			photoFive: '',
			photoSix: '',
			imageName: '',
			isUploading: false,
			photoOneProgress: 0,
			photoOneURL: '',
			boardJustPosted: false,

			tag_beginner: false,
			tag_intermediate: false,
			tag_advanced: false,
			tag_greatforanybody: false,
			tag_smallwaves: false,
			tag_budget: false,

			newShaper: false,
			newModel: true,

		};
	}

	handlePostAnother() {
		this.setState({
			boardJustPosted: false
		});
	}

	handleUploadStart = name => this.setState({ isUploading: true, progress: 0, imageName: name });
	handleProgress = progress => this.setState({ progress });
	handleUploadError = error => {
		this.setState({ isUploading: false });
		console.error(error);
	};
	handleUploadSuccess = filename => {
		const imageName = this.state.imageName;
		this.setState({ progress: 100, isUploading: false });
		fire
			.storage()
			.ref('images')
			.child(filename)
			.getDownloadURL()
			.then(url => {
				switch (this.state.imageName) {
					case 'primary':
						this.setState({ avatar: url });
						break;
					case 'one':
						this.setState({ photoOne: url });
						break;
					case 'two':
						this.setState({ photoTwo: url });
						break;
					case 'three':
						this.setState({ photoThree: url });
						break;
					case 'four':
						this.setState({ photoFour: url });
						break;
					case 'five':
						this.setState({ photoFive: url });
						break;
					case 'six':
						this.setState({ photoSix: url });
						break;
					default:
						break;
				}
			});
	};

	handleListing() {
    const dateTime = Date.now();

		// SAVE TO THE BOARDFAX DATABASE..

		// if it's a new shaper, then it's def a new model
		// if ( this.state.newShaper ) {
		// 	boardfax
		// 		.database()
		// 		.ref(`shapers/${dateTime}/`)
		// 		.set({
		// 			name: this.state.brandShaper
		// 		})

		// 	boardfax
		// 		.database()
		// 		.ref(`modelsByShaper/${this.state.brandShaper}/${dateTime}`)
		// 		.set({
		// 			name: this.state.model
		// 		})
		// }

		// // may just be a new model not catalouged.
		// if ( this.state.newModel && !this.state.newShaper ) {

		// 	boardfax
		// 		.database()
		// 		.ref(`modelsByShaper/${this.state.brandShaper}/${dateTime}`)
		// 		.set({
		// 			name: this.state.model
		// 		})

		// }

		// // register this board in Boardfax.

		// boardfax
		// 	.database()
		// 	.ref(`registeredBoards/BG-${dateTime}`)
		// 	.set({
		// 		name: this.state.listingTitle,
		// 		brand: this.state.brandShaper,
		// 		model: this.state.model,
		// 		dimensions: this.state.dimensions,
		// 		fins: this.state.fins,
		// 		condition: this.state.condition,
		// 		dimensions: this.state.dimensions,
		// 		shaperInfo: this.state.shaperInfo,
		// 		featurePhotoURL: this.state.avatar,
		// 	})

		// 	boardfax
		// 	.database()
		// 	.ref(`sellingHistory/BG-${dateTime}/${dateTime}`)
		// 	.set({
		// 		listDate: Date.now(),
		// 		userId: this.props.userId,
		// 		region: this.state.region,
		// 		city: this.state.city,
		// 		name: this.state.listingTitle,
		// 		brand: this.state.brandShaper,
		// 		model: this.state.model,
		// 		dimensions: this.state.dimensions,
		// 		fins: this.state.fins,
		// 		condition: this.state.condition,
		// 		dimensions: this.state.dimensions,
		// 		shaperInfo: this.state.shaperInfo,
		// 		price: this.state.price,
		// 		featurePhotoURL: this.state.avatar,
		// 	})


		// 1)  SAVE BOARD BY REGION
		fire
			.database()
			.ref(`boardsByRegion/${this.state.region}/${dateTime}`)
			.set({
				listDate: Date.now(),
				userId: this.props.userId,
				status: 'PUBLISHED',
				region: this.state.region,
				city: this.state.city,
				name: this.state.listingTitle,
				brand: this.state.brandShaper,
				model: this.state.model,
				dimensions: this.state.dimensions,
				fins: this.state.fins,
				condition: this.state.condition,
				dimensions: this.state.dimensions,
				shaperInfo: this.state.shaperInfo,
				price: this.state.price,
				tag_beginner: this.state.tag_beginner,
				tag_intermediate: this.state.tag_intermediate,
				tag_advanced: this.state.tag_advanced,
				tag_greatforanybody: this.state.tag_greatforanybody,
				tag_smallwaves: this.state.tag_smallwaves,
				tag_budget: this.state.tag_budget,
				featurePhotoURL: this.state.avatar,
				photoOne: this.state.photoOne,
				photoTwo: this.state.photoTwo,
				photoThree: this.state.photoThree,
				photoFour: this.state.photoFour,
				photoFive: this.state.photoFive,
				photoSix: this.state.photoSix,
				volume: this.state.volume,
				sold: false
			});

		// 2) SAVE BOARD BY CITY
		fire
			.database()
			.ref(`boardsByCity/${this.state.city}/boards/${dateTime}`)
			.set({
				listDate: Date.now(),
				userId: this.props.userId,
				status: 'PUBLISHED',
				region: this.state.region,
				city: this.state.city,
				name: this.state.listingTitle,
				brand: this.state.brandShaper,
				model: this.state.model,
				dimensions: this.state.dimensions,
				fins: this.state.fins,
				condition: this.state.condition,
				dimensions: this.state.dimensions,
				shaperInfo: this.state.shaperInfo,
				price: this.state.price,
				tag_beginner: this.state.tag_beginner,
				tag_intermediate: this.state.tag_intermediate,
				tag_advanced: this.state.tag_advanced,
				tag_greatforanybody: this.state.tag_greatforanybody,
				tag_smallwaves: this.state.tag_smallwaves,
				tag_budget: this.state.tag_budget,
				featurePhotoURL: this.state.avatar,
				photoOne: this.state.photoOne,
				photoTwo: this.state.photoTwo,
				photoThree: this.state.photoThree,
				photoFour: this.state.photoFour,
				photoFive: this.state.photoFive,
				photoSix: this.state.photoSix,
				volume: this.state.volume,
				sold: false,
				amountSoldFor: 0
			});

		// 3) SAVE TO ALL BOARD LIST
		fire
			.database()
			.ref(`allBoardsList/boards/${dateTime}`)
			.set({
				listDate: Date.now(),
				userId: this.props.userId,
				status: 'PUBLISHED',
				region: this.state.region,
				city: this.state.city,
				name: this.state.listingTitle,
				brand: this.state.brandShaper,
				model: this.state.model,
				dimensions: this.state.dimensions,
				fins: this.state.fins,
				condition: this.state.condition,
				dimensions: this.state.dimensions,
				shaperInfo: this.state.shaperInfo,
				price: this.state.price,
				tag_beginner: this.state.tag_beginner,
				tag_intermediate: this.state.tag_intermediate,
				tag_advanced: this.state.tag_advanced,
				tag_greatforanybody: this.state.tag_greatforanybody,
				tag_smallwaves: this.state.tag_smallwaves,
				tag_budget: this.state.tag_budget,
				featurePhotoURL: this.state.avatar,
				photoOne: this.state.photoOne,
				photoTwo: this.state.photoTwo,
				photoThree: this.state.photoThree,
				photoFour: this.state.photoFour,
				photoFive: this.state.photoFive,
				photoSix: this.state.photoSix,
				volume: this.state.volume,
				sold: false,
				amountSoldFor: 0
				
			});

		// 4) SAVE BOARDS BY USER
		fire
			.database()
			.ref(`boardsByUser/${this.props.userId}/${dateTime}`)
			.set({
				listDate: Date.now(),
				userId: this.props.userId,
				status: 'PUBLISHED',
				region: this.state.region,
				city: this.state.city,
				name: this.state.listingTitle,
				brand: this.state.brandShaper,
				model: this.state.model,
				dimensions: this.state.dimensions,
				fins: this.state.fins,
				condition: this.state.condition,
				dimensions: this.state.dimensions,
				shaperInfo: this.state.shaperInfo,
				price: this.state.price,
				tag_beginner: this.state.tag_beginner,
				tag_intermediate: this.state.tag_intermediate,
				tag_advanced: this.state.tag_advanced,
				tag_greatforanybody: this.state.tag_greatforanybody,
				tag_smallwaves: this.state.tag_smallwaves,
				tag_budget: this.state.tag_budget,
				featurePhotoURL: this.state.avatar,
				photoOne: this.state.photoOne,
				photoTwo: this.state.photoTwo,
				photoThree: this.state.photoThree,
				photoFour: this.state.photoFour,
				photoFive: this.state.photoFive,
				photoSix: this.state.photoSix,
				volume: this.state.volume,
				sold: false,
				amountSoldFor: 0
			});

		this.setState({
			boardJustPosted: true
		});
	}

	render() {
		const cities = this.props.dropDownCityList.map((city, key) => {
			if (city.name != 'All Cities') {
				return (
					<option key={key} value={city.name}>
						{city.name}
					</option>
				);
			}
		});

		if (!this.props.userId) {
			return <Redirect to="/authentication" />;
		}

		if (this.state.boardJustPosted) {
			return (
				<div className="create-account">
					<div className="create-account__headline m-b-20">Board submitted.</div>
					<button onClick={this.handlePostAnother} className="button button--green button--small m-b-20">
						Post another?
					</button>
					<Link to="/inventory" className="td-none t-sans fc-green f-11 m-t-30">
						Go to my quiver.
					</Link>
				</div>
			);
		}

		return (
			<div className="create-account">
				<div className="create-account__headline m-b-10">List a Board </div>
				<Link to="/inventory" className="td-none t-sans fc-green f-11 ">
					Cancel and return to inventory
				</Link>

				<div className="login-form__field m-t-30">
					<div className="login-form__field">
						<label>Listing Title </label>
						<input
							name="listingTitle"
							onChange={e => {
								this.setState({ listingTitle: e.target.value });
							}}
							type="text"
						/>
					</div>
					<label>Brand / Shaper </label>
					<input
						name="brandShaper"
						onChange={e => {
							this.setState({ brandShaper: e.target.value });
						}}
						type="text"
					/>
				</div>

				<div className="login-form__field m-t-30">
					<div className="login-form__field">
						<label>Model </label>
						<input
							name="model"
							onChange={e => {
								this.setState({ model: e.target.value });
							}}
							type="text"
						/>
					</div>
					<label>Dimensions </label>
					<input
						name="dimensions"
						onChange={e => {
							this.setState({ dimensions: e.target.value });
						}}
						type="text"
					/>
					<label>Volume </label>
					<input
						name="volume"
						onChange={e => {
							this.setState({ volume: e.target.value });
						}}
						type="text"
					/>
				</div>

				<div className="login-form__field m-t-30">
					<div className="login-form__field">
						<label>Fins </label>
						<input
							name="fins"
							onChange={e => {
								this.setState({ fins: e.target.value });
							}}
							type="text"
						/>
					</div>
					<label>Condition </label>
					<input
						name="condition"
						onChange={e => {
							this.setState({ condition: e.target.value });
						}}
						type="text"
					/>
				</div>

				<div className="login-form__field m-t-30">
					<div className="login-form__field">
						<label>Description </label>
						<input
							name="description"
							onChange={e => {
								this.setState({ description: e.target.value });
							}}
							type="text"
						/>
					</div>
					<label>Shaper Info </label>
					<input
						name="shaperInfo"
						onChange={e => {
							this.setState({ shaperInfo: e.target.value });
						}}
						type="text"
					/>
				</div>

				<div className="login-form__field m-t-30">
					<div className="login-form__field">
						<label>Price </label>
						<input
							name="price"
							onChange={e => {
								this.setState({ price: e.target.value });
							}}
							type="text"
						/>
					</div>
				</div>

				<div className="login-form__field m-t-30">
					<div className="login-form__field">
						<label>Tags </label>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									id="tag_beginner"
									style={{ width: '30px', marginBottom: '0px', height: '20px' }}
									name="beginners"
									onChange={e => {
										let checked = document.getElementById('tag_beginner').checked;
										this.setState({ tag_beginner: checked });
									}}
									type="checkbox"
								/>
								<div className="tag">Beginner</div>
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									id="tag_intermediate"
									style={{ width: '30px', marginBottom: '0px', height: '20px' }}
									name="beginners"
									onChange={e => {
										let checked = document.getElementById('tag_intermediate').checked;
										this.setState({ tag_intermediate: checked });
									}}
									type="checkbox"
								/>
								<div className="tag">Intermediate</div>
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									id="tag_advanced"
									style={{ width: '30px', marginBottom: '0px', height: '20px' }}
									name="beginners"
									onChange={e => {
										let checked = document.getElementById('tag_advanced').checked;
										this.setState({ tag_advanced: checked });
									}}
									type="checkbox"
								/>
								<div className="tag">Advanced</div>
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									id="tag_greatforanybody"
									style={{ width: '30px', marginBottom: '0px', height: '20px' }}
									name="beginners"
									onChange={e => {
										let checked = document.getElementById('tag_greatforanybody').checked;
										this.setState({ tag_greatforanybody: checked });
									}}
									type="checkbox"
								/>
								<div className="tag">Great for anybody</div>
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									id="tag_smallwaves"
									style={{ width: '30px', marginBottom: '0px', height: '20px' }}
									name="beginners"
									onChange={e => {
										let checked = document.getElementById('tag_smallwaves').checked;
										this.setState({ tag_smallwaves: checked });
									}}
									type="checkbox"
								/>
								<div className="tag">Small Waves</div>
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<input
									id="tag_budget"
									style={{ width: '30px', marginBottom: '0px', height: '20px' }}
									name="beginners"
									onChange={e => {
										let checked = document.getElementById('tag_budget').checked;
										this.setState({ tag_budget: checked });
									}}
									type="checkbox"
								/>
								<div className="tag">On a Budget</div>
							</div>
						</div>
					</div>
				</div>

				<div className="login-form__field m-t-30">
					<div className="login-form__field">
						<label>Region</label>
						<select
							onChange={e => {
								this.setState({ region: e.target.value });
								this.props.setListingCities(e.target.value);
							}}
						>
							<option value="Southern California">Southern California</option>
							<option value="Northern California">Northern California</option>
							<option value="Pacific North West">Pacific North West</option>
							<option value="Mid Atlantic">Mid Atlantic</option>
							<option value="South East">South East</option>
							<option value="East Florida">East Florida</option>
							<option value="Hawaii">Hawaii</option>
							<option value="Australia">Australia</option>
							<option value="South Africa">South Africa</option>
						</select>
					</div>
				</div>

				<div className="login-form__field">
					<div className="login-form__field">
						<label>City</label>
						<select onChange={e => this.setState({ city: e.target.value })}>{cities}</select>
					</div>
				</div>

				<div className="login-form__field m-t-30 m-b-0">
					<div className="login-form__field">
						<label htmlFor="avatar">
							Primary Photo{' '}
							{this.state.isUploading && (
								<span className="f-11 t-sans t-upper fc-green"> {this.state.progress} %</span>
							)}
						</label>
						<FileUploader
							className="inputFile"
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={fire.storage().ref('images')}
							onUploadStart={() => this.handleUploadStart('primary')}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>
						{this.state.avatar && <img src={this.state.avatar} />}
					</div>
				</div>

				<div className="login-form__field m-b-0 ">
					<div className="login-form__field">
						<label htmlFor="avatar">
							Photo #1{' '}
							{this.state.isUploading && (
								<span className="f-11 t-sans t-upper fc-green"> {this.state.progress} %</span>
							)}
						</label>
						<FileUploader
							className="inputFile"
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={fire.storage().ref('images')}
							onUploadStart={() => this.handleUploadStart('one')}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>
						{this.state.photoOne && <img src={this.state.photoOne} />}
					</div>
				</div>

				<div className="login-form__field m-b-0 ">
					<div className="login-form__field">
						<label htmlFor="avatar">
							Photo #2{' '}
							{this.state.isUploading && (
								<span className="f-11 t-sans t-upper fc-green"> {this.state.progress} %</span>
							)}
						</label>
						<FileUploader
							className="inputFile"
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={fire.storage().ref('images')}
							onUploadStart={() => this.handleUploadStart('two')}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>
						{this.state.photoTwo && <img src={this.state.photoTwo} />}
					</div>
				</div>

				<div className="login-form__field m-b-0">
					<div className="login-form__field">
						<label htmlFor="avatar">
							Photo #3{' '}
							{this.state.isUploading && (
								<span className="f-11 t-sans t-upper fc-green"> {this.state.progress} %</span>
							)}
						</label>
						<FileUploader
							className="inputFile"
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={fire.storage().ref('images')}
							onUploadStart={() => this.handleUploadStart('three')}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>
						{this.state.photoThree && <img src={this.state.photoThree} />}
					</div>
				</div>

				<div className="login-form__field m-b-0">
					<div className="login-form__field">
						<label htmlFor="avatar">
							Photo #4{' '}
							{this.state.isUploading && (
								<span className="f-11 t-sans t-upper fc-green"> {this.state.progress} %</span>
							)}
						</label>
						<FileUploader
							className="inputFile"
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={fire.storage().ref('images')}
							onUploadStart={() => this.handleUploadStart('four')}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>
						{this.state.photoFour && <img src={this.state.photoFour} />}
					</div>
				</div>

				<div className="login-form__field m-b-0">
					<div className="login-form__field">
						<label htmlFor="avatar">
							Photo #5{' '}
							{this.state.isUploading && (
								<span className="f-11 t-sans t-upper fc-green"> {this.state.progress} %</span>
							)}
						</label>
						<FileUploader
							className="inputFile"
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={fire.storage().ref('images')}
							onUploadStart={() => this.handleUploadStart('five')}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>
						{this.state.photoFive && <img src={this.state.photoFive} />}
					</div>
				</div>

				<div className="login-form__field m-b-0">
					<div className="login-form__field">
						<label htmlFor="avatar">
							Photo #6{' '}
							{this.state.isUploading && (
								<span className="f-11 t-sans t-upper fc-green"> {this.state.progress} %</span>
							)}
						</label>
						<FileUploader
							className="inputFile"
							accept="image/*"
							name="avatar"
							randomizeFilename
							storageRef={fire.storage().ref('images')}
							onUploadStart={() => this.handleUploadStart('six')}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
						/>
						{this.state.photoSix && <img src={this.state.photoSix} />}
					</div>
				</div>

				<button onClick={this.handleListing} className="button button--green button--large">
					Publish Listing
				</button>
			</div>
		);
	}
}

const mapStateToProps = ({ userId, shop_coast, dropDownCityList }) => {
  return { userId, shop_coast, dropDownCityList };
};

const mapDispatchToProps = dispatch => {
  return {
    setListingCities: (region) => dispatch({ type: `SET_LISTING_CITIES`, region }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListABoard);
