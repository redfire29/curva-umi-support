<template lang="pug">
div(
  class="overflow-hidden"
)
  section(
    class="bg-white fixed top-0 left-0 right-0 h-[450px] z-0 flex justify-center items-center"
  )
    div(
      class="flex items-center justify-center"
    )
      img(src="/curva-umi-support/img/logo.jpeg", class="h-[150px]", alt="Curva Umi Logo")
  div(
    ref="contentRef"
    class="relative z-10 bg-[linear-gradient(to_bottom,#002B49,#0077B6)] min-h-screen mt-[450px]"
  )
    div(class="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-full")
      svg(
        class="relative block w-full h-[50px] md:h-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      )
        defs
          path(
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          )
        g(class="parallax")
          use(ref="wave1" href="#gentle-wave" x="48" y="0" fill="rgba(0, 43, 73, 0.3)")
          use(ref="wave2" href="#gentle-wave" x="48" y="3" fill="rgba(0, 43, 73, 0.5)")
          use(ref="wave3" href="#gentle-wave" x="48" y="5" fill="rgba(0, 43, 73, 0.7)")
          use(ref="wave4" href="#gentle-wave" x="48" y="7" fill="#002B49")
    div(
      class="py-[40px] px-[10px] pb-[40px] max-w-[1200px] mx-auto"
    )
      ul(
        class="fixed left-0 right-0 top-0 bottom-0 pointer-events-none z-0"
      )
        li.bubble(
          v-for="bubble in 30",
          class="bg-white/5 border border-white/20 rounded-full aspect-square absolute top-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        )
          div(
            class="bg-white/30 left-[15%] top-[20%] w-[20%] aspect-square absolute rounded-full filter blur-[1px]"
          )
        li.bubble-glow(
          v-for="glow in 5",
          class="bg-mint-green/20 blur-[50px] rounded-full aspect-square absolute pointer-events-none"
        )

      div(
        class="relative z-20 space-y-[40px]"
      )
        section(
          class="glass-card p-[20px] md:p-[40px] text-center"
        )
          div(
            class="flex items-center justify-center gap-[10px] flex-wrap"
          )
            p(
              data-aos="fade-up",
              class="text-[18px] text-pearl-white whitespace-pre-wrap"
            ) {{ t('about-web') }}
            a(
              data-aos="fade-up",
              href="https://t.co/oKazNascfC",
              target="_blank",
              class="group"
            )
              div(
                class="flex items-center"
              )
                div(
                  class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full md:group-hover:bg-mint-green transition-colors duration-300"
                )
                  img(src="/curva-umi-support/img/discord.svg", class="w-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300")

                p うみサポ Discord
          div(
            class="flex items-center justify-center mt-[10px]"
          )
            p(
              data-aos="fade-up",
              class="text-[12px] text-pearl-white whitespace-pre-wrap"
            ) {{ t('ps') }}
        section(
          class="glass-card p-[20px] md:p-[40px]"
        )
          h2(
            data-aos="fade-up",
            class="text-[32px] mb-[20px] text-coral-sun font-bold tracking-[2px]"
          )
            span {{ t('about-h2') }}
            //- span(
            //-   class="text-[20px] ml-[5px]"
            //- ) Who is Curva Umi?
          div
            div(
              class="md:flex items-start mt-[10px]"
            )
              //- div(
              //-   data-aos="fade-up",
              //-   class="max-w-[430px] h-[720px] bg-[#CAE9FF] mx-auto w-full"
              //- )
              //-   p(class="px-[10px]") 圖片
              div(
                data-aos="fade-up",
                class="max-w-[430px] mx-auto w-full"
              )
                //- p(class="px-[10px]") 圖片
                img(src="/curva-umi-support/img/picture.jpeg")
              div(
                class="flex-1 mt-[10px] md:mt-0 md:ml-[10px] lg:ml-[30px]"
              )
                h3(
                  data-aos="fade-up",
                  class="text-[22px] text-coral-sun mb-[10px]"
                )
                  span 來羽うみ
                  span(
                    class="text-[18px] ml-[5px]"
                  ) Curva Umi
                p(
                  data-aos="fade-up",
                  class="text-[18px] text-pearl-white mb-[10px] whitespace-pre-wrap"
                ) {{ t('about') }}
                p(
                  data-aos="fade-up",
                  class="text-[16px] mb-[5px]"
                ) {{ t('info') }}
                ul(
                  class="grid grid-cols-1 md:grid-cols-2 gap-x-[5px] gap-y-[5px] mb-[10px]"
                )
                  li(
                    v-for="info in information",
                    data-aos="fade-up",
                    class="p-[5px_10px] border-[1px] rounded-[5px] border-mint-green/50 bg-white/10 text-[14px]"
                  )
                    p {{ `${info.title}: ${info.content}` }}
                p(
                  data-aos="fade-up",
                  class="text-[16px] mb-[5px]"
                ) {{ t('tag') }}
                ul(
                  class="grid grid-cols-1 md:grid-cols-2 gap-x-[5px] gap-y-[5px] mb-[10px]"
                )
                  li(
                    v-for="info in tags",
                    data-aos="fade-up",
                    class="p-[5px_10px] border-[1px] rounded-[5px] border-mint-green/50 bg-white/10 text-[14px]"
                  )
                    p {{ `${info.title}:` }}
                    p
                      span(v-for="(tag, index) in info.content")
                        a(
                          :href="info?.tagLink?.[index]",
                          target="_blank",
                          class="border-b-[1px] border-mint-green text-mint-green hover:text-white transition-colors"
                          v-if="info?.tagLink?.[index]"
                        ) {{ tag }}
                        span(v-else) {{ tag }}
                div(
                  class="flex items-center mt-[10px]"
                )
                  p(data-aos="fade-up") Link
                  ul(
                    class="flex items-center ml-[5px]"
                  )
                    li(
                      data-aos="fade-up",
                      class="mx-[5px]"
                    )
                      a(
                        href="https://x.com/curva_umi", target="_blank",
                        class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full group md:hover:bg-mint-green transition-colors duration-300"
                      )
                        img(src="/curva-umi-support/img/twitter-x.svg", class="w-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300")

                    li(
                      data-aos="fade-up",
                      class="mx-[5px]"
                    )
                      a(
                        href="https://www.youtube.com/@curvaumi", target="_blank",
                        class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full group md:hover:bg-mint-green transition-colors duration-300"
                      )
                        img(src="/curva-umi-support/img/youtube.svg", class="w-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300")

        h2(
          data-aos="fade-up",
          class="text-[32px] mt-[10px] text-coral-sun font-bold tracking-[2px]"
        ) {{ t('design-h2')}}
        section(
          class="glass-card p-[20px] md:p-[40px] mt-[40px]",
          v-for="(design, index) in designList"
        )
          h2(
            data-aos="fade-up"
          ) {{ design.title }}
          div(
            data-aos="fade-up",
            class="py-[10px]",
            v-for="item in design.design"
          )
            ul(
              class="bg-white/5 flex items-center max-md:flex-col gap-[10px] p-[10px] rounded-lg"
            )
              li(
                v-for="img in item?.imgList",
              )
                img(:src="img.src", :alt="img.alt", class="max-h-[500px] object-contain mx-auto")
          div(
            v-if="design?.member?.length > 0"
          )
            p(
              class="mb-[10px] border-b-[1px] border-pearl-white/30 pb-[10px]"
            ) {{ t('design-member') }}
            ul(
              class="grid md:grid-cols-2 gap-[10px]"
            )
              li(
                v-for="member in design.member"
                data-aos="fade-up"
              )
                h2(
                  class="mt-[0px]"
                ) {{ `${member?.title}` }}
                div(
                  class="flex items-center py-[10px] gap-x-[10px]"
                )
                  
                  div
                    p {{ member?.name }}
                  ul(
                    class="flex items-center"
                  )
                    li(
                      data-aos="fade-up",
                      class="mx-[5px]",
                      v-if="member?.twitter"
                    )
                      a(
                        :href="member?.twitter", target="_blank",
                        class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full group md:hover:bg-mint-green transition-colors duration-300"
                      )
                        img(src="/curva-umi-support/img/twitter-x.svg", class="w-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300")

                    li(
                      data-aos="fade-up",
                      class="mx-[5px]",
                      v-if="member?.youtube"
                    )
                      a(
                        :href="member?.youtube", target="_blank",
                        class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full group md:hover:bg-mint-green transition-colors duration-300 text-pearl-white"
                      )
                        img(src="/curva-umi-support/img/youtube.svg", class="w-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300")

          div(
            data-aos="fade-up",
            class="h-[1px] w-full bg-pearl-white/20 mt-[10px]",
            :class="{'hidden': index == designList.length - 1}"
          )
        section(
          class="glass-card p-[20px] md:p-[40px] mt-[40px]"
        )
          h2(
            data-aos="fade-up",
            class="text-[32px] mb-[20px] text-coral-sun font-bold tracking-[2px]"
          ) {{ t('about-history') }}
          ul(
            class="relative border-l border-mint-green/30 ml-[10px] space-y-[30px]"
          )
            li(
              v-for="history in historyList",
              data-aos="fade-up",
              class="relative pl-[30px]",
            )
              //- Timeline dot
              div(
                class="absolute left-[-5px] top-[8px] w-[10px] h-[10px] rounded-full bg-mint-green shadow-[0_0_10px_rgba(152,226,198,0.5)]"
              )
              p(
                class="text-[14px] text-mint-green mb-[5px] font-bold tracking-wider"
              ) {{history?.time}}
              div(
                class="text-[16px] text-pearl-white"
              )
                a(
                  :href="history?.link"
                  target="_blank"
                  class="hover:text-mint-green transition-colors border-b border-transparent hover:border-mint-green"
                  v-if="history?.link"
                ) {{history?.content}}
                p(
                  v-else
                ) {{history?.content}}
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from "gsap";
import { forEach, random } from 'lodash-es';


const props = defineProps({
  locale: { type: String, default: 'ja' },
  messages: { type: Object, default: () => ({}) }
});

const t = (key) => props.messages[key] || key;

const contentRef = ref(null);
const wave1 = ref(null);
const wave2 = ref(null);
const wave3 = ref(null);
const wave4 = ref(null);


const handleScroll = () => {
  if (!contentRef.value) return;
  const rect = contentRef.value.getBoundingClientRect();
  // 當內容區塊頂部接觸到視窗頂部 (考慮 Header 高度約 60-80px)
  // 設定一個觸發點，例如 Header 高度下緣
  const triggerPoint = 80; 
  const isDark = rect.top <= triggerPoint;
  
  window.dispatchEvent(new CustomEvent('update-header-style', { detail: { isDark } }));
};


onMounted(() => {
  // Wave Animation (Parallax Seamless Loop)
  // Period for gentle-wave path is exactly 176 units (e.g. -40 to 136)
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
  if(wave3.value) {
    gsap.fromTo(wave3.value, 
      { attr: { x: -40 } },
      { attr: { x: 136 }, duration: 10, repeat: -1, ease: 'linear' }
    );
  }
  if(wave4.value) {
    gsap.fromTo(wave4.value, 
      { attr: { x: -40 } },
      { attr: { x: 136 }, duration: 6, repeat: -1, ease: 'linear' }
    );
  }

  // Bubbles
  forEach(document.querySelectorAll('.bubble'), (bubble) => {
    if (bubble) {
      const depth = Math.random(); // 0 (far) to 1 (near)
      const size = 10 + depth * 40; // 10px to 50px
      const blur = (1 - depth) * 2; // Reduced blur: 0px to 2px
      
      gsap.set(bubble, {
        width: `${size}px`,
        left: `${random(0, 100)}vw`,
        top: '105vh',
        opacity: 0,
        filter: `blur(${blur}px)`
      })

      gsap.to(bubble, {
        duration: 15 + (1 - depth) * 20, // 15s to 35s - Slightly faster
        top: '-10vh',
        opacity: 0.2 + depth * 0.5, // 0.2 to 0.7 - More visible
        ease: "none",
        repeat: -1,
        // Start delay random to distribute bubbles vertically over time
        delay: random(0, 30),
        x: `+=${random(-50, 50)}`,
        modifiers: {
          x: (x) => {
             // Gentle sine wave wobble
             return parseFloat(x) + Math.sin(parseFloat(x)/15) * 40 + "px"; // Increased wobble
          }
        },
        onStart: () => {
             // Set initial random Y for the very first loop to fill screen immediately?
             // Actually, delay handles staggering. To fill screen now, we might need pre-calculation.
             // But simpler is just let them rise. To avoid empty screen at start:
             // We can manually set some to random 'top' values initially.
        }
      })
      
      // Quick fix to fill screen on load:
      if (Math.random() > 0.4) {
          gsap.set(bubble, { top: `${random(0, 100)}vh`, opacity: 0.2 + depth * 0.5 })
      }
    }
  })

  // Ambient Glow
  forEach(document.querySelectorAll('.bubble-glow'), (glow) => {
      if(glow) {
          gsap.set(glow, {
              width: `${random(200, 500)}px`,
              left: `${random(-20, 100)}vw`,
              top: `${random(-20, 100)}vh`,
              opacity: random(0.3, 0.6)
          })
          gsap.to(glow, {
              duration: random(10, 20),
              x: random(-100, 100),
              y: random(-100, 100),
              opacity: random(0.2, 0.5),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
          })
      }
  })


  // Scroll Listener
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});



const information = [
  {
    title: t('infor-birthday'),
    content: t('infor-birthday-content'),
  },
  {
    title: t('infor-blood'),
    content: 'O',
  },
  {
    title: 'MBTI',
    content: 'ISFP',
  },
  {
    title: t('infor-like'),
    content: t('infor-like-content'),
  },
  {
    title: t('infor-like-food'),
    content: t('infor-like-food-content'),
  },
]

const tags = [
  {
    title: t('fan-mark'),
    content: ['🐧⚽️'],
  },
  {
    title: t('fan-name'),
    content: ['#うみサポ'],
    tagLink: ['https://x.com/search?q=%23%E3%81%86%E3%81%BF%E3%82%B5%E3%83%9D&src=hashtag_click'],
  },
  {
    title: t('fan-tag'),
    content: ['#うみチャント'],
    tagLink: ['https://x.com/hashtag/%E3%81%86%E3%81%BF%E3%83%81%E3%83%A3%E3%83%B3%E3%83%88?src=hashtag_click'],
  },
  {
    title: t('fan-art'),
    content: ['#うみコレオ'],
    tagLink: ['https://x.com/hashtag/%E3%81%86%E3%81%BF%E3%82%B3%E3%83%AC%E3%82%AA?src=hashtag_click'],
  },
  {
    title: t('song-request'),
    content: ['#うみクロス'],
    tagLink: ['https://x.com/hashtag/%E3%81%86%E3%81%BF%E3%82%AF%E3%83%AD%E3%82%B9?src=hashtag_click'],
  },
  {
    title: t('all-type'),
    content: ['#來羽うみ'],
    tagLink: ['https://x.com/hashtag/%E4%BE%86%E7%BE%BD%E3%81%86%E3%81%BF?src=hashtag_click'],
  },
]


const designList = [
  {
    title: t('design01'),
    design: [
      {
        imgList: [
          {
            src: '/curva-umi-support/design/01/picture.jpeg',
            alt: '初期衣裝1',
          },
          {
            src: '/curva-umi-support/design/01/picture2.jpeg',
            alt: '初期衣裝2',
          },
          {
            src: '/curva-umi-support/design/01/picture3.jpeg',
            alt: '初期衣裝3',
          }
        ],
      },
    ],
    member: [
      {
        title: `${t('design-1-1')}`,
        name: 'ユウシイ様',
        img: 'img link',
        twitter: 'https://x.com/Zoey_Yusi',
        youtube: '',
      },
      {
        title: `${t('design-1-2')}`,
        name: 'agasa.様',
        img: 'img link',
        twitter: 'https://x.com/977red',
        youtube: '',
      },
    ]
  },
]

const historyList = [
  {
    time: '2026-01-22',
    content: t('history-20260122-1'),
    link: 'https://www.youtube.com/live/qPItULFQajY?si=Jqtc5Yu8Yn3XgY-R',
  },
  {
    time: '2025-12-31',
    content: t('history-20251231-1'),
    link: 'https://www.youtube.com/live/ItNOFoiCwfs?si=mpK0GvtCszmYa1vQ',
  },
  {
    time: '2025-12-8',
    content: t('history-20251208-1'),
    link: 'https://www.youtube.com/live/ItNOFoiCwfs?si=mpK0GvtCszmYa1vQ',
  },
  {
    time: '2025-11-26',
    content: t('history-20251126-1'),
    link: 'https://www.youtube.com/live/m7pPUub8Sys?si=q12gGICR9Kd0dlC8',
  },
  {
    time: '2025-11-03',
    content: t('history-20251103-1'),
    link: 'https://www.youtube.com/live/TeEt649K6-g?si=2r4QMsWBa3UYOXKQ',
  },
  {
    time: '2025-10-02',
    content: t('history-20251002-1'),
    link: 'https://www.youtube.com/live/0hcpR1LH35g?si=_zvatOC8_02dpOrI',
  },
  {
    time: '2025-09-04',
    content: t('history-20250904-1'),
    link: 'https://www.youtube.com/live/z_ZOos5Ez08?si=34PGQf8rEGEKgtkJ',
  },
  {
    time: '2025-08-04',
    content: t('history-20250804-1'),
    link: 'https://www.youtube.com/live/9cahdDlSJXg?si=qqavhmn9ifU20SIx',
  },
  {
    time: '2025-07-21',
    content: t('history-20250721-1'),
    link: 'https://www.youtube.com/live/pA8CZnvr3w0?si=y7n2P2yjmnKzIWTB',
  },
  {
    time: '2025-06-19',
    content: t('history-20250619-1'),
    link: 'https://www.youtube.com/live/-nNHZAV9Ijo?si=V0eerGe9kOMHGAEV',
  },
  {
    time: '2025-05-27',
    content: t('history-20250527-1'),
    link: 'https://www.youtube.com/live/hl35d_VJ6Ew?si=EVHJmRtqp9XzgydZ',
  },
  {
    time: '2025-05-05',
    content: t('history-20250505-1'),
    link: 'https://www.youtube.com/live/hl35d_VJ6Ew?si=EVHJmRtqp9XzgydZ',
  },
  {
    time: '2025-04-24',
    content: t('history-20250424-1'),
    link: 'https://www.youtube.com/live/wPdS9uk_8B4?si=3tw1T6TGvTspmjnM',
  },
  {
    time: '2025-04-10',
    content: t('history-20250410-1'),
    link: 'https://www.youtube.com/live/R-ZaTGDJej4?si=E2yjP5CeCSI2KViZ',
  },
  {
    time: '2025-03-31',
    content: t('history-20250331-1'),
    link: 'https://www.youtube.com/live/T8qAMNmxeCc?si=gLPMcur7TgBlUc_5',
  },
  {
    time: '2025-03-20',
    content: t('history-20250320-1'),
    link: 'https://www.youtube.com/live/xaSPFvWIHhk?si=wmdrFwqzyxyYO0-a',
  },
  {
    time: '2025-02-27',
    content: t('history-20250227-1'),
    link: 'https://www.youtube.com/live/w3AhT1-zTWU?si=--9AmD35XhFINtdT',
  },
  {
    time: '2025-02-20',
    content: t('history-20250220-1'),
    link: 'https://www.youtube.com/live/kxVDGFxgOYQ?si=7wBLDuXVbKT5nDGK',
  },
  {
    time: '2025-02-11',
    content: t('history-20250211-1'),
    link: 'https://www.youtube.com/live/TOeNTd-pHtI?si=0j63Qov-tBfHUapO',
  },
  {
    time: '2025-01-23',
    content: t('history-20250123-1'),
    link: 'https://www.youtube.com/live/HRq1MVhPS5A?si=fg21_CmPBtaWUSAW',
  },
  {
    time: '2024-12-07',
    content: t('history-241207-1'),
    link: 'https://x.com/curva_umi/status/1865368844900118723',
  },
]
</script>

<style>
.glass-card {
  @apply bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:bg-white/10 transition-colors duration-500;
}
</style>
