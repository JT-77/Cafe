import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Grid from '@material-ui/core/Grid';
import fire from "./fire";

function UserBetting({ uid }) {

    const [state, setState] = React.useState({
        betting: "",
        playing: ""
    })

    const handleText = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const UpdateFilled = () => {
        fire
            .database()
            .ref("Customers/" + uid)
            .once('value', snapshot => {
                console.log(snapshot.val())

                //update database here
                fire.database().ref("Customers")
                    .child(uid).update({
                        'filled': 0
                    })
            });
    }

    const handleSubmit = e => {

        fire
            .database()
            .ref("Customers/" + uid)
            .once('value', snapshot => {

                let items = snapshot.val();


                if (items.filled) {
                    console.log("jatin");
                    fire
                        .database()
                        .ref("Customers/" + uid)
                        .push(state);

                    UpdateFilled();

                    Swal.fire(
                        "Thanks For Betting!",
                        "You will now recieve our weekly newsletter!",
                        "success"
                    );
                }
                else {
                    Swal.fire(
                        "OOPS",
                        "Bet already placed",
                        "error"
                    );

                    window.location = "/guest";
                }
            });

        setState({
            betting: "",
            playing: ""
        })

    };

    return (
        <Grid container justify="center">
            <Grid item xs={12} style={{ margin: '20px' }}>
                <TextField
                    className="field"
                    onChange={handleText}
                    id="outlined-size-small"
                    label="Betting"
                    fullWidth
                    name="betting"
                    size="small"
                    variant="outlined"
                    value={state.betting}
                />
            </Grid>
            <Grid item xs={12} style={{ margin: '20px' }}>
                <TextField
                    className="field"
                    onChange={handleText}
                    id="outlined-size-small"
                    label="Playing"
                    fullWidth
                    name="playing"
                    size="small"
                    variant="outlined"
                    value={state.playing}
                />
            </Grid>
            <Grid item xs={12} style={{ margin: '20px' }}>
                <Button
                    className="submit"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                >
                    Place Bet
                  </Button>
            </Grid>
        </Grid>
    );
}

export default UserBetting;