import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Heading from './Heading';



class App extends Component {
  constructor() {
    super();

    this.state = {
      food: [],
      yourPlate: [],
      foodInput: '',
      calsInput: '',
      editedCals: ''
    }


    this.addToPlate = this.addToPlate.bind(this);
    this.addCustomFood = this.addCustomFood.bind(this);
    this.updateCustomFoodInput = this.updateCustomFoodInput.bind(this);
    this.updateCustomCalsInput = this.updateCustomCalsInput.bind(this);
    
  }


  addToPlate(id) {
    let promise = axios.get(`/api/food/${id}`)
    promise.then((res) => {
      let newPlate = [...this.state.yourPlate, res.data]
      this.setState({
        yourPlate: newPlate
      })
    })
  }

  addCustomFood(foodInput, calsInput) {
    let promise = axios.post(`/api/food`, { name: foodInput, cals: calsInput })
    promise.then((res) => {
      this.setState({
        food: res.data
      })
    })
  }

  updateCustomFoodInput(e) {
    this.setState({
      foodInput: e
    })
  }

  updateCustomCalsInput(e) {
    this.setState({
      calsInput: e
    })
  }

  editPlateFoodCals(id, text) {
    let promise = axios.put(`/api/food/${id}`, { text });
    promise.then((res) => {
      this.setState({
        yourPlate: res.data
      })
    })
  }

  updateEditedCalsInput(e) {
    this.setState({
      editedCals: e
    })
  }

  deletePlateFood(id){
    let promise = axios.delete(`/api/food/${id}`);
    promise.then((res) => {
      this.setState({
        yourPlate: res.data
      })
    })
  }


  componentDidMount() {
    let promise = axios.get(`/api/food`);
    promise.then((res) => {
      this.setState({
        food: res.data
      })
    })
  }

  render() {
    const plate = this.state.yourPlate.map(val => {
      return (
        <div key={val.id}>
        <p>Food: {val.name}</p>
        <p>Calories: {val.cals}</p>
        <input placeholder='edit calories here' onChange={e => this.updateEditedCalsInput(e.target.value)}></input>
        <button
        onClick={() => {this.editPlateFoodCals(val.id, editedCals)}}>Change Calories Amount</button>
        <button
        onClick={() => {this.deletePlateFood(val.id)}}>Remove Food</button>
        </div>
      )
    })
    const foodList = this.state.food.map(val => <button onClick={() => this.addToPlate(val.id)} key={val.id}>{val.name}</button>)
    const plate = this.state.yourPlate.map(val => <p id={val.id} key={val.id}>{val.name}</p>)
    // const editButton = this.state.yourPlate.map(val => <button id={val.id} key={val.id} onClick={this.editPlateFoodCals(val.id, this.state.editedCals)}></button>)
    // const editCalsInputBox = this.state.yourPlate.map(e => <input onChange={e => this.updateEditedCalsInput(e.target.value)} />)
    return (
      <div className="App">
        <Heading />
        {/* Entire Group of Foods */}
        <div>{foodList}</div>
        {/* Add Custom Foods Section */}
        <input placeholder='Food Name' onChange={(e) => this.updateCustomFoodInput(e.target.value)}></input>
        <input placeholder='Calories' onChange={(e) => this.updateCustomCalsInput(e.target.value)}></input>
        <button onClick={() => this.addCustomFood(this.state.foodInput, this.state.calsInput)}>Add A Custom Snack</button>
        {/* Your Plate */}
        <div>{plate}</div>
       

      </div>
    );
  }
}

export default App;