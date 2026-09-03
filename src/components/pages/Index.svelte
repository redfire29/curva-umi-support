<script>
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";

  let { locale = "ja", messages = {} } = $props();
  const t = (key) => messages[key] || key;

  let contentRef;
  let sentinelRef;
  let wave1, wave2, wave3, wave4;

  let playingVideos = $state({});
  const playVideo = (id) => {
    playingVideos[id] = true;
  };

  const bubbles = Array.from({ length: 30 }, (_, i) => {
    const depth = ((i * 37) % 100) / 100;
    const size = Math.round(10 + depth * 40);
    const blur = ((1 - depth) * 2).toFixed(1);
    const duration = (15 + (1 - depth) * 20).toFixed(1);
    const left = ((i * 73) % 100).toFixed(0);
    const delay = (-((i * 19) % 35)).toFixed(1);
    const maxOpacity = (0.2 + depth * 0.5).toFixed(2);
    const drift = (((i * 43) % 80) - 40).toFixed(0);
    return { size, blur, duration, left, delay, maxOpacity, drift };
  });

  const glows = Array.from({ length: 5 }, (_, i) => {
    const size = Math.round(200 + ((i * 67) % 300));
    const left = (((i * 47) % 110) - 10).toFixed(0);
    const top = (((i * 59) % 110) - 10).toFixed(0);
    const duration = (12 + ((i * 23) % 8)).toFixed(1);
    const delay = (-((i * 17) % 10)).toFixed(1);
    return { size, left, top, duration, delay };
  });

  const information = [
    {
      title: t("infor-birthday"),
      content: t("infor-birthday-content"),
    },
    {
      title: t("infor-blood"),
      content: "O",
    },
    {
      title: "MBTI",
      content: "ISFP",
    },
    {
      title: t("infor-like"),
      content: t("infor-like-content"),
    },
    {
      title: t("infor-like-food"),
      content: t("infor-like-food-content"),
    },
  ];

  const tags = [
    {
      title: t("fan-mark"),
      content: ["🐧⚽️"],
    },
    {
      title: t("fan-name"),
      content: ["#うみサポ"],
      tagLink: [
        "https://x.com/search?q=%23%E3%81%86%E3%81%BF%E3%82%B5%E3%83%9D&src=hashtag_click",
      ],
    },
    {
      title: t("fan-tag"),
      content: ["#うみチャント"],
      tagLink: [
        "https://x.com/hashtag/%E3%81%86%E3%81%BF%E3%83%81%E3%83%A3%E3%83%B3%E3%83%88?src=hashtag_click",
      ],
    },
    {
      title: t("fan-art"),
      content: ["#うみコレオ"],
      tagLink: [
        "https://x.com/hashtag/%E3%81%86%E3%81%BF%E3%82%B3%E3%83%AC%E3%82%AA?src=hashtag_click",
      ],
    },
    {
      title: t("song-request"),
      content: ["#うみクロス"],
      tagLink: [
        "https://x.com/hashtag/%E3%81%86%E3%81%BF%E3%82%AF%E3%83%AD%E3%82%B9?src=hashtag_click",
      ],
    },
    {
      title: t("all-type"),
      content: ["#來羽うみ"],
      tagLink: [
        "https://x.com/hashtag/%E4%BE%86%E7%BE%BD%E3%81%86%E3%81%BF?src=hashtag_click",
      ],
    },
  ];

  const videosList = [
    {
      id: "9hfvOYmCBT4",
      title:
        "【歌ってみた】深海のリトルクライ- sasakure.UK / covered by 來羽うみ",
    },
    {
      id: "kUi7oJlsDyw",
      title: "【歌ってみた】愛言葉III- DECO*27/ covered by 來羽うみ",
    },
    {
      id: "PPLqef10u-w",
      title: "【歌ってみた】深海少女 - ゆうゆ / covered by 來羽うみ",
    },
  ];

  const memberVideosList = [
    {
      id: "1eppMHthx6Y",
      title: "【メンバー限定】一発録りでJANE DOE 歌ってみた🎤",
    },
    {
      id: "sdVuBa8-U68",
      title: "【メンバー限定】たくさん重ねて絶頂讃歌歌ってみた🎤",
    },
    {
      id: "fUs549OeHeY",
      title: "【メンバー限定】一発録りで星降る海歌ってみた",
    },
  ];

  const shortsList = [
    { id: "lJ1WHlZIqUg", title: "#心予報 #Eve #來羽うみ #vtuber #歌ってみた" },
  ];

  const designList = [
    {
      title: t("design01"),
      design: [
        {
          imgList: [
            {
              src: "/curva-umi-support/design/01/picture.jpeg",
              alt: "初期衣裝1",
              width: 814,
              height: 1200,
            },
            {
              src: "/curva-umi-support/design/01/picture2.jpeg",
              alt: "初期衣裝2",
              width: 1209,
              height: 1480,
            },
            {
              src: "/curva-umi-support/design/01/picture3.jpeg",
              alt: "初期衣裝3",
              width: 1461,
              height: 1487,
            },
          ],
        },
      ],
      member: [
        {
          title: `${t("design-1-1")}`,
          name: "ユウシイ様",
          img: "img link",
          twitter: "https://x.com/Zoey_Yusi",
          youtube: "",
        },
        {
          title: `${t("design-1-2")}`,
          name: "agasa.様",
          img: "img link",
          twitter: "https://x.com/977red",
          youtube: "",
        },
      ],
    },
  ];

  const historyList = [
    {
      time: "2026-08-23",
      content: t("history-20260823-1"),
      link: "https://www.youtube.com/watch?v=euHCpx74Fmk",
    },
    {
      time: "2026-07-20",
      content: t("history-20260720-1"),
      link: "https://www.youtube.com/watch?v=qSRNXCwA-Bc",
    },
    {
      time: "2026-06-21",
      content: t("history-20260621-1"),
      link: "https://www.youtube.com/watch?v=OKKbo6DJZQ0",
    },
    {
      time: "2026-06-04",
      content: t("history-20260604-1"),
      link: "https://www.youtube.com/watch?v=Er6tSdvLTxc",
    },
    {
      time: "2026-05-07",
      content: t("history-20260507-1"),
      link: "https://www.youtube.com/watch?v=yB2zE5HMbfE",
    },
    {
      time: "2026-05-03",
      content: t("history-20260503-1"),
      link: "https://www.youtube.com/watch?v=VVeAe0ewpek",
    },
    {
      time: "2026-04-14",
      content: t("history-20260414-1"),
      link: "",
    },
    {
      time: "2026-04-13",
      content: t("history-20260413-1"),
      link: "https://www.youtube.com/watch?v=n6e2zEWg_KY",
    },
    {
      time: "2026-03-01",
      content: t("history-20260301-1"),
      link: "",
    },
    {
      time: "2026-02-24",
      content: t("history-20260224-1"),
      link: "https://www.youtube.com/live/kajBPIsd_Rw",
    },
    {
      time: "2026-02-18",
      content: t("history-20260218-1"),
      link: "https://www.youtube.com/live/NVQ3T0NeXbI",
    },
    {
      time: "2026-02-13",
      content: t("history-20260213-1"),
      link: "https://www.youtube.com/live/fMuAT1PiFWM?si=fR_FvE-P879X569w",
    },
    {
      time: "2026-02-06",
      content: t("history-20260206-1"),
      link: "https://www.youtube.com/live/Mi8057rFUUw?si=lNGBmIEF3UtAfKww",
    },
    {
      time: "2026-01-22",
      content: t("history-20260122-1"),
      link: "https://www.youtube.com/live/qPItULFQajY?si=Jqtc5Yu8Yn3XgY-R",
    },
    {
      time: "2025-12-31",
      content: t("history-20251231-1"),
      link: "https://www.youtube.com/live/ItNOFoiCwfs?si=mpK0GvtCszmYa1vQ",
    },
    {
      time: "2025-12-8",
      content: t("history-20251208-1"),
      link: "https://www.youtube.com/live/ItNOFoiCwfs?si=mpK0GvtCszmYa1vQ",
    },
    {
      time: "2025-11-26",
      content: t("history-20251126-1"),
      link: "https://www.youtube.com/live/m7pPUub8Sys?si=q12gGICR9Kd0dlC8",
    },
    {
      time: "2025-11-03",
      content: t("history-20251103-1"),
      link: "https://www.youtube.com/live/TeEt649K6-g?si=2r4QMsWBa3UYOXKQ",
    },
    {
      time: "2025-10-02",
      content: t("history-20251002-1"),
      link: "https://www.youtube.com/live/0hcpR1LH35g?si=_zvatOC8_02dpOrI",
    },
    {
      time: "2025-09-04",
      content: t("history-20250904-1"),
      link: "https://www.youtube.com/live/z_ZOos5Ez08?si=34PGQf8rEGEKgtkJ",
    },
    {
      time: "2025-08-04",
      content: t("history-20250804-1"),
      link: "https://www.youtube.com/live/9cahdDlSJXg?si=qqavhmn9ifU20SIx",
    },
    {
      time: "2025-07-21",
      content: t("history-20250721-1"),
      link: "https://www.youtube.com/live/pA8CZnvr3w0?si=y7n2P2yjmnKzIWTB",
    },
    {
      time: "2025-06-19",
      content: t("history-20250619-1"),
      link: "https://www.youtube.com/live/-nNHZAV9Ijo?si=V0eerGe9kOMHGAEV",
    },
    {
      time: "2025-05-27",
      content: t("history-20250527-1"),
      link: "https://www.youtube.com/live/hl35d_VJ6Ew?si=EVHJmRtqp9XzgydZ",
    },
    {
      time: "2025-05-05",
      content: t("history-20250505-1"),
      link: "https://www.youtube.com/live/hl35d_VJ6Ew?si=EVHJmRtqp9XzgydZ",
    },
    {
      time: "2025-04-24",
      content: t("history-20250424-1"),
      link: "https://www.youtube.com/live/wPdS9uk_8B4?si=3tw1T6TGvTspmjnM",
    },
    {
      time: "2025-04-10",
      content: t("history-20250410-1"),
      link: "https://www.youtube.com/live/R-ZaTGDJej4?si=E2yjP5CeCSI2KViZ",
    },
    {
      time: "2025-03-31",
      content: t("history-20250331-1"),
      link: "https://www.youtube.com/live/T8qAMNmxeCc?si=gLPMcur7TgBlUc_5",
    },
    {
      time: "2025-03-20",
      content: t("history-20250320-1"),
      link: "https://www.youtube.com/live/xaSPFvWIHhk?si=wmdrFwqzyxyYO0-a",
    },
    {
      time: "2025-02-27",
      content: t("history-20250227-1"),
      link: "https://www.youtube.com/live/w3AhT1-zTWU?si=--9AmD35XhFINtdT",
    },
    {
      time: "2025-02-20",
      content: t("history-20250220-1"),
      link: "https://www.youtube.com/live/kxVDGFxgOYQ?si=7wBLDuXVbKT5nDGK",
    },
    {
      time: "2025-02-11",
      content: t("history-20250211-1"),
      link: "https://www.youtube.com/live/TOeNTd-pHtI?si=0j63Qov-tBfHUapO",
    },
    {
      time: "2025-01-23",
      content: t("history-20250123-1"),
      link: "https://www.youtube.com/live/HRq1MVhPS5A?si=fg21_CmPBtaWUSAW",
    },
    {
      time: "2024-12-07",
      content: t("history-241207-1"),
      link: "https://x.com/curva_umi/status/1865368844900118723",
    },
  ];

  let isHeaderDark = $state(false);

  onMount(() => {
    // Wave Animation
    if (wave1)
      gsap.fromTo(
        wave1,
        { attr: { x: -40 } },
        { attr: { x: 136 }, duration: 20, repeat: -1, ease: "linear" },
      );
    if (wave2)
      gsap.fromTo(
        wave2,
        { attr: { x: -40 } },
        { attr: { x: 136 }, duration: 15, repeat: -1, ease: "linear" },
      );
    if (wave3)
      gsap.fromTo(
        wave3,
        { attr: { x: -40 } },
        { attr: { x: 136 }, duration: 10, repeat: -1, ease: "linear" },
      );
    if (wave4)
      gsap.fromTo(
        wave4,
        { attr: { x: -40 } },
        { attr: { x: 136 }, duration: 6, repeat: -1, ease: "linear" },
      );


    let observer;
    if (sentinelRef) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const isDark = entry.boundingClientRect.top <= 80;
          isHeaderDark = isDark;
          window.dispatchEvent(
            new CustomEvent("update-header-style", { detail: { isDark } }),
          );
        },
        { rootMargin: "-80px 0px 0px 0px" },
      );
      observer.observe(sentinelRef);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  });
