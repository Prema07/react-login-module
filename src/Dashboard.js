import React from 'react';
import Button from 'react-bootstrap/Button';

const Dashboard = (props) => {
    //console.log(props.Button)
  
    return (
        <>
        <h2>Welcome to Login Module</h2>
        <Button variant="primary" type="submit" onClick={props.handleLogout}>
               Logout
            </Button>
            </>
    )
}
export default Dashboard;