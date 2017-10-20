import React from 'react';
import { Link } from 'react-router-dom';
import Placeholder from './placeholder.jpg';

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        var that = this;
        var url = window.location.href.split('/');
        var slug = url.pop() || url.pop();

        fetch(CelestialSettings.woo.url + "products?consumer_key=" + CelestialSettings.woo.consumer_key + "&consumer_secret=" + CelestialSettings.woo.consumer_secret)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
                that.setState({ products: res })
            });
    }

    componentDidUpdate() {
        var fadeInController = new ScrollMagic.Controller();
        jQuery('.container .col-md-4.card-outer').each(function () {
            var ourScene2 = new ScrollMagic.Scene({
                triggerElement: this.children[0],
                reverse: false,
                triggerHook: 1
            })
                .setClassToggle(this, 'fade-in')
                .addTo(fadeInController);
        });
    }

    renderProducts() {
        return this.state.products.map((product, i) => {
            return (
                <div className="col-md-4 card-outer" key={i}>
                    <div className="card">
                        <div className="img-outer">
                            <Link to={product.slug}>
                                <img className="card-img-top" src={product.images ? product.images[0].src : Placeholder} alt="Featured Image" />
                            </Link>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title"><Link to={product.slug}>{product.name}</Link></h4>
                            <p className="card-text"><small className="text-muted">$ {product.price}</small></p>
                            <p>{jQuery(product.description).text()}</p>
                        </div>
                    </div>
                </div>
            )
        });
    }

    renderEmpty() {
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">404 Page Not Found!</h4>
                    <p className="card-text">The page you requested does not exist.</p>
                    <p className="card-text"><Link to={CelestialSettings.path}>Return to homepage</Link></p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container post-entry">
                {this.state.products ?
                    this.renderProducts() :
                    this.renderEmpty()
                }
            </div>
        );
    }

}

export default Products;