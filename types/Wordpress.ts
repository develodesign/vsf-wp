import Post from "./Post"
import Category from "./Category"

export default interface Wordpress {
    posts: Post[],
    categories: Category[]
}
  