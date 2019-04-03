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
  loadPost ({ commit }, { slug }) {
    return new Promise ((resolve, reject) => {

      // let query = 'query post ($id: ID!) { post(id: $id) { title date uri link content(format: RAW) } }'
      let query = 'query GET_POST($slug: String!) { postBy(slug: $slug) { title date uri link featuredImage { sourceUrl } content(format: RAW) } }'

      const Request = {
        store: storeView.storeCode,
        query: query,
        queryVars: { slug }
      }

      searchAdapter.search(Request).then((resp) => {
        commit(types.SET_CURRENTPOST, resp.data.postBy)
        resolve(resp.data.postBy)
      })

    })
  },
  loadPosts ({ commit, state }, { first }) {
    return new Promise ((resolve, reject) => {

      let query = 'query GET_POSTS($first: Int) { posts(first: $first) { nodes { id title date slug excerpt featuredImage { sourceUrl } } } }'

      const Request = {
        store: storeView.storeCode,
        query: query,
        queryVars: { first }
      }

      searchAdapter.search(Request).then((resp) => {
        let posts = resp.data.posts.nodes
        commit(types.SET_POSTS, posts)
        resolve(posts)
      })

    })
  },
  loadCategories ({ commit, state }, { first }) {
    return new Promise ((resolve, reject) => {

      let query = 'query GET_CATEGORIES($first: Int) { categories(first: $first) { nodes { id name slug children { edges { node { id name slug } } } } } }'

      const Request = {
        store: storeView.storeCode,
        query: query,
        queryVars: { first }
      }

      searchAdapter.search(Request).then((resp) => {
        let categories = resp.data.categories.nodes
        commit(types.SET_CATEGORIES, categories)
        resolve(categories)
      })

    })
  },
  loadCategoryBySlug ({ commit }, { slug }) {
    return new Promise ((resolve, reject) => {

      let query = 'query GET_CATEGORY { categories(where: {slug: "' + slug + '"}) { nodes { id name slug children { edges { node { id name slug } } } posts { nodes { id title date slug excerpt featuredImage { sourceUrl } } } } } }'

      const Request = {
        store: storeView.storeCode,
        query: query,
        queryVars: {}
      }

      searchAdapter.search(Request).then((resp) => {
        commit(types.SET_CURRENTCATEGORY, resp.data.categories.nodes[0])
        resolve(resp.data.categories.nodes[0])
      })

    })
  },
  loadCategoryById ({ commit }, { id }) {
    return new Promise ((resolve, reject) => {

      let query = 'query category ($id: ID!) { category(id: $id) { id name slug children { edges { node { id name slug } } } posts { nodes { id title date slug excerpt featuredImage { sourceUrl } } } } }'

      const Request = {
        store: storeView.storeCode,
        query: query,
        queryVars: { id }
      }

      searchAdapter.search(Request).then((resp) => {
        commit(types.SET_CURRENTCATEGORY, resp.data.category)
        resolve(resp.data.category)
      })

    })
  },
}
