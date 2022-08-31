import {setBoardState, setGameState} from "../../features/game";
import {useDispatch} from "react-redux";

function Result({theWinner}){

    const dispatch = useDispatch();

    const playAgain = () => {
        dispatch(setGameState({isGameStarted: false, isGameFinished: false, theWinner: null, isOnline : false}));
    };

    const resultMessage = () => {
      if(theWinner !== 'XO')
          return (
              <p>Tebriklerrrrrrrr! Kazanan <b><i>{theWinner}</i></b> Oyuncusu</p>
          );
      return (
          <p>Maalesef bu oyunda kazanan olmadı. Berabere!</p>
      );
    };

    return (
        <div className="message">
            <div className="message-title">
                <h3>Oyun Bitti!</h3>
            </div>
           <div className="message-content">
               {resultMessage()}
               <p>Tekrar oynamak için "Tekrar Oyna" butonuna tıklayınız.</p>
           </div>
            <div className="message-operation">
                <button onClick={() => {playAgain()}} className="default-button again">Tekrar Oyna!</button>
            </div>
        </div>
    );
}

export default Result;