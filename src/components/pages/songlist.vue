<template lang="pug">
div(class="min-h-screen relative bg-deep-sea pt-[57px]")
  //- Background Layer
  section(
    class="fixed top-0 left-0 right-0 h-[450px] z-0 flex justify-center items-center pointer-events-none overflow-hidden"
  )
    div(
      class="flex items-center justify-center opacity-30"
    )
      //- Reusing logo or just keeping gradient
  
  //- Main Content Layer
  div(
    ref="contentRef"
    class="relative z-10 w-full min-h-screen"
  )
    //- Wave Decoration (Top)
    div(class="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[-20%]")
      //- Optional: Add some top spacer or gradient if needed, 
      //- but since this page starts with content, maybe just keep background clean or reuse wave from index if requested.
      //- For now, let's stick to a clean top padding.

    div(
      class="py-[20px] px-[10px] md:px-[20px] max-w-[1400px] mx-auto"
    )
      
      div(class="grid grid-cols-1 lg:grid-cols-[1fr_30%] xl:grid-cols-[1fr_400px] gap-[20px]")
        //- Left Column: Search & List
        div(class="space-y-[20px]")
          
          //- Search Section
          div(
            class="glass-card p-[20px] sticky top-[77px] z-30"
          )
            h2(class="text-[24px] font-bold mb-[15px] text-mint-green") {{ t('searchSong') }}
            div(class="flex flex-col gap-[15px]")
              //- Search Inputs
              div(class="flex flex-col md:flex-row gap-[10px]")
                div(class="flex-1 flex bg-white/10 rounded-lg overflow-hidden border border-mint-green/30 group focus-within:border-mint-green transition-colors")
                  input(
                    v-model="searchWord",
                    class="flex-1 bg-transparent text-pearl-white px-[15px] py-[10px] outline-none placeholder-pearl-white/40"
                    :placeholder="t('searchSongName')"
                    @keyup.enter="SearchSong('songName')"
                  )
                  button(
                    @click="SearchSong('songName')",
                    class="px-[20px] bg-white/5 hover:bg-mint-green hover:text-deep-sea transition-colors flex items-center justify-center border-l border-white/10 shrink-0"
                  )
                    span(class="material-icons-round text-[20px]") search
                
                div(class="flex-1 flex bg-white/10 rounded-lg overflow-hidden border border-mint-green/30 group focus-within:border-mint-green transition-colors")
                  input(
                    v-model="searchSingerInput", 
                    class="flex-1 bg-transparent text-pearl-white px-[15px] py-[10px] outline-none placeholder-pearl-white/40"
                    :placeholder="t('searchSinger')"
                    @keyup.enter="SearchSong('singer')"
                  )
                  button(
                    @click="SearchSong('singer')",
                    class="px-[20px] bg-white/5 hover:bg-mint-green hover:text-deep-sea transition-colors flex items-center justify-center border-l border-white/10 shrink-0"
                  )
                    span(class="material-icons-round text-[20px]") search

              //- Date Filter
              div(class="flex items-center gap-[10px]")
                span(class="text-sm text-pearl-white/70") {{ t('dateSelect') }}:
                div(class="relative flex-1")
                  select(
                    v-model="selectDate", @change="dateSelect()",
                    class="w-full bg-white/10 border border-mint-green/30 rounded-lg px-[15px] py-[8px] text-pearl-white outline-none focus:border-mint-green appearance-none cursor-pointer"
                  )
                    option(value="" class="text-deep-sea") {{ t('selectAll') }}
                    option(v-for="date in dateList", :value='date' class="text-deep-sea") {{ get(date, 'date') }}
                  div(class="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none")
                    span(class="text-[12px] opacity-70") ▼

          //- Song List
          div(class="space-y-[15px]")
            div(
              v-for="list in showSongArray",
              v-show="list.showDate",
              class="glass-card"
            )
              //- Header
              div(
                class="p-[15px] md:p-[20px] flex items-center justify-between cursor-pointer bg-deep-sea/95 backdrop-blur-md hover:bg-white/10 transition-colors sticky top-[340px] md:top-[280px] z-20 border-b border-white/10 rounded-2xl"
                @click="list.showList = !list.showList"
              )
                div
                  div(class="flex items-center gap-[10px] mb-[5px]")
                    span(class="px-[8px] py-[2px] rounded text-[12px] bg-curacao/50 border border-curacao text-pearl-white") {{ list.date }}
                    span(class="text-[12px] opacity-70") {{ get(list, 'songList.length', 0) }} Songs
                  h3(class="text-[16px] md:text-[18px] font-bold text-pearl-white line-clamp-1") {{ list.streamName }}
                
                div(
                  class="w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300"
                  :class="{'-rotate-180': list.showList}"
                )
                  span(class="text-[20px]") ▼

              //- Body
              div(
                class="transition-all duration-300 ease-in-out overflow-hidden"
                :class="{'max-h-0 opacity-0': !list.showList, 'max-h-[2000px] opacity-100': list.showList}"
              )
                ul(class="border-t border-white/10")
                  li(
                    v-for="song in list.songList",
                    v-show="song.showDate",
                    class="p-[12px_20px] border-b border-white/5 last:border-0 hover:bg-mint-green/10 transition-colors cursor-pointer group flex items-center justify-between gap-[10px]"
                    :class="{'bg-mint-green/20': currentPlayingUrl === song.songLink}"
                    @click="changeYoutube(song.songLink, song, list)"
                  )
                    div(class="flex-1")
                      p(class="text-[15px] font-medium text-pearl-white group-hover:text-mint-green transition-colors") {{ song.songName }}
                      p(class="text-[13px] text-pearl-white/60" v-if="song.singer") {{ song.singer }}
                    
                    div(class="opacity-0 group-hover:opacity-100 transition-opacity")
                      span(class="text-mint-green") ▶

        //- Right Column: Desktop Player (Sticky)
        div(class="hidden lg:block" v-if="!isMobile") 
          div(class="sticky top-[90px] space-y-[20px]")
            div(class="glass-card overflow-hidden shadow-2xl")
              div(
                v-if="!iframeID"
                class="aspect-video w-full bg-black/40 flex flex-col items-center justify-center text-pearl-white/50"
              )
                span(class="text-[40px] mb-[10px]") 🎵
              
              iframe(
                v-else
                :src="`https://www.youtube.com/embed/${iframeID}?autoplay=1&start=${iframeStart}`",
                allow="autoplay; encrypted-media; picture-in-picture",
                allowfullscreen,
                class="w-full aspect-video bg-black"
              )
            
            //- Info Card
            div(
              v-if="currentSong"
              class="glass-card p-[20px]"
            )
              h3(class="text-[18px] font-bold text-mint-green mb-[5px]") Now Playing
              p(class="text-[16px] font-medium mb-[5px]") {{ currentSong.songName }}
              p(class="text-[14px] text-pearl-white/70 mb-[15px]") {{ currentSong.singer }}
              div(class="flex bg-white/5 rounded p-[10px] items-center gap-[10px]")
                span(class="text-[12px]") 📅
                p(class="text-[13px]") {{ currentSong.date }}
                a(
                  :href="currentSong.originalLink" 
                  target="_blank"
                  class="ml-auto text-[12px] text-curacao hover:text-mint-green hover:underline"
                ) Original Stream

    //- Mobile Sticky Bottom Player (Teleported to body to avoid z-index/transform issues)
    Teleport(to="body")
      div(
        v-if="iframeShow && isMobile"
        class="fixed z-[999] transition-all duration-300 ease-out bg-[#002B49] border-t border-mint-green/30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex flex-col font-sans"
        :class="mobilePlayerClass"
      )
        //- Handle / Tab (Absolute position to sit on top or inside)
        div(
          class="absolute left-0 right-0 flex justify-center items-center z-20 cursor-pointer h-[30px] transition-all duration-300 touch-action-none"
          :class="isExpanded ? 'top-[10px]' : '-top-[30px]'"
          @click="toggleFullPlayer"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        )
          //- The Visual Tab/Button
          div(
            class="flex items-center justify-center bg-[#002B49] border-t border-x border-mint-green/30 px-[20px] h-full shadow-[0_-5px_10px_rgba(0,0,0,0.3)] transition-all duration-300"
            :class="isExpanded ? 'rounded-full w-[40px] px-0 bg-white/10 border-none' : 'rounded-t-xl w-[120px]'"
          )
              svg(
                class="w-[20px] h-[20px] text-pearl-white transition-transform duration-300"
                :class="{'rotate-180': isExpanded}"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              )
                polyline(points="18 15 12 9 6 15")
        
        //- Close Button (Always visible inside, top right)
        div(
          class="absolute right-[15px] top-[15px] z-30 w-[30px] h-[30px] flex items-center justify-center bg-black/20 rounded-full cursor-pointer hover:bg-red-500/20 active:scale-95 transition-all"
          @click.stop="iframeClose"
        )
           span(class="text-[14px] text-pearl-white hover:text-red-400") ✕

        //- Content Container
        div(
          class="flex-1 flex gap-[15px] p-[10px] transition-all duration-300 overflow-hidden"
          :class="mobileContentClass"
        )
          //- Player Container
          div(
            class="bg-black rounded-lg overflow-hidden flex-shrink-0 relative transition-all duration-300 shadow-xl"
            :class="isExpanded ? 'w-full aspect-video max-h-[60vh]' : 'h-full aspect-video'"
          )
              iframe(
                v-if="iframeID"
                :src="`https://www.youtube.com/embed/${iframeID}?autoplay=1&start=${iframeStart}`",
                allow="autoplay",
                class="w-full h-full"
              )
              //- Click overlay to expand (only visible in mini mode)
              div(
                v-if="!isExpanded"
                class="absolute top-0 left-0 w-full h-full bg-transparent cursor-pointer" 
                @click="toggleFullPlayer"
              ) 
          
          //- Info
          div(
            class="flex flex-col overflow-hidden transition-all duration-300"
            :class="isExpanded ? 'items-center text-center w-full px-[20px]' : 'flex-1 justify-center items-start'"
          )
            p(
              class="font-bold text-mint-green w-full transition-all"
              :class="isExpanded ? 'text-[20px] mb-[5px] whitespace-normal' : 'text-[14px] truncate'"
            ) {{ currentSong?.songName || 'Unknown Song' }}
            p(
              class="text-pearl-white/70 w-full transition-all"
              :class="isExpanded ? 'text-[16px] whitespace-normal' : 'text-[12px] truncate'"
            ) {{ currentSong?.singer }}
            
            //- Expanded Extra Info & Controls
            div(
              v-if="isExpanded"
              class="mt-[20px] flex flex-col items-center gap-[20px] opacity-0 animate-fadeIn w-full"
              :class="{'opacity-100': isExpanded}"
            )
               div(class="flex gap-[10px] items-center")
                  span(class="text-[12px] bg-white/10 px-[10px] py-[4px] rounded") {{ currentSong?.date }}
                  a(
                    v-if="currentSong?.originalLink"
                    :href="currentSong.originalLink" 
                    target="_blank"
                    class="text-[12px] text-curacao hover:text-mint-green hover:underline flex items-center gap-[5px]"
                  ) 
                    span 🔗 
                    span Original Stream
               


    //- Background Waves (Optional, keeps consistency with index)
    div(class="fixed bottom-0 left-0 w-full z-0 pointer-events-none opacity-20")
       svg(
        class="w-full h-[100px] md:h-[200px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      )
        defs
          path(
            id="gentle-wave-sl"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          )
        g(class="parallax")
          use(ref="wave1" href="#gentle-wave-sl" x="48" y="0" fill="rgba(255, 255, 255, 0.1)")
          use(ref="wave2" href="#gentle-wave-sl" x="48" y="3" fill="rgba(255, 255, 255, 0.05)")

</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { find, get, set, filter, forEach, concat } from 'lodash-es';
import dayjs from 'dayjs';
import { gsap } from "gsap";
import songListArray from '../../data/songList.js';

const props = defineProps({
  locale: { type: String, default: 'ja' },
  messages: { type: Object, default: () => ({}) }
});

const t = (key) => props.messages[key] || key;

// Animation Refs
const wave1 = ref(null);
const wave2 = ref(null);

// State
const iframeShow = ref(false);
const iframeID = ref('');
const iframeStart = ref('');
const currentPlayingUrl = ref('');
const currentSong = ref(null);
const isMobile = ref(false);
const isExpanded = ref(false);

const mobilePlayerClass = computed(() => {
  return [
    iframeShow.value ? 'translate-y-0' : 'translate-y-full',
    // Fix: Always bottom-0, animate height. Avoid inset-0 which toggles 'top' causing jumps.
    'bottom-0 left-0 right-0',
    isExpanded.value ? 'h-[100dvh] rounded-none' : 'h-[100px] rounded-t-none border-t-0'
  ]
}); 

const mobileContentClass = computed(() => {
    return [
        isExpanded.value ? 'flex-col items-center justify-start pt-[60px]' : 'flex-row items-center h-full',
        'w-full'
    ];
});


const songListAll = ref([]);
let showSongArray = ref([]);
const dateList = ref([]);
const selectDate = ref('');

// Search Inputs
const searchWord = ref('');
const searchSingerInput = ref(''); // Seperate input for singer if needed, currently reusing logic

// Logic to process data
const allSongSH = (sh) => {
  find(showSongArray.value,(findData) => {
    findData.showDate = sh;
    find(findData.songList, (song) => {
      song.showDate = sh;
    })
  });
}

const SearchSong = (searchKey) => {
  // Reset other input 
  if(searchKey === 'songName') searchSingerInput.value = '';
  if(searchKey === 'singer') searchWord.value = '';

  const term = searchKey === 'songName' ? searchWord.value : searchSingerInput.value;

  allSongSH(false);
  if (term != '') {
    find(songListAll.value, (findData) => {
      find(findData.songList, (song) => {
        if (get(song, searchKey)) {
          if (get(song, searchKey).match(new RegExp(term, 'i'))) {
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
    // Auto collapse all if reset? Optional.
  }
}

const changeYoutube = (url, song, listContext) => {
  const match = url.match(/v=([^&]+)/);
  if (!match) return;
  const videoId = match[1];
  const timeMatch = url.match(/[?&]t=(\d+)/);
  const time = timeMatch ? timeMatch[1] : '0';

  iframeID.value = videoId;
  iframeStart.value = time;
  iframeShow.value = true;
  currentPlayingUrl.value = url;
  
  // Set current song info
  currentSong.value = {
    ...song,
    date: listContext?.date || '',
    originalLink: url // rough store
  };
}

const touchStartY = ref(0);
const ignoreClick = ref(false);

const onTouchStart = (e) => {
  touchStartY.value = e.touches[0].clientY;
  ignoreClick.value = false;
}

const onTouchEnd = (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchEndY - touchStartY.value;
  const minSwipeDistance = 30; // 30px threshold

  if (Math.abs(diff) > minSwipeDistance) {
    ignoreClick.value = true;
    setTimeout(() => { ignoreClick.value = false; }, 300);
    
    // Negative diff = Swipe Up -> Expand
    // Positive diff = Swipe Down -> Collapse
    if (diff < 0) {
      isExpanded.value = true;
    } else {
      isExpanded.value = false;
    }
  }
}

const toggleFullPlayer = () => {
  if (ignoreClick.value) {
    ignoreClick.value = false;
    return;
  }
  isExpanded.value = !isExpanded.value;
}

const iframeClose = () => {
  iframeShow.value = false;
  isExpanded.value = false;
  iframeStart.value = '';
  currentPlayingUrl.value = '';
}

const dateSelect = () => {
  allSongSH(false);
  const SD = get(selectDate.value, 'date');
  if (SD !== '') {
    filter(showSongArray.value, (v) => {
      const matchDate = dayjs(v.date).format('YYYY/MM/DD');
      if (matchDate.match(new RegExp(SD, 'i'))) {
        set(v, 'showDate', true);
        forEach(get(v, 'songList'), (song) => {
          set(song, 'showDate', true);
        })
      }
    })
  } else {
    allSongSH(true);
  }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
}

onMounted(() => {
  // Mobile Check
  checkMobile();
  window.addEventListener('resize', checkMobile);

  // Data Processing
  forEach(songListArray, (v, i) => {
    const getYear = {
      date: dayjs(v.date).format('YYYY')
    };
    const getM = dayjs(v.date).format('YYYY/MM');
    const findYear = find(dateList.value, { date: getYear.date });
    if (findYear) {
      const findM = find(dateList.value, {date: getM});
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
    set(v, '[0]showDate', true);
    forEach(v.songList, (song) => {
      set(song, 'showDate', true);
    })
    songListAll.value = concat(songListAll.value, v);
  })
  showSongArray.value = songListAll.value;

  // Wave Animation
  if(wave1.value) {
    gsap.fromTo(wave1.value, 
      { attr: { x: -40 } },
      { attr: { x: 136 }, duration: 20, repeat: -1, ease: 'linear' }
    );
  }
  if(wave2.value) {
    gsap.fromTo(wave2.value, 
      { attr: { x: -40 } },
      { attr: { x: 136 }, duration: 15, repeat: -1, ease: 'linear' }
    );
  }
})

</script>

<style scoped>
/* Scoped styles if needed, but using mostly Tailwind */
</style>