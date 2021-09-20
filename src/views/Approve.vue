<template>
  <div>
    <h1>Aqui o ADM aprova as novas requests</h1>
    <div v-for="post in posts" :key="post.id" class="post_div">
      <h3>{{ post.who_posted }} postou:</h3>
      <img :src="post.image" alt="">
      <br>
      <button  @click="approve(post)" :key="post.id">Aprovar</button>
      <button @click="reject(post)" :key="post.id">Rejeitar</button>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const endpoint = 'http://localhost:8000/api/'
export default {
  name: 'approve',
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    async approve(post) {
      await axios.patch(endpoint + `posts/${post.id}/`, { 
      approved: true 
      })
      location.reload();
    },
    async reject(post) {
      await axios.delete(endpoint + `posts/${post.id}/`);
      location.reload();
    }
  },
  created() {
    axios.get(endpoint + 'posts/')
        .then(response => {
          response.data.map(item => {
            if (!item.approved) {
              console.log(item.comments)
              return this.posts.push(item)
            }
          })
        })
  }
}
</script>

<style>
img {
  width: 300px;
  max-width: 300px;
}
ul, li {
  list-style: none;
}
.post_div {
  display: block;
  border: 2px solid #42b983;
  width: 600px;
  margin: 30px auto;
}
.post_comments {
  border: 2px solid #42b983;
}
.post_btn {
  padding: 10px;
  font-size: 20px;
}
</style>