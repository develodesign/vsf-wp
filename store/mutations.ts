import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_POSTS] (state, payload) {
    state.posts = payload
  }
}