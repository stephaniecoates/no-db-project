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
            <div>
                <h3>How long would you have to run to burn off all these foods?</h3>
                <div><CalculateRun 
                // Tried to put this into state as runTime, didn't work. Does child component need to go in return within render to work?
                //How do I make it a button instead of appearing right away?
                yourPlate = {this.props.yourPlate} /></div>
            </div>
        )
    }
}