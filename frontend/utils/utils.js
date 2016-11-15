export const is_authenticated = () => {
    const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
    return persistedState.user.id_token ? true : false;
}