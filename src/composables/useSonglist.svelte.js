import { get, forEach, concat } from "lodash-es";
import dayjs from "dayjs";

export function useSonglist(songListArray) {
  let searchWord = $state("");
  let searchSingerInput = $state("");
  let selectedYear = $state("");
  let selectedMonth = $state("");
  let showOnlyFavorites = $state(false);
  let favorites = $state([]);

  let debouncedSearchWord = $state("");
  let debouncedSearchSingerInput = $state("");

  $effect(() => {
    const word = searchWord;
    const singer = searchSingerInput;
    const handler = setTimeout(() => {
      debouncedSearchWord = word;
      debouncedSearchSingerInput = singer;
    }, 300);
    return () => clearTimeout(handler);
  });

  // Load Favorites from localStorage
  if (typeof window !== "undefined") {
    const savedFavs = localStorage.getItem("curva_fav_songs");
    if (savedFavs) {
      try {
        favorites = JSON.parse(savedFavs);
      } catch (e) {
        console.error("Failed to parse favorites", e);
        favorites = [];
      }
    }
  }

  // Pre-process song list
  let songListAll = [];
  forEach(songListArray, (v) => {
    let vClone = { ...v, showDate: true, songList: [] };
    if (v.songList) {
      vClone.songList = v.songList.map((s) => ({ ...s, showDate: true }));
    }
    songListAll = concat(songListAll, vClone);
  });

  const availableYears = $derived.by(() => {
    const years = new Set();
    songListArray.forEach(v => {
      years.add(dayjs(v.date).format("YYYY"));
    });
    return ["", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  });

  const availableMonths = $derived.by(() => {
    if (!selectedYear) return [""];
    const months = new Set();
    songListArray.forEach(v => {
      const d = dayjs(v.date);
      if (d.format("YYYY") === selectedYear) {
        months.add(d.format("MM"));
      }
    });
    return ["", ...Array.from(months).sort((a, b) => a.localeCompare(b))];
  });

  const showSongArray = $derived.by(() => {
    let result = songListAll.map(group => ({
      ...group,
      songList: group.songList.map(song => ({ ...song }))
    }));

    if (showOnlyFavorites) {
      result.forEach(group => {
        let groupHasMatch = false;
        group.songList.forEach(song => {
          if (favorites.includes(song.songLink)) {
            song.showDate = true;
            groupHasMatch = true;
          } else {
            song.showDate = false;
          }
        });
        group.showDate = groupHasMatch;
      });
      return result;
    }

    if (debouncedSearchWord !== "" || debouncedSearchSingerInput !== "") {
      const term = debouncedSearchWord !== "" ? debouncedSearchWord : debouncedSearchSingerInput;
      const searchKey = debouncedSearchWord !== "" ? "songName" : "singer";
      const regex = new RegExp(term, "i");

      result.forEach(group => {
        let groupHasMatch = false;
        group.songList.forEach(song => {
          const val = get(song, searchKey);
          if (val && val.match(regex)) {
            song.showDate = true;
            groupHasMatch = true;
          } else {
            song.showDate = false;
          }
        });
        group.showDate = groupHasMatch;
      });
      return result;
    }

    if (selectedYear !== "") {
      const filterPrefix = selectedMonth 
        ? `${selectedYear}/${selectedMonth}` 
        : selectedYear;

      result.forEach(group => {
        const matchDate = dayjs(group.date).format("YYYY/MM/DD");
        if (matchDate.startsWith(filterPrefix)) {
          group.showDate = true;
          group.songList.forEach(song => song.showDate = true);
        } else {
          group.showDate = false;
        }
      });
      return result;
    }

    // Default: show all
    result.forEach(group => {
      group.showDate = true;
      group.songList.forEach(song => song.showDate = true);
    });
    return result;
  });

  const visibleGroupsCount = $derived(showSongArray.filter(g => g.showDate).length);

  const toggleFavorite = (songLink) => {
    if (favorites.includes(songLink)) {
      favorites = favorites.filter((link) => link !== songLink);
    } else {
      favorites = [...favorites, songLink];
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("curva_fav_songs", JSON.stringify(favorites));
    }
  };

  const toggleShowFavorites = (forceState) => {
    if (typeof forceState === "boolean") {
      showOnlyFavorites = forceState;
    } else {
      showOnlyFavorites = !showOnlyFavorites;
    }
    if (showOnlyFavorites) {
      searchWord = "";
      searchSingerInput = "";
      selectedYear = "";
      selectedMonth = "";
    }
  };

  const clearAllFilters = () => {
    searchWord = "";
    searchSingerInput = "";
    selectedYear = "";
    selectedMonth = "";
    showOnlyFavorites = false;
  };

  return {
    get searchWord() { return searchWord; },
    set searchWord(val) { 
      searchWord = val; 
      if (val !== "") { searchSingerInput = ""; selectedYear = ""; selectedMonth = ""; showOnlyFavorites = false; }
    },
    
    get searchSingerInput() { return searchSingerInput; },
    set searchSingerInput(val) { 
      searchSingerInput = val; 
      if (val !== "") { searchWord = ""; selectedYear = ""; selectedMonth = ""; showOnlyFavorites = false; }
    },

    get selectedYear() { return selectedYear; },
    set selectedYear(val) { 
      selectedYear = val; 
      selectedMonth = ""; 
      if (val !== "") { searchWord = ""; searchSingerInput = ""; showOnlyFavorites = false; }
    },

    get selectedMonth() { return selectedMonth; },
    set selectedMonth(val) { selectedMonth = val; },

    get showOnlyFavorites() { return showOnlyFavorites; },
    get favorites() { return favorites; },
    
    get availableYears() { return availableYears; },
    get availableMonths() { return availableMonths; },
    get showSongArray() { return showSongArray; },
    get visibleGroupsCount() { return visibleGroupsCount; },

    toggleFavorite,
    toggleShowFavorites,
    clearAllFilters
  };
}
