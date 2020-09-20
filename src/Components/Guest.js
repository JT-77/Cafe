import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import fire from './fire'
import UserBetting from './UserBetting' 

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

  handleSubmit = e => {

    fire
      .database()
      .ref("Customers/" + this.state.uid)
      .on('value', snapshot => {
          this.setState({
              data: snapshot.val()
          })   
    });

    this.setState({
        click: 1
    });
  };

  render() {
    return (
        <div>
        {(this.state.click) ? (
            <div>
            <h2 style={{ paddingLeft: '10px' }}>Welcome {this.state.data.PersonName}</h2>
            <p style={{ paddingLeft: '10px' }}><i>(Note: This form can be submitted only once so choose wisely!)</i></p>
              <UserBetting uid={this.state.uid} />
            </div>
        ) : (
        <Grid container justify="center">
        <Grid item xs={12} style={{ padding: '20px' }}>
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
        <Grid item xs={12} style={{ padding: '20px' }}>
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