</script>

<div class="overflow-hidden">
  <section
    class="bg-white fixed top-0 left-0 right-0 h-[280px] md:h-[450px] z-0 flex flex-col justify-center items-center"
  >
    <div class="flex items-center justify-center">
      <img
        src="/curva-umi-support/img/logo.jpeg"
        class="h-[100px] md:h-[150px] w-auto max-w-full object-contain transition-all duration-300"
        alt="Curva Umi Logo"
        width="1500"
        height="500"
        fetchpriority="high"
      />
    </div>
    {#if !isHeaderDark}
      <div
        class="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[3px] animate-bounce text-deep-sea opacity-60 pointer-events-none transition-opacity duration-300"
      >
        <span class="text-[9px] font-bold tracking-[0.2em] font-mono"
          >SCROLL</span
        >
        <span class="text-[10px]">▼</span>
      </div>
    {/if}
  </section>
  <div
    bind:this={contentRef}
    class="relative z-10 bg-[linear-gradient(to_bottom,#002B49,#0077B6)] min-h-screen mt-[280px] md:mt-[450px]"
  >
    <div
      bind:this={sentinelRef}
      class="absolute top-0 w-full h-[1px] pointer-events-none invisible"
    ></div>
    <div
      class="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-full"
    >
      <svg
        class="relative block w-full h-[50px] md:h-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            bind:this={wave1}
            href="#gentle-wave"
            x="-40"
            y="0"
            fill="rgba(0, 43, 73, 0.3)"
          />
          <use
            bind:this={wave2}
            href="#gentle-wave"
            x="-40"
            y="3"
            fill="rgba(0, 43, 73, 0.5)"
          />
          <use
            bind:this={wave3}
            href="#gentle-wave"
            x="-40"
            y="5"
            fill="rgba(0, 43, 73, 0.7)"
          />
          <use
            bind:this={wave4}
            href="#gentle-wave"
            x="-40"
            y="7"
            fill="#002B49"
          />
        </g>
      </svg>
    </div>

    <div class="py-[40px] px-[10px] pb-[40px] max-w-[1200px] mx-auto">
      <ul class="fixed left-0 right-0 top-0 bottom-0 pointer-events-none z-0 overflow-hidden">
        {#each bubbles as b}
          <li
            class="bubble bg-white/5 border border-white/20 rounded-full aspect-square absolute shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            style="--size: {b.size}px; --blur: {b.blur}px; --duration: {b.duration}s; --left: {b.left}vw; --delay: {b.delay}s; --max-opacity: {b.maxOpacity}; --drift: {b.drift}px;"
          >
            <div
              class="bg-white/30 left-[15%] top-[20%] w-[20%] aspect-square absolute rounded-full filter blur-[1px]"
            ></div>
          </li>
        {/each}
        {#each glows as g}
          <li
            class="bubble-glow bg-mint-green/20 blur-[50px] rounded-full aspect-square absolute pointer-events-none"
            style="--size: {g.size}px; --left: {g.left}vw; --top: {g.top}vh; --duration: {g.duration}s; --delay: {g.delay}s;"
          ></li>
        {/each}
      </ul>

      <div class="relative z-20 space-y-[40px]">
        <section class="glass-card p-[20px] md:p-[40px] text-center">
          <div class="flex items-center justify-center gap-[10px] flex-wrap">
            <p
              data-aos="fade-up"
              class="text-[18px] text-pearl-white whitespace-pre-wrap"
            >
              {t("about-web")}
            </p>
            <a
              data-aos="fade-up"
              href="https://t.co/oKazNascfC"
              target="_blank"
              class="group"
            >
              <div class="flex items-center">
                <div
                  class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full md:group-hover:bg-mint-green transition-colors duration-300"
                >
                  <img
                    src="/curva-umi-support/img/discord.svg"
                    class="w-[16px] h-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300"
                    alt="Discord"
                    width="16"
                    height="16"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p>うみサポ Discord</p>
              </div>
            </a>
          </div>
          <div class="flex items-center justify-center mt-[10px]">
            <p
              data-aos="fade-up"
              class="text-[12px] text-pearl-white whitespace-pre-wrap"
            >
              {t("ps")}
            </p>
          </div>
        </section>

        <section class="glass-card p-[20px] md:p-[40px]">
          <h2
            data-aos="fade-up"
            class="text-[32px] mb-[20px] text-coral-sun font-bold tracking-[2px]"
          >
            <span>{t("about-h2")}</span>
          </h2>
          <div>
            <div class="md:flex items-start mt-[10px]">
              <div data-aos="fade-up" class="max-w-[430px] mx-auto w-full">
                <img
                  src="/curva-umi-support/img/picture.jpeg"
                  alt="來羽うみ (Curva Umi) Artist Photo"
                  class="w-full h-auto object-cover rounded-lg"
                  width="814"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="flex-1 mt-[10px] md:mt-0 md:ml-[10px] lg:ml-[30px]">
                <h1
                  data-aos="fade-up"
                  class="text-[22px] text-coral-sun mb-[10px]"
                >
                  <span>來羽うみ</span>
                  <span class="text-[18px] ml-[5px]">Curva Umi</span>
                </h1>
                <p
                  data-aos="fade-up"
                  class="text-[18px] text-pearl-white mb-[10px] whitespace-pre-wrap"
                >
                  {t("about")}
                </p>
                <p data-aos="fade-up" class="text-[16px] mb-[5px]">
                  {t("info")}
                </p>
                <ul
                  class="grid grid-cols-1 md:grid-cols-2 gap-x-[5px] gap-y-[5px] mb-[10px]"
                >
                  {#each information as info}
                    <li
                      data-aos="fade-up"
                      class="p-[5px_10px] border-[1px] rounded-[5px] border-mint-green/50 bg-white/10 text-[14px]"
                    >
                      <p>{`${info.title}: ${info.content}`}</p>
                    </li>
                  {/each}
                </ul>
                <p data-aos="fade-up" class="text-[16px] mb-[5px]">
                  {t("tag")}
                </p>
                <ul
                  class="grid grid-cols-1 md:grid-cols-2 gap-x-[5px] gap-y-[5px] mb-[10px]"
                >
                  {#each tags as info}
                    <li
                      data-aos="fade-up"
                      class="p-[5px_10px] border-[1px] rounded-[5px] border-mint-green/50 bg-white/10 text-[14px]"
                    >
                      <p>{`${info.title}:`}</p>
                      <p>
                        {#each info.content as tag, index}
                          {#if info?.tagLink?.[index]}
                            <a
                              href={info.tagLink[index]}
                              target="_blank"
                              class="border-b-[1px] border-mint-green text-mint-green hover:text-white transition-colors"
                              >{tag}</a
                            >
                          {:else}
                            <span>{tag}</span>
                          {/if}
                        {/each}
                      </p>
                    </li>
                  {/each}
                </ul>
                <div class="flex items-center mt-[10px]">
                  <p data-aos="fade-up">Link</p>
                  <ul class="flex items-center ml-[5px]">
                    <li data-aos="fade-up" class="mx-[5px]">
                      <a
                        href="https://x.com/curva_umi"
                        target="_blank"
                        class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full group md:hover:bg-mint-green transition-colors duration-300"
                      >
                        <img
                          src="/curva-umi-support/img/twitter-x.svg"
                          class="w-[16px] h-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300"
                          alt="Twitter"
                          width="16"
                          height="16"
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    </li>
                    <li data-aos="fade-up" class="mx-[5px]">
                      <a
                        href="https://www.youtube.com/@curvaumi"
                        target="_blank"
                        class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full group md:hover:bg-mint-green transition-colors duration-300"
                      >
                        <img
                          src="/curva-umi-support/img/youtube.svg"
                          class="w-[16px] h-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300"
                          alt="YouTube"
                          width="16"
                          height="16"
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Videos Section -->
        <section class="glass-card p-[20px] md:p-[40px] mt-[40px]">
          <h2
            data-aos="fade-up"
            class="text-[32px] mb-[20px] text-coral-sun font-bold tracking-[2px]"
          >
            Covered
          </h2>

          <div class="flex flex-col gap-[20px]">
            <!-- Top Main Video (16:9) -->
            {#if videosList.length > 0}
              <div
                data-aos="fade-up"
                class="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-mint-green/30 bg-black relative"
              >
                {#if playingVideos[videosList[0].id]}
                  <iframe
                    src={`https://www.youtube.com/embed/${videosList[0].id}?autoplay=1`}
                    title={videosList[0].title}
                    class="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                {:else}
                  <button
                    type="button"
                    class="w-full h-full relative block cursor-pointer group focus:outline-none"
                    onclick={() => playVideo(videosList[0].id)}
                    aria-label={`Play ${videosList[0].title}`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${videosList[0].id}/hqdefault.jpg`}
                      alt={videosList[0].title}
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="480"
                      height="360"
                    />
                    <div
                      class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <svg
                        viewBox="0 0 68 48"
                        class="w-[68px] h-[48px] transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
                      >
                        <path
                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                          fill="#FF0000"
                        ></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                      </svg>
                    </div>
                  </button>
                {/if}
              </div>
            {/if}

            <!-- Other Videos (16:9) -->
            {#if videosList.length > 1}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                {#each videosList.slice(1) as video, i}
                  <div
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    class="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/20 hover:border-mint-green transition-colors bg-black relative"
                  >
                    {#if playingVideos[video.id]}
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        class="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    {:else}
                      <button
                        type="button"
                        class="w-full h-full relative block cursor-pointer group focus:outline-none"
                        onclick={() => playVideo(video.id)}
                        aria-label={`Play ${video.title}`}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          width="480"
                          height="360"
                        />
                        <div
                          class="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <svg
                            viewBox="0 0 68 48"
                            class="w-[60px] h-[42px] transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                          >
                            <path
                              d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                              fill="#FF0000"
                            ></path>
                            <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                          </svg>
                        </div>
                      </button>
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}

            <!-- Shorts List (9:16) -->
            {#if shortsList.length > 0}
              <div class="mt-[10px]">
                <h3
                  data-aos="fade-up"
                  class="text-[20px] mb-[15px] text-coral-sun font-bold tracking-[1px]"
                >
                  Shorts
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-[15px]">
                  {#each shortsList as short, i}
                    <div
                      data-aos="fade-up"
                      data-aos-delay={i * 100}
                      class="w-full aspect-[9/16] rounded-xl overflow-hidden shadow-lg border border-white/20 hover:border-mint-green transition-colors bg-black relative"
                    >
                      {#if playingVideos[short.id]}
                        <iframe
                          src={`https://www.youtube.com/embed/${short.id}?autoplay=1`}
                          title={short.title}
                          class="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      {:else}
                        <button
                          type="button"
                          class="w-full h-full relative block cursor-pointer group focus:outline-none"
                          onclick={() => playVideo(short.id)}
                          aria-label={`Play ${short.title}`}
                        >
                          <img
                            src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
                            alt={short.title}
                            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                            width="480"
                            height="360"
                          />
                          <div
                            class="absolute inset-0 flex items-center justify-center pointer-events-none"
                          >
                            <svg
                              viewBox="0 0 68 48"
                              class="w-[48px] h-[34px] transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                            >
                              <path
                                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                                fill="#FF0000"
                              ></path>
                              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                            </svg>
                          </div>
                        </button>
                      {/if}
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </section>

        <!-- Member Exclusive Videos Section -->
        <section class="glass-card p-[20px] md:p-[40px] mt-[40px]">
          <div class="flex items-center gap-[10px] mb-[15px]">
            <h2
              data-aos="fade-up"
              class="text-[32px] text-coral-sun font-bold tracking-[2px]"
            >
              Members Only
            </h2>
          </div>
          <p data-aos="fade-up" class="text-pearl-white mb-[20px]">
            {t("member-exclusive-desc")}
          </p>

          <div class="flex flex-col gap-[20px]">
            {#if memberVideosList.length > 0}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                {#each memberVideosList as video, i}
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                    class="relative block w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/20 hover:border-mint-green transition-all duration-300 bg-black group"
                  >
                    <!-- 縮圖 -->
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width="480"
                      height="360"
                    />
                    <!-- YouTube 播放按鈕 -->
                    <div
                      class="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <svg
                        viewBox="0 0 68 48"
                        class="w-[60px] h-[42px] transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                      >
                        <path
                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                          fill="#FF0000"
                        ></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                      </svg>
                    </div>
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        </section>

        <h2
          data-aos="fade-up"
          class="text-[32px] mt-[10px] text-coral-sun font-bold tracking-[2px]"
        >
          {t("design-h2")}
        </h2>

        {#each designList as design, index}
          <section class="glass-card p-[20px] md:p-[40px] mt-[40px]">
            <h2 data-aos="fade-up">{design.title}</h2>
            {#each design.design as item}
              <div data-aos="fade-up" class="py-[10px]">
                <ul
                  class="bg-white/5 flex items-center max-md:flex-col gap-[10px] p-[10px] rounded-lg"
                >
                  {#each item.imgList as img}
                    <li>
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        class="max-h-[500px] w-auto object-contain mx-auto"
                        loading="lazy"
                        decoding="async"
                      />
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
            {#if design?.member?.length > 0}
              <div>
                <p
                  class="mb-[10px] border-b-[1px] border-pearl-white/30 pb-[10px]"
                >
                  {t("design-member")}
                </p>
                <ul class="grid md:grid-cols-2 gap-[10px]">
                  {#each design.member as member}
                    <li data-aos="fade-up">
                      <h2 class="mt-[0px]">{member?.title}</h2>
                      <div class="flex items-center py-[10px] gap-x-[10px]">
                        <div>
                          <p>{member?.name}</p>
                        </div>
                        <ul class="flex items-center">
                          {#if member?.twitter}
                            <li data-aos="fade-up" class="mx-[5px]">
                              <a
                                href={member.twitter}
                                target="_blank"
                                class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full group md:hover:bg-mint-green transition-colors duration-300"
                              >
                                <img
                                  src="/curva-umi-support/img/twitter-x.svg"
                                  class="w-[16px] h-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300"
                                  alt="Twitter"
                                  width="16"
                                  height="16"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </a>
                            </li>
                          {/if}
                          {#if member?.youtube}
                            <li data-aos="fade-up" class="mx-[5px]">
                              <a
                                href={member.youtube}
                                target="_blank"
                                class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full group md:hover:bg-mint-green transition-colors duration-300 text-pearl-white"
                              >
                                <img
                                  src="/curva-umi-support/img/youtube.svg"
                                  class="w-[16px] h-[16px] brightness-0 invert md:group-hover:brightness-100 md:group-hover:invert-0 transition-all duration-300"
                                  alt="YouTube"
                                  width="16"
                                  height="16"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </a>
                            </li>
                          {/if}
                        </ul>
                      </div>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
            <div
              data-aos="fade-up"
              class="h-[1px] w-full bg-pearl-white/20 mt-[10px] {index ==
              designList.length - 1
                ? 'hidden'
                : ''}"
            ></div>
          </section>
        {/each}

        <section class="glass-card p-[20px] md:p-[40px] mt-[40px]">
          <h2
            data-aos="fade-up"
            class="text-[32px] mb-[20px] text-coral-sun font-bold tracking-[2px]"
          >
            {t("about-history")}
          </h2>
          <ul
            class="relative border-l border-mint-green/30 ml-[10px] space-y-[30px]"
          >
            {#each historyList as history}
              <li data-aos="fade-up" class="relative pl-[30px] group">
                <div
                  class="absolute left-[-5px] top-[8px] w-[10px] h-[10px] rounded-full bg-mint-green shadow-[0_0_10px_rgba(152,226,198,0.5)] transition-all duration-300 group-hover:scale-[1.5] group-hover:shadow-[0_0_15px_rgba(152,226,198,0.8)] group-hover:bg-white"
                ></div>
                <p
                  class="text-[14px] text-mint-green mb-[5px] font-bold tracking-wider"
                >
                  {history?.time}
                </p>
                <div class="text-[16px] text-pearl-white">
                  {#if history?.link}
                    <a
                      href={history.link}
                      target="_blank"
                      class="hover:text-mint-green transition-colors inline-flex items-center gap-1"
                    >
                      {history?.content}
                      <svg
                        class="w-3 h-3 opacity-70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path></svg
                      >
                    </a>
                  {:else}
                    <p>{history?.content}</p>
                  {/if}
                </div>
              </li>
            {/each}
          </ul>
        </section>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  @reference "../../assets/css/main.css";
  .glass-card {
    @apply bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:bg-white/10 transition-colors duration-500;
  }

  .bubble {
    width: var(--size);
    left: var(--left);
    filter: blur(var(--blur));
    animation: bubbleRise var(--duration) linear infinite;
    animation-delay: var(--delay);
    will-change: transform, opacity;
  }
  @keyframes bubbleRise {
    0% {
      transform: translate3d(0, 110vh, 0);
      opacity: 0;
    }
    15% {
      opacity: var(--max-opacity, 0.4);
    }
    85% {
      opacity: var(--max-opacity, 0.4);
    }
    100% {
      transform: translate3d(var(--drift, 0px), -15vh, 0);
      opacity: 0;
    }
  }

  .bubble-glow {
    width: var(--size);
    left: var(--left);
    top: var(--top);
    animation: glowPulse var(--duration) ease-in-out infinite alternate;
    animation-delay: var(--delay);
    will-change: transform, opacity;
  }
  @keyframes glowPulse {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 0.25;
    }
    100% {
      transform: translate3d(50px, 40px, 0);
      opacity: 0.5;
    }
  }
</style>
