import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Grid from '@material-ui/core/Grid';
import fire from "./fire";

class AddInfo extends Component {
  state = {
    PersonName: "",
    TeamName: "",
    Contact: null,
    Location: "",
    TableNumber: "",
    filled: 1,
    match: ""
  };

  handleText = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {
    fire
      .database()
      .ref("Matches").endAt().limitToLast(1).on("child_added", snap => {
        console.log(snap.val())

        var info = snap.val().match;

        this.setState({
          match: info
        })
      });
  }

  handleSubmit = e => {

    fire
      .database()
      .ref("Customers")
      .child(this.state.Contact)
      .set(this.state);

    /*fire
      .database()
      .ref("Customers").endAt().limitToLast(1).once("child_added", function (snap) {
        console.log("added:", snap.key);
    */
        Swal.fire(
          "Booking Created!",
          "Unique ID = " + this.state.Contact,
          "info"
        );

      //});

    this.setState({
      PersonName: "",
      TeamName: "",
      Contact: "",
      Location: "",
      TableNumber: "",
      filled: 1
    });
  };

  render() {

    return (
      <form>
        <Grid container justify="center">
          <Grid item xs={12} style={{ margin: '20px' }}>
            <TextField
              onChange={this.handleText}
              label="Customer Name"
              placeholder="Customer Name"
              fullWidth
              name="PersonName"
              size="small"
              variant="outlined"
              value={this.state.PersonName}
            />
          </Grid>
          <Grid item xs={12} style={{ margin: '20px' }}>
            <TextField
              onChange={this.handleText}
              label="Team Name"
              placeholder="Team Name"
              fullWidth
              name="TeamName"
              size="small"
              variant="outlined"
              value={this.state.TeamName}
            />
          </Grid>
          <Grid item xs={12} style={{ margin: '20px' }}>
            <TextField
              onChange={this.handleText}
              label="Contact"
              fullWidth
              placeholder="Contact"
              name="Contact"
              size="small"
              variant="outlined"
              value={this.state.Contact}
            />
          </Grid>
          <Grid item xs={12} style={{ margin: '20px' }}>
            <TextField
              onChange={this.handleText}
              label="Location"
              placeholder="Location"
              fullWidth
              name="Location"
              size="small"
              variant="outlined"
              value={this.state.Location}
            />
          </Grid>
          <Grid item xs={12} style={{ margin: '20px' }}>
            <TextField
              onChange={this.handleText}
              label="Table Number"
              placeholder="Table Number"
              fullWidth
              name="TableNumber"
              size="small"
              variant="outlined"
              value={this.state.TableNumber}
            />
          </Grid>
          <Grid item xs={12} style={{ margin: '20px' }}>
            <Button
              className="submit"
              variant="contained"
              color="secondary"
              onClick={this.handleSubmit}
            >
              Book Table
                  </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default AddInfo;