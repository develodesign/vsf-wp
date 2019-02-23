import rootStore from '@vue-storefront/store'
import { currentStoreView, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import fetch from 'isomorphic-fetch'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'


export default class SearchAdapter {

  public entities: any

  constructor () {
    this.entities = []
  }
  /**
   * register entit type using registerEntityTypeByQuery
   * @param {Request} Request request object
   * @return {Promise}
  */
  search (Request) {
    if (!this.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type )
    }

    const storeView = (Request.store === null) ? currentStoreView() : prepareStoreView(Request.store)
    if (storeView.storeCode === undefined || storeView.storeCode == null || !Request.type) {
      throw new Error('Store and SearchRequest.type are required arguments for executing Graphql query')
    }

    const gqlQueryVars = Request.queryVars
    const query = Request.query // this.entities[Request.type].query

    debugger

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

  /**
   * register entit type using registerEntityTypeByQuery
   * @param {string} gql gql file path
   * @param {String} url server url
   * @param {function} queryProcessor some function which can update query if needed
   * @param {function} resultPorcessor process results of response
   * @return {Object}
  */
  registerEntityType (entityType, { url = '', gql, queryProcessor, resultPorcessor }) {
    this.entities[entityType] = {
      query: require(`${gql}`),
      queryProcessor: queryProcessor,
      resultPorcessor: resultPorcessor
    }
    if (url !== '') {
      this.entities[entityType]['url'] = url
    }
    return this
  }

  /**
   * register entit type using registerEntityTypeByQuery
   * @param {graphQl} query is the graphql query
   * @param {String} url server url
   * @param {function} queryProcessor some function which can update query if needed
   * @param {function} resultPorcessor process results of response
   * @return {Object}
  */
  registerEntityTypeByQuery (entityType, { url = '', query, queryProcessor, resultPorcessor }) {
    this.entities[entityType] = {
      query: query,
      queryProcessor: queryProcessor,
      resultPorcessor: resultPorcessor
    }
    if (url !== '') {
      this.entities[entityType]['url'] = url
    }
    return this
  }
}