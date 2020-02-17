import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './Clock.style.scss';
import Configurable from './Configurable';

@Configurable({
    "Date Format": 'string',
    "Time Format": 'string',
    "Align": ['left', 'right', 'center'],
})
export default class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        const {
            dateFormat,
            timeFormat,
            align,
        } = this.props;
        return (
            <div id="clock" className={classnames(style.Clock, {
                [style.Clock__center]: align === 'center',
                [style.Clock__right]: align === 'right',
            })}>
                <h1>
                    {moment().format(timeFormat)}
                </h1>
                <h4>
                    {moment().format(dateFormat)}
                </h4>
            </div>
        );
    }
}

Clock.propTypes = {
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    align: PropTypes.oneOf(['center', 'left', 'right']),
};

Clock.defaultProps = {
    dateFormat: 'dddd, MMM Do',
    timeFormat: 'h:mma',
    align: 'right',
};
