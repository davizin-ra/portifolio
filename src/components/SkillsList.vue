<script setup lang="ts">
import { skills } from '../constants/skills.ts'

interface Props {
  skills: Skills[]
}

defineProps<Props>()
</script>

<template>
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
</template>
