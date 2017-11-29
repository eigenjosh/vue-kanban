import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
  state: {
    boards: [{ name: 'This is total rubbish' },
            { name: 'This one is slightly better' },
            {name: 'This one isn\'t though'}],
    activeBoard: {},
    error: {}
  },
  mutations: {
    setBoards(state, data) {
      state.boards = data
    },
    handleError(state, err) {
      state.error = err
    }
  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts
    login({ commit, dispatch }, user) {
      console.log(user)
      auth.post('login', user)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getBoards({ commit, dispatch }) {
      api('boards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getBoard({ commit, dispatch }, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createBoard({ commit, dispatch }, board) {
      debugger
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          this.getBoards()
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    }
  }

})


export default store
