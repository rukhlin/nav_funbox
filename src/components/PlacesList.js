import React, { Component } from 'react';
import Place from './Place';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class PlacesList extends Component {
    constructor(props) {
        super(props);        
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
          return;
        }

        let newPlaces = reorder(this.props.places, result.source.index, result.destination.index);
        this.props.drag(newPlaces);
    }
    
    render() {
        const newCities = this.props.places.map((item, index) => 
            <Draggable key={'id-'+index} draggableId={'id-'+index} index={index}>
                {(provided, snapshot) => (
                    <div
                        className='places-list'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Place 
                            index={index}
                            name={item.name}
                            delete={this.props.delete}>
                        </Place>
                    </div>
                )}
            </Draggable>
        )

        return (            
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        >
                        {newCities}
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default PlacesList;