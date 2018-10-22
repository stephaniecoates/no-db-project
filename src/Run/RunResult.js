import React, { Component } from 'react';
import '../App.css';
import CalculateRun from './CalculateRun';

export default class RunResult extends Component {
    constructor(props){
        super(props);

        this.state = {
            yourPlate: props.yourPlate
        }     
    }
     
    render () {
        return(
            <div className="run-section">
                <h2 className="outrun-fork-text">Can you outrun your fork?</h2>
                <h3>You'd have to run non-stop for...</h3>
                <div className="run-time"><CalculateRun 
                yourPlate = {this.props.yourPlate} /></div>
                <h3>to burn off those foods.</h3>
            </div>
        )
    }
}