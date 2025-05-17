//import React, { Component } from 'react';
import loading from './loading.gif';

const Spinner = (props) => {
  
    return (
      <div className='text-center my-3'> 
        <img src={loading} alt="Loading" style={{ width: "100px", height: "100px", margin: "auto", display: "block" }} />
      </div>
    );
  }


export default Spinner;
