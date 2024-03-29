import React, {Component} from 'react';
import { mapData } from '../model/const';

const { ymaps } = window;

class Map extends Component {
    constructor(props) {
		super(props);
		this.state = {
			ready: false,
			center: this.props.center
		};
		this.createMarks = this.createMarks.bind(this);
		
		this.initMap();
	};
	
	initMap() {
		ymaps.ready(() => {
			this.yMap = new ymaps.Map('map', mapData);
			this.yMap.events.add('boundschange', function(e) {
				this.props.updateCenter(e.get('newCenter'));
			}.bind(this));
			this.setState({
				ready: true
			});
		});
	}

	createMarks() {
		let coords = this.getCoords(this.props.places);
		if (!coords) return;
		
		this.yMap.geoObjects.removeAll();

		coords.forEach((item, index) => {
			let place = this.props.places[index];
			let placeMark = new ymaps.Placemark(item, {
				balloonContent: place.name 
			},
			{ draggable: true });
			this.yMap.geoObjects.add(placeMark);

			placeMark.events.add('dragend', () => {
				let newCoords = placeMark.geometry.getCoordinates();
				this.props.updateCoords(newCoords, index);
			})
		});	

		if (coords.length === 1) return;
		let line = new ymaps.Polyline(coords);	
		this.yMap.geoObjects.add(line);	
	}

	getCoords(places) {
		let coordinates = places.map(place => {
		  return place.pos;
		});
		return coordinates;
	}

	render() {
		const style={
			width: window.innerWidth * 0.7,
			height: window.innerHeight
		}
		if (this.state.ready) this.createMarks();

		return (
			<div id='map' style={style}></div>
		);
	}
}

export default Map;