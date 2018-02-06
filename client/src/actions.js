// Action Types
export const UPDATE_ITEMS = 'UPDATE_ITEMS';
export const IS_LOADING = 'IS_LOADING';
export const HAS_ERROR = 'HAS_ERROR';

// Action Creators
export const updateItems = (items) => {
    return { type: UPDATE_ITEMS, items };
};

export const isLoading = () => {
    return { type: IS_LOADING };
};

export const hasError = (error) => {
    return { type: HAS_ERROR, error };
};
