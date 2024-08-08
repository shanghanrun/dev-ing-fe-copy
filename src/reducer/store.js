import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import meetUpReducer from "./meetUpReducer";
import qnaReducer from "./qnaReducer";
import commonUiReducer from "./commonUIReducer";
import homeReducer from "./homeReducer";
import reportReducer from "./reportReducer";
import chatReducer from "./chatReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        meetUp: meetUpReducer,
        qna: qnaReducer,
        home: homeReducer,
        report: reportReducer,
        ui: commonUiReducer,
        chat: chatReducer,
    },
});
export default store;
