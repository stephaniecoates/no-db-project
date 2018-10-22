import React, {Component} from 'react';
import './App.css'
import axios from 'axios';

class CatPicture extends Component {
    constructor() {
        super();

        this.state = {
            catPicture: '',
        }
    }

    getCatPicture () {
        let promise = axios.get(`https://aws.random.cat/meow`);
        promise.then(res => {
            this.setState({
                catPicture: <img className="cat-picture" src={res.data.file} alt='cute kitty'></img>
            })
        })
    }
    render () {
        return (
            <div>
            <h2>Feeling discouraged?</h2>
            <h4>Here's something to cheer you up.</h4>
            <button className="get-cat-button" onClick={() => this.getCatPicture()}>Click me for a random cute cat</button>
            <div>{this.state.catPicture}</div>
            </div>
        )
    }
}

export default CatPicture;
