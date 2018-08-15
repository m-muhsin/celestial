import React from 'react';
import NotFound from './not-found';

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: {}
        }
    }

    componentDidMount() {
        var that = this;
        var url = window.location.href.split('/');
        var slug = url.pop() || url.pop();

        fetch(CelestialSettings.URL.api + "pages?slug=" + slug)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
                that.setState({ page: res[0] })
            });
    }

    renderPosts() {
        if(this.state.page.title) {
            return (
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.state.page.title.rendered}</h4>
                        <p className="card-text" dangerouslySetInnerHTML={{ __html: this.state.page.content.rendered }}  />
                    </div>
                </div>
            )
        } else {
            this.renderEmpty();
        }
    }

    renderEmpty() {
        return (
            <NotFound />
        )
    }

    render() {
        console.log('this.state.page',this.state.page)
        return (
            <div className="container post-entry">
                {this.state.page ?
                    this.renderPosts() :
                    this.renderEmpty()
                }
            </div>
        );
    }
}

export default Post;