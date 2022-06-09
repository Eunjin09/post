import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../shared/firebase';

// 액션 타입
const LOAD = "post/LOAD";
const CREATE = "post/CREATE";
const DELETE = "post/DELETE";
const UPDATE = "post/UPDATE";


// 초기 상태값.
const initialState = {
  list: []
}

// const initialPost = {
//   // id: 0,
//   // user_info: {
//   //   user_name: "alice",
//   //   user_profile: "https://d.newsweek.com/en/full/1924636/shiba-inu-dog.jpg",
//   // },
//   image_url: "https://d.newsweek.com/en/full/1924636/shiba-inu-dog.jpg",
//   contents: "",
//   comment_cnt: 0,
// };


// 액션 생성 함수
export function loadPost(post_list) {
  return { type: LOAD, post_list };
}

export function createPost(post_info) {
  return { type: CREATE, post_info };
}

export function deletePost(post_id) {
  return { type: DELETE, post_id };
}

export function updatePost(post_id, post_info) {
  return { type: UPDATE, post_id, post_info };
}


// *** Middlewares ***

// 조회
export const loadPostFB = () => {
  return async function (dispatch) {
    const post_lists = await getDocs(collection(db, "posts"));

    let post_list = [];

    post_lists.forEach((doc) => {
      post_list.push({ id: doc.id, ...doc.data() });
    })
    dispatch(loadPost(post_list))
  }
}
// 추가
export const createPostFB = (post_info) => {
  console.log(post_info.img)
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "posts"), post_info)

    const post_data = { id: docRef.id, ...post_info };
  }
}

// 수정
export const updatePostFB = (post_id, post_info) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "posts", post_id.id);
    await updateDoc(docRef, { ...post_info });

    dispatch(updatePost(post_id, post_info));
  }
}


// // 삭제
export const deletePostFB = (post_id) => {
  return async function (dispatch, getState) {
    console.log('확인!')

    const docRef = doc(db, "posts", post_id);
    await deleteDoc(docRef);

    const post_list = getState().post;
    console.log(post_list)
    const _post_id = post_list.findIndex((e) => {
      return e.id === post_id;
    })

    dispatch(deletePost(_post_id));
  }
}

// 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    // 불러오기
    case "post/LOAD": {
      return { list: action.post_list };
    }

    // 추가
    case "post/CREATE": {
      const new_post_list = { list: [...state.list] };
      console.log(new_post_list);

      return ({ list: new_post_list.list });
    }

    // 삭제
    case "post/DELETE": {
      console.log(state);
      console.log(action);

      const new_post_list = state.list.filter((e, i) => {
        return Number(action.post_idx) !== i;
      });

      console.log(new_post_list);
      return { list: new_post_list };
    };


    //수정
    case "post/UPDATE": {
      console.log(action.post_info)
      const new_bucket_list = state.list.map((e, idx) => {

        if (parseInt(action.post_info.id) === e.id) {
          return {
            ...e,
            text: action.post_info.text,
            day: action.post_info.day,
            img: action.post_info.img,
            layout: action.post_info.layout
          }
        } else {
          return e;
        }
      });
      return { list: new_bucket_list };
    }


    default:
      return state;
  }
}