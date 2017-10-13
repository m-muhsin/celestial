import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './post-list';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.getMorePosts = this.getMorePosts.bind(this);
        this.state = {
            posts: [],
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
        var scene = new ScrollMagic.Scene({ triggerElement: "#colophon", triggerHook: "onEnter" })
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

        fetch(CelestialSettings.URL.api + "/posts/?page=" + this.state.page)
            .then(function (response) {
                for (var pair of response.headers.entries()) {
                    if (pair[0] == 'x-wp-totalpages') {
                        totalPages = pair[1];
                    }

                    if (that.state.page >= totalPages) {
                        that.setState({ getPosts: false })
                    }
                }
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (results) {
                var allPosts = that.state.posts.slice();
                results.forEach(function (single) {
                    allPosts.push(single);
                })
                that.setState({ posts: allPosts });
                jQuery("#loader").removeClass("active");

            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                jQuery("#loader").remove();
            });
    }

    componentDidUpdate() {
        var controller2 = new ScrollMagic.Controller();
        jQuery('.posts-container .col-sm-4.card-outer').each(function () {

            // build a scene
            var ourScene2 = new ScrollMagic.Scene({
                triggerElement: this.children[0],
                reverse: false,
                triggerHook: 1
            })
                .setClassToggle(this, 'fade-in')
                .addTo(controller2);
        });
    }

    render() {
        if (this.state.posts.length == 0) {
            return null;
        }
        return (
            <div id="content">
                <div className="container">
                    <h1 className="posts-title">Posts</h1>
                    <PostList posts={this.state.posts} />
                </div>
                <div id="below-posts"></div>
                <img src={LoadingIcon} alt="loader gif" id="loader" />
            </div>
        );
    }
}

export default Posts;