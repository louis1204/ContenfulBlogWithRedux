import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import * as Markdown from 'react-markdown'
import ContentfulUtil from '../utils/ContentfulUtil'

class BlogPost extends React.Component {
  state = {
    date: "",
    title: "",
    icon: "",
    content: ""
  };

  setPost = post => {
    if (post) {
      this.setState({
        date: post.date,
        title: post.title,
        icon: post.icon,
        content: post.content
      });
    }
  };

  componentDidMount() {
    const path = this.props.match.params.path;
    ContentfulUtil.fetchPostByPathName(path)
        .then((response) => this.setPost(response.items[0].fields));
  };

  render = () => (
    <>
      <Link to="/blog">Back to Blog</Link>
      <p>
        {moment(this.state.date).calendar(null, {
          sameDay: '[Today]',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'MMM Do YYYY'
        })}
      </p>
      <img src={this.state.icon} style={{ maxHeight: 200 }} />
      <h1>{this.state.title}</h1>
      <Markdown source={this.state.content} />
    </>
  );
}

export default BlogPost
