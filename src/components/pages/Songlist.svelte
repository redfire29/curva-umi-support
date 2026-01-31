<script>
  import { onMount, tick } from "svelte";
  import { find, get, set, filter, forEach, concat } from "lodash-es";
  import dayjs from "dayjs";
  import { gsap } from "gsap";
  import songListArray from "../../data/songList.js";

  let { locale = "ja", messages = {} } = $props();
  const t = (key) => messages[key] || key;

  // Direct helpers to replace lodash get/set where possible for reactivity,
  // but since we wrap state, lodash getters might be fine, setters need care.
  // actually $state makes objects proxies.

  let contentRef;
  let wave1, wave2;

  let iframeShow = $state(false);
  let iframeID = $state("");
  let iframeStart = $state("");
  let currentPlayingUrl = $state("");
  let currentSong = $state(null);
  let isMobile = $state(false);
  let isExpanded = $state(false);

  let songListAll = $state([]);
  let showSongArray = $state([]);
  let dateList = $state([]);
  let selectDate = $state(""); // This is bound to select, needs to hold the value.
  // Select value in Vue was object or string. check options.
  // Vue: :value='date' (object) and :value="" (string). Svelte binding to object works.

  let searchWord = $state("");
  let searchSingerInput = $state("");

  // Favorites logic
  let favorites = $state([]); // Stores songLinks
  let showOnlyFavorites = $state(false);

  // Portal Action
  function portal(node) {
    let target = document.body;
    target.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node);
      },
    };
  }

  // Animation constants
  const allSongSH = (sh) => {
    // We iterate the proxy
    for (let findData of showSongArray) {
      findData.showDate = sh;
      if (findData.songList) {
        for (let song of findData.songList) {
          song.showDate = sh;
        }
      }
    }
  };

  const SearchSong = (searchKey) => {
    if (searchKey === "songName") searchSingerInput = "";
    if (searchKey === "singer") searchWord = "";

    const term = searchKey === "songName" ? searchWord : searchSingerInput;

    if (term != "") {
      allSongSH(false);
      for (let findData of songListAll) {
        let groupHasMatch = false;
        for (let song of findData.songList) {
          const val = get(song, searchKey); // keep lodash get for safety on deep path
          if (val && val.match(new RegExp(term, "i"))) {
            song.showDate = true;
            groupHasMatch = true;
          } else {
            song.showDate = false;
          }
        }
        if (groupHasMatch) findData.showDate = true;
      }
    } else {
      // Restore all
      allSongSH(true);
    }
  };

  const changeYoutube = (url, song, listContext) => {
    const match = url.match(/v=([^&]+)/);
    if (!match) return;
    const videoId = match[1];
    const timeMatch = url.match(/[?&]t=(\d+)/);
    const time = timeMatch ? timeMatch[1] : "0";

    iframeID = videoId;
    iframeStart = time;
    iframeShow = true;
    currentPlayingUrl = url;

    currentSong = {
      ...song,
      date: listContext?.date || "",
      originalLink: url,
    };
  };

  // Touch logic
  let touchStartY = 0;
  let ignoreClick = false;

  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
    ignoreClick = false;
  };

  const onTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchEndY - touchStartY;
    const minSwipeDistance = 30;

    if (Math.abs(diff) > minSwipeDistance) {
      ignoreClick = true;
      setTimeout(() => {
        ignoreClick = false;
      }, 300);

      if (diff < 0) {
        isExpanded = true;
      } else {
        isExpanded = false;
      }
    }
  };

  const toggleFullPlayer = () => {
    if (ignoreClick) {
      ignoreClick = false;
      return;
    }
    isExpanded = !isExpanded;
  };

  const iframeClose = () => {
    iframeShow = false;
    isExpanded = false;
    iframeStart = "";
    currentPlayingUrl = "";
    iframeID = ""; // Also clear ID to stop audio? Vue code didn't clear ID immediately?
    // Vue code: iframeID not cleared in iframeClose, only iframeShow=false.
    // But then v-if="iframeShow" removes it from DOM?
    // Vue code teleports it. v-if="iframeShow && isMobile".
    // Desktop player: v-if="!isMobile". iframe inside desktop player v-if="!iframeID" (placeholder) else iframe.
    // Wait, desktop player shares state? Yes.
    // If I close on mobile, desktop player should also stop?
    // Vue code `iframeClose` sets `iframeShow = false`, `iframeStart=''`, `currentPlayingUrl=''`.
    // It does NOT clear `iframeID`.
    // If desktop player is visible (resize?), it shows the last video?
    // Just blindly follow Vue logic.
  };

  const dateSelect = () => {
    const val = selectDate;
    if (val && val.date) {
      // selectDate is object
      allSongSH(false);
      const SD = val.date;
      for (let v of showSongArray) {
        const matchDate = dayjs(v.date).format("YYYY/MM/DD");
        if (matchDate.match(new RegExp(SD, "i"))) {
          v.showDate = true;
          for (let song of v.songList) {
            song.showDate = true;
          }
        }
      }
      allSongSH(true);
    }
  };

  const toggleFavorite = (songLink) => {
    if (favorites.includes(songLink)) {
      favorites = favorites.filter((link) => link !== songLink);
    } else {
      favorites = [...favorites, songLink];
    }
    localStorage.setItem("curva_fav_songs", JSON.stringify(favorites));

    // If currently showing only favorites, refresh the view to remove un-favorited song
    if (showOnlyFavorites) {
      toggleShowFavorites(true);
    }
  };

  const toggleShowFavorites = (forceState) => {
    // If forceState is provided, use it, otherwise toggle
    if (typeof forceState === "boolean") {
      showOnlyFavorites = forceState;
    } else {
      showOnlyFavorites = !showOnlyFavorites;
    }

    if (showOnlyFavorites) {
      // Clear other filters visually (reset inputs if desired, or just override)
      // For simple UX here, we just apply the favorite filter
      allSongSH(false);
      let hasFavorites = false;

      for (let findData of songListAll) {
        let groupHasMatch = false;
        for (let song of findData.songList) {
          if (favorites.includes(song.songLink)) {
            song.showDate = true;
            groupHasMatch = true;
            hasFavorites = true;
          } else {
            song.showDate = false;
          }
        }
        if (groupHasMatch) findData.showDate = true;
      }
    } else {
      // Reset to show all
      allSongSH(true);
    }
  };

  const checkMobile = () => {
    isMobile = window.innerWidth < 1024;
  };

  onMount(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Initial Data Processing
    // We need to build songListAll from imported data.
    // Ideally we shouldn't mutate imported data directly if it's shared, but here it seems fine as we init local state.
    // We will create a fresh structure to be safe and reactive.

    let processedAll = [];
    let processedDateList = [];

    forEach(songListArray, (v) => {
      // Clone v to avoid mutating import
      let vClone = { ...v, showDate: true, songList: [] };

      const getYear = { date: dayjs(v.date).format("YYYY") };
      const getM = dayjs(v.date).format("YYYY/MM");

      const findYear = find(processedDateList, { date: getYear.date });
      if (findYear) {
        const findM = find(processedDateList, { date: getM });
        if (findM) {
          processedDateList.push({ date: dayjs(v.date).format("YYYY/MM/DD") });
        } else {
          processedDateList.push({ date: getM });
          processedDateList.push({ date: dayjs(v.date).format("YYYY/MM/DD") });
        }
      } else {
        processedDateList.push(getYear);
        processedDateList.push({ date: getM });
        processedDateList.push({ date: dayjs(v.date).format("YYYY/MM/DD") });
      }

      if (v.songList) {
        vClone.songList = v.songList.map((s) => ({ ...s, showDate: true }));
      }
      processedAll = concat(processedAll, vClone);
    });

    // Update state
    songListAll = processedAll;
    showSongArray = songListAll; // Reference assign works for Proxy if songListAll is Proxy?
    // Actually simpler:
    // songListAll = $state(processedAll) ? No, we just assign to the let variable, Svelte makes it reactive.
    // But we need showSongArray to point to it.
    // In Svelte 5, if we do showSongArray = songListAll, they point to same proxy.

    dateList = processedDateList;

    // Load Favorites
    const savedFavs = localStorage.getItem("curva_fav_songs");
    if (savedFavs) {
      try {
        favorites = JSON.parse(savedFavs);
      } catch (e) {
        console.error("Failed to parse favorites", e);
        favorites = [];
      }
    }

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

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  });
</script>

