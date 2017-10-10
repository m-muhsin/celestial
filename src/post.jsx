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
                // if ( res == '') {
                //     jQuery("#post-outer").append(`
                //         <div class="container post-entry">
                //             <div class="card">
                //                 <div class="card-body">
                //                 <h4 class="card-title">404 Page Not Found</h4>
                //                 <p class="card-text">Sorry, the page you are requesting is not found</p>
                //                 </div>
                //             </div>
                //         </div>
                //     `);
                // }
                // jQuery("#post-outer").append(`
                // <div class="container post-entry">
                //     <div class="card">
                //         <div class="card-body">
                //         <h4 class="card-title">${res[0].title.rendered}</h4>
                //         <p class="card-text"><small class="text-muted">${res[0].author_name} &ndash; ${res[0].published_date}</small></p>
                //         <p class="card-text">${res[0].content.rendered}</p>
                //         </div>
                //     </div>
                // </div>
                // `);
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