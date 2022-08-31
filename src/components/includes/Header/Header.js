//main css
import "../../../style.css";


//special css
import "./header.css";

import {Link} from "react-router-dom";

function Header(){

    return (
        <header>
            <div className="header-top">
                <h1> XOX OYUNU</h1>
            </div>
            <div className="header-menu">
                <div>
                    <Link to="/">ANASAYFA</Link>
                </div>
                <div>
                    <Link to="/invite-friend">ARKADAŞINI DAVET ET</Link>
                </div>
            </div>
        </header>
    );


}

export default Header;