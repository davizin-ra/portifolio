<script setup lang="ts">
import { useNow, useDateFormat } from '@vueuse/core'
import { Computer } from 'lucide-vue-next'
import SkillsList from './SkillsList.vue'
import { skills } from '../constants/skills'
import { useMouseTracking } from '../composables/useMouseTracking'

const formatted = useDateFormat(useNow(), 'DD/MM/YYYY')
const { handleMove, handleLeave, maskStyle } = useMouseTracking()

defineEmits<{
  goToDesktop: []
}>()
</script>

<template>
  <div>
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

        <img src="../assets/images/S1.png" class="w-full h-full object-cover pointer-events-none" />
        <img src="../assets/images/S2.png"
          class="absolute inset-0 w-full h-full object-cover pointer-events-none" :style="maskStyle" />
      </div>

      <div class="flex flex-col h-4/5 mr-50 w-screen">
        <h1 class="text-white text-6xl font-bold border-white border-l-8 pl-5">Sobre</h1>

        <h2 class="text-white text-2xl mt-3">
          Davi Ramos é apaixonado por tecnologia desde cedo, formado na ETEC e
          atualmente cursando Segurança da Informação na FATEC.
        </h2>

        <div class="flex">
          <SkillsList :skills="skills" />

          <div class="mt-15 ml-25">
            <h2 class="text-white text-3xl underline font-bold hover:text-gray-300 cursor-pointer"
              @click="$emit('goToDesktop')">
              Abrir Desktop
              <Computer class="inline" :size="30" />
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
