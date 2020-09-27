import React, { Component } from 'react';
import fire from './fire';
import Grid from '@material-ui/core/Grid';
import '../App.css'

class ViewInfo2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: []
        }
    }

    componentDidMount() {
        fire.database().ref("Customers").once('value', snapshot => {

            let list = []

            snapshot.forEach(snap => {
                list.push(snap.val());
            })

            this.setState({ info: list })
        })
    }

    handleText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <Grid container>
                <Grid item xs={12} style={{ overflowX: 'auto', marginTop: '20px' }}>
                    <table>
                        <thead class="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Table Number</th>
                                <th>Location</th>
                                <th>Contact</th>
                                <th>Choice1</th>
                                <th>Prediction1</th>
                                <th>Choice2</th>
                                <th>Prediction2</th>
                                <th>Choice3</th>
                                <th>Prediction3</th>
                                <th>Choice4</th>
                                <th>Prediction4</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.info.map(data => {
                                if (this.props.match == data.match)
                                    return (
                                        <tr>
                                            <td>{data.PersonName}</td>
                                            <td>{data.TableNumber}</td>
                                            <td>{data.Location}</td>
                                            <td>{data.Contact}</td>
                                            <td>{data.choice5}</td>
                                            <td>{data.prediction5}</td>
                                            <td>{data.choice6}</td>
                                            <td>{data.prediction6}</td>
                                            <td>{data.choice7}</td>
                                            <td>{data.prediction7}</td>
                                            <td>{data.choice8}</td>
                                            <td>{data.prediction8}</td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        );
    }
}

export default ViewInfo2;