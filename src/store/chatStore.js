import {create} from 'zustand';
import api from "../utils/api";

const chatStore = create((set,get)=>({
	selectedChatRoom:'',
	chatRoomList:[],
	chatMessage:'',
	loading:false,
	error:'',
	createChatRoom:async(roomId, organizerId, participants)=>{
		try {
            const res = await api.post("/chat", {
                roomId,
                organizerId,
                participants,
            });

            set({
				loading: false, 
				error: ''
			})
        } catch (error) {
            set({
				loading: false, 
				error:error
			})
        }
	},
	getChatRoom:async(roomId)=>{
		try {
			const res = await api.get(`/chat/${roomId}`);

			set({chatRoom: res.data.data.chatRoom,})
		} catch (error) {
			console.log(error)
		}
	},
	getChatRoomList:async()=>{
		try {
			const res = await api.get("/chat");
			set({chatRoomList: res.data.data.chatRooms});
		} catch (error) {
			console.log(error)
		}
	},
	saveChatMessage:async(roomId,userName,message)=>{
		try {
			const res = await api.post(`/chat/${roomId}`, { userName, message });
			set({
					loading:false,
					error:''
				});
		} catch (error) {
			console.log(error)
		}
	},
}))

export default chatStore;