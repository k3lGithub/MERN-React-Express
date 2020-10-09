import React from 'react';
import banner from '../.././banner.png';


export default function Home(props) {

  return (
    <React.Fragment>
        {/* <p>This is Home</p> */}
        <img src={banner}></img>
    </React.Fragment>
  );
}