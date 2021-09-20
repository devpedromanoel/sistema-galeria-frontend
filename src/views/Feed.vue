<template>
  <div>
    <h1>Galeria</h1>
    <div v-for="post in posts" :key="post.id" class="post_div">
      <h3>{{ post.who_posted }} postou:</h3>
      <img :src="post.image" alt="">
      <br>
      <span>{{ post.likes }} curtidas</span>
      <button v-if="post.liked_by.includes($auth.user.sub)" @click="unlike(post, $auth.user.sub)" :key="post.id">Descurtir</button>
      <button v-else @click="like(post, $auth.user.sub)" :key="post.id">Curtir</button>
      <br>
      <ul class="comments_list" v-if="post.comments[0]">
        <li v-for="comment in post.comments" :key="comment.who_posted+comment.content">{{comment.who_posted}} comentou:  <br> <span class="comment">{{ comment.content }}</span></li>
      </ul>
      <input type="text">
      <button @click="comment($event, post, $auth.user.nickname)">Comentar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const endpoint = 'http://localhost:8000/api/'
export default {
  name: 'feed',
  data() {
    return {
      posts: [],
    }
  },
  methods: {
   async like(post, user_id) {
    post.likes++
    post.liked_by.push(user_id)
    await axios.patch(endpoint + `posts/${post.id}/`, { 
      likes: post.likes,
      liked_by: post.liked_by
    })
   },
   async unlike(post, user_id) {
    post.likes--
    post.liked_by.forEach(user => {
      if(user === user_id) {
        const index = post.liked_by.indexOf(user);
        post.liked_by.splice(index, 1);
      }
    })
    await axios.patch(endpoint + `posts/${post.id}/`, { 
      likes: post.likes,
      liked_by: post.liked_by 
    })
   },
   async comment($event, post, current_user) {
     console.log($event.target.previousElementSibling.value)
     post.comments.push({
        who_posted: current_user,
        content: $event.target.previousElementSibling.value
      })
    await axios.patch(endpoint + `posts/${post.id}/`, { 
      comments: post.comments
    })
    $event.target.previousElementSibling.value = ''
   }
  },
  created() {
    axios.get(endpoint + 'posts/')
        .then(response => {
          response.data.map(item => {
            if (item.approved) {
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
li {
  max-width: 200px;
  margin: 10px auto;
  border: 2px solid #42b983;

}
button {
  padding: 10px;
  font-size: 15px;
}
.post_div {
  border: 2px solid #42b983;
}
.comments_list {
  border: 2px solid #42b983;
}
.comment {
  font-size: 15px;
  font-weight: bold;
}


@media screen and (max-width: 900px) {
  .post_div {
    max-width: 300px;
  }
  button {
    padding: 5px;
    margin-left: 1rem;
  }
}

</style>