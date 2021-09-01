// action types
const SET_ARRAY = 'app-reducer/SET_ARRAY';
const ADD_TO_EXPORT = 'app-derucer/ADD_TO_EXPORT';
const REMOVE_FROM_ARRAY = 'app-reducer/REMOVE_FROM_ARRAY';

// initial state
const initialState = {
	importArray: null,
	isLoaded: false,
	exportArray: [],
};

// reducer
export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ARRAY:
			return {
				...state,
				importArray: action.array.slice(1),
				isLoaded: true,
			};
		case ADD_TO_EXPORT:
			return {
				...state,
				exportArray: [...state.exportArray, { ...action.obj }],
			};
		case REMOVE_FROM_ARRAY:
			const newArray = [...state.importArray].filter(
				(item, index) => index !== action.index
			);
			return {
				...state,
				importArray: newArray,
			};
		default:
			return state;
	}
};

// action creators
export const setArray = array => ({
	type: SET_ARRAY,
	array,
});

export const addToExport = obj => ({
	type: ADD_TO_EXPORT,
	obj,
});

export const removeFromArray = index => ({
	type: REMOVE_FROM_ARRAY,
	index,
});
