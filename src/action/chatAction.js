import * as types from "../constants/chat.constants";
import api from "../utils/api";

const createChatRoom =
    (roomId, organizerId, participants) => async (dispatch) => {
        try {
            dispatch({ type: types.CHATROOM_CREATE_REQUEST });

            const res = await api.post("/chat", {
                roomId,
                organizerId,
                participants,
            });

            if (res.status !== 200) {
                throw new Error("대화방 생성에 실패하였습니다.");
            } else {
                dispatch({ type: types.CHATROOM_CREATE_SUCCESS });
            }
        } catch (error) {
            dispatch({ type: types.CHATROOM_CREATE_FAIL });
        }
    };

const getChatRoomList = () => async (dispatch) => {
    try {
        dispatch({ type: types.CHATROOM_GET_ALL_REQUEST });

        const res = await api.get("/chat");

        if (res.status !== 200) {
            throw new Error("대화방을 불러오는데 실패하였습니다.");
        } else {
            dispatch({
                type: types.CHATROOM_GET_ALL_SUCCESS,
                payload: res.data.data.chatRooms,
            });
        }
    } catch (error) {
        dispatch({ type: types.CHATROOM_GET_ALL_FAIL });
    }
};

const getChatRoom = (roomId) => async (dispatch) => {
    try {
        dispatch({ type: types.CHATROOM_GET_REQUEST });

        const res = await api.get(`/chat/${roomId}`);

        if (res.status !== 200) {
            throw new Error("대화방을 불러오는데 실패하였습니다.");
        } else {
            dispatch({
                type: types.CHATROOM_GET_SUCCESS,
                payload: res.data.data.chatRoom,
            });
        }
    } catch (error) {
        dispatch({ type: types.CHATROOM_GET_FAIL });
    }
};

const saveChatMessage = (roomId, userName, message) => async (dispatch) => {
    try {
        dispatch({ type: types.CHAT_SAVE_REQUEST });
        const res = await api.post(`/chat/${roomId}`, { userName, message });
        if (res.status !== 200) {
            throw new Error("대화방을 불러오는데 실패하였습니다.");
        } else {
            dispatch({
                type: types.CHAT_SAVE_SUCCESS,
            });
        }
    } catch (error) {
        dispatch({ type: types.CHAT_SAVE_FAIL });
    }
};

const chatActions = {
    createChatRoom,
    getChatRoomList,
    getChatRoom,
    saveChatMessage,
};

export default chatActions;
