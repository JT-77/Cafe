import React, { Component } from 'react';
import fire from './fire';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import '../App.css'

class ViewInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: [],
            filter: ""
        }
    }

    componentDidMount() {
        fire.database().ref("Customers").once('value', snapshot => {
            console.log(snapshot.val())
            let list = []

            snapshot.forEach(snap => {
                list.push(snap.val());
            })

            this.setState({ info: list })
        })

        fire
            .database()
            .ref("Matches").endAt().limitToLast(1).once("child_added", snap => {
                var inf = snap.val().match;

                this.setState({
                    filter: inf
                })
            });
    }

    handleText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleFilter = () => {
        this.componentDidMount();
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <TextField variant="outlined" name="filter" label="Enter Match Number" value={this.state.filter} style={{ float: 'right' }} onChange={this.handleText} />
                </Grid>
                <Grid item xs={12} style={{ overflowX: 'auto', marginTop: '20px' }}>
                    <table>
                        <thead class="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Table Number</th>
                                <th>Location</th>
                                <th>Contact</th>
                                <th>Team Name</th>
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
                                if (this.state.filter == data.match)
                                    return (
                                        <tr>
                                            <td>{data.PersonName}</td>
                                            <td>{data.TableNumber}</td>
                                            <td>{data.Location}</td>
                                            <td>{data.Contact}</td>
                                            <td>{data.TeamName}</td>
                                            <td>{data.choice1}</td>
                                            <td>{data.prediction1}</td>
                                            <td>{data.choice2}</td>
                                            <td>{data.prediction2}</td>
                                            <td>{data.choice3}</td>
                                            <td>{data.prediction3}</td>
                                            <td>{data.choice4}</td>
                                            <td>{data.prediction4}</td>
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

export default ViewInfo;