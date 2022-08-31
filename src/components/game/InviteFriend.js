import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {SOCKET} from "../../app/socket";
import {setGameState, setOnline, setShortCode, setSocket} from "../../features/game";
import {useNavigate} from "react-router-dom";
function InviteFriend(){

    const {socket, shortCode} = useSelector(state => state.gameReducer);
    const dispatch = useDispatch();

    const [friendShortCode, setFriendShortCode] = useState("");
    const [gameRequest, setGameRequest] = useState({isExist: false, targetShortCode: null})

    const navigate = useNavigate();

    useEffect(() => {

        const socket = io.connect(SOCKET.URL);
        socket?.on('connect', () => {
            dispatch(setSocket({socket: socket}))
        });

        socket?.on(SOCKET.EVENTS.CLIENT_SHORT_CODE, data => {
            dispatch(setShortCode({shortCode: data.shortCode}))
        });

        socket?.on(SOCKET.EVENTS.CLIENT_RECEIVED_GAME_REQUEST, data => {
            setGameRequest({isExist: true, targetShortCode: data.targetShortCode});
        });

        socket?.on(SOCKET.EVENTS.CLIENT_GAME_CREATED, data => {
            dispatch(setOnline({isOnline : true, online: data.gameState}));
            dispatch(setGameState({isGameStarted: true, isGameFinished: false}));

            navigate("/");
        });

    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        if(friendShortCode === "") return;
        else if(friendShortCode === shortCode) return;

        socket.emit(SOCKET.EVENTS.SERVER_SEND_GAME_REQUEST, {
            senderShortCode : shortCode,
            targetShortCode : friendShortCode
        });
        alert("Arkadaşına oyun daveti gönderildi....");

    };

    const onChangeEvent = (e) =>{
        switch(e.target.name)
        {
            case 'friendShortCode':
                setFriendShortCode(e.target.value);
                break;
        }
    };

    const acceptRequest = () => {
        socket.emit(SOCKET.EVENTS.SERVER_REQUEST_ACCEPTED, {
            userSocketIdWhoAccepted: socket.id,
            userShortCodeWhoAccepted: shortCode,
            userShortCodeWhoRequested: gameRequest.targetShortCode
        });
    };

    const declineRequest = () => {
        socket.emit(SOCKET.EVENTS.SERVER_REQUEST_DECLINED, {
            userWhoReceivedRequestId : socket.id
        });
    };

    const requests = () => {
        if(gameRequest.isExist === false) return null;

        return (
            <>
                <div className="received-game-request">
                    <p>Arkadaşın seni oyuna davet ediyor...</p>
                    <p>Kabul etmek ister misin?</p>
                    <button onClick={acceptRequest} className="default-button received-request-button">Evet</button><span><button onClick={declineRequest()} className="default-button received-request-button">Hayır</button></span>
                </div>
            </>
        );
    };

    return (
        <div className="invite-friend">
            <div className="message">
                <div className="message-title">
                    <h3>Arkadaşınla Birlikte Online Oyna!</h3>
                </div>
                <div className="message-content">
                    <p>Oyun Davet Kodun</p>
                    <p title="Bu kodu arkadaşınla paylaş ve onunla birlikte online oyna">{(shortCode === null) ? "Yükleniyor..." : shortCode}</p>
                    <form onSubmit={submitForm}>
                        <p>Arkadaşının Davet Kodu</p>
                        <input name="friendShortCode" type="text" value={friendShortCode} onChange={onChangeEvent}/>
                        <button type="submit" className="default-button send-request">İstek Yolla!</button>
                    </form>
                    {requests()}
                </div>
            </div>
        </div>
    );
}

export default InviteFriend;