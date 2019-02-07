import React from "react";
import NotFound from "./not-found";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const url = window.location.href.split("/");
    const slug = url.pop() || url.pop();

    fetch(`${CelestialSettings.URL.api}pages?slug=${slug}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({ page: res[0] });
      });
  };

  renderPage() {
    if (this.state.page.title) {
      return (
        <article className="card">
          <div className="card-body">
            <h4 className="card-title">{this.state.page.title.rendered}</h4>
            <p
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: this.state.page.content.rendered
              }}
            />
          </div>
        </article>
      );
    } else {
      this.renderEmpty();
    }
  }

  renderEmpty() {
    return <NotFound />;
  }

  render() {
    console.log("this.state.page", this.state.page);
    return (
      <div className="container post-entry">
        {this.state.page ? this.renderPage() : this.renderEmpty()}
      </div>
    );
  }
}

export default Page;
