// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { URL_API } from "../const";
// import { postItemRequestAsunc } from "../../store/postItem/postItemAction";

// export const useCommentsData = (id) => {
//   console.log("id: ", id);
//   // const [commentsData, setCommentsData] = useState();
//   // const [token] = useToken();
//   const { token } = useSelector((state) => state.token);
//   const commentsData = useSelector((state) => state.postItem.data);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(postItemRequestAsunc(id));
//     // const fetchCommentsData = async (id) => {
//     //   try {
//     //     const response = await fetch(`${URL_API}/comments/${id}`, {
//     //       headers: {
//     //         Authorization: `bearer ${token}`,
//     //       },
//     //     });

//     //     if (!response.ok) {
//     //       throw new Error(
//     //         `Не удалось получить commentsData! Ошибка: ${response.status}`
//     //       );
//     //     }

//     //     const data = await response.json();
//     //     setCommentsData(data);
//     //   } catch (error) {
//     //     console.log(`Не удалось получить commentsData! Ошибка: ${error}`);
//     //   }
//     // };
//     // if (token) {
//     //   fetchCommentsData(id);
//     // }
//   }, [token]);
//   console.log("commentsData: ", commentsData);
//   return commentsData;
// };
