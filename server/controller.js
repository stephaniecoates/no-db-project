let id = 12
let food = [
    { name: 'Chocolate chip cookie', cals: 78, img: "https://rlv.zcache.com.au/cartoon_cookie_classic_round_sticker-r36003e478fd343b3b0aa4b783a72192c_v9waf_8byvr_307.jpg", id: 1 },
    { name: "Pint of Ben and Jerry's", cals: 1080, img: "https://www.benjerry.com/files/live/sites/systemsite/files/flavors/products/us/pint/open-closed-pints/caramel-chocolate-cheesecake-truffles-landing.png", id: 2 },
    { name: 'Bag of potato chips', cals: 160, img: "https://www.fritolay.com/images/default-source/blue-bag-image/lays-classic.png?sfvrsn=bd1e563a_2", id: 3 },
    { name: '5 buffalo wings', cals: 250, img: "https://ih0.redbubble.net/image.416193408.4383/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg", id: 4 },
    { name: 'Medium french fries', cals: 340, img: "https://www.mcdonalds.com.ph/userfiles/images/ourfood/main/Fries%20large2.png", id: 5 },
    { name: 'Pepperoni pizza slice', cals: 250, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2JbfKK7W43f-9uBBVu1n2yXmLx48r-AThP4Fz4leUaB0ZCiCBSA", id: 6 },
    { name: 'Chocolate glazed donut', cals: 300, img: "https://photos.gograph.com/thumbs/CSP/CSP239/chocolate-glazed-donut-vector-stock_k34666720.jpg", id: 7 },
    { name: 'Cinnabon Cinnamon roll', cals: 880, img: "https://us.123rf.com/450wm/slowcentury/slowcentury1412/slowcentury141200001/34422820-stock-vector-freshly-baked-cinnamon-roll-with-sweet-frosting-vector-illustration-.jpg?ver=6", id: 9 },
    { name: '32 oz Coca-Cola', cals: 310, img: "https://i.pinimg.com/originals/13/b4/81/13b481fbb96d856d2b09d410da695f55.png", id: 10 },
    { name: 'Carmel Frappuccino', cals: 420, img: "https://s1.r29static.com//bin/entry/d2d/600x900,80/1457128/image.jpg", id: 11 }
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
        req.body.img = "https://melbournechapter.net/images/marks-clipart-uestion-1.png"
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

},
getCatPicture: (req, res) => {
    res.sendStatus(200)
    //why do we even need this? confused about purpose of fxn
}
}
