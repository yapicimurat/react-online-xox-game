import "./game.css";
import Cell from "./Cell";
function Row({boardState, isOnline, isGameStarted, isGameFinished,turn, row}){
    return (
        <div className="row">
            <Cell row={row} col="0"/>
            <Cell row={row} col="1"/>
            <Cell row={row} col="2"/>
        </div>
    );
}
export default Row;