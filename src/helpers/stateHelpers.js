export const loadState = (state) => {
    try {
        const serializedState = localStorage.getItem(state);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

export const saveState = (state, data) => {
    try {
        const serializedState = JSON.stringify(data)
        localStorage.setItem(state, serializedState);
    } catch (error) {
        // Ignore errors.
    }
};