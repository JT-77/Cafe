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
        Contact: "",
        Location: "",
        TableNumber: "",
        filled: 1
      };
    
      handleText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
          });
      };
    
      handleSubmit = e => {
        
        fire
          .database()
          .ref("Customers")
          .push(this.state);

        fire
          .database()
          .ref("Customers").once("child_added", function(snap) {
            console.log("added:", snap.key);

            Swal.fire(
              "Booking Created!",
              "Unique ID = " + snap.key,
              "info"
            );

          });  
    
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

        return(
          <form>
              <Grid container justify="center" style={{ padding: '20px' }}>
                <Grid item xs={12} style={{ margin: '20px' }}>
                  <TextField
                    onChange={this.handleText}
                    label="Customer Name"
                    fullWidth
                    required
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
                    fullWidth
                    required
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
                    required
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
                    fullWidth
                    required
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
                    fullWidth
                    required
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