import post from "./Post"

export default interface Category {
    id: Int16Array,
    count: Int16Array,
    slug: string,
    name: string,
    description: string,
    parent: Int16Array,
    posts: post[]
  }
  