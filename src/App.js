import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Heading from './Heading';
import RunResult from './Run/RunResult';



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
    this.updateEditedCalsInput = this.updateEditedCalsInput.bind(this);
    this.deletePlateFood = this.deletePlateFood.bind(this);
    this.clearPlate= this.clearPlate.bind(this);
  
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
        yourPlate: res.data
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
    let promise = axios.put(`/api/food/${id}`, [text]);
    //why does this only work when I encase text in an array? how to send req.body just as param?
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
    
  clearPlate () {
    let promise = axios.delete(`/api/food`);
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

    // User's Plate
    const plate = this.state.yourPlate.map(val => {
      return (
        <div key={val.id}>
        {/* Food Name */}
        <p>{val.name}</p>
        {/* Calorie Amount */}
        <p>Calories: {val.cals}</p>
        {/* Edit Calories NEEDS FIXING */}
        <input type="text" id="inputbox" placeholder='Edit calorie # here' onChange={e => this.updateEditedCalsInput(e.target.value)}/>
        <button id="button" value="Edit Calories" onClick={() => this.editPlateFoodCals(val.id, this.state.editedCals)}>Edit Calories</button>
        {/* Delete Food NEEDS FIXING */}
        <button onClick={() => {this.deletePlateFood(val.id)}}>Remove Food</button>
        </div>
      )
    })
    // Entire Food List
    const foodList = this.state.food.map(val => {
    return (
    <button onClick={() => this.addToPlate(val.id)} 
    key={val.id}>
    {val.name}
    </button>)})

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
        {/* Clear Entire Plate */}
        <button onClick={() => this.clearPlate()}>Clear Entire Plate</button>
        {/* How many minutes of running to burn it off? */}
        <RunResult 
        yourPlate = {this.state.yourPlate}
        foodList = {foodList}
        />
        {/* Dad Bod Joke Section */}

       

      </div>
    );
  }
}

export default App;