import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <div className="container">
        <header id="masthead" className="site-header" role="banner">
            <nav className="navbar navbar-expand-lg navbar-light " >
                <h1 className="site-title"><Link to={CelestialSettings.path} >Celestial</Link></h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link active" to={CelestialSettings.path} >Home <span className="sr-only">(current)</span></Link>
                        <Link className="nav-item nav-link" to={CelestialSettings.path + "products/"} >Products</Link>
                    </div>
                </div>
            </nav >
        </header>
    </div>
);

export default Header;