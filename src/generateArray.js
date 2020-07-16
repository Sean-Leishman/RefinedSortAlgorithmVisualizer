
function resetArray(length,height){

    const array = [];
    for (let i=0; i<length;i++){
        array.push(randomInteger(5,height));
    }
    return array
}

function randomInteger(min,max){
    return Math.floor(Math.random() * (max-min+1)+min);
}

export default resetArray;