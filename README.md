# vsf-wp
Wordpress module for Vue Storefront based on GraphQL


## Requirements
Wordpress doesn't yet support GraphQL natively.
So to get started install following free open source Wordpress Plugin into your WP store https://github.com/wp-graphql/wp-graphql


## Installation

```shell
git clone https://github.com/develodesign/vsf-wp.git vue-storefront/src/modules/wordpress
```


Import and register the module inside `vue-storefront/src/modules/index.ts`

```ts
import { Wordpress } from './wordpress'
...
export function registerClientModules () {
...
   registerModule(Wordpress)
)
```

Add settings to `vue-storefront/config/local.json`

```shell
"wordpress": {
    "graphql":{
      "url": "https://your-wordpress-url/graphql"
    }
  }
```

Open router configuration in your theme `vue-storefront/src/themes/you-theme/router/index.js` For default theme use path `vue-storefront/src/themes/default/router/index.js` And add some routes:

```js
const PostsIndex = () => import(/* webpackChunkName: "vsf-wp-posts-index" */ 'src/modules/wordpress/pages/posts/Index')
const PostsShow = () => import(/* webpackChunkName: "vsf-wp-posts-show" */ 'src/modules/wordpress/pages/posts/Show')
const CategoriesIndex = () => import(/* webpackChunkName: "vsf-wp-categories-index" */ 'src/modules/wordpress/pages/categories/Index')
const CategoriesShow = () => import(/* webpackChunkName: "vsf-wp-categories-show" */ 'src/modules/wordpress/pages/categories/Show')
...
let routes = [
  ...
  { name: 'posts-index', path: '/posts', component: PostsIndex, props: {page: 'posts', title: 'Posts'} },
  { name: 'posts-show', path: '/posts/:slug', component: PostsShow, props: {page: 'post', title: 'View Post'} },
  { name: 'categories-index', path: '/categories', component: CategoriesIndex, props: {page: 'categories', title: 'View Categories'} },
  { name: 'categories-show', path: '/categories/:slug', component: CategoriesShow, props: {page: 'category', title: 'View Category'} }
]
```
