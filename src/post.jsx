import React from "react";
import LoadingIcon from "./loading-icon.gif";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    var that = this;
    var url = window.location.href.split("/");
    var slug = url.pop() || url.pop();

    fetch(CelestialSettings.URL.api + "posts?slug=" + slug)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(res) {
        that.setState({ post: res[0] });
      });
  }

  renderPosts() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{this.state.post.title.rendered}</h4>
          <p className="card-text">
            <small className="text-muted">
              {this.state.post.author_name} &ndash;{" "}
              {this.state.post.published_date}
            </small>
          </p>
          {this.state.post.featured_image_src ? (
            <img
              className="featured-image"
              src={this.state.post.featured_image_src}
              alt="featured image"
            />
          ) : null}
          <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: this.state.post.content.rendered
            }}
          />
        </div>
      </div>
    );
  }

  renderEmpty() {
    return (
      <img src={LoadingIcon} alt="loader gif" className="active" id="loader" />
    );
  }

  render() {
    console.log("this.state.post", this.state.post);
    return (
      <div className="container post-entry">
        {this.state.post.title ? this.renderPosts() : this.renderEmpty()}
      </div>
    );
  }
}

export default Post;
