# vsf-wp
Wordpress module for Vue Storefront based on GraphQL


## Requirements
Wordpress doesn't yet support GraphQL natively.
So to get started install following free open source Wordpress Plugin into your WP store https://github.com/wp-graphql/wp-graphql


## Installation

```shell
git clone git@github.com:develodesign/vsf-wp.git vue-storefront/src/modules/wordpress
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
  { name: 'single-post', path: '/single-post', component: SinglePost, props: {page: 'posts', title: 'Single Post'} }
]
```

## Generate graphql scheme

```shell
npx get-graphql-schema https://you-wordpress-url/graphql > schema-wp.graphql
```
