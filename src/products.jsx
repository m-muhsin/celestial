import React from "react";
import { Link } from "react-router-dom";
import LoadingIcon from "./loading-icon.gif";
import Placeholder from "./placeholder.jpg";
import NotFound from "./not-found";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      page: 0,
      getProducts: true,
      controller: false
    };
    this.getMoreProducts = this.getMoreProducts.bind(this);
  }

  componentWillUnmount() {
    this.getMoreProducts = null;
  }

  componentDidMount() {
    // init ScrollMagic Controller
    this.controller = new ScrollMagic.Controller();

    // build scene
    const scene = new ScrollMagic.Scene({
      triggerElement: "#colophon",
      triggerHook: "onEnter"
    })
      .addTo(this.controller)
      .on("enter", e => {
        if (this.state.getProducts && this.getMoreProducts !== null) {
          this.getMoreProducts();
        }
      });
  }

  getMoreProducts() {
    let totalPages;

    this.setState({ page: this.state.page + 1 });

    fetch(
      CelestialSettings.woo.url +
        "products?page=" +
        this.state.page +
        "&consumer_key=" +
        CelestialSettings.woo.consumer_key +
        "&consumer_secret=" +
        CelestialSettings.woo.consumer_secret
    )
      .then(response => {
        for (const pair of response.headers.entries()) {
          // getting the total number of pages
          if (pair[0] == "x-wp-totalpages") {
            totalPages = pair[1];
          }

          if (this.state.page >= totalPages) {
            this.setState({ getProducts: false });
          }
        }
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then(results => {
        const allProducts = this.state.products.slice();
        results.forEach(function(single) {
          allProducts.push(single);
        });
        this.setState({ products: allProducts });
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  }

  componentDidUpdate() {
    const fadeInController = new ScrollMagic.Controller();
    document
      .querySelectorAll(".container .col-md-4.card-outer")
      .forEach(function(item) {
        const ourScene2 = new ScrollMagic.Scene({
          triggerElement: item.children[0],
          reverse: false,
          triggerHook: 1
        })
          .setClassToggle(item, "fade-in")
          .addTo(fadeInController);
      });
  }

  renderProducts() {
    return this.state.products.map((product, i) => {
      return (
        <article className="col-md-4 card-outer" key={i}>
          <div className="card">
            <div className="img-outer">
              <Link to={product.slug}>
                <img
                  className="card-img-top"
                  src={product.images ? product.images[0].src : Placeholder}
                  alt="Featured Image"
                />
              </Link>
            </div>
            <div className="card-body">
              <h4 className="card-title">
                <Link to={product.slug}>{product.name}</Link>
              </h4>
              <p className="card-text">
                <small className="text-muted">$ {product.price}</small>
              </p>
              <p dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </article>
      );
    });
  }

  renderEmpty() {
    return <NotFound />;
  }

  render() {
    return (
      <div className="container post-entry">
        {this.state.products ? this.renderProducts() : this.renderEmpty()}
        <img src={LoadingIcon} alt="loader active gif" id="loader" />
      </div>
    );
  }
}

export default Products;
