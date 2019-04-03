<template>

  <div class="blog-page blog-page-categories-index">

    <div class="blog-page--hero">

      <h1 class="blog-page--page-title">
        All Categories
      </h1>

    </div>

    <div v-if="categories && categories.length > 0">

      <div class="blog-page--category-entries">

        <div class="container">

          <div class="row row--entries">

            <div class="col col-md-6 col-lg-4" v-for="(category) in categories" :key="category.id">

              <div class="blog-page--preview-small">

                <div class="blog-page--preview-small-inner">

                  <h3 class="blog-page--preview-title">
                    <router-link :to="localizedRoute(`/categories/${category.slug}`)">
                      {{ category.name }}
                    </router-link>
                  </h3>

                  <div class="blog-page--subcategory-list" v-if="category.children.edges.length">

                    <h5>
                      Top Subcategories
                    </h5>

                    <ul>
                      <li v-for="(subcategory) in category.children.edges.slice(0, 5)" :key="subcategory.id">
                        <router-link :to="localizedRoute(`/categories/${category.slug}?id=${subcategory.node.id}`)" class="blog-page--preview-link">
                          &rtrif;&nbsp;&nbsp;{{ subcategory.node.name }}
                        </router-link>
                      </li>
                      <!--<li class="blog-page&#45;&#45;preview-link blog-page&#45;&#45;preview-link&#45;&#45;and-more" v-if="category.children.edges.length - 5 > 0">
                        And {{ category.children.edges.length - 5 }} more categories.
                      </li>-->
                    </ul>

                  </div>

                  <router-link :to="localizedRoute(`/categories/${category.slug}`)" class="blog-page--preview-link">
                    View {{ category.name }}&nbsp;<span class="slide-right">&rtrif;</span>
                  </router-link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
    <div v-else>
      <h3>There are no categories.</h3>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CategoriesIndex',
  // Server-side only
  // This will be called by the server renderer automatically
  serverPrefetch () {
    // return the Promise from the action
    // so that the component waits before rendering
    return this.fetchCategories()
  },
  computed: {
    ...mapGetters({
      categories: 'wordpress/categories'
    })
  },
  // Client-side only
  mounted () {
    if (!this.categories.length) {
      this.fetchCategories()
    }
  },
  methods: {
    fetchCategories () {
      return this.$store.dispatch('wordpress/loadCategories', { first: 25 })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../blog/scss/blog';
  @import './scss/categories';
</style>
