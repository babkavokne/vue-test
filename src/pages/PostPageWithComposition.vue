<template>
  <div>
    <h1>{{ likes }}</h1>
    <button @click="addLikes"></button>
    <h1>Страница с постами</h1>
    <!-- <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." v-focus />
    <div class="app__btns">
      <my-button @click="showDialog">
        Создать пост
      </my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!arePostsLoading" />
    <div v-else>Грузимся, мужики...</div>
    <div v-intersection="loadMorePosts" class="observer">
    </div> -->
  </div>

</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios';
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import { usePosts } from '@/hooks/usePosts'
import { ref } from 'vue'

export default {
  components: {
    PostForm, PostList, MyButton, MySelect, MyInput
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' }
      ],
    }
  },
  setup(props) {
    const { posts, totalPages, arePostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)
    return {
      posts,
      totalPages,
      arePostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    }
  }
}
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>

//Single file component