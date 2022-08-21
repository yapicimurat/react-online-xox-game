//components
import Cell from "./Cell";
import Row from "./Row";

//Oyun tahtası;
/*
içerisinde Cell componentleri 3x3 olarak sıralanacaktır...
*/
function Board(){


    return (
        <div className="board">
            <Row/>
            <Row/>
            <Row/>
        </div>
    );
}

export default Board;