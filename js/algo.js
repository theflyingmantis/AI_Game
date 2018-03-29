// JSON.parse(JSON.stringify(a));
function TERMINAL_TEST(board1)
{
    let kings = 0;
    for (let i=0;i<board1.length;i++){
        for(let j=0;j<board1[i].length;j++){
            if(board1[i][j]==3){
                kings-=1;
            }
            if (board1[i][j]==6){
                kings+=1;
            }
        }
    }
    if (kings != 0){
        return true;
    }
    return false;
    
}

function turnPieceBoard(board1,x,y){
    board1[x][y]=reversePiece(board1[x][y]);
}



function RESULT(board1,act){
    let boardCopy = JSON.parse(JSON.stringify(board1));
    let x1=act[0][0];
    let y1=act[0][1];
    let x2=act[1][0];
    let y2=act[1][1];
    if (x1==x2){
        if (y1-y2==2){
            turnPieceBoard(boardCopy,x1,y1-1)
        }
        if (y2-y1==2){
            turnPieceBoard(boardCopy,x1,y1+1)
        }
    }
    if (y1==y2){
        if (x1-x2==2){
            turnPieceBoard(boardCopy,x1-1,y1);
        }
        if (x2-x1==2){
            turnPieceBoard(boardCopy,x1+1,y1);
        }
    }
    if (x2-x1==2 &&y2-y1==2){
        turnPieceBoard(boardCopy,x2-1,y2-1);
    }
    if (x1-x2==2 &&y2-y1==2){
        turnPieceBoard(boardCopy,x2+1,y2-1);
    }
    if (x2-x1==2 &&y1-y2==2){
        turnPieceBoard(boardCopy,x2-1,y2+1);
    }
    if (x1-x2==2 &&y1-y2==2){
        turnPieceBoard(boardCopy,x2+1,y2+1);
    }
    boardCopy[x2][y2]=boardCopy[x1][y1];
    boardCopy[x1][y1]=0;
    return boardCopy;
}


function CUTOFF_TEST(board1,d){
    if(TERMINAL_TEST(board1)||d>4)
        return true;
    return false;
}

function ALPHA_BETA_SEARCH(boardCopy)
{
    let v = MAX_VALUE(boardCopy,Number.MIN_VALUE,Number.MAX_VALUE, 4)
    return v;
}



function UTILITY(board1)
{
    let value = 0;
    value += piece_heuristic(board1) + column_heuristic(board1) + row_heuristic(board1) + number_of_moves(board1);    
    return value;
}


function MAX_VALUE(board1, a, b, depth)
{    
    if (CUTOFF_TEST(board1,depth)) {return {
            'value':UTILITY(board1),
            'move':[]
        }
    }
    let v = Number.MIN_VALUE;
    console.log(depth);
    let act = ACTIONS("bot",board1);
    let bestMove = []
    // console.log(act);
    for (let i=0;i<act.length;i++) {
        v = Math.max(v,MIN_VALUE(RESULT(board1,act[i]),a,b,depth+1)['value']);
        if(v>=b) return {
            'value':v,
            'move':act[i]
        };
        if (v>a){
            a = v;
            bestMove = act[i];
        }
        a = Math.max(a,v);
    }
    return {
        'value':v,
        'move':bestMove
    };
}

function MIN_VALUE(board1, a, b, depth)
{
    if (CUTOFF_TEST(depth)){
        return {
            'value':UTILITY(board1),
            'move':[]
        };
    }
    let v = Number.MAX_VALUE;
    let act=ACTIONS("human",board1);
    let bestMove = [];
    for(let i=0;i<act.length;i++){
        v = Math.min(v,MAX_VALUE(RESULT(board1,act[i]),a,b,depth+1)['value']);
        if(v<=a) return {
            'value':v,
            'move':act[i]
        };
        if (v<b){
            b = v;
            bestMove = act[i];
        }
    }
    return {
        'value':v,
        'move':bestMove
    }
}


function ACTIONS(v,board1){
    let movesArray = [];
    for (let i=0;i<board1.length;i++){
        for(let j=0;j<board1[i].length;j++){
            if (v=="bot"){
                if (board1[i][j]==1||board1[i][j]==2||board1[i][j]==3){
                    let m = Moves(board1,i,j);
                    for (let k=0;k<m.length;k++){
                        movesArray.push(m[k]);
                    }
                }
            }
            else{
                if (board1[i][j]==4||board1[i][j]==5||board1[i][j]==6){
                    let m = Moves(board1,i,j);
                    for (let k=0;k<m.length;k++){
                        movesArray.push(m[k]);
                    }
                }
            }
        }
    }
    // console.log(movesArray);
    return movesArray;
}





function piece_heuristic(board1)
{
    let sum1=0
    let sum2=0
    // console.log(board1);
    for(let i=0;i<board1.length;i++)
    {
        for(let j=0;j<board1[i].length;j++)
        {
            if(board1[i][j]==1)
                sum1++
            if(board1[i][j]==4)
                sum2++
            if(board1[i][j]==2)
                sum1= sum1+2
            if(board1[i][j]==5)
                sum2 = sum2+2;
            if(board1[i][j]==3)
                sum1 = sum1+1000;
            if(board1[i][j]==6)
                sum2 = sum2+1000;
        }
    }
    return sum1-sum2;
}


function column_heuristic(board1)
{
    let sum1=0
    let sum2=0
    for(let i=0;i<16;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(board1[i][j]==1||board1[i][j]==2||board1[i][j]==3)
            {
                if(j>4)
                    sum1 = sum1 + 5 + j - 8;
                else
                    sum1 = sum1 + 5 - j; 
            }
            if(board1[i][j]==4||board1[i][j]==5||board1[i][j]==6)
                if(j>4)
                    sum2 = sum2 + 5 + j - 8;
                else
                    sum2 = sum2 + 5 - j; 
        }
    }
    return sum1-sum2;
}

function row_heuristic(board1)
{
    let sum1=0
    let sum2=0
    for(let i=0;i<16;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(board1[i][j]==1||board1[i][j]==2||board1[i][j]==3)
            {
                if(i>7)
                    sum1 = sum1 + 8 + i - 15;
                else
                    sum1 = sum1 + 8 - i; 
            }
            if(board1[i][j]==4||board1[i][j]==5||board1[i][j]==6)
                if(i>7)
                    sum2 = sum2 + 8 + i - 15;
                else
                    sum2 = sum2 + 8 - i; 
        }
    }
    return sum1-sum2;
}


function number_of_moves(board1){
    let p1Moves = 0;
    let p2Moves = 0;
    for (let i=0;i<board1.length;i++){
        for(let j=0;j<board1[i].length;j++){
            if (board1[i][j]==1||board1[i][j]==2||board1[i][j]==3){
                p1Moves+=Moves(board1,i,j).length;
            }
            if (board1[i][j]==4||board1[i][j]==5||board1[i][j]==6){
                p2Moves+=Moves(board1,i,j).length;
            }
        }
    }
    return p1Moves-p2Moves;
}


