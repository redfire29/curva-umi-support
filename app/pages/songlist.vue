<template lang="pug">
div
  p song list
</template>

<script setup>
// 'https://github.com/redfire29/neru_songlist/blob/main/src/plugins/array.js?raw=true';

const { data } = await useFetch('https://github.com/redfire29/neru_songlist/blob/main/src/plugins/array.js?raw=true');
console.log(data, 'data');
</script>