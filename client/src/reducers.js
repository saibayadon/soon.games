import { IS_LOADING, HAS_ERROR, UPDATE_ITEMS } from './actions';

// Initial State
const initialState = {
    isFetching: false,
    items: [],
    error: null
};

// Reducer
export function upcomingGames(state = initialState, action) {
    switch (action.type) {
        case IS_LOADING:
            return { ...state, items: [], isFetching: true };
        case HAS_ERROR:
            return { ...state, isFetching: false, error: action.error };
        case UPDATE_ITEMS:
            return { ...state, items: action.items, isFetching: false, error: null };
        default:
            return state;
    }
}
