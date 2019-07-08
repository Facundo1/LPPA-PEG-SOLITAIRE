//Creamos el board inicial
const initialState = [
    [undefined, undefined, 1, 1, 1, undefined, undefined],
    [undefined, undefined, 1, 1, 1, undefined, undefined],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [undefined, undefined, 1, 1, 1, undefined, undefined],
    [undefined, undefined, 1, 1, 1, undefined, undefined]
];

let dynamicBoard = '<ul>';
// Creamos elemento ul con elementos li dentro y botones
for (let i = 0; i < initialState.length; i++) {
    dynamicBoard += '<li>';

    for (let j = 0; j < initialState[i].length; j++) {
        if(initialState[i][j] !== undefined){
            dynamicBoard += '<button class= "ball-place"></button>';
        }
      
    }
    dynamicBoard +='</li>';
}
dynamicBoard += '</ul>';

window.onload = function (){
    const boardEelement = document.getElementById('board');
    //Asignamos DynamicBoard
    boardEelement.innerHTML =  dynamicBoard;

}

