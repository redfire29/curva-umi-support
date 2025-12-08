<template lang="pug">
div(
  class="overflow-hidden"
)
  section(
    class="pt-[210px] -mb-[1px] relative"
  )
    div(
      data-aos="fade-up",
      class="fixed top-0 left-0 right-0 h-[210px] -z-10 flex items-center justify-center"
    )
      img(src="~/assets/img/logo.jpeg", class="h-[100px]", alt="Curva Umi Logo")
  wave
  div(
    class="bg-[#62B6CB] relative py-[20px] px-[10px] pb-[40px]"
  )
    ul(
      class="absolute left-0 right-0 top-0 bottom-0"
    )
      li.bubble(
        v-for="bubble in [1,2,3,4,5,6,7,8,9,10]",
        class="bg-[rgba(255,255,255,0.2)] rounded-full aspect-square absolute top-full"
      )
        div(
          class="bg-[rgba(255,255,255,0.2)] left-[10%] top-[20%] w-1/4 aspect-square absolute rounded-full"
        )

    div(
      class="max-w-[1200px] mx-auto relative z-20"
    )
      section(
        class="mb-[20px]"
      )
        div(
          class="flex items-center justify-center gap-[10px] flex-wrap"
        )
          p(
            data-aos="fade-up",
            class="text-[18px] text-[#1B4965] whitespace-pre-wrap"
          ) {{ $t('about-web') }}
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
                class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full md:group-hover:bg-[#1B4965]"
              )
                img(src="~/assets/img/discord.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
              p うみサポ Discord
        div(
          class="flex items-center justify-center mt-[10px]"
        )
          p(
            data-aos="fade-up",
            class="text-[12px] text-[#1B4965] whitespace-pre-wrap"
          ) {{ $t('ps') }}
      section(
        class="mb-[20px]"
      )
        h2(
          data-aos="fade-up",
          class="text-[32px] mb-[20px] text-[#1B4965] font-bold tracking-[2px]"
        )
          span {{ $t('about-h2') }}
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
              img(src="~/assets/img/picture.jpeg")
            div(
              class="flex-1 mt-[10px] md:mt-0 md:ml-[10px] lg:ml-[30px]"
            )
              h3(
                data-aos="fade-up",
                class="text-[22px] text-[#1B4965] mb-[10px]"
              )
                span 來羽うみ
                span(
                  class="text-[18px] ml-[5px]"
                ) Curva Umi
              p(
                data-aos="fade-up",
                class="text-[18px] text-[#1B4965] mb-[10px] whitespace-pre-wrap"
              ) {{ $t('about') }}
              p(
                data-aos="fade-up",
                class="text-[16px] mb-[5px]"
              ) {{ $t('info') }}
              ul(
                class="grid grid-cols-2 gap-x-[5px] gap-y-[5px] mb-[10px]"
              )
                li(
                  v-for="info in information",
                  data-aos="fade-up",
                  class="p-[5px_10px] border-[1px] rounded-[5px] border-[#5FA8D3] bg-[#CAE9FF] text-[14px]"
                )
                  p {{ `${info.title}: ${info.content}` }}
              p(
                data-aos="fade-up",
                class="text-[16px] mb-[5px]"
              ) {{ $t('tag') }}
              ul(
                class="grid grid-cols-2 gap-x-[5px] gap-y-[5px] mb-[10px]"
              )
                li(
                  v-for="info in tags",
                  data-aos="fade-up",
                  class="p-[5px_10px] border-[1px] rounded-[5px] border-[#5FA8D3] bg-[#CAE9FF] text-[14px]"
                )
                  p {{ `${info.title}:` }}
                  p
                    span(v-for="(tag, index) in info.content")
                      a(
                        :href="info?.tagLink?.[index]",
                        target="_blank",
                        class="border-b-[1px] border-[#1B4965]"
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
                      class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full group md:hover:bg-[#1B4965]"
                    )
                      img(src="~/assets/img/twitter-x.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
                  li(
                    data-aos="fade-up",
                    class="mx-[5px]"
                  )
                    a(
                      href="https://www.youtube.com/@curvaumi", target="_blank",
                      class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full group md:hover:bg-[#1B4965]"
                    )
                      img(src="~/assets/img/youtube.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
      h2(
        data-aos="fade-up",
        class="text-[32px] mt-[10px] text-[#1B4965] font-bold tracking-[2px]"
      ) {{ $t('design-h2')}}
      section(
        class="mt-[10px]",
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
            class="bg-white flex items-center max-md:flex-col gap-[10px] p-[10px]"
          )
            li(
              v-for="img in item?.imgList",
            )
              img(:src="img.src", :alt="img.alt", class="max-h-[500px] object-contain mx-auto")
        div(
          v-if="design?.member?.length > 0"
        )
          p(
            class="mb-[10px] border-b-[1px] border-[#1B4965] pb-[10px]"
          ) {{ $t('design-member') }}
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
                      class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full group md:hover:bg-[#1B4965]"
                    )
                      img(src="~/assets/img/twitter-x.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
                  li(
                    data-aos="fade-up",
                    class="mx-[5px]",
                    v-if="member?.youtube"
                  )
                    a(
                      :href="member?.youtube", target="_blank",
                      class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full group md:hover:bg-[#1B4965]"
                    )
                      img(src="~/assets/img/youtube.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
        div(
          data-aos="fade-up",
          class="h-[1px] w-full bg-[#1B4965] mt-[10px]",
          :class="{'hidden': index == designList.length - 1}"
        )
      section(
        class="pt-[10px] mt-[10px] border-t-[1px] border-[#1B4965] pb-[50px]",
      )
        h2(
          data-aos="fade-up",
          class="text-[32px] mb-[20px] text-[#1B4965] font-bold tracking-[2px]"
        ) {{ $t('about-history') }}
        ul(
          class=""
        )
          li(
            v-for="history in historyList",
            data-aos="fade-up",
            class="flex items-start",
            class="text-[18px] text-[#1B4965] mb-[20px] last:mb-0"
          )
            p(
              class="mr-[10px] flex-none"
            ) {{history?.time}}
            a(
              :href="history?.link"
              target="_blank"
              class="border-b-[1px] border-[#1B4965]"
              class="md:hover:text-[#CAE9FF]"
              v-if="history?.link"
            )
              p {{history?.content}}
            p(
              v-else
            ) {{history?.content}}
</template>

<script setup>
const { setLocale, t } = useI18n()

import { gsap } from "gsap";

onMounted(() => {
  useForEach(document.querySelectorAll('.bubble'), (bubble) => {
    if (bubble) {
      gsap.set(bubble, {
        width: `${useRandom(10, 50)}px`,
        left: `${useRandom(5, 95)}vw`,
      })
      gsap.to(bubble, useRandom(5, 15), {
        top: 0,
        delay: useRandom(0, 1),
        x: Math.PI * 4,
        opacity: 0,
        modifiers: {
          x: (x) => {
            return Math.sin(parseFloat(x)) * 30 + "px";
          },
          delay: (x) => {
            return Math.sin(parseFloat(x)) * 0.5;
          },
        },
        stagger: {
          repeat: -1
        }
      })
    }
  })
})


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
  // {
  //   title: t('design02'),
  //   design: ['圖片網址'],
  //   member: [
  //     {
  //       title: `${t('design-art')}`,
  //       name: 'Art Name2',
  //       img: 'img link2',
  //       twitter: 'https://x.com/curva_umi',
  //       youtube: 'https://www.youtube.com/@curvaumi',
  //     },
  //     {
  //       title: `${t('design-live')}`,
  //       name: 'Live2D Name2',
  //       img: 'img link2',
  //       twitter: 'https://x.com/curva_umi',
  //       youtube: 'https://www.youtube.com/@curvaumi',
  //     },
  //   ]
  // }
]

const historyList = [
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

useHead({
  titleTemplate: () => {
    return '來羽うみSupport';
  },
})
</script>
