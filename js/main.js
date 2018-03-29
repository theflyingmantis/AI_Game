console.log('Js Running')

let selected = []
let board = []





function buttonClicked(thisObject){
	if (selected.length == 1){
		let initialPos = selected[0];
		selected = []
		let finalPos = thisObject.id;
		console.log(initialPos,finalPos);
		// console.log(board);
		let index = initialPos.split(',');
		let x = parseInt(index[0]);
		let y = parseInt(index[1]);
		moves = Moves(board,x,y);
		let index1 = initialPos.split(',');
		let x1 = parseInt(index1[0]);
		let y1 = parseInt(index1[1]);
		let index2 = finalPos.split(',');
		let x2 = parseInt(index2[0]);
		let y2 = parseInt(index2[1]);
		let move = [[x1,y1],[x2,y2]];
		let flag=0;
		for (let i=0;i<moves.length;i++){
			if (isEqual(moves[i],move)){
				console.log('move found');
				flag=1;
			}
		}
		if (flag==0){
			alert('wrong move. Play correct move');
		}
		else{
			playMove(move);
			let boardCopy = JSON.parse(JSON.stringify(board));
			let botMove = ALPHA_BETA_SEARCH(boardCopy);
			console.log(botMove);
		}
		
	}
	else{
		let index = thisObject.id.split(',');
		let x = parseInt(index[0]);
		let y = parseInt(index[1]);
		let objectType = board[x][y];
		if (objectType != 0){
			selected.push(thisObject.id);
		}
		else alert('select a valid piece!');
	}
}

function playMove(move){
	let x1=move[0][0];
	let y1=move[0][1];
	let x2=move[1][0];
	let y2=move[1][1];
	if (x1==x2){
		if (y1-y2==2){
			turnPiece(x1,y1-1)
		}
		if (y2-y1==2){
			turnPiece(x1,y1+1)
		}
	}
	if (y1==y2){
		if (x1-x2==2){
			turnPiece(x1-1,y1);
		}
		if (x2-x1==2){
			turnPiece(x1+1,y1);
		}
	}
	if (x2-x1==2 &&y2-y1==2){
		turnPiece(x2-1,y2-1);
	}
	if (x1-x2==2 &&y2-y1==2){
		turnPiece(x2+1,y2-1);
	}
	if (x2-x1==2 &&y1-y2==2){
		turnPiece(x2-1,y2+1);
	}
	if (x1-x2==2 &&y1-y2==2){
		turnPiece(x2+1,y2+1);
	}
	let temp = board[x2][y2];
	board[x2][y2]=board[x1][y1];
	board[x1][y1]=0;
	updateUI();
}

function reversePiece(p){
	if (p==1){
		return 4;
	}
	if (p==4){
		return 1;
	}
	if (p==2){
		return 5;
	}
	if (p==5){
		return 2;
	}
	if (p==3){
		return 6;
	}
	if (p==6){
		return 3;
	}
}

function turnPiece(x,y){
	board[x][y]=reversePiece(board[x][y]);
}

function updateUI(){
	for (let i=0;i<board.length;i++){
		for (let j=0;j<board[i].length;j++){
			let buttonId = i.toString()+','+j.toString();
			if (board[i][j]==0){
				document.getElementById(buttonId).style.backgroundColor = "white";
			}
			if (board[i][j]==1){
				document.getElementById(buttonId).style.backgroundColor = "green";
			}
			if (board[i][j]==2){
				document.getElementById(buttonId).style.backgroundColor = "yellow";
			}
			if (board[i][j]==3){
				document.getElementById(buttonId).style.backgroundColor = "red";
			}
			if (board[i][j]==4){
				document.getElementById(buttonId).style.backgroundColor = "cyan";
			}
			if (board[i][j]==5){
				document.getElementById(buttonId).style.backgroundColor = "black";
			}
			if (board[i][j]==6){
				document.getElementById(buttonId).style.backgroundColor = "blue";
			}
		}
	}
}


