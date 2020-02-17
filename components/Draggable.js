import React from 'react';
import PropTypes from 'prop-types';
import style from './Main.style.scss';

export default class Draggable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offsetLeft: 0,
            offsetTop: 0,
            cursorX: 0,
            cursorY: 0,
            topStyle: '',
            leftStyle: '',
        }
    }

    componentDidMount() {
        const element = document.getElementById(this.props.dragElementId);
        const wrapper = document.getElementById(`${this.props.dragElementId}_wrapper`);
        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { offsetLeft, offsetTop, cursorX, cursorY } = this.state;
            this.setState({
                offsetLeft: cursorX - clientX,
                offsetTop: cursorY - clientY,
                cursorX: e.clientX,
                cursorY: e.clientY,
            });
            const topStyle = (wrapper.offsetTop - offsetTop) + "px";
            const leftStyle = (wrapper.offsetLeft - offsetLeft) + "px";
            wrapper.style.top = topStyle;
            wrapper.style.left = leftStyle;
            this.setState({
                topStyle,
                leftStyle,
            }, () => this.props.onMouseMove(topStyle, leftStyle));
        };
        const mouseUp = () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            const { topStyle, leftStyle } = this.state;
            this.props.onDragDrop(topStyle, leftStyle)
        };
        element.addEventListener('mousedown', (e) => {
            this.setState({ offsetLeft: 0, offsetTop: 0, cursorX: 0, cursorY: 0 });
            const { clientX, clientY } = e;
            this.setState({
                cursorX: clientX,
                cursorY: clientY,
            });
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        })
    }

    render() {
        return (
            <div id={`${this.props.dragElementId}_wrapper`} className={style.Draggable} style={this.props.style}>
                { this.props.children }
            </div>
        );
    }
}

Draggable.propTypes = {
    dragElementId: PropTypes.string.isRequired,
    onDragDrop: PropTypes.func,
    onMouseMove: PropTypes.func,
};

Draggable.defaultProps = {
    onDragDrop: () => {},
    onMouseMove: () => {},
};
