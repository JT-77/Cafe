import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import fire from './fire'
import ViewInfo from './ViewInfo'
import ViewInfo2 from './ViewInfo2'
import TextField from "@material-ui/core/TextField";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-sub-tabpanel-${index}`}
            aria-labelledby={`admin-sub-tab-${index}`}
            className="admin-sub-tabpanel"
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}

class CombinedView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: 0,
            team1: '',
            team2: '',
            filter: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fire
            .database()
            .ref("Matches").endAt().limitToLast(1).once("child_added", snap => {

                var t1 = snap.val().team1;
                var t2 = snap.val().team2;
                var inf = snap.val().match;

                this.setState({
                    team1: t1,
                    team2: t2,
                    filter: inf
                })
            });
    }

    handleText = (event) => {

        if (event.target.value) {
            fire
            .database()
            .ref("Matches/" + event.target.value).once("value", snap => {

                var t1 = snap.val().team1;
                var t2 = snap.val().team2;

                this.setState({
                    team1: t1,
                    team2: t2
                })
            });
        }

        this.setState({
            [event.target.name]: event.target.value
        });
    };


    handleChange = (event, index) => {
        this.setState({
            value: index
        })
    };

    render() {
        return (
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={12}>
                    <TextField size="small" variant="outlined" name="filter" label="Enter Match Number" style={{ float: 'right' }} value={this.state.filter} onChange={this.handleText} />
                </Grid>
                <Grid item xs={12}>
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="admin-sub-tabs" className="admin-sub-tabs" >
                        <Tab label={this.state.team1} />
                        <Tab label={this.state.team2} />
                    </Tabs>
                    <TabPanel value={this.state.value} index={0}>
                        <ViewInfo match={this.state.filter} />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <ViewInfo2 match={this.state.filter} />
                    </TabPanel>
                </Grid>
            </Grid>
        )
    }
}

export default CombinedView;