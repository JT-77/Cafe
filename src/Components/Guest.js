import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import fire from './fire'

class Guest extends Component {

constructor(props) {
    super(props)
  
    this.state = {
        uid: '',
        dis: true,
        click: 0,
        data: {}
    };
}

  handleText = (event) => {
    this.setState({
      uid: event.target.value,
      dis: false
    });
  };

  addValues = () => {
    fire
      .database()
      .ref("Customers/" + this.state.uid)
      .on('value', snapshot => {
          this.setState({
              data: snapshot.val()
          })   
    });
  } 

  handleSubmit = e => {

    this.addValues()

    this.setState({
        click: 1
    });
  };

  render() {
    return (
        <div>
        {(this.state.click) ? (
            <p>Welcome {this.state.data.name}</p>
        ) : (
        <Grid container justify="center">
        <Grid item xs={12} style={{ margin: '20px' }}>
          <TextField
            className="field"
            onChange={this.handleText}
            id="outlined-size-small"
            label="Unique ID"
            fullWidth
            name="uid"
            size="small"
            variant="outlined"
            value={this.state.uid}
          />
        </Grid>
        <Grid item xs={12} style={{ margin: '20px' }}>
          <Button
            className="submit"
            variant="contained"
            disabled={this.state.dis}
            color="secondary"
            onClick={this.handleSubmit}
          >
            Enter
            </Button>
        </Grid>
      </Grid>
    )}
      </div>
    )}
}

export default Guest