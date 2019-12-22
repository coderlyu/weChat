import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import { getChatList, setChatList, removeChatList } from '@/utils/auth'
const state = {
  chatList: getChatList() || [],
  user: {
    name: '',
    avatar: ''
  },
  count: 0
  /**
   * chatlist格式
   * [{
   *   user: {
   *          id: '',
   *          avatar: '',
   *          name: '',
   *          intro: ''
   *        },
   *   data: { type: 1, content: '', time: ''} 1是别人发的，2是自己发的，3是提示消息
   *  }]
   */
}
const mutations = {
  ADD_CHAT_LIST: (state, item) => {
    state.chatList.push(item)
    // setChatList(state.chatList)
  },
  CLEAR_CHAT_LIST: (state) => {
    state.chatList = []
    // removeChatList()
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  CHANGE_COUNT: (state, count) => {
    state.count = count
  }
}
const actions = {
  setChatListItem ({ commit }, { user, type, content }) {
    let msg = {
      type: type,
      content: content,
      dataTime: new Date( + new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
    commit('ADD_CHAT_LIST', { user, data: msg })
  },
  createSocket ({ commit, state }) {
    if (state.user) {
      Vue.use(new VueSocketio({
        debug: false, // true为开启打印日志
        connection: 'http://47.106.68.248:3001?name=' + state.user.name // 连接地址换成自己后台的
      }))
    }
  },
  setUset ({ commit }, { name, avatar }) {
    commit('SET_USER', { name, avatar })
  },
  changeCount ({ commit }, count) {
    commit('CHANGE_COUNT', count)
  },
  clearChatList ({ commit }) {
    commit('CLEAR_CHAT_LIST')
  }
}
const getters = {
  getChatList: state => state.chatList
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
