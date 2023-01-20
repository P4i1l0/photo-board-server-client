<template>
  <div class="main">
    <div class="type">
      <input type="radio" id="one" value="width" v-model="input.type" />
      <label for="one">가로사진</label>
      <input type="radio" id="two" value="height" v-model="input.type" />
      <label for="two">새로사진</label>
      <input type="radio" id="three" value="pano" v-model="input.type" />
      <label for="three">파노라마</label>
    </div>
    <input v-model="input.loc" type="text" placeholder="위치" class="location">
    <input v-model="input.password" type="password" placeholder="비밀번호" class="password">
    <div class="filebox">
      <h1 class="source">{{source}}</h1>
      <label for="file">파일찾기</label> 
      <input multiple @change="onInputImage()" ref="serveyImage" type="file" class="image" id="file">
    </div>
    <button class="send-button" @click="onClickFormButton()">Upload</button>
    <div class="loadingBox" v-if="isLoading">
      <div class="dim"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return{
      input: {
        loc: '',
        type: '',
        password: '',
        myFile: '',
      },
      source: "경로",
      isLoading: false
    }
  },
  methods:{
    onInputImage(){
      this.input.myFile = this.$refs.serveyImage.files
      this.source = this.$refs.serveyImage.files[0].name
    },
    onClickFormButton(){
      const formData = new FormData()
      formData.append('loc', this.input.loc)
      formData.append('type', this.input.type)
      formData.append('password', this.input.password)
      formData.append('date', new Date().toString())
      for(let i = 0; i < this.input.myFile.length; i++){
        formData.append('myFile', this.input.myFile[i])
      }
      if(this.input.loc == '' || this.input.type == '' || this.input.password == ''){
        alert('빈칸을 채워주세요.')
        return
      }else if(this.input.myFile == ''){
        alert('파일을 선택해주세요.')
        return
      }
      // progress bar
      this.isLoading = true
      axios.post('http://211.42.153.225:3000/upload', formData)
      .then((response)=>{
        this.isLoading = false
        this.input.loc = ''
        this.input.type = ''
        this.input.password = ''
        this.input.myFile = ''
      })
      .catch((err)=>{
        this.isLoading = false
        console.log(err)
        alert('업로드 실패')
      })
    }
  }
}
</script>
<style scoped>
  .main{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .type {
    padding: 30px 10px 15px 10px;
  }
  .type input[type=radio]{
    display: none;
  }
  .type input[type=radio]+label{
    display: inline-block;
    cursor: pointer;
    height: 35px;
    width: 100px;
    border: 1px solid #333;
    line-height: 35px;
    text-align: center;
    font-weight:bold;
    font-size:18px;
  }
  .type input[type=radio]+label{
    background-color: #fff;
    color: #333;
  }
  .type input[type=radio]:checked+label{
    background-color: #333;
    color: #fff;
  }
  .location, .password {
    border-top: none;
    border-left:none;
    border-right: none;
    border-bottom: 3px white solid;
    background-color:transparent; 
    text-align: center;
    color: aliceblue;
    font-size: 23px;
    margin: 15px 0px;
  }
  .location, .password:focus{
    outline: none;
    color: white 
  }
  .location::placeholder {
    font-size: 20px;
    text-align: center;
  }
  .password::placeholder {
    font-size: 20px;
    text-align: center;
  }
  .send-button{
    background-color: white; /* Green */
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 23px;
    margin: 20px 2px;
    cursor: pointer;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    width: 300px;
    height: 50px;
    line-height: 10px;
  }
  .filebox .upload-name {
    display: flex;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;
  }
  .filebox label {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    vertical-align: middle;
    background-color: #999999;
    cursor: pointer;
    height: 40px;
    margin-left: 10px;
  }
  .filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  .filebox {
    display: flex;
  }
  .source {
    font-size: 20px;
    line-height: 40px;
  }
  .loadingBox .dim {position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,.7);}
.loadingBox .circle {position:fixed; left:50%; top:50%; transform:translate(-50%, -50%); width:40px; height:40px; border:10px solid #fff; border-top:10px solid red; border-radius:50em; transition:all .2s;
    animation-name:spinCircle;
    animation-duration:.8s;
    animation-iteration-count:infinite;
    animation-timing-function:linear;
}

@keyframes spinCircle {
    from {
        transform:translate(-50%, -50%) rotate(0);
    }
    to {
        transform:translate(-50%, -50%) rotate(360deg);
    }
}
</style>