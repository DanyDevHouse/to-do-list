export const state = () => ({
  userAuthorized: false,
  user: null,
})

export const mutations = {
  UserLogged(state){
    state.userAuthorized = true
  }
}
export const actions = {
  LogIn({ commit, state }, payload){
    if(!state.userAuthorized){
      
      
    }
    
  }
}