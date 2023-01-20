<script>
import axios from 'axios'
import { resolveComponent } from '@vue/runtime-core'


export default {
  data(){
    axios.get("http://211.42.153.225:3000/photos/width")
    .then((response)=>{
      this.a = response.data
      })
    .then((err)=>{
      console.log(err);
      })
    return{
      a: []
    }
  },
  methods:{
    imgClick(image_src){
      window.open("http://211.42.153.225:3000/photo?src="+image_src)
    }
  }
}
</script>
<template>  
  <div class="main">
    <div class="image" v-for="i in a" :key="i">
      <img :src="'http://211.42.153.225:3000/photo?src='+i.image_src" @click="imgClick(i.image_src)">
      <p>{{i.upload_date}} | {{i.location}}</p>
    </div>
  </div>
</template>

<style scoped>
.main{
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
}
.image{
  width: 49%;
  margin: 0.5%;
  cursor: pointer;
}
img{
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>