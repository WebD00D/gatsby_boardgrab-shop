import { createStore as reduxCreateStore } from 'redux';
import fire from '../fire';
import _ from 'lodash';

const reducer = (state, action) => {
	if (action.type === `INCREMENT`) {
		return Object.assign({}, state, {
			count: state.count + 1
		});
	}

	if (action.type === `SET_CURRENT_USER`) {
		return {
			...state,
			userId: action.user,
			shop_name: action.shop,
			shop_coast: action.coast
		};
	}

	if (action.type === `LOGOUT_USER`) {
		fire.auth().signOut();
		return {
			...state,
			userId: '',
			account_username: '',
			shop_city: '',
			shop_name: '',
			shop_phone: '',
			shop_state: '',
			shop_website: '',
			user_email: '',
			paypal_email: '',
			shop_coast: ''
		};
	}

	if (action.type === `SET_REGION_AND_CITIES`) {
		const selectedRegion = action.region;
		const regionData = _.find(state.citesByRegion, function(o) {
			return o.region === selectedRegion;
		});

		return {
			...state,
			selectedRegion: action.region,
			currentCityList: selectedRegion === 'All Locations' ? [] : regionData.cities,
			mapZoom: selectedRegion === 'All Locations' ? 4 : 8,
			latitude: selectedRegion === 'All Locations' ? 33.97980872872457 : regionData.cities[0].latitude,
			longitude: selectedRegion === 'All Locations' ? -118.0810546875 : regionData.cities[0].longitude
		};
	}

	if (action.type === `SET_CITY_DATA`) {
		const selectedCity = action.city;
		const cityData = _.find(state.currentCityList, function(o) {
			return o.name === selectedCity;
		});

		return {
			...state,
			latitude: cityData.latitude,
			longitude: cityData.longitude,
			selectedCity: cityData.name,
			mapZoom: 12
		};
	}

	if (action.type === `SET_MAP_POSITION`) {
		return {
			...state,
			latitude: action.latitude,
			longitude: action.longitude
		};
	}

	return state;
};

