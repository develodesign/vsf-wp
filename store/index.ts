import { Module } from 'vuex'
import { Wordpress } from '../types/Wordpress';
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export const module: Module<Wordpress, any> = {
  namespaced: true,
  state: {
    posts: [],
    categories: [],
    currentPost: null,
    currentCategory: null
  },
  mutations,
  actions,
  getters
}