import React from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { deletePostFB } from '../redux/modules/mgz'
import { auth } from '../shared/firebase';
import { onAuthStateChanged } from "firebase/auth";



const Post = () => {

  // 파이어베이스에서 가져올때
  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);
  const [is_login, setIsLogin] = React.useState(false);
  const loginCheck = async (users) => { if (users) { setIsLogin(true); } else { setIsLogin(false); } };


  const navigate = useNavigate();
  let dispatch = useDispatch();

  let params = useParams();
  const list_idx = params.id

  const mgz_lists = useSelector((state) => state.Mgz.list);
  const list = mgz_lists[(list_idx)]

  const userEmail = auth.currentUser.email;



  return (
    <PostWrap>
      <div className='postInfo' >
        <img src='https://i.pinimg.com/564x/b5/95/ef/b595efafc1e1fe9f701958ab20259e59.jpg' alt="프로필이미지" className="profile"></img>
        <p className='postDay'>{list.day}</p>
        <span>{list.nick_name}</span>
      </div>
      <LayoutBox layout={list.layout}>
        <div className='text'>{list.text}</div>
        <div className='img'>
          <img src={list.img} alt="게시글이미지" className="img"></img></div>
      </LayoutBox>
      <div className='postReaction'>
        <p>좋아요 {list.like}개</p>
        <p>댓글 {list.comment}개</p>
        <button className="like">🤍</button>
        {userEmail === list.email ?
          (
            <>
              <button onClick={() => {
                navigate(`/edit/${list.id}`)
              }}>수정하기</button>
              <button
                onClick={() => {
                  console.log(list.id)
                  dispatch(deletePostFB(list.id));
                  navigate('/');
                }}
              >삭제하기</button>
            </>
          )
          : <></>}
      </div>
    </PostWrap>
  );
};

const LayoutBox = styled.div`
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: ${(props) =>
    props.layout === "right" ?
      "row" :
      (props.layout === "left" ? 'row-reverse' : 'column')
  };  
    width: 100%;
    div{
     display: flex;
    justify-content: center;
    align-items: center;
    }


`

const PostWrap = styled.div`
  padding: 0 100px;
  border: 1px solid #ddd;

  .postInfo{
    overflow: hidden;
    padding: 10px 10px;
  }

  span{
    float: left;
    line-height: 50px;
    padding-left: 10px;
  }
  img.profile{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
  }
  img.img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p.postDay{
    float: right;
    line-height: 50px;
  }
  .postContent {
    width: 100%;
    overflow: hidden;
  }
  .postContent div {
    width: 50%;
    float: left;
    height : 200px;
    text-align: center;
    line-height: 200px;
  }
  .text {
    background: #EEDADA;
    flex:3;
  }
  .img {
    background: #E8E3E0;
    flex:2;
  }
  .postReaction {
    overflow: hidden;
    padding : 20px 10px;
  }
  .postReaction p{
    float: left;
    margin-right : 10px;
  }
  .postReaction button {
    float: right;
    margin-left: 10px;
    font-family: 'IM_Hyemin-Regular';
    padding: 2px 10px;
    cursor: pointer;
  }
  .postReaction button.like {
    border: none;
    background: none;
    padding: 0;
  }
`;


export default Post;