<template>

  <div class="blog-page blog-page-categories-show">

    <div v-if="category">

      <div class="blog-page--hero">

        <h1 class="blog-page--page-title">
          {{ category.name }}
        </h1>

        <h3 class="blog-page--page-subtitle" v-if="category.children && category.children.edges.length">
          {{ category.children.edges.length }} categories
        </h3>

      </div>

      <div v-if="category.children.edges.length">

        <h2 class="text-center">
          Subcategories
        </h2>

        <div class="blog-page--category-entries">

          <div class="container">

            <div class="row row--entries">

              <div class="col col-md-6 col-lg-4" v-for="(subcategory) in category.children.edges" :key="subcategory.id">

                <div class="blog-page--preview-small">

                  <div class="blog-page--preview-small-inner">

                    <h3 class="blog-page--preview-title">
                      <router-link :to="localizedRoute(`/categories/${category.slug}?id=${subcategory.node.id}`)">
                        {{ subcategory.node.name }}
                      </router-link>
                    </h3>

                    <router-link :to="localizedRoute(`/categories/${category.slug}?id=${subcategory.node.id}`)" class="blog-page--preview-link">
                      View {{ subcategory.node.name }}&nbsp;<span class="slide-right">&rtrif;</span>
                    </router-link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div v-if="category.posts.nodes && category.posts.nodes.length > 0">

        <h2 class="text-center">
          Posts
        </h2>

        <div class="blog-page--entries">

          <div class="container">

            <div class="row row--entries">

              <div class="col col-md-6 col-lg-4" v-for="(post) in category.posts.nodes" :key="post.id">

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
        <h3>There are no posts.</h3>
      </div>

    </div>

    <div v-else>
      <h3>Category not found.</h3>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CategoriesShow',
  serverPrefetch () {
    return this.fetchCategory()
  },
  computed: {
    ...mapGetters({
      category: 'wordpress/currentCategory'
    })
  },
  // Client-side only
  mounted () {
    if (!this.category) {
      this.fetchCategory()
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
  methods: {
    fetchCategory () {
      if (this.$route.query.id != null) {
        return this.$store.dispatch('wordpress/loadCategoryById', { id: this.$route.query.id })
      } else {
        return this.$store.dispatch('wordpress/loadCategoryBySlug', { slug: this.$route.params.slug })
      }
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
  @import './scss/category';
</style>
