const state = {
    username: null,
    token: localStorage.getItem('token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null,
    expires_in: localStorage.getItem('expires_in') || null,
    tabs: [],
    tabValue: '',
    tabIndex: 0
}

export default state
