<template lang="pug">
div
  div(
    class="border-b-[1px] border-blue-400 p-[10px] sticky top-0 pt-[54px] bg-white z-10"
  )
    h2 歌曲搜尋
    div(
      class="flex"
    )
      input(
        v-model="searchInput",
      )
      div(@click="SearchSong('songName')")
        p 搜尋歌名
      div(@click="SearchSong('singer')")
        p 搜尋歌手
    h2 type
    ul(
      class="flex"
    )
      li(v-for="songType in typeList")
        p {{ songType }}
  div(
    class="flex items-start"
  )
    ul(
      class="max-w-[400px]"
    )
      li(
        v-for="list in songList",
      )
        div(
          class="p-[10px] flex items-center justify-between cursor-pointer bg-white",
          class="sticky top-[161px]"
          @click="list.showList = !list.showList"
        )
          div
            p {{ list.date }}
            p(class="line-clamp-1") {{ list.streamName }}
          div(
            :class="{'-rotate-90': !list.showList, 'rotate-90': list.showList}"
          )
            div(
              class="w-[10px] h-[1px] bg-blue-500 rotate-45 translate-y-[4px]"
            )
            div(
              class="w-[10px] h-[1px] bg-blue-500 -rotate-45 -translate-y-[4px]"
            )
        ul(
          :class="{'max-h-0': !list.showList, 'max-h-none': list.showList}",
          class="overflow-hidden transition-all duration-300"
        )
          li(
            v-for="song in list.songList",
            class="p-[10px] border-b-2 border-blue-300 cursor-pointer",
            @click="changeYoutube(song.songLink)"
          )
            p
              span {{ song.songName }}
              span(v-if="song.singer") {{ ` - ${song.singer}` }}
    div(
      class="flex-1 p-[20px] sticky top-[161px]",
    )
      iframe(
        :src="`https://www.youtube.com/embed/${iframeID}?autoplay=1&start=${iframeStart}`",
        allow="autoplay",
        class="w-full aspect-video",
        v-if="iframeID && iframeStart"
      )
</template>

<script setup>
import songListArray from '@/plugins/array.js';


const songList = ref([]);
songList.value = songListArray;

const iframeID = ref('');
const iframeStart = ref('');

const typeList = [
  'Vocalold', 'バラード', 'J-POP', '演歌', 'アニソン', 'その他',
]

const searchInput = ref('');
const SearchSong = (type) => {
  console.log(type, 'type');
}

const changeYoutube = (url) => {
  const match = url.match(/v=([^&]+)&?t=(\d+)/);
  const videoId = match[1];
  const time = match[2];
  console.log(videoId, 'videoId');
  console.log(time, 'time');
  iframeID.value = videoId;
  iframeStart.value = time;
}
</script>