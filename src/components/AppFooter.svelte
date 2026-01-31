<script>
  let { locale = 'ja', messages = {} } = $props();

  const t = (key) => messages[key] || key;

  const goTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
</script>

<footer
  class="bg-deep-sea/80 border-t border-pearl-white/10 p-[20px_20px] text-pearl-white text-right relative z-20"
>
  <div class="max-w-[1450px] mx-auto">
    <div
      onclick={goTop}
      onkeydown={(e) => e.key === 'Enter' && goTop()}
      class="absolute bottom-[calc(100%+10px)] right-[20px] cursor-pointer group z-40 bg-mint-green rounded-full aspect-square p-[10px] flex items-center justify-center hover:bg-curacao transition-colors duration-300 shadow-lg shadow-mint-green/20"
      role="button"
      tabindex="0"
    >
      <p class="text-[10px] text-white tracking-widest">TOP</p>
    </div>
    <div class="flex items-center justify-between max-md:flex-col-reverse">
      <a
        href="https://t.co/oKazNascfC"
        target="_blank"
        class="group flex items-center max-md:mt-[10px]"
      >
        <div
          class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full md:group-hover:bg-mint-green transition-colors duration-300"
        >
          <img
            src="/curva-umi-support/img/discord.svg"
            class="invert opacity-80 md:group-hover:invert-0 md:group-hover:opacity-100 w-[16px]"
            alt="Discord"
          />
        </div>
        <p>うみサポ Discord</p>
      </a>
      <div class="pb-[5px] text-[14px]">
        <p>{t('directions')}</p>
      </div>
    </div>
  </div>
</footer>
