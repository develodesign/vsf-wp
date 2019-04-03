// This object should represent structure of your modules Vuex state
// It's a good practice is to name this interface accordingly to the KET (for example mailchimpState)
export interface Wordpress {
    posts: any[]
    categories: any[],
    currentPost: any,
    currentCategory: any
}