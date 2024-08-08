import {create} from 'zustand'

const uiStore =create((set)=>({
	toastMessage:{message:'', status:''},
	isFullyLoaded:true, 
	popupContent:{message:''},
	showToastMessage: (message, status) => {
    set({ toastMessage: { message, status } });
 	},
}))


export default uiStore;