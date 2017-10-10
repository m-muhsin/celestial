import React from 'react';

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        var that = this;
        var url = window.location.href.split('/');
        var slug = url.pop() || url.pop();

        fetch(CelestialSettings.URL.api + "/posts?slug=" + slug)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function (res) {
            that.setState({ post: res[0] })
        });
    }

    renderPosts() {
        return (
            <div className="container post-entry">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.state.post.rendered_title}</h4>
                        <p className="card-text"><small className="text-muted">{this.state.post.author_name} &ndash; {this.state.post.published_date}</small></p>
                        <p className="card-text">{this.state.post.rendered_content}</p>
                    </div>
                </div>
            </div>
        )
    }

    renderEmpty() {
        return (
            <div>EMPTY</div>
        )
    }

    render() {
        return (
            <div id="content">
                {this.state.post ?
                    this.renderPosts() :
                    this.renderEmpty()
                }
            </div>
        );
    }
}

export default Post;