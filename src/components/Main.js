import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../shared/firebase';

import { loadPostFB } from '../redux/modules/mgz'


const Main = () => {

  const dispatch = useDispatch();

  // 파이어베이스에서 가져올때
  React.useEffect(() => {
    dispatch(loadPostFB());
  }, []);
  let mgz_lists = useSelector((state) => state.Mgz.list);

  // 닉네임
  const userEmail = auth.currentUser.email;


  return (
    <MainWrap>
      {mgz_lists.map((post, idx) => {
        return (
          <PostBox key={idx} to={`/post/${idx}`}>
            <div className='postInfo' >
              <img src="https://i.pinimg.com/564x/b5/95/ef/b595efafc1e1fe9f701958ab20259e59.jpg" alt="프로필이미지" className="profile"></img>
              <p className='postDay'>{post.day}</p>
              <span>{post.nick_name}</span>
            </div>
            <LayoutBox layout={post.layout}>
              <div className='text'><p>{post.text}</p></div>
              <div className='img'>
                <img src={post.img} alt="게시글이미지" className="img"></img>
              </div>
            </LayoutBox>
            <div className='postReaction'>
              <p>좋아요 {post.like}개</p>
              <p>댓글 {post.comment}개</p>
              <button className="like">🤍</button>
              {userEmail === post.email ?
                (<button onClick={() => {
                  // navigate(`/update`)
                }}>수정하기</button>)
                : <></>}
            </div>
          </PostBox>
        )
      })
      }
      <WriteBtn to="/write">작성</WriteBtn>
    </MainWrap>
  );
};

const WriteBtn = styled(Link)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #D9CFC9;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  line-height: 50px;
  text-align: center;
`;

const PostBox = styled(Link)`
  display: block;
  border: 1px solid #ddd;
  margin: 20px 0;
`;


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

`
const MainWrap = styled.div`
  /* background: #D9CFC9; */
  padding: 0 100px;

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

  .postContent div {
    width: 50%;
    float: left;
    height : 200px;
    text-align: center;
    line-height: 200px;
    
  }
  .text {
    background: #EEDADA;
    word-break: break-all;
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    background: #E8E3E0;
    flex: 2;
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


export default Main;