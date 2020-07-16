import {wheelState,NUMBER_BARS,INTERVAL_TIME} from './wheelState'
import {getState} from 'jstates'

// Initliaze the array to be sorted
function resetAllArrays(length){
	let tupleArray = reset2DArray(length);
	let indexArray = resetIndexArray(length)
	let arrayOfIndex = shuffle(tupleArray,indexArray);

	return [arrayOfIndex[0],arrayOfIndex[1]]
}

function reset2DArray(length){
	let array = [[0,0,0]*length];
	let increaseIndex = 1;
	let decreaseIndex = 0;
	array[0] = [255,0,0];
	
	let temp = [];

	while (array.length < length){
		while (array[array.length-1][increaseIndex] < 255){
			temp = array[array.length-1].map(x => x);
			temp[increaseIndex] += 5;
			array.push(temp);
		}
		increaseIndex += 1;
		while (array[array.length-1][decreaseIndex] > 0){
			temp = array[array.length-1].map(x => x);
			temp[decreaseIndex] -= 5;
			array.push(temp);
		}
		decreaseIndex += 1;

		if (increaseIndex > 2){
			increaseIndex = 0;
		}
	}
	array = array.map(x => getHex(x[0],x[1],x[2]));
	return array;
}

function resetIndexArray(length){
	let indexes = [];
	for (let i=0; i<length; i++){
		indexes.push(i);
	}
	return indexes;
}

function shuffle(array1,array2){
	for (let i = array1.length - 1; i > 0; i--){
	  const j = Math.floor(Math.random() * i);
	  const temp1 = array1[i];
	  const temp2 = array2[i];

	  array1[i] = array1[j];
	  array2[i] = array2[j];
	  
	  array1[j] = temp1;
	  array2[j] = temp2;
	}
	return [array1,array2];
}

var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

function getHex(r,g,b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return '#'+red+green+blue;
};

const nextState = wheelState => ({
	tupleArray:wheelState.tupleArray
})

export default resetAllArrays