<script setup>
import { X } from 'lucide-vue-next'
const props = defineProps({
  titulo: String,
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(["update:isOpen"])

const close = () => {
  emit("update:isOpen", false)
}
</script>

<template>
  <Transition name="fade" appear>
    <div v-if="isOpen" class="inset-0 not-first:flex h-min z-50">

      <div class="rounded-lg  bg-black radius-10 border-2 border-white">

        <div class="w-full bg-white h-10 flex items-center justify-between px-4">
          <h2 class="text-black font-semibold">
            {{ titulo }}
          </h2>

          <button @click="close" class="text-black hover:text-gray-600 cursor-pointer">
            <X :size="20" />
          </button>
        </div>

        <div class="p-5">
          <slot></slot>
        </div>

      </div>

    </div>
  </Transition>
</template>

<style scoped>
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