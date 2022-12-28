import rs from 'jsrsasign';

export default () => {

    const setToken = (token) => {
        localStorage.setItem('TOKEN_USER', token)
    }

    const getToken = () => {
        return localStorage.getItem('TOKEN_USER')
    }

    const deleteToken = () => {
        localStorage.removeItem('TOKEN_USER')
        navigateTo('/');
    }

    const isAuthenticated = () => {
        let isToken = false;
        if (getToken() !== null) {
            let tokenData = rs.b64utos(getToken().split('.')[1]);
            tokenData = JSON.parse(tokenData);
            if (new Date(tokenData.iat * 1000.001) < new Date()) {
                deleteToken();
                isToken = false
             }
             isToken = true
        }
        return isToken
    }

    const clearAuthData = () => {
        deleteToken()
    }

    return {
        isAuthenticated,
        setToken,
        clearAuthData
    }
}