function Moves(board,x,y){
	
	let objectType = board[x][y];
	let moves = [];

	if (checkLeft(board,objectType,x,y)['type']){
		moves.push(checkLeft(board,objectType,x,y)['answer']);
	}
	if (checkRight(board,objectType,x,y)['type'] ){
		moves.push(checkRight(board,objectType,x,y)['answer']);
	}

	if ( checkUp(board,objectType,x,y)['type'] ){
		moves.push(checkUp(board,objectType,x,y)['answer']);
	}
	if (checkDown(board,objectType,x,y)['type']){
		moves.push(checkDown(board,objectType,x,y)['answer'])
	}

	if (objectType!=1 && objectType!=4){
		if (checkUpLeft(board,objectType,x,y)['type']){
			moves.push(checkUpLeft(board,objectType,x,y)['answer']);
		}
		if (checkUpRight(board,objectType,x,y)['type'] ){
			moves.push(checkUpRight(board,objectType,x,y)['answer']);
		}
		if ( checkDownLeft(board,objectType,x,y)['type'] ){
			moves.push(checkDownLeft(board,objectType,x,y)['answer']);
		}
		if (checkDownRight(board,objectType,x,y)['type']){
			moves.push(checkDownRight(board,objectType,x,y)['answer'])
		}
	}
	final_moves = []
	for (let i=0;i<moves.length;i++){
		final_moves.push([[x,y],moves[i]]);	
	}
	return final_moves;
}

function checkInArray(array1,val){
	for (let i=0;i<array1.length;i++){
		if (array1[i] == val){
			return true;
		}
	}
	return false;
}


function oppositeValues(val){
	if (val == 1 || val ==2 || val ==3){
		return [4,5,6];
	}
	if (val == 4||val==5||val==6){
		return [1,2,3]
	}
}


function checkUpLeft(board,initValue,x,y){
	if (y==0 || x==0){
		return {
			'type':false,
		}
	}
	if (board[x-1][y-1] == 0){
		return {
			'type':true,
			'answer':[x-1,y-1]
		}
	}
	let oppValues = oppositeValues(initValue);
	if (checkInArray(oppValues,board[x-1][y-1])){
		if (x-2<0 || y-2<0){
			return {
				'type':false
			}
		}
		if (board[x-2][y-2]==0){
			return {
				'type':true,
				'answer':[x-2,y-2]
			}
		}
		else {
			return {
				'type':false
			}
		}
	}
	return {
		'type':false
	}
}


function checkUpRight(board,initValue,x,y){
	if (y==8 || x==0){
		return {
			'type':false,
		}
	}
	if (board[x-1][y+1] == 0){
		return {
			'type':true,
			'answer':[x-1,y+1]
		}
	}
	let oppValues = oppositeValues(initValue);

	if (checkInArray(oppValues,board[x-1][y+1])){
		if (x-2<0 || y+2>8){
			return {
				'type':false
			}
		}
		if (board[x-2][y+2]==0){
			return {
				'type':true,
				'answer':[x-2,y+2]
			}
		}
		else {
			return {
				'type':false
			}
		}
	}
	return {
		'type':false
	}
}


function checkDownRight(board,initValue,x,y){
	if (y==8 || x==15){
		return {
			'type':false,
		}
	}

	if (board[x+1][y+1] == 0){
		return {
			'type':true,
			'answer':[x+1,y+1]
		}
	}
	let oppValues = oppositeValues(initValue);

	if (checkInArray(oppValues,board[x+1][y+1])){
		if (x+2>15||y+2>8){
			return {
				'type':false
			}
		}
		if (board[x+2][y+2]==0){
			return {
				'type':true,
				'answer':[x+2,y+2]
			}
		}
		else {
			return {
				'type':false
			}
		}
	}
	return {
		'type':false
	}
}


function checkDownLeft(board,initValue,x,y){
	if (y==0 || x==15){
		return {
			'type':false,
		}
	}
	if (board[x+1][y-1] == 0){
		return {
			'type':true,
			'answer':[x+1,y-1]
		}
	}
	let oppValues = oppositeValues(initValue);

	if (checkInArray(oppValues,board[x+1][y-1])){
		if (x+2>15 || y-2<0){
			return {
				'type':false
			}
		}
		if (board[x+2][y-2]==0){
			return {
				'type':true,
				'answer':[x+2,y-2]
			}
		}
		else {
			return {
				'type':false
			}
		}
	}
	return {
		'type':false
	}
}



