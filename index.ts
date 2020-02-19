import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'

const KEY = 'wordpress'

export const Wordpress: StorefrontModule = function ({store, router}) {
  store.registerModule(KEY, module);
}
