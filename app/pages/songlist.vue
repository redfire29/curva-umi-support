<template lang="pug">
div
  div(
    class="border-b-[1px] border-blue-400 p-[10px] sticky top-0 pt-[54px] bg-white z-10"
  )
    h2 {{ $t('searchSong') }}
    div(
      class="md:flex items-center flex-wrap"
    )
      div(
        class="flex flex-1 mb-[10px] md:mb-0"
      )
        input(
          v-model="searchWord",
          class="flex-1 border-[1px] border-[#5FA8D3] focus:outline-blue-600 px-[10px]"
        )
        button(
          @click="SearchSong('songName')",
          class="p-[5px_10px] border-y-[1px] border-[#5FA8D3] bg-[#CAE9FF] text-[#1B4965] md:hover:text-[#CAE9FF] md:hover:bg-[#5FA8D3]"
          class="md:text-[14px] md:p-[10px_20px]"
        )
          p {{ $t('searchSongName') }}
        button(
          @click="SearchSong('singer')",
          class="p-[5px_10px] border-[1px] border-[#5FA8D3] bg-[#CAE9FF] text-[#1B4965] md:hover:text-[#CAE9FF] md:hover:bg-[#5FA8D3]"
          class="md:text-[14px] md:p-[10px_20px]"
        )
          p {{ $t('searchSinger') }}
      div(class="flex flex-none items-center max-md:w-full md:ml-[10px]")
        p(class="mr-[5px]") {{ $t('dateSelect') }}
        select(
          v-model="selectDate", @change="dateSelect()",
          class="border-[1px] border-[#5FA8D3] max-md:flex-1"
        )
          option(value="") {{ $t('selectAll') }}
          option(v-for="date in dateList", :value='date') {{useGet(date, 'date')}}
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
      class="max-w-[400px] flex-1"
    )
      li(
        v-for="list in showSongArray",
        v-show="list.showDate",
      )
        div(
          class="p-[10px] flex items-center justify-between cursor-pointer bg-[#5FA8D3]",
          class="sticky top-[160px] md:top-[132px]"
          @click="list.showList = !list.showList"
        )
          div(
            class="text-[#1B4965]"
          )
            p {{ list.date }}
            p(class="line-clamp-1") {{ list.streamName }}
          div(
            :class="{'-rotate-90': !list.showList, 'rotate-90': list.showList}"
          )
            div(
              class="w-[10px] h-[1px] bg-[#1B4965] rotate-45 translate-y-[4px]"
            )
            div(
              class="w-[10px] h-[1px] bg-[#1B4965] -rotate-45 -translate-y-[4px]"
            )
        ul(
          :class="{'max-h-0': !list.showList, 'max-h-none': list.showList}",
          class="overflow-hidden transition-all duration-300",
        )
          li(
            v-for="song in list.songList",
            class="p-[10px] border-b-[1px] border-[#5FA8D3] cursor-pointer bg-[#CAE9FF]",
            @click="changeYoutube(song.songLink)"
            v-show="song.showDate",
          )
            p
              span {{ song.songName }}
              span(v-if="song.singer") {{ ` - ${song.singer}` }}
    div(
      class="flex-1 p-[10px] sticky md:p-[20px] md:top-[132px]",
      class="max-md:fixed max-md:top-0 max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:bg-[rgba(0,0,0,0.8)] max-md:z-50",
      class="max-md:flex max-md:items-center max-md:justify-between",
      class="transition-all duration-300"
      :class="{'opacity-100': iframeShow, 'opacity-0 pointer-events-none':!iframeShow}"
    )
      div(
        class="absolute top-0 bottom-0 right-0 left-0 z-30",
        @click="iframeShow = false"
      )
      div(class="relative z-40 w-full")
        div(
          class="w-[30px] h-[30px] absolute -top-[50px] right-0 rotate-45 cursor-pointer",
          @click="iframeShow = false"
        )
          div(
            class="w-full h-[1px] bg-white absolute left-0 top-[calc(50%-0.5px)]"
          )
          div(
            class="h-full w-[1px] bg-white absolute top-0 left-[calc(50%-0.5px)]"
          )
        iframe(
          :src="`https://www.youtube.com/embed/${iframeID}?autoplay=1&start=${iframeStart}`",
          allow="autoplay",
          class="w-full aspect-video",
          v-if="iframeID && iframeStart"
        )
        //- allow="autoplay",
</template>

<script setup>
import songListArray from '@/plugins/array.js';

const iframeShow = ref(false);


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
  iframeShow.value = true;
}

const dateSelect = () => {
  allSongSH(false);
  const SD = useGet(selectDate.value, 'date');
  if (SD !== '') {
    useFilter(showSongArray.value, (v) => {
      const matchDate = dayjs(v.date).format('YYYY/MM/DD');
      if (matchDate.match(new RegExp(SD, 'i'))) {
        useSet(v, 'showDate', true);
        useForEach(useGet(v, 'songList'), (song) => {
          useSet(song, 'showDate', true);
        })
      }
    })
  } else {
    allSongSH(true);
  }
}

import { useDayjs } from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()

onMounted(() => {
  useForEach(songListArray, (v, i) => {
    const getYear = {
      date: dayjs(v.date).format('YYYY')
    };
    const getM = dayjs(v.date).format('YYYY/MM');
    const findYear = useFind(dateList.value, { date: getYear.date });
    if (findYear) {
      const findM = useFind(dateList.value, {date: getM});
      if (findM) {
        dateList.value.push({
          date: dayjs(v.date).format('YYYY/MM/DD'),
        });
      } else {
        dateList.value.push({
          date: getM,
        });
        dateList.value.push({
          date: dayjs(v.date).format('YYYY/MM/DD'),
        });
      }
    } else {
      dateList.value.push(getYear);
      dateList.value.push({
        date: getM,
      });
      dateList.value.push({
        date: dayjs(v.date).format('YYYY/MM/DD'),
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

const { t } = useI18n()
useHead({
  title: t('searchSong'),
})

</script>