//components
import Row from "./Row";

//Oyun tahtası;
/*
içerisinde Cell componentleri 3x3 olarak sıralanacaktır...
*/
function Board(){

    return (
        <div className="board">
            <Row row="0"/>
            <Row row="1"/>
            <Row row="2"/>
        </div>
    );
}

export default Board;