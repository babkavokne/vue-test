import { ref } from 'vue'

export default function useSortedPosts(sortedPosts) {
  const searchQuery = ref('')

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.includes(searchQuery.value.toLowerCase()))
  })

  return {
    selectedSort, sortedAndSearchedPosts
  }
};