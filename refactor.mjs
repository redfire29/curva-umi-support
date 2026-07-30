import fs from 'fs';

const path = 'src/components/pages/Songlist.svelte';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace the entire script block
const newScript = `<script>
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
</script>`;
content = content.replace(/<script>[\s\S]*?<\/script>/, newScript);

// 2. State replacements in markup
content = content.replace(/searchWord/g, 'songlistState.searchWord');
content = content.replace(/searchSingerInput/g, 'songlistState.searchSingerInput');
content = content.replace(/selectedYear/g, 'songlistState.selectedYear');
content = content.replace(/selectedMonth/g, 'songlistState.selectedMonth');
content = content.replace(/showOnlyFavorites/g, 'songlistState.showOnlyFavorites');
content = content.replace(/favorites\.length/g, 'songlistState.favorites.length');
content = content.replace(/favorites\.includes/g, 'songlistState.favorites.includes');
content = content.replace(/availableYears/g, 'songlistState.availableYears');
content = content.replace(/availableMonths/g, 'songlistState.availableMonths');
content = content.replace(/showSongArray/g, 'songlistState.showSongArray');
content = content.replace(/visibleGroupsCount/g, 'songlistState.visibleGroupsCount');
content = content.replace(/toggleShowFavorites\(\)/g, 'songlistState.toggleShowFavorites()');
content = content.replace(/toggleFavorite\(/g, 'songlistState.toggleFavorite(');
content = content.replace(/songlistState\.songlistState\./g, 'songlistState.'); // fix double replace just in case
content = content.replace(/SearchSong\("songName"\)/g, '""'); // Disable old SearchSong
content = content.replace(/SearchSong\("singer"\)/g, '""'); // Disable old SearchSong

// 3. Remove mobile player drawer from markup
const mobilePlayerStart = content.indexOf('<!-- Mobile Player -->');
if (mobilePlayerStart !== -1) {
  const bgWavesBottomIndex = content.indexOf('<!-- Background Waves Bottom -->');
  content = content.substring(0, mobilePlayerStart) + content.substring(bgWavesBottomIndex);
}

// 4. Replace Desktop player with YoutubePlayer
const rightColumnStart = content.indexOf('<!-- Right Column: Desktop Player -->');
if (rightColumnStart !== -1) {
  const endOfDesktopPlayer = content.indexOf('</div>\n      </div>\n    </div>\n  </div>', rightColumnStart);
  if (endOfDesktopPlayer !== -1) {
    const replacement = `<!-- Right Column: Desktop Player -->\n        <YoutubePlayer {isMobile} {currentSong} isOpen={iframeShow} onClose={handlePlayerClose} />\n`;
    content = content.substring(0, rightColumnStart) + replacement + content.substring(endOfDesktopPlayer + 13);
  } else {
    console.error("Could not find end of desktop player");
  }
}

// Clean up clear filters button logic
content = content.replace(/songlistState\.searchWord = ""; songlistState\.searchSingerInput = ""; songlistState\.selectedYear = ""; songlistState\.selectedMonth = "";/g, "songlistState.clearAllFilters();");

fs.writeFileSync(path, content);
console.log('Refactor complete.');
