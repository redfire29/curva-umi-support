<script>
  import { onMount, onDestroy } from 'svelte';

  let { locale = 'ja', messages = {} } = $props();

  const t = (key) => messages[key] || key;
  let isScrolled = $state(false);

  const handleHeaderStyle = (event) => {
    isScrolled = event.detail.isDark;
  };

  onMount(() => {
    window.addEventListener('update-header-style', handleHeaderStyle);
    return () => {
      window.removeEventListener('update-header-style', handleHeaderStyle);
    };
  });

  const localePath = (path) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const prefix = locale === 'ja' ? '' : '/zh';
    // Standardize path handling for Astro base
    const base = '/curva-umi-support';
    let url = `${base}${prefix}/${cleanPath}`;
    if (!url.endsWith('/')) url += '/';
    return url.replace(/\/+/g, '/');
  };

  const switchLocale = (newLocale) => {
    const currentPath = window.location.pathname;
    const base = '/curva-umi-support';
    
    let relativePath = currentPath;
    if (currentPath.startsWith(base)) {
      relativePath = currentPath.slice(base.length);
    }
    
    // remove existing locale prefix if any
    if (relativePath.startsWith('/zh/')) {
      relativePath = relativePath.slice(3); // remove /zh
    } else if (relativePath === '/zh') {
      relativePath = '/';
    }
    
    const newPrefix = newLocale === 'ja' ? '' : '/zh';
    const newUrl = `${base}${newPrefix}${relativePath}`.replace(/\/+/g, '/');
    
    window.location.href = newUrl;
  };
</script>

<header
  class="fixed left-0 right-0 top-0 backdrop-blur-sm border-b transition-colors duration-300 flex items-center justify-between px-[20px] py-[10px] z-40 {isScrolled ? 'bg-deep-sea/90 border-pearl-white/20' : 'bg-white/90 border-gray-200'}"
>
  <div>
    <a
      href={localePath('/')}
      class={isScrolled ? 'text-pearl-white' : 'text-deep-sea'}
    >Home</a>
  </div>
  <div class="flex items-center">
    <ul class="flex items-center">
      <li class="px-[10px]">
        <a
          href={localePath('/songlist')}
          class="block relative transition-colors duration-300 {isScrolled ? 'text-pearl-white after:bg-mint-green' : 'text-deep-sea after:bg-deep-sea'} after:h-[1px] after:absolute after:top-full after:left-0 after:right-full after:transition-all after:duration-300 md:hover:after:right-0"
        >{t('song-list')}</a>
      </li>
    </ul>
    <ul class="flex items-center">
      {#if locale !== 'ja'}
        <li
          onclick={() => switchLocale('ja')}
          onkeydown={(e) => e.key === 'Enter' && switchLocale('ja')}
          class="lang-btn {isScrolled ? 'text-pearl-white border-pearl-white/30 md:hover:bg-mint-green md:hover:text-deep-sea' : 'text-deep-sea border-deep-sea/30 md:hover:bg-deep-sea md:hover:text-white'}"
          role="button"
          tabindex="0"
        >
          <p>日本語</p>
        </li>
      {/if}
      {#if locale !== 'zh'}
        <li
          onclick={() => switchLocale('zh')}
          onkeydown={(e) => e.key === 'Enter' && switchLocale('zh')}
          class="lang-btn {isScrolled ? 'text-pearl-white border-pearl-white/30 md:hover:bg-mint-green md:hover:text-deep-sea' : 'text-deep-sea border-deep-sea/30 md:hover:bg-deep-sea md:hover:text-white'}"
          role="button"
          tabindex="0"
        >
          <p>繁中</p>
        </li>
      {/if}
    </ul>
  </div>
</header>

<style>
.lang-btn {
  @apply bg-transparent border rounded p-[5px_10px] mx-[5px] cursor-pointer transition-colors duration-300;
}
</style>
