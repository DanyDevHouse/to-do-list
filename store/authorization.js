export const state = () => ({
    userAuthorized: false,
    user: null,
    createNewUser: false
})

export const mutations = {
    UserLogged(state, user) {
        state.userAuthorized = true;
        state.user = user;
    },
    SetUserData(state) {
        if (localStorage.getItem('user_token') && localStorage.user_token != '') {
            state.userAuthorized = true;
            if (state.userAuthorized && localStorage.user_token != '') state.user = JSON.parse(atob(localStorage.user_token));
        } else {
            this.$router.push('/authorization');
        }
    },
    UserLogout() {
        localStorage.removeItem('user_token');
        this.$router.push('/authorization');
    }
}
export const actions = {
    LogInByEmail({ commit, dispatch, state }, payload) {
        this.$fire.auth.signInWithEmailAndPassword(payload.email, payload.password).then((userCredential) => {
            const user = {
                name: userCredential.user.displayName,
                email: userCredential.user.email,
                phoneNumber: userCredential.user.phoneNumber,
                photoURL: userCredential.user.photoURL,
                uid: userCredential.user.uid
            }
            commit('UserLogged', user)
            localStorage.setItem('user_token', btoa(JSON.stringify(state.user)));
            this.$router.push('/');
        }).catch(error => {
            if (error.code === "auth/user-not-found") {
                dispatch('CreateUserWithEmail', payload)
            }
        }).catch(error => console.error(error))
    },
    LogInByGoogleAccount({ commit, state }, deviceSize) {
        this.$fire.auth.useDeviceLanguage();
        const provider = new this.$fireModule.auth.GoogleAuthProvider();
        if (deviceSize > 768) {
            this.$fire.auth.signInWithPopup(provider).then((result) => {
                const user = {
                    name: result.user.displayName,
                    email: result.user.email,
                    phoneNumber: result.user.phoneNumber,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid
                }
                commit('UserLogged', user)
                localStorage.setItem('user_token', btoa(JSON.stringify(state.user)));
                this.$router.push('/');
            }).catch((error) => {
                new Error(error)
                console.error(error)
            });
        }
    },
    CreateUserWithEmail({ commit, state }, payload) {
        this.$fire.auth.createUserWithEmailAndPassword(payload.email, payload.password).then((userCredential) => {
                const user = {
                    name: userCredential.user.displayName || 'Guest',
                    email: userCredential.user.email,
                    phoneNumber: userCredential.user.phoneNumber,
                    photoURL: userCredential.user.photoURL,
                    uid: userCredential.user.uid
                }
                commit('UserLogged', user)
                localStorage.setItem('user_token', btoa(JSON.stringify(state.user)));
                this.$router.push('/');
            })
            .catch((error) => {
                new Error(error)
                console.error(error)
            });
    }
}