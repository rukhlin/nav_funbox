import React, {Component} from 'react';
import Places from './Places';
import Map from './Map';
import '../style/index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
      center: [55.75, 37.57]
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.updateCenter = this.updateCenter.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
    this.addPlace = this.addPlace.bind(this);
  }

  updateCenter(center) {
    this.setState({center});
  }

  updateCoords(newPos, index) {
    let places = this.state.places;
    places[index].pos = newPos;
    this.setState({places});
  }

  handleDelete(index) {
    let places = this.state.places;
    places.splice(index, 1) 
    this.setState({places});
  }

  handleDrag(places) {
    this.setState({places});
  }

  addPlace(name) {
    let oldPlaces = this.state.places;
    let newPlace = {
      name,
      pos: this.state.center
    };
    let places = oldPlaces.concat(newPlace);
    this.setState({ places });
  }

  render() {
    return (
      <div className='app'>
          <div className='app-places'>
            <Places 
              drag={this.handleDrag}
              delete={this.handleDelete}
              places={this.state.places}
              addPlace={this.addPlace}
              />
          </div>
          <div className='app-map'>
            <Map
              places={this.state.places}
              drag={this.handleDrag}
              updateCenter={this.updateCenter}
              updateCoords={this.updateCoords}
              />
          </div>
      </div>
    );
  }
}

export default App;