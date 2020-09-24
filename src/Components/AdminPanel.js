import React from 'react';
import AddInfo from './AddInfo';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ViewInfo from './ViewInfo';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MatchDetails from './MatchDetails';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            className="admin-tabpanel"
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}

function AdminPanel({ handleLogout }) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="hero">
            <Grid container style={{ display: 'inline-flex', backgroundColor: 'cornflowerblue' }}>
                <Grid item xs={6} style={{ alignSelf: 'center' }}>
                    <h3 style={{ float: 'left', paddingLeft: '20px', color: 'white' }}>Welcome Ashfaq</h3>
                </Grid>
                <Grid item xs={6} style={{ alignSelf: 'center', paddingRight: '20px' }}>
                    <Button style={{ float: 'right' }} onClick={handleLogout} size="small" variant="contained" color="primary">Logout</Button>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <MatchDetails />
                </Grid>
                <Grid item xs={12} style={{ padding: '20px' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="admin-tabs" className="admin-tabs" >
                        <Tab label="Add Customers" />
                        <Tab label="View Customers" />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <AddInfo />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ViewInfo />
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}

export default AdminPanel;