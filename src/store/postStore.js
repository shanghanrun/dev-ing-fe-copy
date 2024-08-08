import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'
import userStore from './userStore'

const postStore = create((set,get)=>({
	loading: false,
	error: '',
	postList: [],
	selectedPost: null,
	isFollowing: false,
	commentLoading: false,
	adminPostList: [],
	getPostList: async(searchQuery) => {
		try {
			const res = await api.get(`/post/all`, {
				params: { ...searchQuery },
			});
			set({ postList: res.data.data.allPost })
		} catch (error) {
			console.log(error)
		}
	},

	getPostDetail: async(id) =>{
		try {
			const res = await api.get(`/post/${id}`);
			set({ selectedPost: res.data.data.post })
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	createPost:async(formData, navigate) => {
		try {
			const res = await api.post('/post', formData);
			set({ selectedPost: res.data.data })
			// 내 생각에 res.data.data.newPost 여야 될 것 같은데... 잘 작동하는 것을 보면...??
			uiStore.getState().showToastMessage("새 포스트가 등록되었습니다.", "success")
			navigate(`/post/${res.data.data.newPost._id}`)
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	deletePost: async(id, navigate) =>{
		try {
			const res = await api.delete(`/post/${id}`);
			uiStore.getState().showToastMessage("포스트를 삭제하였습니다.", "success")
			navigate(`/post`)
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	updatePost: async(id, formData, navigate) =>{
		try {
			const res = await api.put(`/post/${id}`, formData);
			uiStore.getState().showToastMessage("포스트가 수정되었습니다.", "success")
			navigate(`/post/${id}`)
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	createComment: async(id, newComment) =>{
		try {
			const res = await api.post(`/post/comment`, { postId: id, content: newComment });
			uiStore.getState().showToastMessage("댓글이 등록되었습니다.", "success")
			get().getPostDetail(id)
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	updateComment: async(postId, commentId, content) =>{
		try {
			const res = await api.put(`/post/${postId}/comment/${commentId}`, { content });
			
			get().getPostDetail(postId)
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	deleteComment: async (postId, commentId) =>{
		try {
			const res = await api.delete(`/post/${postId}/comment/${commentId}`);
			get().getPostDetail(postId)
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	toggleLike: async(id, searchQuery) => {
		try {
			const res = await api.post(`/post/like`, { postId: id });
			get().getPostList({ ...searchQuery });
			get().getPostDetail(id);
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	addScrap:async(postId, isPrivate) => {
		try {
			dispatch({ type: types.ADD_SCRAP_REQUEST });
			const res = await api.post(`/post/scrap`, { postId, isPrivate });
			uiStore.getState().showToastMessage("MY DEV에 스크랩되었습니다.", "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	blockPost: async(id){
		try {
			const res = await api.put(`/post/block/${id}`);
			get().getAdminPostList()
			uiStore.getState().showToastMessage(res.message, "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	getAdminPostList: async() => {
		try {
			const res = await api.get('/admin/post');
			set({adminPostList: res.data.data.adminPostList });
			uiStore.getState().showToastMessage(res.message, "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	toggleScrapPrivate: async(nickName, postId) =>{
		try {
			const res = await api.put('/post/scrap/private', { postId });
			userStore.getState().getUserByNickName(nickName);
			uiStore.getState().showToastMessage(res.message, "success");
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	deleteScrap:async(nickName, postId) =>{
		try {
			const res = await api.put('/post/scrap/delete', { postId });
			userStore.getState().getUserByNickName(nickName);
			uiStore.getState().showToastMessage(res.message, "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	}
}))

export default postStore;