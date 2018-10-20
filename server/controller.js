let id = 12
let food = [
    {name: 'Chocolate chip cookie', cals: 78, id: 1},
    {name: "Pint of Ben and Jerry's", cals: 1080, id: 2},
    {name: 'Bag of potato chips', cals: 160, id: 3},
    {name: '5 buffalo wings', cals: 250, id: 4},
    {name: 'Medium french fries', cals: 340, id: 5},
    {name: 'Slice of pepperoni pizza', cals: 250, id: 6},
    {name: 'Donut', cals: 300, id: 7},
    {name: 'Bowl of Mac & Cheese', cals: 400, id:8},
    {name: 'Cinnabon cinnamon roll', cals: 880, id: 9},
    {name: '32 oz Coke', cals: 310, id: 10},
    {name: 'Starbucks Grande Carmel Frappuccino', cals: 420, id: 11}
];

module.exports = {
    getFoodArray: (req, res) => {
        res.status(200).send(food);
    },
    getOneFood: (req, res) => {
        let oneFood = food.filter(val => val.id == req.params.id)
        res.status(200).send(oneFood[0])
        
    },
    addCustomFood: (req, res) => {
        req.body.id = id;
        food.push(req.body);
        id++
        res.status(200).send(food)
    },
    editPlateFoodCals: (req, res) => {
        food.map(val => {
            //console.log(req.params.id);
            //console.log(val.id)
            if (req.params.id == val.id) {
         val.cals = req.body}})
        res.status(200).send(food)
        },
    deletePlateFood: (req, res) => {
        let deletedFood = food.filter(val => val.id == req.params.id)
        food.splice(deletedFood[0], 1);
        res.status(200).send(food);
    }
    }