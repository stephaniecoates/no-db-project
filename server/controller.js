let id = 12
let food = [
    { name: 'Chocolate chip cookie', cals: 78, id: 1 },
    { name: "Pint of Ben and Jerry's", cals: 1080, id: 2 },
    { name: 'Bag of potato chips', cals: 160, id: 3 },
    { name: '5 buffalo wings', cals: 250, id: 4 },
    { name: 'Medium french fries', cals: 340, id: 5 },
    { name: 'Slice of pepperoni pizza', cals: 250, id: 6 },
    { name: 'Donut', cals: 300, id: 7 },
    { name: 'Bowl of Mac & Cheese', cals: 400, id: 8 },
    { name: 'Cinnabon cinnamon roll', cals: 880, id: 9 },
    { name: '32 oz Coke', cals: 310, id: 10 },
    { name: 'Starbucks Grande Carmel Frappuccino', cals: 420, id: 11 }
];

let yourPlate = [];

module.exports = {
    getFoodArray: (req, res) => {
        res.status(200).send(food);
    },
    addToPlate: (req, res) => {
        yourPlate = food.filter(val => val.id == req.params.id)
        res.status(200).send(yourPlate[0])

    },
    addCustomFood: (req, res) => {
        req.body.id = id;
        id++
        newFood = req.body
        console.log(newFood)
        yourPlate = [...yourPlate, newFood]
        res.status(200).send(yourPlate)
    },
    editPlateFoodCals: (req, res) => { 
        let newCalorieValue = req.body[0];
        for (let i=0; i<yourPlate.length; i++){
        req.params.id == yourPlate[i].id ? yourPlate[i].cals = newCalorieValue : null    
        }  
        res.status(200).send(yourPlate)
    },
//how can I get yourPlate to not erase other objects when I edit a food?
//can I not use if statement in controller fxn?
//is using null in ternary operator okay? If there a better option when I have no false action?
    
    deletePlateFood: (req, res) => {
        for(let i=0; i<yourPlate.length; i++){
            console.log('param', req.params.id)
            console.log('food i', yourPlate[i].id)
        req.params.id == yourPlate[i].id ? yourPlate.splice(i,1) : null
        }
        res.status(200).send(yourPlate)
    },     
            
//food id changes depending on how many values are!!! How to change?

        
clearPlate: (req, res) => {
    yourPlate = [];
    res.status(200).send(yourPlate);

}
}
