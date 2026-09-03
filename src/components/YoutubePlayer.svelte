<script>
  let { isMobile, currentSong, isOpen, onClose } = $props();

  let iframeID = $derived.by(() => {
    if (!currentSong?.originalLink) return "";
    const match = currentSong.originalLink.match(/v=([^&]+)/);
    return match ? match[1] : "";
  });

  let iframeStart = $derived.by(() => {
    if (!currentSong?.originalLink) return "0";
    const match = currentSong.originalLink.match(/[?&]t=(\d+)/);
    return match ? match[1] : "0";
  });

  let isExpanded = $state(false);

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

  // Touch logic for mobile drawer
  let touchStartY = 0;
  let touchStartX = 0;
  let ignoreClick = false;

  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    ignoreClick = false;
  };

  const onTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = touchEndY - touchStartY;
    const diffX = touchEndX - touchStartX;
    const minSwipeDistance = 40;

    if (Math.abs(diffY) > minSwipeDistance && Math.abs(diffY) > Math.abs(diffX) * 1.5) {
      ignoreClick = true;
      setTimeout(() => { ignoreClick = false; }, 300);
      if (diffY < 0) {
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

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    isExpanded = false;
    if (onClose) onClose();
  };
</script>

{#if !isMobile}
  <!-- Desktop Player -->
  <div class="hidden lg:block">
    <div class="sticky top-[90px] space-y-[20px]">
      <div class="glass-card overflow-hidden shadow-2xl">
        {#if !iframeID}
          <div class="aspect-video w-full bg-black/40 flex flex-col items-center justify-center text-pearl-white/50">
            <span class="text-[40px] mb-[10px]">🎵</span>
          </div>
        {:else}
          <iframe
            src={`https://www.youtube.com/embed/${iframeID}?autoplay=1&start=${iframeStart}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
            title="YouTube video player"
            class="w-full aspect-video bg-black"
          ></iframe>
        {/if}
      </div>

      {#if currentSong}
        <div class="glass-card p-[20px]">
          <h3 class="text-[18px] font-bold text-mint-green mb-[5px]">Now Playing</h3>
          <p class="text-[16px] font-medium mb-[5px]">{currentSong.songName}</p>
          <p class="text-[14px] text-pearl-white/70 mb-[15px]">{currentSong.singer}</p>
          <div class="flex bg-white/5 rounded p-[10px] items-center gap-[10px]">
            <span class="text-[12px]">📅</span>
            <p class="text-[13px]">{currentSong.date}</p>
            <a href={currentSong.originalLink} target="_blank" class="ml-auto text-[12px] text-curacao hover:text-mint-green hover:underline">Original Stream</a>
          </div>
        </div>
      {/if}
    </div>
  </div>
{:else if isOpen}
  <!-- Mobile Player Drawer -->
  <div use:portal>
    <div
      class="fixed z-[999] transition-all duration-300 ease-out bg-[#002B49] border-t border-mint-green/30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex flex-col font-sans {isOpen ? 'translate-y-0' : 'translate-y-full'} bottom-0 left-0 right-0 {isExpanded ? 'h-[100dvh] rounded-none' : 'h-[100px] rounded-t-none border-t-0'}"
    >
      <!-- Handle -->
      <div
        class="absolute left-0 right-0 flex justify-center items-center z-20 cursor-pointer h-[30px] transition-all duration-300 touch-action-none {isExpanded ? 'top-[10px]' : '-top-[30px]'}"
        onclick={toggleFullPlayer}
        ontouchstart={onTouchStart}
        ontouchend={onTouchEnd}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && toggleFullPlayer()}
      >
        <div class="flex flex-col items-center justify-center gap-[4px] bg-[#002B49] border-t border-x border-mint-green/30 px-[20px] h-full shadow-[0_-5px_10px_rgba(0,0,0,0.3)] transition-all duration-300 {isExpanded ? 'rounded-full  px-0 bg-white/10 border-none' : 'rounded-t-xl w-[120px]'}">
          <div class="w-[30px] h-[4px] rounded-full bg-pearl-white/40 mt-[2px] transition-colors group-hover:bg-pearl-white/80 {isExpanded ? 'hidden' : ''}"></div>
          <svg class="size-[20px] text-pearl-white transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
      </div>

      <!-- Close Button -->
      <div
        class="absolute right-[15px] top-[15px] z-30 w-[30px] h-[30px] flex items-center justify-center bg-black/20 rounded-full cursor-pointer hover:bg-red-500/20 active:scale-95 transition-all"
        onclick={handleClose}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && handleClose()}
      >
        <span class="text-[14px] text-pearl-white hover:text-red-400">✕</span>
      </div>

      <!-- Content -->
      <div class="flex-1 flex gap-[15px] p-[10px] transition-all duration-300 overflow-hidden {isExpanded ? 'flex-col items-center justify-start pt-[60px]' : 'flex-row items-center h-full'} w-full">
        <div class="bg-black rounded-lg overflow-hidden flex-shrink-0 relative transition-all duration-300 shadow-xl {isExpanded ? 'w-full aspect-video max-h-[60vh]' : 'h-full aspect-video'}">
          {#if iframeID}
            <iframe
              src={`https://www.youtube.com/embed/${iframeID}?autoplay=1&start=${iframeStart}`}
              allow="autoplay"
              title="YouTube video player"
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

        <div
          class="flex flex-col overflow-hidden transition-all duration-300 touch-action-none cursor-pointer {isExpanded ? 'items-center text-center w-full px-[20px]' : 'flex-1 justify-center items-start'}"
          ontouchstart={onTouchStart}
          ontouchend={onTouchEnd}
          onclick={() => { if (!isExpanded) toggleFullPlayer(); }}
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === "Enter" && !isExpanded && toggleFullPlayer()}
        >
          <p class="font-bold text-mint-green w-full transition-all {isExpanded ? 'text-[20px] mb-[5px] whitespace-normal' : 'text-[14px] truncate'}">
            {currentSong?.songName || "Unknown Song"}
          </p>
          <p class="text-pearl-white/70 w-full transition-all {isExpanded ? 'text-[16px] whitespace-normal' : 'text-[12px] truncate'}">
            {currentSong?.singer}
          </p>

          {#if isExpanded}
            <div class="mt-[20px] flex flex-col items-center gap-[20px] opacity-0 animate-fadeIn w-full {isExpanded ? 'opacity-100' : ''}">
              <div class="flex gap-[10px] items-center">
                <span class="text-[12px] bg-white/10 px-[10px] py-[4px] rounded">{currentSong?.date}</span>
                {#if currentSong?.originalLink}
                  <a href={currentSong.originalLink} target="_blank" class="text-[12px] text-curacao hover:text-mint-green hover:underline flex items-center gap-[5px]">
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

<style lang="postcss">
  @reference "../assets/css/main.css";
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
