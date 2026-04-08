<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FlashlightEffect from "../components/flash.vue";
import HeroSection from "../components/HeroSection.vue";
import DesktopSection from "../components/DesktopSection.vue";
import ContactBar from "../components/ContactBar.vue";
import { useLenisScroll } from "../composables/useLenisScroll";

useLenisScroll();

// 🔥 INTRO CONTROLADA
const showIntro = ref(true)
const fadeOut = ref(false)

onMounted(() => {
  // tempo com o nome visível
  setTimeout(() => {
    fadeOut.value = true
  }, 1800)

  // remove só depois do fade terminar
  setTimeout(() => {
    showIntro.value = false
  }, 2800)
})

const currentSection = ref<'home' | 'desktop'>('home')

// Pilha de modais
const modalStack = ref<string[]>([])

// Modal principal
const mainModal = ref<string | null>(null)

// Modal atual
const currentModal = computed(() => {
  if (modalStack.value.length > 0) {
    return modalStack.value[modalStack.value.length - 1]
  }
  return mainModal.value
})

// Abrir modal
const openModal = (name: string) => {
  mainModal.value = name
  modalStack.value = []
}

// Fechar modal
const closeModal = (name: string) => {
  if (mainModal.value === name) {
    mainModal.value = null
  }
  modalStack.value = []
}

// Modais filhos
const pushModal = (name: string) => modalStack.value.push(name)
const popModal = () => modalStack.value.pop()

const replaceModal = (name: string) => {
  if (modalStack.value.length > 0) {
    modalStack.value.pop()
  }
  modalStack.value.push(name)
}

// Navegação
const goToSection = (section: 'home' | 'desktop') => {
  currentSection.value = section
  mainModal.value = null
  modalStack.value = []
}

const handleGoToDesktop = () => goToSection('desktop')
const handleGoHome = () => goToSection('home')
</script>

<template>
  <!-- 🔥 INTRO OVERLAY -->
  <div 
    v-if="showIntro" 
    :class="['intro', { 'fade-out': fadeOut }]"
  >
    <h1 class="intro-text">DaviDev</h1>
  </div>

  <!-- 🔥 SITE -->
  <div class="home">
    <section class="bg-[url('../assets/images/Jn.jpg')] h-900 w-full fixed top-0 left-0 z-10">
      <img class="w-full" src="../assets/images/Jn.jpg" alt="">
    </section>

    <div class="h-120"></div>

    <section id="second" class="bg-black w-full min-h-screen max-h-screen relative z-20">
      <FlashlightEffect class="min-h-screen" :radius="500" :intensity="0.15" light-color="255, 245, 200">
        <transition name="fade" mode="out-in">
          <HeroSection 
            v-if="currentSection === 'home'" 
            key="home" 
            @goToDesktop="handleGoToDesktop" 
          />
          <DesktopSection 
            v-else 
            key="desktop" 
            :currentModal="currentModal"
            :mainModal="mainModal"
            :modalStack="modalStack"
            @goHome="handleGoHome"
            @openModal="openModal"
            @closeModal="closeModal"
            @pushModal="pushModal"
            @popModal="popModal"
            @replaceModal="replaceModal"
          />
        </transition>
      </FlashlightEffect>

      <ContactBar />
    </section>
  </div>
</template>

<style scoped>
.home {
  overflow-x: hidden;
}

/* 🔥 INTRO */
.intro {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  opacity: 1;
  transition: opacity 1s ease, transform 1s ease;
}

.intro-text {
  color: #fff;
  font-size: 52px;
  font-weight: 600;
  letter-spacing: 6px;

  opacity: 0;
  transform: translateY(40px);
  animation: introEnter 1.2s ease forwards;
}

@keyframes introEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🔥 FADE OUT REAL */
.fade-out {
  opacity: 0;
  transform: scale(1.08);
}

/* 🔥 TRANSIÇÃO DO SITE */
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