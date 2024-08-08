import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'

const meetUpStore = create((set,get)=>({
	loading: false,
	error: '',
	meetUpList: [],
	selectedMeetUp: null,
	adminMeetUpList: [],
	getMeetUpList: async(searchQuery) => {
		try {
			const res = await api.get(`/meetup/all`, {
				params: { ...searchQuery },
			});
			set({ meetUpList: res.data.data.allMeetUp });
		} catch (error) {
			console.log(error)
		}
	},

	getMeetUpDetail: async(id) => {
		try {
			const res = await api.get(`/meetup/${id}`);
			set({ selectedMeetUp: res.data.data.meetUp });
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	createMeetUp:async (formData, navigate) =>{
		try {
			const res = await api.post('/meetup', formData);
			set({ 
				loading: false, error: '',
			 });
			uiStore.getState().showToastMessage("새 모임이 등록되었습니다.", "success");
			navigate(`/meetUp/${res.data.data.newMeetUp._id}`);
		} catch (error) {
			set({ error: error.message });
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	deleteMeetUp:async(id, navigate) => {
		try {
			const res = await api.delete(`/meetup/${id}`);
			set({ 
					loading: false, error: '',
				});
			uiStore.getState().showToastMessage("모임을 삭제하였습니다.", "success");
			navigate(`/meetup`);
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	updateMeetUp: async(formData, id, navigate)=> {
		try {
			const res = await api.put(`/meetup/${id}`, formData);
			set({ 
				loading: false, error: '',
			 });
			uiStore.getState().showToastMessage("모임 정보가 수정되었습니다.", "success")
			navigate(`/meetUp/${id}`)
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	joinMeetUp: async(id, navigate) => {
		try {
			const res = await api.post(`/meetup/join`, { meetUpId: id });
			set({ selectedMeetUp: res.data.data.meetUp });
			uiStore.getState().showToastMessage("모임 참여에 성공했습니다.", "success")
			navigate(`/meetup/${id}`);
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	}

	leaveMeetUp:async(id, navigate) => {
		try {
			const res = await api.post(`/meetup/leave`, { meetUpId: id });
			set({ selectedMeetUp: res.data.data.meetUp });
			uiStore.getState().showToastMessage("모임 참여 취소에 성공했습니다.", "success");
			navigate(`/meetup/${id}`);
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error");
		}
	},

	blockMeetUp: async(id) => {
		try {
			const res = await api.put(`/meetup/block/${id}`);
			set({ 
				loading: false, error: '',
			 });
			get().getAdminMeetUpList();
			uiStore.getState().showToastMessage(res.message, "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	getAdminMeetUpList: async() => {
		try {
			const res = await api.get('/admin/meetup');
			set({adminMeetUpList: res.data.data.adminMeetUpList });
			uiStore.getState().showToastMessage(res.message, "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	}
}))

export default meetUpStore;