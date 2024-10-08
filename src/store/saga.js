import { watchSearch } from "./search/searchSaga";

// function* workerSaga() {
//   yield console.log("Работает");
// }

// export function* watchSaga() {
//   yield takeEvery("SUBMIT", workerSaga);
// }

export default function* rootSaga() {
  yield watchSearch();
}
