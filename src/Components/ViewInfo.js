import React from 'react';
import fire from './fire';

function ViewInfo() {
    
    const GetData = () => {
        let ref = fire.database().ref("Customers");

        ref.on('value', snap => {
            console.log(snap.val())
        })
    }
    
    return(
        <div>
            {GetData}
        </div>
    );
}

export default ViewInfo;