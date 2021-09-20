<template>
  <div>
    <h1>Aqui o user faz o request para novos posts</h1>
    <div>
      <input type="file" @change="onFileSelected">
      <button @click="upload($auth.user.nickname)">Enviar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const endpoint = 'http://localhost:8000/api/'
export default {
  name: "request",
  data() {
    return {
      selectedFile: null,
      // file: null,
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },
    upload( current_user) {
      const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryq08SQtIUmOp2mBcW'
      }
      const fd = new FormData();
      fd.append("who_posted", current_user)
      fd.append("approved", false)
      fd.append('image', this.selectedFile, this.selectedFile.name)
      fd.append('likes', 0)
      fd.append('liked_by', [])
      fd.append('comments', [])
      console.log(fd)
      console.log(fd.getAll('image'))
      axios.post(endpoint + 'posts/', fd, {
        headers: headers
      }).then(res => {
        console.log(res)
      })
      location.assign('http://localhost:8080/feed')
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