<script setup lang="ts">
import Modal from '../../UI/modal.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const handleClose = () => {
  emit('update:isOpen', false)
}
</script>

<template>
  <Modal titulo="Sistema de Notas" :isOpen="isOpen" @update:isOpen="handleClose">
    <div class="text-white p-6 space-y-6">

      <div class="space-y-4">
        <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
          <h2 class="text-xl font-semibold">Sobre o Projeto</h2>
          <p class="text-gray-400 mt-2">
            Interface web para gerenciamento de notas da Feira Tecnológica da ETEC MCM - 2025.
          </p>
        </div>

        <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
          <h2 class="text-xl font-semibold">Tecnologias</h2>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="px-3 py-1 bg-neutral-800 rounded-full text-sm">HTML5</span>
            <span class="px-3 py-1 bg-neutral-800 rounded-full text-sm">CSS3</span>
            <span class="px-3 py-1 bg-neutral-800 rounded-full text-sm">JavaScript</span>
            <span class="px-3 py-1 bg-neutral-800 rounded-full text-sm">LocalStorage</span>
          </div>
        </div>

        <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
          <h2 class="text-xl font-semibold">Acesso</h2>
          <ul class="mt-2 space-y-2 text-gray-400">
            <a href="https://github.com/Feira-Tecnologica/Frontend" target="_blank" rel="noopener noreferrer">
              <li>• Github</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </Modal>
</template>