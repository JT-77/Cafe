import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import Grid from '@material-ui/core/Grid';
import fire from "./fire";

class AddInfo extends Component {
    state = {
        name: "",
        table: "",
        location: ""
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
          .orderByKey()
          .limitToLast(100);
        fire
          .database()
          .ref("Customers")
          .push(this.state);
    
        Swal.fire(
          "Thanks For Subscribing!",
          "You will now recieve our weekly newsletter!",
          "success"
        );
    
        this.setState({
            name: "",
            table: "",
            location: ""
        });
      };

      render() {

        return(
            <Grid container justify="center">
                <form class="form" noValidate autoComplete="off">
                <Grid item xs={12} style={{ margin: '20px' }}>
                  <TextField
                    className="field"
                    onChange={this.handleText}
                    id="outlined-size-small"
                    label="Customer Name"
                    fullWidth
                    name="name"
                    size="small"
                    variant="outlined"
                    value={this.state.name}
                  />
                </Grid>
                <Grid item xs={12} style={{ margin: '20px' }}>
                  <TextField
                    className="field"
                    onChange={this.handleText}
                    id="outlined-size-small"
                    label="Table Number"
                    fullWidth
                    name="table"
                    size="small"
                    variant="outlined"
                    value={this.state.table}
                  />
                </Grid>
                <Grid item xs={12} style={{ margin: '20px' }}>
                  <Button
                    className="submit"
                    variant="contained"
                    color="secondary"
                    onClick={this.handleSubmit}
                  >
                    Add
                  </Button>
                </Grid>
                </form>
            </Grid>
        );
      }
}

export default AddInfo;