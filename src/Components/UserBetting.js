import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Grid from '@material-ui/core/Grid';
import fire from "./fire";
import { InputLabel, NativeSelect } from '@material-ui/core';

function UserBetting({ uid }) {

    const [state, setState] = React.useState({
        choice1: "",
        prediction1: "",
        choice2: "",
        prediction2: "",
        choice3: "",
        prediction3: "",
        choice4: "",
        prediction4: ""
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
                    fire
                        .database()
                        .ref("Customers/" + uid)
                        .push(state);

                    UpdateFilled();

                    Swal.fire(
                        "Thank You for your response!",
                        "Hope you get it right ;)",
                        "success"
                    );
                }
                else {
                    Swal.fire(
                        "OOPS",
                        "Bet already placed",
                        "error"
                    );

                    window.location = "";
                }
            });

        setState({
            choice1: "",
            prediction1: "",
            choice2: "",
            prediction2: "",
            choice3: "",
            prediction3: "",
            choice4: "",
            prediction4: ""
        })

    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={5} justify="center" style={{ padding: '20px' }}>
                <Grid item xs={12}>
                    <InputLabel htmlFor="choice1" placeholder="Choose anyone between 1-5 over" required>Prediction Over</InputLabel>
                    <NativeSelect id="choice1" name="choice1" required={true}
                        value={state.choice1} onChange={handleText} fullWidth>
                        <option value="" disabled>Choose anyone between 1-5 over</option>
                        <option value="1st Over">1st Over</option>
                        <option value="2nd Over">2nd Over</option>
                        <option value="3rd Over">3rd Over</option>
                        <option value="4th Over">4th Over</option>
                        <option value="5th Over">5th Over</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Enter your Prediction Here" variant="outlined" size="small" name="prediction1"
                        onChange={handleText} value={state.prediction1} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="choice2" placeholder="Choose anyone between 6-10 over" required>Prediction Over</InputLabel>
                    <NativeSelect id="choice2" name="choice2" required={true}
                        value={state.choice2} onChange={handleText} fullWidth>
                        <option value="" disabled>Choose anyone between 6-10 over</option>
                        <option value="6th Over">6th Over</option>
                        <option value="7th Over">7th Over</option>
                        <option value="8th Over">8th Over</option>
                        <option value="9th Over">9th Over</option>
                        <option value="10th Over">10th Over</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Enter your Prediction Here" variant="outlined" size="small" name="prediction2"
                        onChange={handleText} value={state.prediction2} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="choice3" placeholder="Choose anyone between 11-15 over" required>Prediction Over</InputLabel>
                    <NativeSelect id="choice3" name="choice3" required={true}
                        value={state.choice3} onChange={handleText} fullWidth>
                        <option value="" disabled>Choose anyone between 11-15 over</option>
                        <option value="11th Over">11th Over</option>
                        <option value="12th Over">12th Over</option>
                        <option value="13th Over">13th Over</option>
                        <option value="14th Over">14th Over</option>
                        <option value="15th Over">15th Over</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Enter your Prediction Here" variant="outlined" size="small" name="prediction3"
                        onChange={handleText} value={state.prediction3} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="choice4" placeholder="Choose anyone between 15-20 over" required>Prediction Over</InputLabel>
                    <NativeSelect id="choice4" name="choice4" required={true}
                        value={state.choice4} onChange={handleText} fullWidth>
                        <option value="" disabled>Choose anyone between 15-20 over</option>
                        <option value="16th Over">16th Over</option>
                        <option value="17th Over">17th Over</option>
                        <option value="18th Over">18th Over</option>
                        <option value="19th Over">19th Over</option>
                        <option value="20th Over">20th Over</option>
                    </NativeSelect>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Enter your Prediction Here" variant="outlined" size="small" name="prediction4"
                        onChange={handleText} value={state.prediction4} fullWidth required />
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

export default UserBetting;