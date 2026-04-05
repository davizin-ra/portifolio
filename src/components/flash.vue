<template>
  <div 
    ref="containerRef"
    class="flashlight-container relative w-full h-full"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="absolute inset-0 pointer-events-none z-0"
      :style="backgroundStyle"
    ></div>
    
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  radius: {
    type: Number,
    default: 300
  },
  intensity: {
    type: Number,
    default: 0.4
  },
  lightColor: {
    type: String,
    default: '255, 245, 220'
  }
})

const containerRef = ref<HTMLElement | null>(null)
const mousePosition = ref({ x: -1000, y: -1000 })
const isActive = ref(false)
let animationFrameId: number | null = null

const handleMouseMove = (event: MouseEvent) => {
  if (!containerRef.value) return
  
  const rect = containerRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  animationFrameId = requestAnimationFrame(() => {
    mousePosition.value = { x, y }
    isActive.value = true
  })
}

const handleMouseLeave = () => {
  isActive.value = false
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
}

const backgroundStyle = computed(() => {
  if (!isActive.value) {
    return {
      background: 'black'
    }
  }

  const { x, y } = mousePosition.value
  const { radius, intensity, lightColor } = props
  
  return {
    background: `radial-gradient(
      circle ${radius}px at ${x}px ${y}px,
      rgba(${lightColor}, ${intensity}) 0%,
      rgba(${lightColor}, ${intensity * 0.2}) ${radius * 0.5}px,
      black ${radius * 0.8}px
    )`
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>