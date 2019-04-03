export default interface Post {
    id: Int16Array,
    date: any,
    slug: string,
    title: string,
    content: string,
    author: string,
    excerpt: string,
    categories: Int16Array[],
    tags: Int16Array[]
  }
  