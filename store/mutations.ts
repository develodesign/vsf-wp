import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_POSTS] (state, payload) {
    state.posts = payload
  },
  [types.SET_CATEGORIES] (state, payload) {
    state.categories = payload
  },
  [types.SET_CURRENTPOST] (state, payload) {
    state.currentPost = payload
  },
  [types.SET_CURRENTCATEGORY] (state, payload) {
    state.currentCategory = payload
  }
}