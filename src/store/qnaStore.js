import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'

const qnaStore = create((set,get)=>({
	qnaList: [],
    selectedQnA: null,
    newQnaId: "",
    adminQnaList: [],
	getQnaList: async(searchQuery) =>{
		try {
			const res = await api.get("/qna/all", {
				params: { ...searchQuery },
			});
			set({qnaList: res.data.data.allQnA});
		} catch (error) {
			console.log(error)
		}
	},

	getQnaDetail:async(id) =>{
		try {
			const res = await api.get(`/qna/${id}`);
			set({selectedQnA: res.data.data.qna});
		} catch (error) {
			console.log(error)
		}
	},

	createQna:async(formData, navigate) => {
		try {
			const { title, content, category } = formData;
			const res = await api.post(`/qna`, { title, content, category });

			set({newQnaId: res.data.data.newQnA._id});
			navigate(`/qna/${res.data.data.newQnA._id}`)
		} catch (error) {
			console.log(error)
		}
	},

	deleteQna: async(id, navigate) => {
		try {
			const res = await api.delete(`/qna/${id}`);

			get().getQnaList()
			navigate('/qna')
		} catch (error) {
			console.log(error)
		}
	},

	updateQna: async (formData, id, navigate) =>{
		try {
			const { title, content, category } = formData;
			const res = await api.put(`/qna/${id}`, { title, content, category });

			navigate(`/qna/${id}`)
		} catch (error) {
			console.log(error)
		}
	},

	createAnswer: async(content, imageUrl, id) => {
		try {
			const res = await api.post("/qna/answer", {
				qnaId: id,
				content,
				image: imageUrl,
			});
			// dispatch({
			// 		type: types.QNA_ANSWER_CREATE_SUCCESS,
			// 		payload: res.data.data.newAnswer,
			// 	}); 이건 어떻게 처리할 지 몰라서 주석
			get().getQnaDetail(id)
		} catch (error) {
			console.log(error)
		}
	},

	deleteAnswer:async(questionId, answerId) => {
		try {
			const res = await api.delete(`/qna/${questionId}/answer/${answerId}`);
			get().getQnaDetail(questionId)
		} catch (error) {
			console.log(error)
		}
	},

	updateAnswer:async(questionId, answerId, content)=>{
		try {
			const res = await api.put(`/qna/${questionId}/answer/${answerId}`, {
				content
			});
			get().getQnaDetail(questionId)
		} catch (error) {
			console.log(error)
		}
	},

	addLikeAnswer:async (questionId, answerId) =>{
		try {
			const res = await api.post(
				`/qna/${questionId}/answer/${answerId}/like`
			);

			get().getQnaDetail(questionId)
		} catch (error) {
			console.log(error)
		}
	},

	blockQna: async(id) => {
		try {
			const res = await api.put(`/qna/block/${id}`);
			get().getAdminQnaList()
			uiStore.get().showToastMessage(res.message, "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	getAdminQnaList: async() => {
		try {
			const res = await api.get('/admin/qna');

			set({adminQnaList: res.data.data.adminQnaList });
			uiStore.getState().showToastMessage(res.message, "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	}
}))

export default qnaStore;