
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const EXTENSION_KEY = 'wordpress'

export function afterRegistration ({ Vue, config, store, isServer} ) {
  if (!Vue.prototype.$isServer) {
    console.log('Register wordpress module')
  }
}
