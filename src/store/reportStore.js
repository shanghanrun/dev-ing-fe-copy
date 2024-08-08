import {create} from 'zustand'
import api from '../utils/api'
import uiStore from './uiStore'

const reportStore = create((set,get)=>({
	reportList: [],
    selectedReport: null,
    reportedUser: null,
	createReport: async(reportedUserId, postId, meetUpId, qnaId, contentType, reasons) => {
		try {
			const res = await api.post('/report', {
				reportedUserId,
				postId,
				meetUpId,
				qnaId,
				contentType,
				reasons
			})
			uiStore.getState().showToastMessage(res.data.message, "success")
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	};

	updateReport:async (reportId) => {
		try {
			const res = await api.put(`/report`, { reportId });
			set({selectedReport: res.data.data})
			uiStore.getState().showToastMessage(res.data.message, "success")
			get().getAllReport()
		} catch (error) {
			console.log(error)
			uiStore.getState().showToastMessage(error.message, "error")
		}
	},

	getAllReport:async() => {
		try {
			const res = await api.get('/report')
			set({reportList: res.data.data.reportList})
			uiStore.getState().showToastMessage(res.data.message, "success")
		} catch (error) {
			console.log(error)
		}
	}
}))

export default reportStore;