function checkLeft(board,initValue,x,y){
	if (y==0){
		return {
			'type':false,
		}
	}
	if (board[x][y-1] == 0){
		return {
			'type':true,
			'answer':[x,y-1]
		}
	}
	let oppValues = oppositeValues(initValue);

	if (checkInArray(oppValues,board[x][y-1])){
		if (y-2<0){
			return {
				'type':false
			}
		}
		if (board[x][y-2]==0){
			return {
				'type':true,
				'answer':[x,y-2]
			}
		}
		else {
			return {
				'type':false
			}
		}
	}
	return {
		'type':false
	}
}

function checkRight(board,initValue,x,y){
	if (y==8){
		return {
			'type':false,
		}
	}
	if (board[x][y+1] == 0){
		return {
			'type':true,
			'answer':[x,y+1]
		}
	}
	let oppValues = oppositeValues(initValue);

	if (checkInArray(oppValues,board[x][y+1])){
		if (y+2>8){
			return {
				'type':false
			}
		}
		if (board[x][y+2]==0){
			return {
				'type':true,
				'answer':[x,y+2]
			}
		}
		else {
			return {
				'type':false
			}
		}
	}
	return {
		'type':false
	}
}

function checkUp(board,initValue,x,y){
	if (x==0){
		return {
			'type':false,
		}
	}
	if (board[x-1][y] == 0){
		return {
			'type':true,
			'answer':[x-1,y]
		}
	}
	let oppValues = oppositeValues(initValue);
	if (checkInArray(oppValues,board[x-1][y])){
		if (x-2<0){
			return {
				'type':false
			}
		}
		if (board[x-2][y]==0){
			return {
				'type':true,
				'answer':[x-2,y]
			}
		}
		else {
			return {
				'type':false
			}
		}
	}
	return {
		'type':false
	}
}

function checkDown(board,initValue,x,y){
	if (x==15){
		return {
			'type':false,
		}
	}
	if (board[x+1][y] == 0){
		return {
			'type':true,
			'answer':[x+1,y]
		}
	}
	let oppValues = oppositeValues(initValue);
	if (checkInArray(oppValues,board[x+1][y])){
		if (x+2>15){
			return {
				'type':false
			}
		}
		if (board[x+2][y]==0){
			return {
				'type':true,
				'answer':[x+2,y]
			}
		}
		else {
			return {
				'type':false
			}
		}
	}
	return {
		'type':false
	}
}


function init(){
	let table = document.createElement('table');
	for (var i = 0; i < 16; i++){
	    var tr = document.createElement('tr');
	    let boardRow = []
	    for (var j=0; j<9; j++){
	    	var td = document.createElement('td');
		    var inputButton = document.createElement('input');
		    inputButton.type = 'button';
		    let buttonType;
		    if (i==0 && j==4){
		    	buttonType = 3;
		    	inputButton.style.backgroundColor = "red";
		    }
		    else if (i==0){
		    	buttonType = 2;
		    	inputButton.style.backgroundColor = "yellow";
		    }

		    else if (i==1){
		    	buttonType = 1;
		    	inputButton.style.backgroundColor = "green";
		    }

		    else if (i==15 && j==4){
		    	buttonType = 6;
		    	inputButton.style.backgroundColor = "blue";
		    }

		    else if (i==14){
		    	buttonType = 4;
		    	inputButton.style.backgroundColor = "cyan";
		    }

		    else if (i==15){
		    	buttonType = 5;
		    	inputButton.style.backgroundColor = "black";
		    }
		    
		    else {
		    	buttonType = 0;
		    	inputButton.style.backgroundColor = "white";
		    }
		    inputButton.id=i.toString()+','+j.toString();
		    boardRow.push(buttonType);
		    inputButton.onclick = function(){
		    	buttonClicked(this)
		    }
		    td.appendChild(inputButton);
		    tr.appendChild(td);
	    }
	    table.appendChild(tr);
	    board.push(boardRow);
	}
	document.getElementById('game').appendChild(table);
	// board[5][5]=2;
	// board[6][6]=5;
}



function main(){
	init();
}

var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {

		// Get the object type
		var itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};

main()