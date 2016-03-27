import AppConstants from '../constants/AppConstants';
import { dispatch, register} from '../dispatchers/AppDispatcher';

export default {
	changePosition(){
		dispatch({
			actionType: AppConstants.CHANGE_POSITION
		})
	},

	setLanguage(code){
		dispatch({
			actionType: AppConstants.SET_LANGUAGE,
			language: code 
		})
	}
}