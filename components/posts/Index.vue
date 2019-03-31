<template>

  <div class="blog-page blog-page-posts-index">

    <div class="blog-page--hero">

      <h1 class="blog-page--page-title">
        Blog
      </h1>

    </div>

    <div v-if="posts && posts.length > 0">

      <div class="container">

        <div class="blog-page--preview-large blog-page--preview-large-hero-merge" :style="{backgroundImage: `url(${featuredPost.featuredImage.sourceUrl})`}">

          <div class="blog-page--preview-large-inner">

            <h4 class="blog-page--preview-date">
              {{ featuredPost.date | prettyDate }}
            </h4>

            <h2 class="blog-page--preview-title">
              <router-link :to="localizedRoute(`/posts/${featuredPost.slug}`)" v-html="featuredPost.title" />
            </h2>

            <p class="blog-page--preview-excerpt" v-html="$options.filters.truncate( featuredPost.excerpt, 355, '...' )">&nbsp;</p>

            <router-link :to="localizedRoute(`/posts/${featuredPost.slug}`)" class="blog-page--preview-link">
              Learn More&nbsp;<span class="slide-right">&rtrif;</span>
            </router-link>

          </div>

        </div>

      </div>

      <div class="blog-page--entries">

        <div class="container">

          <div class="row row--entries">

            <div class="col col-md-6 col-lg-4" v-for="(post) in postList" :key="post.id">

              <div class="blog-page--preview-small">

                <router-link :to="localizedRoute(`/posts/${post.slug}`)" class="blog-page--preview-small-bg" :style="getPostImage(post)">
                  &nbsp;
                </router-link>

                <div class="blog-page--preview-small-inner">

                  <h4 class="blog-page--preview-date">
                    {{ post.date | prettyDate }}
                  </h4>

                  <h3 class="blog-page--preview-title">
                    <router-link :to="localizedRoute(`/posts/${post.slug}`)" v-html="post.title" />
                  </h3>

                  <p class="blog-page--preview-excerpt" v-html="$options.filters.truncate( post.excerpt, 175, '...' )">&nbsp;</p>

                  <router-link :to="localizedRoute(`/posts/${post.slug}`)" class="blog-page--preview-link">
                    Learn More&nbsp;<span class="slide-right">&rtrif;</span>
                  </router-link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="blog-page--pager-container">

        <ul class="blog-page--pager">

          <li class="first"><a href="#">&lt;</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li class="dots"><a href="#">...</a></li>
          <li><a href="#">12</a></li>
          <li class="last"><a href="#">&gt;</a></li>

        </ul>

      </div>

    </div>
    <div v-else>
      <h3>There are no posts.</h3>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PostsIndex',
  // Server-side only
  // This will be called by the server renderer automatically
  serverPrefetch () {
    // return the Promise from the action
    // so that the component waits before rendering
    return this.fetchPosts()
  },
  computed: {
    ...mapGetters({
      posts: 'wordpress/posts'
    }),

    postList () {
      return this.posts.slice(1)
    },

    featuredPost () {
      return this.posts.slice(0, 1)[0]
    }
  },
  filters: {
    truncate: function (text, length, suffix) {
      return text.length > 0 ? text.substring(0, length) + suffix : ''
    },

    prettyDate: function (date) {
      let newDate = new Date(date)
      let dateFormat = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
      return newDate.toLocaleDateString('en-GB', dateFormat)
    }
  },
  // Client-side only
  mounted () {
    if (!this.posts) {
      this.fetchPosts()
    }
  },
  methods: {
    fetchPosts () {
      return this.$store.dispatch('wordpress/loadPosts', { first: 25 })
    },
    getPostImage (post) {
      if (post.featuredImage != null && post.featuredImage.sourceUrl != null) {
        return {
          'backgroundImage': `url(${post.featuredImage.sourceUrl})`
        }
      } else {
        return {
          'backgroundColor': `#ccc`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../blog/scss/blog';
  @import './scss/posts';
</style>
