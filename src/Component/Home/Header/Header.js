import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import logo from '../../../images/logo.svg'

const Header = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link class="navbar-brand" to="#"><img src={logo} alt="" /></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                        <Link class="nav-link active mr-5" aria-current="page" to="/home">Home</Link>
                        <Link class="nav-link active mr-5" to="#">About</Link>
                        <Link class="nav-link active mr-5" to="#">Contact</Link>
                        {
                            !loggedIn.email && <Link to="/login"><button type="button" className="btn btn-success mt-1">Login</button></Link>
                        }
                        <Link className="nav-link active" style={{ fontWeight: "800", color: "" }} to="#">{loggedIn.email || loggedIn.displayName}</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;