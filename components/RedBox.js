import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from './Draggable';

export default class Box extends React.Component {
    render() {
        const styles = JSON.parse(localStorage.getItem('my_box_styles'));
        return (
            <Draggable
                dragElementId='smol_box'
                onMouseMove={() => {}}
                onDragDrop={(top, left) => {
                    if (localStorage) {
                        localStorage.setItem('my_box_styles', JSON.stringify({
                            top,
                            left,
                        }));
                    }
                }}
                style={styles}
            >
                <div id='my_box' style={{ height: '300px', width: '300px', backgroundColor: 'red' }}>
                    <div id='smol_box' style={{ position: 'absolute', bottom: '0', backgroundColor: 'green', height: '100px', width: '200px' }} />
                </div>
            </Draggable>
        );
    }
}

if (document.getElementById('RedBox')) {
    ReactDOM.render(<Box />, document.getElementById('RedBox'));
}
