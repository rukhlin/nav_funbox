import React, { Component } from 'react';
import PlacesList from './PlacesList';

class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.inputChange = this.inputChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    inputChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    keyPress(event) {    
        let code = event.keyCode || event.charCode;
        if (code !== 13) {
            return;
        }
        this.props.addPlace(this.state.inputValue);
        this.setState({
            inputValue: ''
        });
    }

    render() {
        return (
            <div className='places'>
                <div className='places-header'>
                    <h4>Новая точка маршрута:</h4>
                    <input 
                        value={this.state.inputValue}
                        onChange={this.inputChange}
                        onKeyPress={this.keyPress}
                        />
                </div>                
                <div className='places-list'>
                    <PlacesList 
                        places={this.props.places}
                        delete={this.props.delete}
                        drag={this.props.drag}
                        />
                </div>
            </div>
          );
	}
}

export default Places;