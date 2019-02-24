import { Wordpress } from '../types/Wordpress'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import SearchAdapter from '@develodesign/vsf-wp/lib/searchAdapter'

// it's a good practice for all actions to return Promises with effect of their execution
export const actions: ActionTree<Wordpress, any> = {
  // if you want to use cache in your module you can load cached data like this
  loadPost ({ commit }) {
    return new Promise ((resolve, reject) => {

      const storeView = currentStoreView()

      let query = 'query post ($id: ID!) { post(id: $id) { title} }'
      let queryVars = { id: 'cG9zdDo5MzQ=' }

      // prepare a SearchRequest object
      const Request = {
        store: storeView.storeCode, // TODO: add grouped product and bundled product support
        type: 'post',
        query: query,
        queryVars: queryVars
      }

      let searchAdapter = new SearchAdapter()

      searchAdapter.search(Request).then((resp) => {
        console.log('Response: ', resp.data)
        // commit(types.SET_CURRENT_POST, result)
        resolve(resp.data)
      })

    })
  }
}