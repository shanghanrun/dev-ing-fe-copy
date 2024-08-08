import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'

const userStore = create((set,get)=>({
	user:null,
	findUser:null,
	error: '',
	loading: false,
	clearError: () => {
  		set({ error: '' });
	},
	setFindUser:(val)=>{
		set({findUser: val});
	},
	loginWithToken: async ()=> {
		// const token= sessionStorage.getItem('token') 이것 필요없다. api에서 알아서 해더에 넣도록 설정해 두었다.
		//그럼에도 불구하고, token값을 불러와서 token이 없을 경우에는 불필요한 백엔드 요청을 안하도록 하는 것이 좋다.
		const token = sessionStorage.getItem('token')
		if(!token) return;

		try{
			const resp = await api.get('/user/')
			const u = resp.data.data.user
			// const credit = u.credit
			// const coupon = u.coupon
			set({
				user: u,
				// credit: credit,
				// coupon: coupon
			})
		} catch(e){
			console.log('e.error:', e.error)
			// set({error:e.error}) 이걸 안해야 Login페이지에 쓸데없는 에러메시지가 안나온다.
			set({error: ''})
			// this.logout()  zustand this사용 못한다.
			// invalid한 토큰삭제,user null로
			sessionStorage.clear()
			set({user:null})
			get().logout()
		}
	},
	loginWithEmail: async ({email,password})=>{
		try{
			const resp = await api.post('/auth/login', {email,password})
			const u = resp.data.data.user
			const t = resp.data.data.token
			// const credit = u.credit
			// const coupon = u.coupon
			set({
				user: u,
				// credit: credit,
				// coupon: coupon
			})
			sessionStorage.setItem('token',t)
			uiStore.getState().showToastMessage("로그인 하셨습니다.", 'success')
		} catch(e){
			console.log('e :', e)
			// 아래부분은 확인해 봐야 됨. e.message인지 여부...
			// set({error: e.error})
			// uiStore.getState().showToastMessage(e.error, 'error');
		}
	},
	logout:()=> {   
		sessionStorage.clear()
		set({user:null})
		uiStore.getState().showToastMessage("로그아웃", 'success')
		// cartStore.getState().zeroCartItemCount()
	},
	loginWithGoogle: async (token)=>{
		try{
			const resp = await api.post('/auth/google', {token})
			const u = resp.data.user
			const t = resp.data.token
			// const credit = u.credit
			// const coupon = u.coupon
			set({
				user: u,
				// credit: credit,
				// coupon: coupon
			})
			sessionStorage.setItem('token',t)
		}catch(e){
			console.log('e.error:', e.error)
			// set({error: e.error})
			// uiStore.getState().showToastMessage(e.error, 'error');
		}
	},
	register: async({email, userName, password, gender,nickName }, navigate)=>{
		try{
			const resp = await api.post('/user', {email, userName, password, gender,nickName})
			console.log('회원등록 성공')
			
			uiStore.getState().showToastMessage('회원가입을 완료했습니다.', 'success')
			navigate('/login')
		}catch(e){
			console.log(e.error)
			uiStore.getState().showToastMessage('회원가입실패','error')
		}
	},
	getUserList:async()=>{
		try {
			const resp = await api.get('/user/all');
			set({ users: resp.data.data });
		} catch (e) {
			console.log(e)
		}
	},
	updateUser:async(userFormData)=>{
		try{
			const resp = await api.put(`/user/`, userFormData);
			set({
				user: resp.data.data,
				userUpdated: !get().userUpdated
			})
			uiStore.getState().showToastMessage(`유저 정보 수정이 완료되었습니다.`, 'success')
		}catch(e){
			console.log(e)
		}
	},
	updateGoogleUser:async(userFormData, navigate) => {
		console.log("updateGoogleUser", userFormData);
		try {
			const res = await api.put('/user/google', userFormData);
			
			set({ user: res.data.data })
			uiStore.getState().showToastMessage("정보 수정이 완료되었습니다.", "success")
			navigate("/");
		} catch (e) {
			console.log(e)
		}
	},

	getUserByNickName: async(nickName) => {
		try {
			const res = await api.get(`/user/me/${nickName}`)
			set({ user: res.data.data })
		} catch (error) {
			console.log(error)
		}
	},

	followUser: async (nickName) => {
		try {
			const res = await api.post(`/user/me/${nickName}/follow`);
			set({ user: res.data.data })
		} catch (error) {
			console.log(error)
		}
	},

	unfollowUser: async(nickName) => {
		try {
			const res = await api.post(`/user/me/${nickName}/unfollow`);
			set({ user: res.data.data })
		} catch (error) {
			console.log(error)
		}
	},

	blockUser: async (userId) => {
		try {
			const res = await api.post('/user/block', { userId });
			get().getUserList();
			uiStore.getState().showToastMessage(res.message, 'success')
		} catch (error) {
			uiStore.getState().showToastMessage(error, 'error')
		}
	},
	forgetPassword: async (nickName, userName, email) => {
		try {
			const res =  await api.post('/user/forgetpassword', { nickName, userName, email });
			set({ user: res.data.data })
			get().getUserList()
			uiStore.getState().showToastMessage('새로 변경할 비밀번호를 입력해주세요', 'success')
		} catch (error) {
			uiStore.getState().showToastMessage(error.message, 'error')
		}
	},

	setNewPassword: async(userId, password, navigate) =>{
		try {
			const res =  await api.post('/user/resetpassword', { userId, password })
			uiStore.getState().showToastMessage('비밀번호가 변경되었습니다', 'success');
			navigate('/login');
			set({ findUser: null })
		} catch (error) {
			uiStore.getState().showToastMessage(error.message, 'error');
		}
	}
}))

export default userStore;