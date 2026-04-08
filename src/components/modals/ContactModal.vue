<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../UI/modal.vue'
import emailjs from '@emailjs/browser'

defineEmits<{
  close: []
}>()

// Dados do formulário
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSending = ref(false)
const sendStatus = ref<{ type: 'success' | 'error' | null; message: string }>({
  type: null,
  message: ''
})

const EMAILJS_CONFIG = {
  SERVICE_ID: '2422423',
  TEMPLATE_ID: 'template_845vox6',
  PUBLIC_KEY: '1CIExDLXadXcbr4a2'
}

const sendEmail = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    sendStatus.value = {
      type: 'error',
      message: 'Por favor, preencha todos os campos'
    }
    setTimeout(() => {
      sendStatus.value = { type: null, message: '' }
    }, 3000)
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    sendStatus.value = {
      type: 'error',
      message: 'Por favor, insira um email válido'
    }
    setTimeout(() => {
      sendStatus.value = { type: null, message: '' }
    }, 3000)
    return
  }

  isSending.value = true

  try {
    const templateParams = {
      name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message,
      to_email: 'daviramos1703@gmail.com'
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    )

    if (response.status === 200) {
      sendStatus.value = {
        type: 'success',
        message: 'Mensagem enviada com sucesso!'
      }
      // Limpar formulário
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
    }
  } catch (error) {
    console.error('Erro:', error)
    sendStatus.value = {
      type: 'error',
      message: 'Erro ao enviar. Tente novamente.'
    }
  } finally {
    isSending.value = false
    setTimeout(() => {
      sendStatus.value = { type: null, message: '' }
    }, 3000)
  }
}
</script>

<template>
  <Modal titulo="Contatos" @close="$emit('close')">
    <div class="text-white p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div class="space-y-6">
          <h1 class="text-3xl font-bold border-l-4 pl-4">Contatos</h1>

          <div class="space-y-4">
            <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <p class="font-semibold mb-2">Email:</p>
              <span class="text-gray-400">daviramos1703@gmail.com</span>
            </div>

            <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <p class="font-semibold mb-2">Telefone:</p>
              <span class="text-gray-400">(11) 94136-4461</span>
            </div>

            <div class="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
              <p class="font-semibold mb-2">GitHub:</p>
              <a href="https://github.com/davizin-ra" target="_blank" class="text-white hover:underline">
                github.com/davizin-ra
              </a>
            </div>
          </div>
        </div>

        <div class="space-y-6 ml-20">

          <div 
            v-if="sendStatus.type" 
            :class="[
              'p-3 rounded-lg transition-all',
              sendStatus.type === 'success' 
                ? 'bg-gray-500/20 border border-white text-white' 
                : 'bg-red-500/20 border border-red-500 text-red-400'
            ]"
          >
            {{ sendStatus.message }}
          </div>

          <!-- Formulário -->
          <form @submit.prevent="sendEmail" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium mb-2">Nome *</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium mb-2">Email *</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium mb-2">Mensagem *</label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="4"
                class="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Digite sua mensagem aqui..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSending"
              class="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg v-if="isSending" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {{ isSending ? 'Enviando...' : 'Enviar Mensagem' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </Modal>
</template>