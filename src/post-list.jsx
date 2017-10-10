// External dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import Placeholder from './placeholder.jpg';

class PostList extends React.Component {

    renderPosts() {
        return this.props.posts.map((post, i) => {
            return (
                <div className="col-sm-4 card-outer" key={i}>
                    <div className="card">
                        <img className="card-img-top" src={post.featured_image_src ? post.featured_image_src : Placeholder} alt="Featured Image" />
                        <div className="card-body">
                            <h4 className="card-title"><Link to={post.slug}>{post.title.rendered}</Link></h4>
                            <p className="card-text"><small className="text-muted">{post.author_name} &ndash; {post.published_date}</small></p>
                            <p>{jQuery(post.excerpt.rendered).text()}</p>
                        </div>
                    </div>
                </div>
            )
        });
    }

    renderEmpty() {
        return (
            <div>EMPTY</div>
        )
    }

    render() {
        if (!this.props.posts) {
            return null;
        }

        return (
            <div>
                {this.props.posts.length ?
                    this.renderPosts() :
                    this.renderEmpty()
                }
            </div>
        );
    }
}

export default PostList;
