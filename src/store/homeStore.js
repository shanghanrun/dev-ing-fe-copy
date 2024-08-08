import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'

const homeStore = create((set,get)=>({
	loading: false,
	error: '',
	homePost: [],
	homeMeetUp: [],
	homeQna: [],
	getHomePostData: async() => {
		try {
			const res = await api.get(`/home`);
			set({ homePost: res.data.data.homePost });
		} catch (error) {
			console.log(error)
		}
	},
	getHomeMeetUpData: async () => {
		try {
			const res = await api.get(`/home/meetup`);
			set({ homeMeetUp: res.data.data.homeMeetUp });
		} catch (error) {
			console.log(error)
		}
	}
}))

export default homeStore;
