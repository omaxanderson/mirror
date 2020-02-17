import React from 'react';
import style from './Configurable.style.scss';

export default function Configurable(props, hello) {
    console.log(props);
    console.log(hello);

    return function (WrappedComponent) {
        const wrapper = class extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    configOpen: false,
                };
            }

            toggleConfig = () => {
                this.setState({
                    configOpen: !this.state.configOpen,
                });
            };

            render() {
                return (
                    <>
                        <button onClick={this.toggleConfig}>{this.state.configOpen ? 'Close' : 'Open'}</button>
                        {this.state.configOpen && (
                            <div className={style.Configurable}>
                                <div>hello world!</div>
                            </div>
                        )}
                        <WrappedComponent {...this.props} />
                    </>
                )
            }
        };

        return wrapper;
    }
}
