# vsf-wp
Wordpress module for Vue Storefront based on GraphQL

## Installation

```
git clone git@github.com:develodesign/vsf-wp.git vue-storefront/src/modules/wordpress
```

Open router configuration in your theme `vue-storefront/src/themes/you-theme/router/index.js` For default theme use path `vue-storefront/src/themes/default/router/index.js` And add some routes:

```
const Posts = () => import(/* webpackChunkName: "vsf-wp-posts" */ 'src/modules/wordpress/pages/Posts')
const SinglePost = () => import(/* webpackChunkName: "vsf-wp-single-post" */ 'src/modules/wordpress/pages/SinglePost')
...
let routes = [
  ...
  { name: 'posts', path: '/posts', component: Posts, props: {page: 'posts', title: 'Posts'} },
  { name: 'single-post', path: '/single-post', component: SinglePost, props: {page: 'posts', title: 'Single Post'} }
]
```
