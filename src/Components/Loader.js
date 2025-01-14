import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dis: 'block'
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                dis: 'none'
            })
        }, 2500);
    }

    render() {
        return (
            <div style={{ display: this.state.dis }}>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'inline-flex', width: '100vw', height: '100vh' }}>
                    <CircularProgress />
                </div>
            </div >
        );
    }
}

export default Loader 