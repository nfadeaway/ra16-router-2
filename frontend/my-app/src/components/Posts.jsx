import React, {useRef} from 'react';
import Post from './Post.jsx';
import {Link} from 'react-router-dom';

const Posts = (props) => {
  const postsRef = useRef(null);

  return (
    <><Link to={'/posts/new'}>
        <div className="add-post-btn">Создать пост</div>
      </Link>
      <div ref={postsRef} className="posts">
        {props.posts.length > 0 && props.posts.map((post) =>
          <Link to={`/posts/${post.id}`}>
            <Post post={post} key={post.id} mode="all-posts"/>
          </Link>
        )}
      </div>
    </>
  );
};

export default Posts;