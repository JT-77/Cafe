import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Grid from '@material-ui/core/Grid';
import fire from "./fire";
import { InputLabel, NativeSelect } from '@material-ui/core';

function UserBetting2({ uid }) {

    const [state, setState] = React.useState({
        choice5: "",
        prediction5: "",
        choice6: "",
        prediction6: "",
        choice7: "",
        prediction7: "",
        choice8: "",
        prediction8: ""
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
                //update database here
                fire.database().ref("Customers")
                    .child(uid).update({
                        'filled2': 0
                    })
            });
    }

    const handleSubmit = e => {

        e.preventDefault();

        fire
            .database()
            .ref("Customers/" + uid)
            .once('value', snapshot => {

                let items = snapshot.val();


                if (items.filled2) {
                    fire
                        .database()
                        .ref("Customers/" + uid)
                        .update(state);

                    UpdateFilled();

                    Swal.fire({
                        icon: "success",
                        title: "Thank You for your response!",
                        text: "Hope you get it right ;)"
                    }).then(function() {
                        window.location = "/";
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "OOPS",
                        text: "Bet already placed"
                    }).then(function() {
                        window.location = "/";
                    });
                }
            });

        setState({
            choice5: "",
            prediction5: "",
            choice6: "",
            prediction6: "",
            choice7: "",
            prediction7: "",
            choice8: "",
            prediction8: ""
        })

    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="center">
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <InputLabel htmlFor="choice5" placeholder="Choose anyone between 1-5 over">Prediction Over</InputLabel>
                    <NativeSelect id="choice5" name="choice5" required={true}
                        value={state.choice5} onChange={handleText} fullWidth>
                        <option value="" disabled>Choose anyone between 1-5 over</option>
                        <option value="1st Over">1st Over</option>
                        <option value="2nd Over">2nd Over</option>
                        <option value="3rd Over">3rd Over</option>
                        <option value="4th Over">4th Over</option>
                        <option value="5th Over">5th Over</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <TextField label="Enter your Prediction Here" variant="outlined" size="small" name="prediction5"
                        onChange={handleText} value={state.prediction5} fullWidth required />
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <InputLabel htmlFor="choice6" placeholder="Choose anyone between 6-10 over">Prediction Over</InputLabel>
                    <NativeSelect id="choice6" name="choice6" required={true}
                        value={state.choice6} onChange={handleText} fullWidth>
                        <option value="" disabled>Choose anyone between 6-10 over</option>
                        <option value="6th Over">6th Over</option>
                        <option value="7th Over">7th Over</option>
                        <option value="8th Over">8th Over</option>
                        <option value="9th Over">9th Over</option>
                        <option value="10th Over">10th Over</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <TextField label="Enter your Prediction Here" variant="outlined" size="small" name="prediction6"
                        onChange={handleText} value={state.prediction6} fullWidth required />
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <InputLabel htmlFor="choice7" placeholder="Choose anyone between 11-15 over">Prediction Over</InputLabel>
                    <NativeSelect id="choice7" name="choice7" required={true}
                        value={state.choice7} onChange={handleText} fullWidth>
                        <option value="" disabled>Choose anyone between 11-15 over</option>
                        <option value="11th Over">11th Over</option>
                        <option value="12th Over">12th Over</option>
                        <option value="13th Over">13th Over</option>
                        <option value="14th Over">14th Over</option>
                        <option value="15th Over">15th Over</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <TextField label="Enter your Prediction Here" variant="outlined" size="small" name="prediction7"
                        onChange={handleText} value={state.prediction7} fullWidth required />
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <InputLabel htmlFor="choice8" placeholder="Choose anyone between 15-20 over">Prediction Over</InputLabel>
                    <NativeSelect id="choice8" name="choice8" required={true}
                        value={state.choice8} onChange={handleText} fullWidth>
                        <option value="" disabled>Choose anyone between 15-20 over</option>
                        <option value="16th Over">16th Over</option>
                        <option value="17th Over">17th Over</option>
                        <option value="18th Over">18th Over</option>
                        <option value="19th Over">19th Over</option>
                        <option value="20th Over">20th Over</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <TextField label="Enter your Prediction Here" variant="outlined" size="small" name="prediction8"
                        onChange={handleText} value={state.prediction8} fullWidth required />
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <Button
                        className="submit"
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Place Bet
                  </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default UserBetting2;