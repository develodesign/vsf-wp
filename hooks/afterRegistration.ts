
import { getSearchAdapter } from '@vue-storefront/core/lib/search/adapter/searchAdapterFactory'
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
    let searchAdapter = await getSearchAdapter('graphql')

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
          return processESResponseType(resp.data.testentity, start, size)
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

    // create an empty SearchQuery to get all data for new custom entity
    let searchQuery = new SearchQuery()
    searchQuery = searchQuery.applyFilter({key: 'id', value: {'eq': 'cG9zdDo5MzQ='}})

    // prepare a SearchRequest object
    const Request = {
      store: storeView.storeCode, // TODO: add grouped product and bundled product support
      type: ENTITY_TYPE,
      searchQuery: searchQuery,
      sort: ''
    }

    // apply test search
    searchAdapter.search(Request).then((resp) => { // we're always trying to populate cache - when online
      console.log(resp.errors[0].message)
      const res = searchAdapter.entities[Request.type].resultPorcessor(resp, 0, 200)
      console.log('Testentity response: ', res)
    })
  })
}