const initialState = {
	count: 0,
	userId: '',
	account_username: '',
	latitude: 33.985787115598434,
	longitude: -118.47003936767578,
	selectedRegion: 'Southern California',
	selectedCity: 'All Cities',

	currentCityList: [
		{ name: 'All Cities', latitude: 33.985787115598434, longitude: -118.47003936767578 },
		{ name: 'San Diego', latitude: 32.71566625570317, longitude: -117.14996337890625 },
		{ name: 'La Jolla', latitude: 32.83459674730076, longitude: -117.26669311523438 },
		{ name: 'Del Mar', latitude: 32.960281958039836, longitude: -117.257080078125 },
		{ name: 'San Clemente', latitude: 33.42914915719729, longitude: -117.61138916015625 },
		{ name: 'Encinitas', latitude: 33.03399561940715, longitude: -117.279052734375 },
		{ name: 'Ocean Side', latitude: 33.19847683493303, longitude: -117.36968994140625 },
		{ name: 'Long Beach', latitude: 33.773439833797745, longitude: -118.19503784179688 },
		{ name: 'Venice', latitude: 33.985787115598434, longitude: -118.47003936767578 },
		{ name: 'Santa Monica', latitude: 34.021079493306914, longitude: -118.49647521972656 },
		{ name: 'Malibu', latitude: 34.02990029603907, longitude: -118.78486633300781 },
		{ name: 'Ventura', latitude: 34.27083595165, longitude: -119.23187255859375 },
		{ name: 'Santa Barbara', latitude: 34.42730166315869, longitude: -119.70977783203125 }
	],

	mapZoom: 8,

	// Region defaults to Southern California

	regions: [
		{ region: 'All Locations', latitude: 34.16181816123038, longitude: -116.806640625 },
		{ region: 'Southern California', latitude: 34.16181816123038, longitude: -116.806640625 },
		{ region: 'Northern California', latitude: 38.34165619279595, longitude: -122.783203125 },
		{ region: 'Pacific North West', latitude: 45.706179285330855, longitude: -123.837890625 },
		{ region: 'Mid Atlantic', latitude: 37.37015718405753, longitude: -76.376953125 },
		{ region: 'South East', latitude: 33.13755119234614, longitude: -80.244140625 },
		{ region: 'East Florida', latitude: 27.68352808378776, longitude: -80.33203125 },
		{ region: 'West Florida', latitude: 26.980828590472104, longitude: -82.705078125 },
		{ region: 'Hawaii', latitude: 20.715015145512083, longitude: -156.62109375 },
		{ region: 'Australia', latitude: -37.85750715625203, longitude: 145.01953125 },
		{ region: 'Cape Town', latitude: -33.87041555094182, longitude: 18.369140625 }
	],

	citesByRegion: [
		{
			region: 'Southern California',
			cities: [
				{ name: 'All Cities', latitude: 33.72433966174761, longitude: -117.158203125 },
				{ name: 'San Diego', latitude: 32.71566625570317, longitude: -117.14996337890625 },
				{ name: 'La Jolla', latitude: 32.83459674730076, longitude: -117.26669311523438 },
				{ name: 'Del Mar', latitude: 32.960281958039836, longitude: -117.257080078125 },
				{ name: 'San Clemente', latitude: 33.42914915719729, longitude: -117.61138916015625 },
				{ name: 'Encinitas', latitude: 33.03399561940715, longitude: -117.279052734375 },
				{ name: 'Ocean Side', latitude: 33.19847683493303, longitude: -117.36968994140625 },
				{ name: 'Long Beach', latitude: 33.773439833797745, longitude: -118.19503784179688 },
				{ name: 'Venice', latitude: 33.985787115598434, longitude: -118.47003936767578 },
				{ name: 'Santa Monica', latitude: 34.021079493306914, longitude: -118.49647521972656 },
				{ name: 'Malibu', latitude: 34.02990029603907, longitude: -118.78486633300781 },
				{ name: 'Ventura', latitude: 34.27083595165, longitude: -119.23187255859375 },
				{ name: 'Santa Barbara', latitude: 34.42730166315869, longitude: -119.70977783203125 }
			]
		},
		{
			region: 'Northern California',
			cities: [
				{ name: 'All Cities', latitude: 37.50972584293751, longitude: -122.16796875 },
				{ name: 'Monterey', latitude: 36.59127365634205, longitude: -121.88507080078125 },
				{ name: 'Santa Cruz', latitude: 36.97622678464096, longitude: -122.0196533203125 },
				{ name: 'San Jose', latitude: 37.341775502148586, longitude: -121.904296875 },
				{ name: 'Palo Alto', latitude: 37.45741810262938, longitude: -122.13775634765625 },
				{ name: 'San Francisco', latitude: 37.77071473849609, longitude: -122.4481201171875 },
				{ name: 'Berkely', latitude: 37.87268533717655, longitude: -122.2833251953125 },
				{ name: 'Vallejo', latitude: 38.10646650598286, longitude: -122.25860595703125 },
				{ name: 'Mendacino', latitude: 39.30242456041487, longitude: -123.7774658203125 }
			]
		},
		{
			region: 'Pacific North West',
			cities: [
				{ name: 'All Cities', latitude: 46.042735653846506, longitude: -123.92578125 },
				{ name: 'Portland', latitude: 45.51404592560424, longitude: -122.684326171875 },
				{ name: 'Seattle', latitude: 47.60616304386874, longitude: -122.36572265625 },
				{ name: 'Astoria', latitude: 47.60616304386874, longitude: -122.36572265625 }
			]
    },
    {
			region: 'Mid Atlantic',
			cities: [
        { name: 'All Cities', latitude: 37.54457732085582, longitude: -77.442626953125 },
        { name: 'Richmond', latitude: 37.54457732085582, longitude: -77.442626953125 },
				{ name: 'Virginia Beach', latitude: 36.85325222344019, longitude: -75.9814453125 },
				{ name: 'Outer Banks', latitude: 35.94688293218141, longitude: -75.6243896484375 },
        { name: 'Southern Delaware', latitude: 38.53527591154414, longitude: -75.07232666015625 },
        { name: 'Ocean City', latitude: 39.281167913914636, longitude: -74.5806884765625 },
        { name: 'Eastern Shore', latitude: 37.56417412088097, longitude: -75.7122802734375 },
        { name: 'Atlantic City', latitude: 39.37040245787161, longitude: -74.44610595703125 },
        { name: 'Long Beach Island', latitude: 39.65434146406167, longitude: -74.190673828125 },
        { name: 'Seaside Heights', latitude: 39.9434364619742, longitude: -74.07257080078125 },
			]
    },
    {
			region: 'South East',
			cities: [
        { name: 'All Cities', latitude: 34.66484057821928, longitude: -76.9427490234375  },
        { name: 'Emerald Isle', latitude: 34.66484057821928, longitude: -76.9427490234375 },
				{ name: 'Wrightsville Beach', latitude: 34.17090836352573, longitude: -77.80517578125 },
				{ name: 'Surf City', latitude: 34.42956713470528, longitude: -77.5469970703125 },
        { name: 'Myrtle Beach', latitude: 33.69235234723729, longitude: -78.8873291015625 },
        { name: 'Charleston', latitude: 32.78265637602964, longitude: -79.9310302734375 },
        { name: 'Folly Beach', latitude: 32.654407116645416, longitude: -79.9420166015625 },
        { name: 'Hilton Head', latitude: 32.20582936513577, longitude: -80.738525390625 },
        { name: 'Tybee Island', latitude: 31.99643007718664, longitude: -80.84976196289062 },
        { name: 'Brunswick', latitude: 31.15053220759678, longitude: -81.47872924804688 },
			]
		},
		{
			region: 'Australia',
			cities: [
				{ name: 'All Cities', latitude: -37.71859032558814, longitude: 144.931640625 },
				{ name: 'Melbourne', latitude: -37.85750715625203, longitude: 145.01953125 },
				{ name: 'Sydney', latitude: -33.87041555094182, longitude: 151.083984375 }
			]
		}
	]
};

const createStore = () =>
	reduxCreateStore(
		reducer,
		initialState,
		//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
export default createStore;
