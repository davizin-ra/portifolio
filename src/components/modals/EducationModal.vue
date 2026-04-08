<script setup lang="ts">
import Modal from '../UI/modal.vue'

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
  <Modal 
    titulo="Educação" 
    :isOpen="isOpen" 
    @update:isOpen="handleClose"
  >
    <div class="text-white p-6 space-y-6">
      <h1 class="text-3xl font-bold border-l-4 pl-4">Educação</h1>

      <div class="flex w-200 gap-5">
        <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
          <h2 class="text-xl font-semibold">FATEC São Caetano do Sul</h2>
          <p class="text-gray-400">Segurança da Informação</p>
          <span class="text-sm text-gray-500">1º semestre (cursando)</span>
        </div>

        <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
          <h2 class="text-xl font-semibold">ETEC Prof. Maria Cristina Medeiros</h2>
          <p class="text-gray-400">Técnico em Informática para Internet</p>
        </div>

        <div class="">
          <div class="bg-neutral-900 p-4 rounded-xl mb-2 border border-neutral-700">
            <h2 class="text-xl font-semibold">Cursos Complementares</h2>
          </div>
          <h1 class="bg-neutral-900 p-2 mb-1 rounded-xl border border-neutral-700">Curso de IoT (ETEC)</h1>
          <h1 class="bg-neutral-900 p-2 mb-1 rounded-xl border border-neutral-700">Inglês - ClasseA (2 anos)</h1>
          <h1 class="bg-neutral-900 p-2 mb-1 rounded-xl border border-neutral-700">Desenvolvimento de Jogos - SuperGeek (2 anos)</h1>
        </div>
      </div>
    </div>
  </Modal>
</template>