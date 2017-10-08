import React from 'react';

class Post extends React.Component {

    componentDidMount() {
        fetch("http://localhost/celestial/wp-json/wp/v2/posts?slug=hello-world")
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
                jQuery("#content").append(`
                    <div class="container post-entry">
                        <div class="card">
                            <div class="card-body">
                            <h4 class="card-title">Card title</h4>
                            <p class="card-text"><small class="text-muted">${res[0].author_name} &ndash; ${res[0].published_date}</small></p>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                `);
            });
    }

    render() {
        var parts = window.location.href.split('/');
        var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash

        return (
            <div id="content"></div>

        );
    }

}

export default Post;