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
        v-model="searchWord",
        class="flex-1 border-[1px] border-blue-400 focus:outline-blue-600 px-[10px]"
      )
      button(
        @click="SearchSong('songName')",
        class="p-[10px_20px] bg-blue-400 hover:bg-blue-600 text-white"
      )
        p 搜尋歌名
      button(
        @click="SearchSong('singer')",
        class="p-[10px_20px] bg-blue-400 hover:bg-blue-600 text-white"
      )
        p 搜尋歌手
    //- h2 type
    //- ul(
    //-   class="flex"
    //- )
    //-   li(v-for="songType in typeList")
    //-     p {{ songType }}
  div(
    class="flex items-start"
  )
    ul(
      class="max-w-[400px]"
    )
      li(
        v-for="list in showSongArray",
        v-show="list.showDate",
      )
        div(
          class="p-[10px] flex items-center justify-between cursor-pointer bg-blue-300",
          class="sticky top-[133px]"
          @click="list.showList = !list.showList"
        )
          div
            p {{ list.date }}
            p(class="line-clamp-1") {{ list.streamName }}
          div(
            :class="{'-rotate-90': !list.showList, 'rotate-90': list.showList}"
          )
            div(
              class="w-[10px] h-[1px] bg-blue-800 rotate-45 translate-y-[4px]"
            )
            div(
              class="w-[10px] h-[1px] bg-blue-800 -rotate-45 -translate-y-[4px]"
            )
        ul(
          :class="{'max-h-0': !list.showList, 'max-h-none': list.showList}",
          class="overflow-hidden transition-all duration-300",
        )
          li(
            v-for="song in list.songList",
            class="p-[10px] border-b-2 border-blue-300 cursor-pointer bg-blue-100",
            @click="changeYoutube(song.songLink)"
            v-show="song.showDate",
          )
            p
              span {{ song.songName }}
              span(v-if="song.singer") {{ ` - ${song.singer}` }}
    div(
      class="flex-1 p-[20px] sticky top-[133px]",
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

const songListAll = ref([]);
let showSongArray = ref([]);
const dateList = ref([]);
const selectDate = ref('');

const allSongSH = (sh) => {
  useFind(showSongArray.value,(findData) => {
    findData.showDate = sh;
    useFind(findData.songList, (song) => {
      song.showDate = sh;
    })
  });
}

const searchWord = ref('');
const SearchSong = (searchKey) => {
  allSongSH(false);
  if (searchWord.value != '') {
    useFind(songListAll.value, (findData) => {
      useFind(findData.songList, (song) => {
        if (useGet(song, searchKey)) {
          if (useGet(song, searchKey).match(new RegExp(searchWord.value, 'i'))) {
            findData.showDate = true;
            song.showDate = true;
          } else {
            song.showDate = false;
          }
        }
      })
    })
    console.log(songList.value, 'songList');
  } else {
    showSongArray.value = songListAll.value;
    allSongSH(true);
  }
}

const changeYoutube = (url) => {
  const match = url.match(/v=([^&]+)&?t=(\d+)/);
  const videoId = match[1];
  const time = match[2];

  iframeID.value = videoId;
  iframeStart.value = time;
}

import { useDayjs } from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()

onMounted(() => {
  useForEach(songListArray, (v, i) => {
    const getYear = {
      date: dayjs(v.date).format('YYYY')
    };
    const getM = dayjs(v.date).format('YYYY/M');
    const findYear = useFind(dateList.value, { date: getYear.date });
    if (findYear) {
      const findM = useFind(dateList.value, {date: getM});
      if (findM) {
        dateList.value.push({
          date: dayjs(v.date).format('YYYY/M/D'),
        });
      } else {
        dateList.value.push({
          date: getM,
        });
        dateList.value.push({
          date: dayjs(v.date).format('YYYY/M/D'),
        });
      }
    } else {
      dateList.value.push(getYear);
      dateList.value.push({
        date: getM,
      });
      dateList.value.push({
        date: dayjs(v.date).format('YYYY/M/D'),
      });
    }
    useSet(v, '[0]showDate', true);
    useForEach(v.songList, (song) => {
      useSet(song, 'showDate', true);
    })
    songListAll.value = useConcat(songListAll.value, v);
  })
  showSongArray.value = songListAll.value;
})
</script>