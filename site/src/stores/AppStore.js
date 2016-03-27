import {dispatch, register} from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import {EventEmitter} from 'events';
import AppActions from '../actions/AppActions';

const CHANGE_POSITION = 'changePosition';

var _language = 'en';


const _changePosition = () => {
	console.log('left-right control');
};

const _setLanguage = (code) => {
	_language = code;
};


const AppStore = Object.assign(EventEmitter.prototype, {
	emitChange(){
		this.emit( CHANGE_POSITION )
	},

	addChangeListener( callback ){
		this.on( CHANGE_POSITION, callback)
	},

	removeChangeListener(){
		this.removeListener( CHANGE_POSITION, callback)
	},

	getLanguage(){
		return _language;
	},

	dispatcherIndex: register(function(action){
		switch(action.actionType){
			case AppConstants.CHANGE_POSITION:
				_changePosition();
				break;
			case AppConstants.SET_LANGUAGE:
				_setLanguage(action.language);
				break;
		}

		AppStore.emitChange();
	})
});

export default AppStore;