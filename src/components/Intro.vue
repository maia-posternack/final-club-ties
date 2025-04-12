<template>
  <div class="relative w-full h-screen background flex flex-col items-center justify-center overflow-hidden font-helvetica ">
    <!-- Top LMPN banner (scrolls left) -->
    <div class="absolute top-0 w-full overflow-hidden h-6 text-[8px] text-black mt-2">
      <div class="animate-marquee whitespace-nowrap">
        <span class="mx-2" v-for="i in 100" :key="'top-' + i">LMPN</span>
        <span class="mx-2" v-for="i in 100" :key="'top-dupe-' + i">LMPN</span>
      </div>
    </div>

    <!-- Logo + Static LMPN vertically stacked -->
    <div class="z-10 flex flex-col items-center">
      <img
        src="/logo.png"
        alt="Logo"
        class="w-36 h-36 object-contain"
      />
      <div class="text-under-logo text-[8px] text-black mx-2 mt-1">
        LMPN
      </div>
    </div>

    <!-- Bottom LMPN banner (scrolls right) -->
    <div class="absolute bottom-0 w-full overflow-hidden h-6 text-[8px] text-black">
      <div class="animate-marquee-reverse whitespace-nowrap">
        <span class="mx-2" v-for="i in 100" :key="'bot-' + i">LMPN</span>
        <span class="mx-2" v-for="i in 100" :key="'bot-dupe-' + i">LMPN</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
.text-under-logo{
  transform: translateY(-15px)
}
.background{
  background-color:  #EE2222;
}

.animate-marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 40s linear infinite;
}

.animate-marquee-reverse {
  display: inline-block;
  white-space: nowrap;
  animation: marquee-reverse 40s linear infinite;
}

.font-helvetica {
  font-family: "Helvetica Neue LT Std", sans-serif;
}
</style>
