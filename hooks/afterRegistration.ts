
import SearchAdapter from '@develodesign/vsf-wp/lib/searchAdapter'
import { processESResponseType } from '@vue-storefront/core/lib/search/adapter/graphql/processor/processType'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const EXTENSION_KEY = 'wordpress'
const ENTITY_TYPE = 'post'

export function afterRegistration (Vue, config, store, isServer) {
  console.log('Register wordpress module')

  Vue.prototype.$bus.$on('servercart-after-diff', async () => {
    console.log('Register wordpress entity graphql extension')

    // create graphQl searchAdapter
    let searchAdapter = new SearchAdapter()

    // register custom entity type using registerEntityTypeByQuery
    // differnt graphql servers cold be used for different entity types
    // resolver for testentity should be implemented on the graphql server provided
    searchAdapter.registerEntityTypeByQuery(ENTITY_TYPE, {
      url: config.wordpress.graphql.url,
      query: require('../queries/post.gql'),
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return resp.data
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultPorcessor for entity type \'wordpress\'')
          }
        }
      }
    })

    const storeView = currentStoreView()

    let queryVars = { id: 'cG9zdDo5MzQ=' }
    let query = 'query post ($id: ID!) { post(id: $id) { title} }'

    // prepare a SearchRequest object
    const Request = {
      store: storeView.storeCode, // TODO: add grouped product and bundled product support
      type: ENTITY_TYPE,
      query: query,
      queryVars: queryVars,
      sort: ''
    }

    // apply test search
    searchAdapter.search(Request).then((resp) => { // we're always trying to populate cache - when online
      const res = searchAdapter.entities[Request.type].resultPorcessor(resp, 0, 200)
      console.log('Response: ', res)
    })
  })
}