<div class="min-h-screen relative bg-deep-sea pt-[57px]">
  <!-- Background Layer -->
  <section
    class="fixed top-0 left-0 right-0 h-[450px] z-0 flex justify-center items-center pointer-events-none overflow-hidden"
  >
    <div class="flex items-center justify-center opacity-30">
      <!-- Logo or gradient -->
    </div>
  </section>

  <!-- Main Content -->
  <div bind:this={contentRef} class="relative z-10 w-full min-h-screen">
    <!-- Wave Decoration Top -->
    <div
      class="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[-20%]"
    ></div>

    <div class="py-[20px] px-[10px] md:px-[20px] max-w-[1400px] mx-auto">
      <div
        class="grid grid-cols-1 lg:grid-cols-[1fr_30%] xl:grid-cols-[1fr_400px] gap-[20px]"
      >
        <!-- Left Column -->
        <div class="space-y-[20px]">
          <!-- Search -->
          <div class="glass-card p-[20px] sticky top-[77px] z-30">
            <div class="flex items-center justify-between mb-[15px]">
              <h2 class="text-[24px] font-bold text-mint-green">
                {t("searchSong")}
              </h2>
              <button
                onclick={() => toggleShowFavorites()}
                class="flex items-center gap-[8px] px-[12px] py-[6px] rounded-lg border transition-colors {showOnlyFavorites
                  ? 'bg-mint-green/20 border-mint-green text-mint-green'
                  : 'bg-white/5 border-transparent text-pearl-white hover:bg-white/10'}"
              >
                {#if showOnlyFavorites}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 96 960 960"
                    width="20"
                    fill="currentColor"
                    ><path
                      d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z"
                    /></svg
                  >
                {:else}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 96 960 960"
                    width="20"
                    fill="currentColor"
                    ><path
                      d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Zm0-79q101-91 165.5-157T710 615q25-37 42.5-77t17.5-85q0-61-41-102t-102-41q-39 0-74 19t-59 56q-24-37-59-56t-74-19q-61 0-102 41t-41 102q0 45 17.5 85t42.5 77q35.5 63 100 129T480 856Zm0-252Z"
                    /></svg
                  >
                {/if}
                <span class="text-sm font-medium"
                  >{t("myFavorites") || "My Favorites"}</span
                >
              </button>
            </div>
            <div class="flex flex-col gap-[15px]">
              <!-- Search Inputs -->
              <div class="flex flex-col md:flex-row gap-[10px]">
                <div
                  class="flex-1 flex bg-white/10 rounded-lg overflow-hidden border border-mint-green/30 group focus-within:border-mint-green transition-colors"
                >
                  <input
                    bind:value={searchWord}
                    class="flex-1 bg-transparent text-pearl-white px-[15px] py-[10px] outline-none placeholder-pearl-white/40"
                    placeholder={t("searchSongName")}
                    onkeyup={(e) => e.key === "Enter" && SearchSong("songName")}
                  />
                  <button
                    onclick={() => SearchSong("songName")}
                    class="px-[20px] bg-white/5 hover:bg-mint-green hover:text-deep-sea transition-colors flex items-center justify-center border-l border-white/10 shrink-0"
                  >
                    <span class="material-icons-round text-[20px]">search</span>
                  </button>
                </div>

                <div
                  class="flex-1 flex bg-white/10 rounded-lg overflow-hidden border border-mint-green/30 group focus-within:border-mint-green transition-colors"
                >
                  <input
                    bind:value={searchSingerInput}
                    class="flex-1 bg-transparent text-pearl-white px-[15px] py-[10px] outline-none placeholder-pearl-white/40"
                    placeholder={t("searchSinger")}
                    onkeyup={(e) => e.key === "Enter" && SearchSong("singer")}
                  />
                  <button
                    onclick={() => SearchSong("singer")}
                    class="px-[20px] bg-white/5 hover:bg-mint-green hover:text-deep-sea transition-colors flex items-center justify-center border-l border-white/10 shrink-0"
                  >
                    <span class="material-icons-round text-[20px]">search</span>
                  </button>
                </div>
              </div>

              <!-- Date Filter -->
              <div class="flex items-center gap-[10px]">
                <span class="text-sm text-pearl-white/70"
                  >{t("dateSelect")}:</span
                >
                <div class="relative flex-1">
                  <select
                    bind:value={selectDate}
                    onchange={dateSelect}
                    class="w-full bg-white/10 border border-mint-green/30 rounded-lg px-[15px] py-[8px] text-pearl-white outline-none focus:border-mint-green appearance-none cursor-pointer"
                  >
                    <option value="" class="text-deep-sea"
                      >{t("selectAll")}</option
                    >
                    {#each dateList as date}
                      <option value={date} class="text-deep-sea"
                        >{date.date}</option
                      >
                    {/each}
                  </select>
                  <div
                    class="absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <span class="text-[12px] opacity-70">▼</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Song List -->
          <div class="space-y-[15px]">
            {#each showSongArray as list}
              {#if list.showDate}
                <div class="glass-card">
                  <!-- Header -->
                  <div
                    class="p-[15px] md:p-[20px] flex items-center justify-between cursor-pointer bg-deep-sea hover:brightness-125 transition sticky top-[340px] md:top-[280px] z-20 border-b border-white/10 rounded-2xl"
                    onclick={() => (list.showList = !list.showList)}
                    onkeydown={(e) =>
                      e.key === "Enter" && (list.showList = !list.showList)}
                    role="button"
                    tabindex="0"
                  >
                    <div>
                      <div class="flex items-center gap-[10px] mb-[5px]">
                        <span
                          class="px-[8px] py-[2px] rounded text-[12px] bg-curacao/50 border border-curacao text-pearl-white"
                          >{list.date}</span
                        >
                        <span class="text-[12px] opacity-70"
                          >{list.songList ? list.songList.length : 0} Songs</span
                        >
                      </div>
                      <h3
                        class="text-[16px] md:text-[18px] font-bold text-pearl-white line-clamp-1"
                      >
                        {list.streamName}
                      </h3>
                    </div>
                    <div
                      class="w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300 {list.showList
                        ? '-rotate-180'
                        : ''}"
                    >
                      <span class="text-[20px]">▼</span>
                    </div>
                  </div>

                  <!-- Body -->
                  <div
                    class="transition-all duration-300 ease-in-out overflow-hidden {list.showList
                      ? 'max-h-[2000px] opacity-100'
                      : 'max-h-0 opacity-0'}"
                  >
                    <ul class="border-t border-white/10">
                      {#each list.songList as song}
                        {#if song.showDate}
                          <li
                            class="p-[12px_20px] border-b border-white/5 last:border-0 hover:bg-mint-green/10 transition-colors cursor-pointer group flex items-center justify-between gap-[10px] {currentPlayingUrl ===
                            song.songLink
                              ? 'bg-mint-green/20'
                              : ''}"
                            onclick={() =>
                              changeYoutube(song.songLink, song, list)}
                            onkeydown={(e) =>
                              e.key === "Enter" &&
                              changeYoutube(song.songLink, song, list)}
                            role="button"
                            tabindex="0"
                          >
                            <div class="flex-1">
                              <p
                                class="text-[15px] font-medium text-pearl-white group-hover:text-mint-green transition-colors"
                              >
                                {song.songName}
                              </p>
                              {#if song.singer}
                                <p class="text-[13px] text-pearl-white/60">
                                  {song.singer}
                                </p>
                              {/if}
                            </div>
                            <div class="flex items-center gap-[10px]">
                              <!-- Favorite Button -->
                              <button
                                onclick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(song.songLink);
                                }}
                                class="p-[8px] rounded-full hover:bg-white/10 transition-colors text-mint-green"
                                title="Toggle Favorite"
                              >
                                {#if favorites.includes(song.songLink)}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20"
                                    viewBox="0 96 960 960"
                                    width="20"
                                    fill="currentColor"
                                    ><path
                                      d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z"
                                    /></svg
                                  >
                                {:else}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20"
                                    viewBox="0 96 960 960"
                                    width="20"
                                    fill="currentColor"
                                    ><path
                                      d="m480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Zm0-79q101-91 165.5-157T710 615q25-37 42.5-77t17.5-85q0-61-41-102t-102-41q-39 0-74 19t-59 56q-24-37-59-56t-74-19q-61 0-102 41t-41 102q0 45 17.5 85t42.5 77q35.5 63 100 129T480 856Zm0-252Z"
                                    /></svg
                                  >
                                {/if}
                              </button>

                              <span
                                class="text-mint-green opacity-0 group-hover:opacity-100 transition-opacity"
                                >▶</span
                              >
                            </div>
                          </li>
                        {/if}
                      {/each}
                    </ul>
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>

        <!-- Right Column: Desktop Player -->
        {#if !isMobile}
          <div class="hidden lg:block">
            <div class="sticky top-[90px] space-y-[20px]">
              <div class="glass-card overflow-hidden shadow-2xl">
                {#if !iframeID}
                  <div
                    class="aspect-video w-full bg-black/40 flex flex-col items-center justify-center text-pearl-white/50"
                  >
                    <span class="text-[40px] mb-[10px]">🎵</span>
                  </div>
                {:else}
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <iframe
                    src={`https://www.youtube.com/embed/${iframeID}?autoplay=1&start=${iframeStart}`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowfullscreen
                    class="w-full aspect-video bg-black"
                  ></iframe>
                {/if}
              </div>

              {#if currentSong}
                <div class="glass-card p-[20px]">
                  <h3 class="text-[18px] font-bold text-mint-green mb-[5px]">
                    Now Playing
                  </h3>
                  <p class="text-[16px] font-medium mb-[5px]">
                    {currentSong.songName}
                  </p>
                  <p class="text-[14px] text-pearl-white/70 mb-[15px]">
                    {currentSong.singer}
                  </p>
                  <div
                    class="flex bg-white/5 rounded p-[10px] items-center gap-[10px]"
                  >
                    <span class="text-[12px]">📅</span>
                    <p class="text-[13px]">{currentSong.date}</p>
                    <a
                      href={currentSong.originalLink}
                      target="_blank"
                      class="ml-auto text-[12px] text-curacao hover:text-mint-green hover:underline"
                      >Original Stream</a
                    >
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Mobile Player -->
  {#if iframeShow && isMobile}
    <div use:portal>
      <div
        class="fixed z-[999] transition-all duration-300 ease-out bg-[#002B49] border-t border-mint-green/30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex flex-col font-sans {iframeShow
          ? 'translate-y-0'
          : 'translate-y-full'} bottom-0 left-0 right-0 {isExpanded
          ? 'h-[100dvh] rounded-none'
          : 'h-[100px] rounded-t-none border-t-0'}"
      >
        <!-- Handle -->
        <div
          class="absolute left-0 right-0 flex justify-center items-center z-20 cursor-pointer h-[30px] transition-all duration-300 touch-action-none {isExpanded
            ? 'top-[10px]'
            : '-top-[30px]'}"
          onclick={toggleFullPlayer}
          ontouchstart={onTouchStart}
          ontouchend={onTouchEnd}
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === "Enter" && toggleFullPlayer()}
        >
          <div
            class="flex items-center justify-center bg-[#002B49] border-t border-x border-mint-green/30 px-[20px] h-full shadow-[0_-5px_10px_rgba(0,0,0,0.3)] transition-all duration-300 {isExpanded
              ? 'rounded-full  px-0 bg-white/10 border-none'
              : 'rounded-t-xl w-[120px]'}"
          >
            <svg
              class="size-[20px] text-pearl-white transition-transform duration-300 {isExpanded
                ? 'rotate-180'
                : ''}"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>
        </div>

        <!-- Close Button -->
        <div
          class="absolute right-[15px] top-[15px] z-30 w-[30px] h-[30px] flex items-center justify-center bg-black/20 rounded-full cursor-pointer hover:bg-red-500/20 active:scale-95 transition-all"
          onclick={(e) => {
            e.stopPropagation();
            iframeClose();
          }}
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === "Enter" && iframeClose()}
        >
          <span class="text-[14px] text-pearl-white hover:text-red-400">✕</span>
        </div>

        <!-- Content Content -->
        <div
          class="flex-1 flex gap-[15px] p-[10px] transition-all duration-300 overflow-hidden {isExpanded
            ? 'flex-col items-center justify-start pt-[60px]'
            : 'flex-row items-center h-full'} w-full"
        >
          <!-- Player -->
          <div
            class="bg-black rounded-lg overflow-hidden flex-shrink-0 relative transition-all duration-300 shadow-xl {isExpanded
              ? 'w-full aspect-video max-h-[60vh]'
              : 'h-full aspect-video'}"
          >
            {#if iframeID}
              <!-- svelte-ignore a11y-missing-attribute -->
              <iframe
                src={`https://www.youtube.com/embed/${iframeID}?autoplay=1&start=${iframeStart}`}
                allow="autoplay"
                class="w-full h-full"
              ></iframe>
            {/if}
            {#if !isExpanded}
              <div
                class="absolute top-0 left-0 w-full h-full bg-transparent cursor-pointer"
                onclick={toggleFullPlayer}
                role="button"
                tabindex="0"
                onkeydown={(e) => e.key === "Enter" && toggleFullPlayer()}
              ></div>
            {/if}
          </div>

          <!-- Info -->
          <div
            class="flex flex-col overflow-hidden transition-all duration-300 {isExpanded
              ? 'items-center text-center w-full px-[20px]'
              : 'flex-1 justify-center items-start'}"
          >
            <p
              class="font-bold text-mint-green w-full transition-all {isExpanded
                ? 'text-[20px] mb-[5px] whitespace-normal'
                : 'text-[14px] truncate'}"
            >
              {currentSong?.songName || "Unknown Song"}
            </p>
            <p
              class="text-pearl-white/70 w-full transition-all {isExpanded
                ? 'text-[16px] whitespace-normal'
                : 'text-[12px] truncate'}"
            >
              {currentSong?.singer}
            </p>

            {#if isExpanded}
              <div
                class="mt-[20px] flex flex-col items-center gap-[20px] opacity-0 animate-fadeIn w-full {isExpanded
                  ? 'opacity-100'
                  : ''}"
              >
                <div class="flex gap-[10px] items-center">
                  <span
                    class="text-[12px] bg-white/10 px-[10px] py-[4px] rounded"
                    >{currentSong?.date}</span
                  >
                  {#if currentSong?.originalLink}
                    <a
                      href={currentSong.originalLink}
                      target="_blank"
                      class="text-[12px] text-curacao hover:text-mint-green hover:underline flex items-center gap-[5px]"
                    >
                      <span>🔗</span>
                      <span>Original Stream</span>
                    </a>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Background Waves Bottom -->
  <div class="fixed bottom-0 left-0 w-full z-0 pointer-events-none opacity-20">
    <svg
      class="w-full h-[100px] md:h-[200px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
    >
      <defs>
        <path
          id="gentle-wave-sl"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use
          bind:this={wave1}
          href="#gentle-wave-sl"
          x="48"
          y="0"
          fill="rgba(255, 255, 255, 0.1)"
        />
        <use
          bind:this={wave2}
          href="#gentle-wave-sl"
          x="48"
          y="3"
          fill="rgba(255, 255, 255, 0.05)"
        />
      </g>
    </svg>
  </div>
</div>

<style>
  .glass-card {
    @apply bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:bg-white/10 transition-colors duration-500;
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
