<template>
  <div class="blog-page blog-page-posts-show">

    <div v-if="post">

      <div class="blog-page--hero">

        <h1 class="blog-page--page-title">
          {{ post.title }}
        </h1>

        <h3 class="blog-page--page-date blog-page--preview-date">
          {{ post.date | prettyDate }}
        </h3>

      </div>

      <div class="container">

        <div class="blog-page--preview-large blog-page--preview-large-hero-merge" style="background-image: url( https://images.unsplash.com/photo-1507807700760-c8b26e28f09e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80 )">&nbsp;</div>

      </div>

      <div class="blog-page--post-container">

        <div class="container" v-html="post.content">&nbsp;</div>

      </div>

      <div class="blog-page--entries" v-if="relatedPosts">

        <div class="container">

          <h2>
            Related Posts
          </h2>

          <div class="row row--entries">

            <div class="col col-md-6 col-lg-4" v-for="(post) in relatedPosts" :key="post.id">

              <div class="blog-page--preview-small">

                <router-link :to="localizedRoute(`/posts/${post.slug}`)" class="blog-page--preview-small-bg" :style="getPostImage(post)">
                  &nbsp;
                </router-link>

                <div class="blog-page--preview-small-inner">

                  <h4 class="blog-page--preview-date">
                    {{ post.date | prettyDate }}
                  </h4>

                  <h3 class="blog-page--preview-title">
                    <router-link :to="localizedRoute(`/posts/${post.slug}`)">
                      {{ post.title }}
                    </router-link>
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

    </div>
    <div v-else>
      <h2>
        No post found.
      </h2>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PostsShow',
  serverPrefetch () {
    return this.fetchPost()
  },
  computed: {
    ...mapGetters({
      post: 'wordpress/currentPost'
    }),
    relatedPosts () {
      return null
    }
  },
  filters: {
    prettyDate: function (date) {
      let newDate = new Date(date)
      let dateFormat = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
      return newDate.toLocaleDateString('en-GB', dateFormat)
    }
  },
  // Client-side only
  mounted () {
    if (!this.posts) {
      this.fetchPost()
    }
  },
  methods: {
    fetchPost () {
      return this.$store.dispatch('wordpress/loadPost', { slug: this.$route.params.slug })
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
  @import './scss/post';
</style>
