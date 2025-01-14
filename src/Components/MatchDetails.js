import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import fire from './fire'
import Swal from "sweetalert2";

class MatchDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team1: '',
            team2: '',
            match: null,
            open: false,
            area: '',
            current: ''
        }

    }

    componentDidMount() {
        fire
            .database()
            .ref("Matches").endAt().limitToLast(1).once("child_added", snap => {

                var info = 'Match Number: ' + snap.val().match + '\n' + snap.val().team1 + ' vs ' + snap.val().team2;
                var curr = snap.val().match

                this.setState({
                    area: info,
                    current: curr
                })
            });
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = e => {

        if (this.state.match < this.state.current) {
            this.handleClose();
            
            Swal.fire({
                icon: "error",
                title: "OOPS",
                text: "Match number is incorrect!"
            });
        }
        else {
            fire
                .database()
                .ref("Matches")
                .child(this.state.match)
                .set(this.state);

            this.handleClose();
            this.componentDidMount();
        }
    };

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <TextField variant="outlined" placeholder="Match Details" value={this.state.area} rows={3} multiline />
                    <Button style={{ marginLeft: '10px' }} onClick={this.handleClickOpen} color="primary" variant="contained">
                        <AddIcon />
                    </Button>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="dialog"
                    >
                        <DialogTitle id="dialog">
                            Match Details
                        </DialogTitle>
                        <DialogContent>
                            <Grid container justify="center">
                                <Grid item xs={12} style={{ margin: '20px' }}>
                                    <TextField
                                        onChange={this.handleText}
                                        label="Match Number"
                                        fullWidth
                                        name="match"
                                        size="small"
                                        variant="outlined"
                                        value={this.state.match}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ margin: '20px' }}>
                                    <TextField
                                        onChange={this.handleText}
                                        label="Team 1"
                                        fullWidth
                                        name="team1"
                                        size="small"
                                        variant="outlined"
                                        value={this.state.team1}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ margin: '20px' }}>
                                    <TextField
                                        onChange={this.handleText}
                                        label="Team 2"
                                        fullWidth
                                        name="team2"
                                        size="small"
                                        variant="outlined"
                                        value={this.state.team2}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSubmit} variant="contained" color="primary">
                                Enter
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        );
    }
}

export default MatchDetails;