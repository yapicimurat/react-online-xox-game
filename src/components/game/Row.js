import "./game.css";
import Cell from "./Cell";
function Row(){
    return (
        <div className="row">
            <Cell/>
            <Cell/>
            <Cell/>
        </div>
    );
}

export default Row;