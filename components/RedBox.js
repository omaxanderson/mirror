import React from 'react';
import ReactDOM from 'react-dom';

class Box extends React.Component {
    render() {
        return (
            <div style={{ height: '300px', width: '300px', backgroundColor: 'red' }} />
        );
    }
}

if (document.getElementById('RedBox')) {
    console.log('noiceee');
    ReactDOM.render(<Box />, document.getElementById('RedBox'));
} else {
    console.log('not noice');
    console.log('yoo');
}
