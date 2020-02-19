import config from 'config'
import rootStore from '@vue-storefront/core/store'
import fetch from 'isomorphic-fetch'
import { currentStoreView, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import { StoreView } from '@vue-storefront/core/lib/types'

export default class SearchAdapter {
  /**
   * register entit type using registerEntityTypeByQuery
   * @param {Request} Request request object
   * @return {Promise}
   */
  search (Request) {

    if (Request.store === undefined) {
      return this.searchStore(currentStoreView(), Request);
    }

    return prepareStoreView(Request.store).then(s => this.searchStore(s, Request));
  }

  private searchStore(storeView: StoreView, Request): Promise<any> {
    if (storeView.storeCode === undefined || storeView.storeCode == null) {
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
    }).then(resp => {
      return resp.json()
    }, error => {
      throw new Error(error.message)
    })
  }
}
