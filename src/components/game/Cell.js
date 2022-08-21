import "./game.css";

function Cell({stoneSymbol}){
    return (
        <button className="stone">{stoneSymbol}</button>
    );
}

function cellClick(){

    console.log("test...");


}



export default Cell;