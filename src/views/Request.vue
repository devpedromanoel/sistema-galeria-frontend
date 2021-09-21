<template>
  <div>
    <h1>Insira o link da imagem</h1>
    <div>
      <input type="text" @change="onLink">
      <button @click="upload($auth.user.nickname)">Enviar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const endpoint = 'https://nameless-tor-82105.herokuapp.com/api/'
export default {
  name: "request",
  data() {
    return {
      link: null,
      // file: null,
    }
  },
  methods: {
    onLink(event) {
      this.link = event.target.value
    },
    upload(current_user) {
      const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryq08SQtIUmOp2mBcW'
      }
      const fd = new FormData();
      fd.append("who_posted", current_user)
      fd.append("approved", false)
      fd.append('image', this.link)
      fd.append('likes', 0)
      fd.append('liked_by', [])
      fd.append('comments', [])
      console.log(fd)
      axios.post(endpoint + 'posts/', fd, {
        headers: headers
      }).then(res => {
        console.log(res)
      })
      location.reload()
      alert('Sua foto foi enviada para avaliação!')
    }
  }
}
</script>


<style>
div {
  display: block;
  margin: auto;
}
</style>