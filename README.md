# vsf-wp
Wordpress module for Vue Storefront based on GraphQL


## Requirements
Wordpress doesn't yet support GraphQL natively.
So to get started install following free open source Wordpress Plugin into your WP store https://github.com/wp-graphql/wp-graphql


## Installation

```shell
git clone git@github.com:develodesign/vsf-wp.git vue-storefront/src/modules/wordpress
```


Import and register the module inside `vue-storefront/src/modules/index.ts`

```ts
import { Wordpress } from './wordpress'
...
export const registerModules: VueStorefrontModule[] = [
...
   Wordpress
]
```

Add settings to `vue-storefront/config/local.json`

```shell
"wordpress": {
    "graphql":{
      "url": "https://you-wordpress-url/graphql"
    }
  }
```

Open router configuration in your theme `vue-storefront/src/themes/you-theme/router/index.js` For default theme use path `vue-storefront/src/themes/default/router/index.js` And add some routes:

```js
const Posts = () => import(/* webpackChunkName: "vsf-wp-posts" */ 'src/modules/wordpress/pages/Posts')
const SinglePost = () => import(/* webpackChunkName: "vsf-wp-single-post" */ 'src/modules/wordpress/pages/SinglePost')
...
let routes = [
  ...
  { name: 'posts', path: '/posts', component: Posts, props: {page: 'posts', title: 'Posts'} },
  { name: 'single-post', path: '/single-post/:id', component: SinglePost, props: {page: 'post', title: 'Single Post'} }
]
```
