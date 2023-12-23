import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const Post = (props) => {
  const postRef = useRef(null);
  const navigate = useNavigate()
  const [singlePost, setSinglePost] = useState({})

  const renderPost = (post) => {
    return (
      <div className="post" ref={postRef} data-id={post.id}>

        <div className="edit-post-header hidden">
          <div>Редактировать публикацию</div>
          <span className="material-symbols-outlined cancel-btn" onClick={editModeToggle}>close</span>
        </div>

        <div className="post-header">
          <div className="name">Участник сообщества</div>
          <div className="created">{post.created}</div>
        </div>
        <div className="content">{post.content}</div>
        <input type="text" className="content-edit hidden"></input>

        {props.mode === 'single' &&
          <div className="buttons">
            <div className="edit-post" onClick={editModeToggle}>Изменить</div>
            <div className="delete-post" onClick={deletePost}>Удалить</div>
            <div className="save-edit-post hidden" onClick={saveEditPost}>Сохранить</div>
          </div>
        }

      </div>
    )
  }

  async function getPostData(id) {
    let response = await fetch(`http://localhost:7071/posts/${id}`)
    response = await response.json();
    setSinglePost({
      id: response.post.id,
      created: response.post.created,
      content: response.post.content
    })
  }

  async function deletePost() {
    const id = postRef.current.dataset.id
    let response = await fetch(
      `http://localhost:7071/posts/${id}`,{method: 'DELETE'})
    response = await response;
    if (response.status === 204) {
      props.setUpdatingFlag(1)
      navigate("/")
    } else {
      console.log('Ошибка')
    }
  }

  async function saveEditPost() {
    const id = postRef.current.dataset.id
    const content = postRef.current.querySelector('.content-edit').value
    const body = {content: content}
    let response = await fetch(
      `http://localhost:7071/posts/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    response = await response;
    if (response.status === 204) {
      navigate(0)
    }
  }

  function editModeToggle() {
    postRef.current.querySelector('.edit-post-header').classList.toggle('hidden')
    postRef.current.querySelector('.save-edit-post').classList.toggle('hidden')
    postRef.current.querySelector('.content-edit').classList.toggle('hidden')
    postRef.current.querySelector('.content-edit').value = postRef.current.querySelector('.content').textContent
    postRef.current.querySelector('.content').classList.toggle('hidden')
    postRef.current.querySelector('.edit-post').classList.toggle('hidden')
    postRef.current.querySelector('.delete-post').classList.toggle('hidden')
  }

  if (props.mode === "single") {
    const params = useParams()
    useEffect(() => {
      getPostData(params.id)
    },[])
  }

  return (
    props.mode === "all-posts" ? renderPost(props.post) : renderPost(singlePost)
  );
};

export default Post;