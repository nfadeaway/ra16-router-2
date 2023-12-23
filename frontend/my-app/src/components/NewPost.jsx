import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';

const NewPost = (props) => {
  const postRef = useRef(null);
  const navigate = useNavigate()

  async function saveNewPost() {
    const content = postRef.current.querySelector('.new-content').value
    const body = {content: content}
    let response = await fetch(
      `http://localhost:7071/posts`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    response = await response;
    if (response.status === 204) {
      props.setUpdatingFlag(1)
      navigate("/")
    }
  }

  function cancelAddPost() {
    navigate("/")
  }

  return (
    <div className="post" ref={postRef}>
      <div className="post-header">
        <div className="name">Участник сообщества</div>
        <span className="material-symbols-outlined cancel-btn" onClick={cancelAddPost}>close</span>
      </div>
      <input type="text" className="new-content"></input>
      <div className="buttons">
        <div className="save-new-post" onClick={saveNewPost}>Опубликовать</div>
      </div>
    </div>
  )
};

export default NewPost;