import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Swal from "sweetalert2";
import fire from './fire'
import UserBetting from './UserBetting'
import UserBetting2 from './UserBetting2'
import Loader from './Loader'

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`guest-tabpanel-${index}`}
      aria-labelledby={`guest-tab-${index}`}
      className="guest-tabpanel"
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

class Guest extends Component {

  constructor(props) {
    super(props)

    this.state = {
      uid: '',
      dis: true,
      click: 0,
      data: [],
      value: 0,
      team1: '',
      team2: '',
      num: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, index) => {
    this.setState({
      value: index
    })
  };

  handleText = (event) => {
    this.setState({
      uid: event.target.value,
      dis: false
    });
  };

  handleUpdate(i) {
    fire
      .database()
      .ref("Matches/" + i).once("value", snap => {

        var t1 = snap.val().team1;
        var t2 = snap.val().team2;
        var curr = snap.val().match;

        this.setState({
          team1: t1,
          team2: t2,
          num: curr
        })
      });
  }

  handleSubmit = e => {

    fire
      .database()
      .ref("Customers/" + this.state.uid)
      .once('value', snapshot => {

        if (!snapshot.val()) {
          Swal.fire({
            icon: "error",
            title: "OOPS",
            text: "Wrong Unique ID!"
          }).then(function () {
            window.location = "/";
          });
        }

        else {

          this.handleUpdate(snapshot.val().match)

          this.setState({ data: snapshot.val() })
        }
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
            <Loader />
            <h2 style={{ paddingLeft: '10px' }}>Welcome {this.state.data.PersonName}</h2>
            <p style={{ paddingLeft: '10px' }}><i>(Note: You can predict only once for each team so choose wisely!)</i></p>
            <Grid container style={{ padding: '20px' }}>
              <Grid item xs={12}>
                <p>Match Number: {this.state.num}</p>
              </Grid>
              <Grid item xs={12}>
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="guest-tabs" className="guest-tabs" >
                  <Tab label={this.state.team1} />
                  <Tab label={this.state.team2} />
                </Tabs>

                <TabPanel value={this.state.value} index={0}>
                  <UserBetting uid={this.state.uid} />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                  <UserBetting2 uid={this.state.uid} />
                </TabPanel>
              </Grid>
            </Grid>
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
    )
  }
}

export default Guest