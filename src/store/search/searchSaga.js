import { put, takeEvery } from "redux-saga/effects";
import { URL_API } from "../../api/const";
import axios from "axios";
import { SEARCH_REQUEST, searchRequestSuccess } from "./searchAction";

const fetchSearch = async (action) => {
  // const {token} = ''
  const request = await axios.get(`${URL_API}/search?q=${action.search}`, {
    headers: {
      Authorization: `brearer ${action.token}`,
    },
  });

  return request.data;
};

function* workerSearch(action) {
  const { data } = yield fetchSearch(action);
  console.log("data: ", data);
  yield put(searchRequestSuccess(data));
}

export function* watchSearch() {
  yield takeEvery(SEARCH_REQUEST, workerSearch);
}
