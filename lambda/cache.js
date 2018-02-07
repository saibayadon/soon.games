import moment from 'moment';

const MEMORY_CACHE = {};

// Helper functions
const getItem = (key) => {
    return MEMORY_CACHE[key] || null;
};

const saveItem = (key, item) => {
    MEMORY_CACHE[key] = item;
};

// Cache
const cache = {
    get: (key) => {
        return getItem(key);
    },
    set: (key, data) => {
        saveItem(key, { date: moment().format('X'), data: data });
    }
};

export default cache;
