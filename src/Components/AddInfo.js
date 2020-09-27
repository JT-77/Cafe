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
    filled1: 1,
    filled2: 1,
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

        var info = snap.val().match;

        this.setState({
          match: info
        })
      });
  }

  handleSubmit = e => {

    e.preventDefault();

    fire
      .database()
      .ref("Customers")
      .child(this.state.Contact)
      .set(this.state);

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
      filled1: 1,
      filled2: 1
    });
  };

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </Grid>
          <Grid item xs={12} style={{ margin: '20px' }}>
            <Button
              className="submit"
              variant="contained"
              color="secondary"
              type="submit"
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