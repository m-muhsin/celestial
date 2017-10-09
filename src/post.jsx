import React from 'react';

class Post extends React.Component {

    componentDidMount() {

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
            if ( res == '') {
                jQuery("#post-outer").append(`
                    <div class="container post-entry">
                        <div class="card">
                            <div class="card-body">
                            <h4 class="card-title">404 Page Not Found</h4>
                            <p class="card-text">Sorry, the page you are requesting is not found</p>
                            </div>
                        </div>
                    </div>
                `);
            }
            jQuery("#post-outer").append(`
                <div class="container post-entry">
                    <div class="card">
                        <div class="card-body">
                        <h4 class="card-title">${res[0].title.rendered}</h4>
                        <p class="card-text"><small class="text-muted">${res[0].author_name} &ndash; ${res[0].published_date}</small></p>
                        <p class="card-text">${res[0].content.rendered}</p>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    render() {
        return (
            <div id="post-outer"></div>
        );
    }
}

export default Post;