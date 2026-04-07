<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useNow, useDateFormat } from '@vueuse/core'
import FlashlightEffect from "../components/flash.vue";
import { Github, Linkedin } from 'lucide-vue-next'
import { useLenisScroll } from "../composables/useLenisScroll";

useLenisScroll();

const formatted = useDateFormat(useNow(), 'DD/MM/YYYY')

const currentSection = ref<'home' | ' ' | 'contato'>('home')

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




const skills = [
  { nome: "HTML5 / CSS3", nivel: 90 },
  { nome: "Tailwind / Bootstrap", nivel: 85 },
  { nome: "JavaScript", nivel: 65 },
  { nome: "React/Vue", nivel: 60 },
  { nome: "PHP", nivel: 50 },
  { nome: "Python", nivel: 70 },
  { nome: "MySQL / SQL", nivel: 75 },
  { nome: "UI/UX", nivel: 85 },
  { nome: "IoT / Redes", nivel: 65 }
];
</script>

<template>
  <div class="home">

    <section class="bg-[url('../assets/images/Jn.jpg')] h-900 w-full fixed top-0 left-0 z-10">
      <img class="w-full" src="../assets/images/Jn.jpg" alt="">
    </section>

    <div class="h-120"></div>

    <section id="second" class="bg-black w-full min-h-screen max-h-screen relative z-20">
      <FlashlightEffect class="min-h-screen" :radius="500" :intensity="0.15" light-color="255, 245, 200">

        <!-- 🔥 TRANSIÇÃO -->
        <transition name="fade" mode="out-in">

          <!-- HOME -->
          <div v-if="currentSection === 'home'" key="home">

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

              <div class="card relative ml-10 h-4/5 w-200 mr-20 overflow-hidden"
                @mousemove="handleMove"
                @mouseleave="handleLeave">

                <img src="../assets/images/S1.png" class="w-full h-full object-cover pointer-events-none" />
                <img src="../assets/images/S2.png"
                  class="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  :style="maskStyle" />
              </div>

              <div class="flex flex-col h-4/5 mr-50 w-screen">
                <h1 class="text-white text-6xl font-bold border-white border-l-8 pl-5">Sobre</h1>

                <h2 class="text-white text-2xl mt-3">
                  Davi Ramos é apaixonado por tecnologia desde cedo, formado na ETEC e
                  atualmente cursando Segurança da Informação na FATEC.
                </h2>

                <div class="flex">
                  <div class="w-full max-w-md text-white mt-10">
                    <h2 class="text-2xl font-bold mb-6">Skills</h2>

                    <div v-for="skill in skills" :key="skill.nome" class="mb-4">
                      <div class="flex items-center mb-1">
                        <span class="text-sm w-50">{{ skill.nome }}</span>
                        <div class="w-full bg-neutral-700 h-2">
                          <div class="h-2 bg-white" :style="{ width: skill.nivel + '%' }"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-15 ml-25">
                    <h2 
                      class="text-white text-3xl underline font-bold hover:text-gray-300 cursor-pointer"
                      @click="currentSection = 'relatorio'"
                    >
                      Relatório Completo >
                    </h2>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- RELATÓRIO -->
          <div v-else key="relatorio" class="min-h-screen text-white p-10">

            <h1 class="text-5xl font-bold border-l-8 pl-5 mb-6">
              Relatório Completo
            </h1>

            <p class="text-xl max-w-3xl leading-relaxed">
              Aqui você pode detalhar projetos, experiências, stack, etc.
            </p>

            <button
              class="mt-10 text-2xl underline hover:text-gray-300"
              @click="currentSection = 'home'"
            >
              ← Voltar
            </button>

          </div>

        </transition>

        <!-- 🔥 CONTATO FIXO (SEMPRE VISÍVEL) -->
        <div class="fixed bottom-5 right-10 z-50">
          <div class="flex gap-4 items-center">

            <span class="text-white">
              daviramos1703@gmail.com
            </span>

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

/* 🔥 FADE INSANO */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.98) translateY(30px);
  filter: blur(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.02) translateY(-30px);
  filter: blur(6px);
}
</style>