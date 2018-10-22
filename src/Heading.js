import React, { Component } from 'react';
import './App.css';

class Heading extends Component {
  render () {
    return (
        <div className = "Heading">
            <h1>Outrun your Fork</h1>
            <div className="subheads">
            <h2>You're about to indulge.</h2>
             <h4>Maybe this will change your mind.</h4> 
             <h4>Maybe it'll inspire you to go on a run after.</h4> 
             <h4>Or, maybe it'll just make you feel bad about yourself.</h4>
             </div>
        </div>
    )
  }
}

export default Heading;