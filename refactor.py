import re

path = 'src/components/pages/Songlist.svelte'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

new_script = """<script>
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
</script>"""

content = re.sub(r'<script>[\s\S]*?<\/script>', new_script, content)

content = content.replace('searchWord', 'songlistState.searchWord')
content = content.replace('searchSingerInput', 'songlistState.searchSingerInput')
content = content.replace('selectedYear', 'songlistState.selectedYear')
content = content.replace('selectedMonth', 'songlistState.selectedMonth')
content = content.replace('showOnlyFavorites', 'songlistState.showOnlyFavorites')
content = content.replace('favorites.length', 'songlistState.favorites.length')
content = content.replace('favorites.includes', 'songlistState.favorites.includes')
content = content.replace('availableYears', 'songlistState.availableYears')
content = content.replace('availableMonths', 'songlistState.availableMonths')
content = content.replace('showSongArray', 'songlistState.showSongArray')
content = content.replace('visibleGroupsCount', 'songlistState.visibleGroupsCount')
content = content.replace('toggleShowFavorites()', 'songlistState.toggleShowFavorites()')
content = content.replace('toggleFavorite(', 'songlistState.toggleFavorite(')
content = content.replace('songlistState.songlistState.', 'songlistState.')
content = content.replace('SearchSong("songName")', '""')
content = content.replace('SearchSong("singer")', '""')

mobile_player_start = content.find('<!-- Mobile Player -->')
if mobile_player_start != -1:
    bg_waves_bottom = content.find('<!-- Background Waves Bottom -->')
    content = content[:mobile_player_start] + content[bg_waves_bottom:]

right_col_start = content.find('<!-- Right Column: Desktop Player -->')
if right_col_start != -1:
    end_of_desktop = content.find('</div>\\n      </div>\\n    </div>\\n  </div>', right_col_start)
    if end_of_desktop != -1:
        replacement = '<!-- Right Column: Desktop Player -->\\n        <YoutubePlayer {isMobile} {currentSong} isOpen={iframeShow} onClose={handlePlayerClose} />\\n'
        content = content[:right_col_start] + replacement + content[end_of_desktop + 13:]

content = content.replace('songlistState.searchWord = ""; songlistState.searchSingerInput = ""; songlistState.selectedYear = ""; songlistState.selectedMonth = "";', 'songlistState.clearAllFilters();')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactor complete.")
