import React from 'react';
import ReactDOM from 'react-dom';
import {PhotoshopPicker, SketchPicker} from 'react-color';
import RedBox from "./RedBox";
import styles from './Main.style.scss';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsOpen: false,
            color: this.getLocalStorageItem('bg_color', '#FFF'),
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 's' && !this.state.settingsOpen) {
                this.toggleSettings();
            }
        });
        document.body.style.backgroundColor = this.state.color;
    }

    getLocalStorageItem = (key, defaultVal) => {
        if (!localStorage) {
            return defaultVal;
        }
        const val = localStorage.getItem(key);
        if (!val) {
            return defaultVal;
        }
        try {
            return JSON.parse(val);
        } catch (e) {}
        return val;
    };

    toggleSettings = () => {
        this.setState({ settingsOpen: !this.state.settingsOpen });
    };

    setBackgroundColor = (color) => {
        document.body.style.backgroundColor = color.hex;
        if (localStorage) {
            localStorage.setItem('bg_color', JSON.stringify(color.hex));
        }
    };

    onColorChange = (color) => {
        console.log('hey?');
        this.setState({ color }, () => this.setBackgroundColor(color));
    };

    render() {
        const {
            settingsOpen,
        } = this.state;

        return (
            <>
                <RedBox />
                <div
                    className={settingsOpen ? styles.Settings : styles.Settings__hidden}
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                >
                    <label htmlFor="bg-col">Background Color</label>
                    <SketchPicker
                        color={this.state.color}
                        onChange={this.onColorChange}
                    />
                    <button onClick={(e) => this.setBackgroundColor(e)}>Save</button>
                    <button
                        onClick={this.toggleSettings}
                        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                    >
                        Close
                    </button>
                </div>
            </>
        );
    }
}

if (document.getElementById('Main')) {
    ReactDOM.render(<Main />, document.getElementById('Main'));
}
