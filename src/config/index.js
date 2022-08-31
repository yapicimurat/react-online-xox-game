import Header from "../components/includes/Header/Header";
import Content from "../components/includes/Content/Content";
import Footer from "../components/includes/Footer/Footer";
import Game from "../components/game/Game";
import InviteFriend from "../components/game/InviteFriend";
const CONFIG = {
    ROUTES: [
        {
            path: "/",
            exact: true,
            element: <>
                <Header/>
                <Content content={<Game/>}/>
                <Footer/>
            </>
        },
        {
            path: "/invite-friend",
            exact: true,
            element: <>
                <Header/>
                <Content content={<InviteFriend/>}/>
                <Footer/>
            </>
        }
    ],
    //DİL AYARLARI
    LANGUAGES: {
        TR: {

        }
    }
};


export default CONFIG;