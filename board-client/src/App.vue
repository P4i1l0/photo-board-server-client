<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<div style="">
  <header>
    <nav>
        <RouterLink to="/">가로사진</RouterLink>
        <RouterLink to="/height">새로사진</RouterLink>
        <RouterLink to="/pano">파노라마</RouterLink>
        <RouterLink to="/upload">업로드</RouterLink>
    </nav>
  </header>
  <main>
  <RouterView />
  </main>
</div>
</template>

<style scoped>
header{
  background-color: #333;
  padding: 10px;
  color: white;
  display: flex;
  flex-direction: column;
}
nav{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

a{
  color: white;
}
</style>
