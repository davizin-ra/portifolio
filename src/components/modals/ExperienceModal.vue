<script setup lang="ts">
import Modal from '../UI/modal.vue'
import FreelasModal from './2l/FreelasModal.vue'

defineProps<{
  isOpen: boolean
  modalStack: string[]
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  pushModal: [modalId: string]
  popModal: []
}>()

const handleClose = () => {
  console.log('ExperienceModal: fechando')
  emit('update:isOpen', false)
}

const handleOpenFreelas = () => {
  console.log('ExperienceModal: abrindo freelas')
  emit('pushModal', 'freelas')
}

const handleCloseFreelas = () => {
  console.log('ExperienceModal: fechando freelas')
  emit('popModal')
}
</script>

<template>
    <div class="flex">
      <Modal titulo="Experiência" :isOpen="isOpen" @update:isOpen="handleClose">
        <div class="text-white p-6 space-y-6">
          <h1 class="text-3xl font-bold border-l-4 pl-4">Experiência</h1>

          <div @click="handleOpenFreelas"
            class="bg-neutral-900 p-5 rounded-xl border border-neutral-700 cursor-pointer hover:bg-neutral-800 transition-colors">
            <h2 class="text-xl font-semibold">Freelancer - Editor de Vídeo</h2>
            <span class="text-sm text-gray-500">2024 - Junho 2025</span>

            <div class="mt-3 space-y-2 text-gray-400">
              <p>• Edição de vídeos de gameplay (PapiPaieTV)</p>
              <p>• Edição de vídeos narrativos (LontraFrita)</p>
            </div>
          </div>
        </div>
      </Modal>

      <FreelasModal class="ml-10" v-if="modalStack.includes('freelas')" :isOpen="modalStack.includes('freelas')"
        @update:isOpen="handleCloseFreelas" />
    </div>
</template>