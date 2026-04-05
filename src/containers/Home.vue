<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import Lenis from "@studio-freight/lenis";
import { useNow, useDateFormat } from '@vueuse/core'
import FlashlightEffect from "../components/flash.vue";
import { Github, Linkedin } from 'lucide-vue-next'

const formatted = useDateFormat(useNow(), 'DD/MM/YYYY')

const mouseX = ref(0);
const mouseY = ref(0);

const targetX = ref(0);
const targetY = ref(0);

const isInside = ref(false);

const lerp = (start: number, end: number, t: number) => {
  return start + (end - start) * t;
};

const handleMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  targetX.value = e.clientX - rect.left;
  targetY.value = e.clientY - rect.top;
  isInside.value = true;
};

const handleLeave = () => {
  isInside.value = false;
};

const animate = () => {
  mouseX.value = lerp(mouseX.value, targetX.value, 0.15);
  mouseY.value = lerp(mouseY.value, targetY.value, 0.15);

  requestAnimationFrame(animate);
};

onMounted(() => {
  animate();
});

const maskStyle = computed(() => {
  const radius = isInside.value ? 180 : 0;

  return {
    WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mouseX.value}px ${mouseY.value}px, black 60%, transparent 100%)`,
    maskImage: `radial-gradient(circle ${radius}px at ${mouseX.value}px ${mouseY.value}px, black 60%, transparent 100%)`,
  };
});

onMounted(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  let locked = false;
  let lastScrollPosition = 0;
  let scrollThreshold = 50;
  let isSnapping = false;

  const secondSection = document.getElementById("second");
  if (!secondSection) return;

  lenis.on("scroll", ({ scroll, direction }: { scroll: number; direction: number }) => {
    if (locked || isSnapping) return;

    const screen = window.innerHeight;
    const scrollDelta = Math.abs(scroll - lastScrollPosition);

    if (scrollDelta < scrollThreshold) return;

    if (direction === 1 && scroll < screen * 0.5) {
      locked = true;
      isSnapping = true;

      lenis.scrollTo(secondSection, {
        duration: 1.2,
        offset: 0,
      });

      setTimeout(() => {
        locked = false;
        isSnapping = false;
      }, 1300);
    }

    if (direction === -1 && scroll > screen * 0.5 && scroll < screen * 1.2) {
      locked = true;
      isSnapping = true;

      lenis.scrollTo(0, {
        duration: 1.2,
        offset: 0,
      });

      setTimeout(() => {
        locked = false;
        isSnapping = false;
      }, 1300);
    }

    lastScrollPosition = scroll;
  });

  onUnmounted(() => {
    lenis.destroy();
  });
});
</script>

<template>
  <div class="home">

    <section class="bg-[url('../assets/images/Jn.jpg')] h-900 w-full fixed top-0 left-0 z-10">
      <img class="w-full" src="../assets/images/Jn.jpg" alt="">
    </section>

    <div class="h-120"></div>
    <section id="second" class="bg-black w-full min-h-screen max-h-screen relative z-20">

      <FlashlightEffect class="min-h-screen" :radius="500" :intensity="0.15" light-color="255, 245, 200"> 
        <div class="flex">
          <div class="h-auto ml-5 pt-10">
            <h1 class="text-white text-4xl font-bold border-white border-l-8 pl-5">Caso 1703</h1>
            <h2 class="text-white text-2xl border-white border-l-8 pl-5">{{ formatted }}</h2>
          </div>

          <div class="text-white ml-auto mr-10 pt-10 text-right">
            <h1 class="font-bold text-3xl">Davi Ramos</h1>
            <h2>Desenvolvedor Web</h2>
          </div>
        </div>

        <div class="flex h-[calc(100vh-200px)] w-screen items-center">

          <div class="card relative ml-10 h-4/5 w-200 mr-20 overflow-hidden" @mousemove="handleMove"
            @mouseleave="handleLeave">
            <img src="../assets/images/S1.png" class="w-full h-full object-cover select-none pointer-events-none" />
            <img src="../assets/images/S2.jpeg"
              class="absolute inset-0 w-full h-full object-cover pointer-events-none reveal" :style="maskStyle" />
          </div>
          <div class="flex flex-col h-4/5 mr-50 w-screen">
            <h1 class="text-white text-6xl font-bold border-white border-l-8 pl-5">Sobre</h1>
            <h2 class="text-white text-2xl mt-3">
              Davi Ramos é apaixonado por tecnologia desde cedo, formado no curso técnico em
              Informática para Internet pela ETEC e atualmente curso Segurança da
              Informação na FATEC São Caetano do Sul, em constante busca por
              novos aprendizados e oportunidades na área de tecnologia.
            </h2>
          </div>

        </div>

        <div class="absolute bottom--30 right-10">
          <div class="flex gap-4">
            <span class="text-white">daviramos1703@gmail.com</span>

            <a href="https://github.com/davizin-ra" target="_blank">
              <Github class="w-6 h-6 text-white hover:text-gray-300" />
            </a>

            <a href="https://www.linkedin.com/in/daviratt/" target="_blank">
              <Linkedin class="w-6 h-6 text-white hover:text-gray-300" />
            </a>
          </div>
        </div>

      </FlashlightEffect>
    </section>

  </div>
</template>

<style scoped>
.home {
  overflow-x: hidden;
}

#second {
  min-height: 100vh;
  max-height: 100vh;
  position: relative;
}

.reveal {
  transition: all 0.25s ease;
  will-change: mask-image;
}
</style>