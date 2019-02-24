import config from 'config'
import rootStore from '@vue-storefront/store'
import fetch from 'isomorphic-fetch'
import { currentStoreView, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

export default class SearchAdapter {
  /**
   * register entit type using registerEntityTypeByQuery
   * @param {Request} Request request object
   * @return {Promise}
  */
  search (Request) {

    const storeView = (Request.store === null) ? currentStoreView() : prepareStoreView(Request.store)
    if (storeView.storeCode === undefined || storeView.storeCode == null || !Request.type) {
      throw new Error('Store and SearchRequest.type are required arguments for executing Graphql query')
    }

    const gqlQueryVars = Request.queryVars
    const query = Request.query

    const gqlQueryBody = JSON.stringify({
      query,
      variables: gqlQueryVars
    })

    let urlGql = config.wordpress.graphql.url

    return fetch(urlGql, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: gqlQueryBody
      })
      .then(resp => {
        return resp.json()
      })
  }
}