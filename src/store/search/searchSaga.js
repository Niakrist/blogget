import { put, select, takeLatest } from "redux-saga/effects";
import { URL_API } from "../../api/const";
import axios from "axios";
import {
  SEARCH_REQUEST,
  searchRequestError,
  searchRequestSuccess,
} from "./searchAction";

function* fetchSearch(search) {
  console.log("search: ", search);
  const { token } = yield select((state) => state.token);
  try {
    const response = yield axios.get(`${URL_API}/search?q=${search}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    yield put(searchRequestSuccess(response.data.data));
  } catch (error) {
    yield put(searchRequestError(error));
  }
}

// function* workerSearch(action) {
//   const { token } = yield select((state) => state.token);
//   const { data } = yield fetchSearch(action, token);
//   yield put(searchRequestSuccess(data));
// }

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
