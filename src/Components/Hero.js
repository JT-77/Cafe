import React from 'react';
import AddInfo from './AddInfo'
import { TextField } from '@material-ui/core';

const Hero = ({ handleLogout }, { email }) => {

    console.log({ email });

    return (
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <div>
                <AddInfo />
            </div>
        </section>
    );
}

export default Hero;