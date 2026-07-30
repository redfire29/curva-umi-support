<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { gsap } from "gsap";
  import YoutubePlayer from "../YoutubePlayer.svelte";
  import { useSonglist } from "../../composables/useSonglist.svelte.js";

  let { locale = "ja", messages = {}, songListArray = [] } = $props();
  const t = (key) => messages[key] || key;

  let contentRef;
  let wave1, wave2;
  let filterPanelHeight = $state(0);

  const songlistState = useSonglist(songListArray);

  let currentPlayingUrl = $state("");
  let currentSong = $state(null);
  let isMobile = $state(false);
  let iframeShow = $state(false);

  const changeYoutube = (url, song, listContext) => {
    currentPlayingUrl = url;
    currentSong = {
      ...song,
      date: listContext?.date || "",
      originalLink: url,
    };
    iframeShow = true;
  };

  const handlePlayerClose = () => {
    iframeShow = false;
    currentPlayingUrl = "";
  };

  const checkMobile = () => {
    isMobile = window.innerWidth < 1024;
  };

  onMount(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (wave1) gsap.fromTo(wave1, { attr: { x: -40 } }, { attr: { x: 136 }, duration: 20, repeat: -1, ease: "linear" });
    if (wave2) gsap.fromTo(wave2, { attr: { x: -40 } }, { attr: { x: 136 }, duration: 15, repeat: -1, ease: "linear" });

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
          <div bind:clientHeight={filterPanelHeight} class="glass-card p-[20px] sticky top-[77px] z-30">
            <div class="flex items-center justify-between mb-[15px]">
              <h2 class="text-[24px] font-bold text-mint-green">
                {t("searchSong")}
              </h2>
              <button
                onclick={() => songlistState.toggleShowFavorites()}
                class="flex items-center gap-[8px] px-[12px] py-[6px] rounded-lg border transition-colors {songlistState.showOnlyFavorites
                  ? 'bg-mint-green/20 border-mint-green text-mint-green'
                  : 'bg-white/5 border-transparent text-pearl-white hover:bg-white/10'}"
              >
                {#if songlistState.showOnlyFavorites}
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
                  >{t("myFavorites") || "My Favorites"} ({songlistState.favorites.length})</span
                >
              </button>
            </div>
            <div class="flex flex-col gap-[15px]">
              <!-- Search Inputs -->
              <div class="flex flex-col md:flex-row gap-[10px]">
                <div
                  class="flex-1 flex bg-white/10 rounded-lg overflow-hidden border border-mint-green/30 group focus-within:border-mint-green transition-colors items-stretch"
                >
                  <div class="flex-1 relative flex items-center">
                    <input
                      bind:value={songlistState.searchWord}
                      class="w-full bg-transparent text-pearl-white pl-[15px] pr-[40px] py-[10px] outline-none placeholder-pearl-white/40"
                      placeholder={t("searchSongName")}
                      onkeyup={(e) => e.key === "Enter" && ""}
                    />
                    {#if songlistState.searchWord}
                      <button
                        onclick={() => songlistState.searchWord = ""}
                        class="absolute right-[10px] text-pearl-white/60 hover:text-mint-green transition-colors w-[24px] h-[24px] flex items-center justify-center bg-black/20 rounded-full text-[10px]"
                        title="Clear"
                      >
                        ✕
                      </button>
                    {/if}
                  </div>
                  <button
                    onclick={() => ""}
                    class="px-[20px] bg-white/5 hover:bg-mint-green hover:text-deep-sea transition-colors flex items-center justify-center border-l border-white/10 shrink-0"
                  >
                    <span class="material-icons-round text-[20px]">search</span>
                  </button>
                </div>

                <div
                  class="flex-1 flex bg-white/10 rounded-lg overflow-hidden border border-mint-green/30 group focus-within:border-mint-green transition-colors items-stretch"
                >
                  <div class="flex-1 relative flex items-center">
                    <input
                      bind:value={songlistState.searchSingerInput}
                      class="w-full bg-transparent text-pearl-white pl-[15px] pr-[40px] py-[10px] outline-none placeholder-pearl-white/40"
                      placeholder={t("searchSinger")}
                      onkeyup={(e) => e.key === "Enter" && ""}
                    />
                    {#if songlistState.searchSingerInput}
                      <button
                        onclick={() => songlistState.searchSingerInput = ""}
                        class="absolute right-[10px] text-pearl-white/60 hover:text-mint-green transition-colors w-[24px] h-[24px] flex items-center justify-center bg-black/20 rounded-full text-[10px]"
                        title="Clear"
                      >
                        ✕
                      </button>
                    {/if}
                  </div>
                  <button
                    onclick={() => ""}
                    class="px-[20px] bg-white/5 hover:bg-mint-green hover:text-deep-sea transition-colors flex items-center justify-center border-l border-white/10 shrink-0"
                  >
                    <span class="material-icons-round text-[20px]">search</span>
                  </button>
                </div>
              </div>

              <!-- Date Filter Tabs -->
              <div class="flex flex-col gap-[10px] p-[12px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
                <!-- 年份選擇列 -->
                <div class="flex flex-wrap gap-[8px]">
                  {#each songlistState.availableYears as year}
                    <button
                      onclick={() => { songlistState.selectedYear = year; songlistState.selectedMonth = ""; }}
                      class="px-[12px] py-[6px] rounded-lg text-xs font-medium border transition-all active:scale-95 {songlistState.selectedYear === year
                        ? 'bg-mint-green border-transparent text-deep-sea shadow-md shadow-mint-green/20'
                        : 'bg-white/5 border-white/10 text-pearl-white/80 hover:bg-white/10 hover:text-pearl-white'}"
                    >
                      {year === "" ? (locale === 'zh' ? '全部' : 'すべて') : `${year}年`}
                    </button>
                  {/each}
                </div>

                <!-- 月份選擇列 (僅在選取具體年份後展示) -->
                {#if songlistState.selectedYear !== ""}
                  <div class="h-[1px] bg-white/10 my-[2px] animate-fadeIn" transition:slide={{ duration: 200 }}></div>
                  <div class="flex flex-wrap gap-[8px] animate-fadeIn" transition:slide={{ duration: 200 }}>
                    {#each songlistState.availableMonths as month}
                      <button
                        onclick={() => { songlistState.selectedMonth = month; }}
                        class="px-[12px] py-[6px] rounded-lg text-xs font-medium border transition-all active:scale-95 {songlistState.selectedMonth === month
                          ? 'bg-curacao border-transparent text-deep-sea shadow-md shadow-curacao/20'
                          : 'bg-white/5 border-white/10 text-pearl-white/80 hover:bg-white/10 hover:text-pearl-white'}"
                      >
                        {month === "" ? (locale === 'zh' ? '全部' : 'すべて') : `${parseInt(month)}月`}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <!-- Song List -->
          <div class="space-y-[15px]">
            {#each songlistState.showSongArray as list}
              {#if list.showDate}
                <div class="glass-card">
                  <!-- Header -->
                  <div
                    class="p-[15px] md:p-[20px] flex items-center justify-between cursor-pointer bg-deep-sea hover:brightness-125 transition sticky z-20 border-b border-white/10 rounded-2xl"
                    style="top: {77 + filterPanelHeight}px;"
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
                  {#if list.showList}
                    <div
                      transition:slide={{ duration: 300 }}
                      class="overflow-hidden"
                    >
                    <ul class="border-t border-white/10">
                      {#each list.songList as song, i}
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
                            <span
                              class="text-pearl-white/40 font-mono text-sm w-[30px] text-center shrink-0"
                              >{i + 1}</span
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
                                  songlistState.toggleFavorite(song.songLink);
                                }}
                                class="p-[8px] rounded-full hover:bg-white/10 transition-colors text-mint-green"
                                title="Toggle Favorite"
                              >
                                {#if songlistState.favorites.includes(song.songLink)}
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
                {/if}
              </div>
              {/if}
            {/each}

            {#if songlistState.visibleGroupsCount === 0}
              <div class="glass-card p-[40px] text-center flex flex-col items-center justify-center space-y-[15px] animate-fadeIn">
                <span class="text-[50px] opacity-70">🐧❓</span>
                {#if songlistState.showOnlyFavorites}
                  <h3 class="text-[18px] font-bold text-mint-green">
                    {locale === 'zh' ? '目前還沒有收藏任何歌曲喔！' : 'お気に入りの曲はまだありません！'}
                  </h3>
                  <p class="text-[14px] text-pearl-white/60 max-w-[400px]">
                    {locale === 'zh' 
                      ? '點選歌單中歌曲旁的愛心圖示，就可以把喜歡的歌存到這裡，方便隨時點播喔！' 
                      : '歌リストの曲の横にあるハートマークをクリックして、お気に入りの曲を登録しましょう！'}
                  </p>
                {:else}
                  <h3 class="text-[18px] font-bold text-mint-green">
                    {locale === 'zh' ? '找不到符合條件的歌曲' : '該当する曲が見つかりませんでした'}
                  </h3>
                  <p class="text-[14px] text-pearl-white/60">
                    {locale === 'zh' 
                      ? '換個關鍵字搜尋，或是清除搜尋條件再試一次吧！' 
                      : '別のキーワードで検索するか、検索条件をクリアして再試行してください！'}
                  </p>
                  <button
                    onclick={() => { songlistState.clearAllFilters(); }}
                    class="px-[15px] py-[8px] bg-white/10 hover:bg-mint-green hover:text-deep-sea rounded-lg border border-mint-green/30 hover:border-transparent text-sm font-medium transition-colors"
                  >
                    {locale === 'zh' ? '重置搜尋條件' : '検索条件をクリア'}
                  </button>
                {/if}
              </div>
            {/if}
          </div>
        </div>

        <!-- Right Column: Desktop Player -->
        <YoutubePlayer {isMobile} {currentSong} isOpen={iframeShow} onClose={handlePlayerClose} />
      </div>
    </div>
  </div>

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

<style lang="postcss">
  @reference "../../assets/css/main.css";
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
