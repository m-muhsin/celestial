import React from 'react';
import { Link } from 'react-router-dom';

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
        var controller2 = new ScrollMagic.Controller();
        // loop through each .posts-container .post-excerpt element
        jQuery('.container .col-sm-4.card-outer').each(function () {

            // build a scene
            var ourScene2 = new ScrollMagic.Scene({
                triggerElement: this.children[0],
                reverse: false,
                triggerHook: 1
            })
                .setClassToggle(this, 'fade-in') // add class to project01
                .addTo(controller2);
        });
    }

    renderProducts() {
        return this.state.products.map((product, i) => {
            return (
                <div className="col-sm-4 card-outer" key={i}>
                    <div className="card">
                        <div className="img-outer">
                            <img className="card-img-top" src={product.images ? product.images[0].src : Placeholder} alt="Featured Image" />
                        </div>
                        <div className="card-body">
                            <h4 className="card-title"><a href="#">{product.name}</a></h4>
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
            <div>EMPTY</div>
        )
    }

    render() {
        return (
            <div id="content">
                <div className="container">
                    {this.state.products ?
                        this.renderProducts() :
                        this.renderEmpty()
                    }
                </div>
            </div>
        );
    }

}

export default Products;