import rootStore from '@vue-storefront/store'
import { currentStoreView, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import fetch from 'isomorphic-fetch'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import SearchAdapter from '@vue-storefront/core/lib/search/adapter/graphql/searchAdapter'

export class WpSearchAdapter extends SearchAdapter {

  constructor () {
    this.entities = []
    this.initBaseTypes()
  }
  /**
   * register entit type using registerEntityTypeByQuery
   * @param {Request} Request request object
   * @return {Promise}
  */
  search (Request) {
    if (!(Request.searchQuery instanceof SearchQuery)) {
      throw new Error('SearchQuery instance has wrong class required to process with graphQl request.')
    }

    if (!this.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type )
    }

    const storeView = (Request.store === null) ? currentStoreView() : prepareStoreView(Request.store)
    if (storeView.storeCode === undefined || storeView.storeCode == null || !Request.type) {
      throw new Error('Store and SearchRequest.type are required arguments for executing Graphql query')
    }

    const gqlQueryVars = '' // prepareQueryVars(Request)
    const query = this.entities[Request.type].query

    const gqlQueryBody = JSON.stringify({
      query,
      variables: gqlQueryVars
    })

    // define graphql url from searchAdapter entity or use default graphQl host with storeCode param
    let urlGql = ''
    if (this.entities[Request.type].url) {
      urlGql = this.entities[Request.type].url
    } else {
      urlGql = rootStore.state.config.server.protocol + '://' + rootStore.state.config.graphql.host + ':' + rootStore.state.config.graphql.port + '/graphql'
      const urlStoreCode = (storeView.storeCode !== '') ? encodeURIComponent(storeView.storeCode) + '/' : ''
      urlGql = urlGql + '/' + urlStoreCode
    }

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
