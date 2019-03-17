import { Wordpress } from '../types/Wordpress'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import SearchAdapter from '../lib/searchAdapter'

const storeView = currentStoreView()
const searchAdapter = new SearchAdapter()

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<Wordpress, any> = {
  // if you want to use cache in your module you can load cached data like this
  loadPost (context, { id }) {
    return new Promise ((resolve, reject) => {

      let query = 'query post ($id: ID!) { post(id: $id) { title date uri link content(format: RAW) } }'

      const Request = {
        store: storeView.storeCode,
        query: query,
        queryVars: { id }
      }
      
      searchAdapter.search(Request).then((resp) => {
        resolve(resp.data)
      })

    })
  },
  loadListOfPosts ({ commit }) {
    return new Promise ((resolve, reject) => {

      let query = '{ posts { nodes { id postId title date uri link content(format: RAW) } } }'

      const Request = {
        store: storeView.storeCode,
        query: query,
        queryVars: {}
      }

      searchAdapter.search(Request).then((resp) => {
        let posts = resp.data.posts.nodes
        commit(types.SET_POSTS, posts)
        resolve(posts)
      })

    })
  }
}
