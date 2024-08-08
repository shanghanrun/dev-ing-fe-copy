import * as types from "../constants/chat.constants";

const initialState = {
    loading: false,
    error: '',
    chatRoomList: [],
    selectedChatRoom: null,
};

function chatReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.CHATROOM_CREATE_REQUEST:
        case types.CHATROOM_GET_ALL_REQUEST:
        case types.CHATROOM_GET_REQUEST:
        case types.CHAT_SAVE_REQUEST:
            return { ...state, loading: true };

        case types.CHATROOM_CREATE_SUCCESS:
        case types.CHAT_SAVE_SUCCESS:
            return { ...state, loading: false, error: '' };

        case types.CHATROOM_GET_ALL_SUCCESS:
            return { ...state, loading: false, chatRoomList: payload, error: '' };

        case types.CHATROOM_GET_SUCCESS:
            return { ...state, loading: false, selectedChatRoom: payload, error: '' };

        case types.CHATROOM_CREATE_FAIL:
        case types.CHATROOM_GET_FAIL:
        case types.CHATROOM_GET_ALL_FAIL:
        case types.CHAT_SAVE_FAIL:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
}
export default chatReducer;
