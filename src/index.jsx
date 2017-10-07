import React from 'react';
import { render } from 'react-dom';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

// Load the Sass file
require('./style.scss');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.getMorePosts = this.getMorePosts.bind(this);
        this.state = {
            posts: {},
            page: 0,
            getPosts: true
        }
    }

    componentDidMount() {
        var that = this;
        window.onbeforeunload = function () { window.scrollTo(0, 0); }

        // init controller
        var controller = new ScrollMagic.Controller();

        // build scene
        var scene = new ScrollMagic.Scene({ triggerElement: "#posts-here", triggerHook: "onEnter" })
            .addTo(controller)
            .on("enter", function (e) {
                if (that.state.getPosts) {
                    that.getMorePosts();
                }
            });
    }

    getMorePosts() {
        var that = this;
        var totalPages;
        // adding a loader
        jQuery("#loader").addClass("active");
        this.setState({ page: this.state.page + 1 });

        fetch("http://localhost/celestial/wp-json/wp/v2/posts/?page=" + this.state.page)
            .then(function (response) {
                for (var pair of response.headers.entries()) {
                    if (pair[0] == 'x-wp-totalpages') {
                        totalPages = pair[1];
                    }
                    if (that.state.page == totalPages) {
                        that.state.getPosts = false;
                    }
                }
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (results) {
                jQuery.each(results, function (i, post) {
                        jQuery(".card-group")
                            .append(
                                `<div class="col-sm-4">
                                    <div class="card">
                                        <img class="card-img-top" src=${post.featured_image_src ? post.featured_image_src : Placeholder} alt="Featured Image" />
                                        <div class="card-body">
                                            <h4 class="card-title"><a href="${post.link}">${post.title.rendered}</a></h4>
                                            <p class="card-text"><small class="text-muted">${post.author_name} &ndash; ${post.published_date}</small></p>
                                            <p class="card-text">${post.excerpt.rendered}</p>
                                        </div>
                                    </div>
                                </div>`
                            );
                        // });
                    
                    
                    if (results[0] == null) {
                        jQuery("#loader").remove();
                    }
                    // removing loader
                    jQuery("#loader").removeClass("active");
                    
                    var controller2 = new ScrollMagic.Controller();
                    // loop through each .posts-container .post-excerpt element
                    jQuery('.card-group .col-sm-4').each(function () {

                        // build a scene
                        var ourScene2 = new ScrollMagic.Scene({
                            triggerElement: this.children[0],
                            reverse: false,
                            triggerHook: 1
                        })
                            .setClassToggle(this, 'fade-in') 
                            .addTo(controller2);
                    });
                });
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                jQuery("#loader").remove();
            });
    }

    render() {
        return (
            <div id="content">
                <div className="container">
                    <h1 className="posts-title">Posts</h1>
                    <div className="card-group"></div>
                    <div id="posts-here"></div>
                    <div id="loader"><img src={LoadingIcon} /></div>
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById("app"));