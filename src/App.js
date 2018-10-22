import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Heading from './Heading';
import RunResult from './Run/RunResult';
import CatPicture from './CatPicture';



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
    let promise = axios.post(`/api/food/${id}`)
    promise.then((res) => {
      this.setState({
        yourPlate: res.data
      })
    })
  }

  addCustomFood(foodInput, calsInput) {
    let promise = axios.post(`/api/food`, { name: foodInput, cals: calsInput })
    promise.then((res) => {
      this.setState({
        yourPlate: res.data,
        foodInput: '',
        calsInput: ''
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

  editPlateFoodCals(id, num) {
    // let promise = axios.put(`/api/food/${id}`, [text]);
    // promise.then((res) => {
      let newCalorieValue = parseInt(num);
      let currentPlate = this.state.yourPlate;
      currentPlate.forEach(val => {
        return val.id === id ? val.cals = newCalorieValue : null
      })
      this.setState({
        yourPlate: currentPlate,
        editedCals: ''
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
    let promise = axios.put(`/api/food`);
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
        <div key={val.id}
        className="plate-items">
        {/* Food Image */}
        <img className="food-image" alt='food' src={val.img}></img>
        {/* Food Name */}
        <p>{val.name}</p>
        {/* Calorie Amount */}
        <p>Calories: {val.cals}</p>
        {/* Edit Calories*/}
        <input type="text" id="inputbox" placeholder='Edit calorie # here' onChange={e => this.updateEditedCalsInput(e.target.value)}/>
        <button id="button" className="edit-calories-button" onClick={() => this.editPlateFoodCals(val.id, this.state.editedCals)}>Edit Calories</button>
        {/* Delete Food*/}
        <button className="remove-food-button" onClick={() => {this.deletePlateFood(val.id)}}>Remove Food</button>
        </div>
      )
    })
    // Entire Food List
    const foodList = this.state.food.map(val => {
    return (
    <div key={val.id} className='total-food-list'>
    <button onClick={() => this.addToPlate(val.id)} 
    key={val.id}>
    {<img className="food-image" src={val.img} alt='food' key={val.id}></img>}
    {val.name}
    </button></div>)})


    return (
      <div className="App">
        <Heading />
        {/* Entire Group of Foods */}
        <h4 className="choose-foods">Choose from these common snacks...</h4>
        <div>{foodList}</div>
        {/* Add Custom Foods Section */}
        <h4>...or add your own!</h4>
        <input placeholder='Food Name' onChange={(e) => this.updateCustomFoodInput(e.target.value)} value={this.state.foodInput}></input>
        <input placeholder='Calories' onChange={(e) => this.updateCustomCalsInput(e.target.value)} value={this.state.calsInput}></input>
        <button onClick={() => this.addCustomFood(this.state.foodInput, this.state.calsInput)}>Add A Custom Snack</button>
        {/* Your Plate */}
        <div className='your-plate'>
        <h1 className="your-plate-header">What's On Your Plate?</h1>
        <div>{plate}</div>
        </div>
        {/* Clear Entire Plate */}
        <button className="clear-all-button" onClick={() => this.clearPlate()}>Clear Entire Plate</button>
        {/* How many minutes of running to burn it off? */}
        <RunResult 
        yourPlate = {this.state.yourPlate}
        foodList = {foodList}
        />
        {/* Cat Picture Section */}
        <CatPicture />
        {/* Footer */}
        <div className="footer">
          <p>Created by Stephanie Coates for DevMountain</p>
        </div>
        </div>
    );
  }
}

export default App;