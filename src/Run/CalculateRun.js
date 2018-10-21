
export default function CalculateRun(props) {
    let calculatedFoods = props.yourPlate
    let calsArray = [];
    calculatedFoods.forEach(val => {
        calsArray.push(val.cals)
    })
    let sum = calsArray.reduce((acc, cur) => acc + cur, 0)

    // Based on 150 pound person, running at 5mph burns 10 calories per minute

    let totalMins = Math.floor(sum / 10)
    let hours = Math.floor(totalMins / 60)
    let minutes = totalMins % 60
    let finalRunningTime = `${hours} hour(s) and ${minutes} minutes`
    return (finalRunningTime);
}








