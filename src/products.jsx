import React from 'react';
import { Link } from 'react-router-dom';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';
import NotFound from './not-found';

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            page: 0,
            getProducts: true,
            controller: false
        }
        this.getMoreProducts = this.getMoreProducts.bind(this);
    }

    componentWillUnmount() {
        this.getMoreProducts = null;
    }

    componentDidMount() {
        var that = this;

        // init ScrollMagic Controller
        that.state.controller = new ScrollMagic.Controller();

        // build scene
        var scene = new ScrollMagic.Scene({ triggerElement: "#colophon", triggerHook: "onEnter" })
            .addTo(that.state.controller)
            .on("enter", function (e) {
                if (that.state.getProducts && that.getMoreProducts !== null) {
                    that.getMoreProducts();
                }
            });
    }

    getMoreProducts() {
        var that = this;
        var totalPages;

        this.setState({ page: this.state.page + 1 });

        fetch(CelestialSettings.woo.url + "products?page=" + this.state.page + "&consumer_key=" + CelestialSettings.woo.consumer_key + "&consumer_secret=" + CelestialSettings.woo.consumer_secret)
            .then(function (response) {
                for (var pair of response.headers.entries()) {

                    // getting the total number of pages
                    if (pair[0] == 'x-wp-totalpages') {
                        totalPages = pair[1];
                    }

                    if (that.state.page >= totalPages) {
                        that.setState({ getProducts: false })
                    }
                }
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                
                return response.json();
            })
            .then(function (results) {
                var allProducts = that.state.products.slice();
                results.forEach(function (single) {
                    allProducts.push(single);
                })
                that.setState({ products: allProducts });

            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });

    }

    componentDidUpdate() {
        var fadeInController = new ScrollMagic.Controller();
        document.querySelectorAll('.container .col-md-4.card-outer').forEach(function (item) {
            var ourScene2 = new ScrollMagic.Scene({
                triggerElement: item.children[0],
                reverse: false,
                triggerHook: 1
            })
                .setClassToggle(item, 'fade-in')
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
                            <p dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                    </div>
                </div>
            )
        });
    }

    renderEmpty() {
        return (
            <NotFound />
        );
    }

    render() {
        return (
            <div className="container post-entry">
                {this.state.products ?
                    this.renderProducts() :
                    this.renderEmpty()
                }
                <img src={LoadingIcon} alt="loader active gif" id="loader" />
            </div>
        );
    }

}

export default Products;