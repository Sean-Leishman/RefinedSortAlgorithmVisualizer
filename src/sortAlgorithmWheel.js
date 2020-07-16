export function bubblesortoriginal(array){
    const len = array.length;
    let animations = [];
    console.log(array)
    for (let i=0; i<len-1; i++){
        for (let j=0; j<len-i-1; j++){
            if (array[j] > array[j+1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                animations.push([j,j+1])
            }
        }
    }
    console.log(array)
    return animations;
}

