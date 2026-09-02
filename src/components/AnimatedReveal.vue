<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, ref, useAttrs } from 'vue'
import { isMobileMotion, prefersReducedMotion } from '@/utils/motion'

export type RevealPreset =
  | 'rise'
  | 'slide-left'
  | 'slide-right'
  | 'pop'
  | 'drift'
  | 'fade'

const props = withDefaults(
  defineProps<{
    preset?: RevealPreset
    tag?: string
    /** Длительность once-анимации (сек) */
    duration?: number
  }>(),
  {
    preset: 'rise',
    tag: 'div',
    duration: 0.65,
  },
)

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const el = ref<HTMLElement | null>(null)

const triggers: ScrollTrigger[] = []
let tween: gsap.core.Tween | null = null

onMounted(() => {
  if (!el.value) return

  if (prefersReducedMotion()) {
    gsap.set(el.value, { clearProps: 'all' })
    return
  }

  const mobile = isMobileMotion()
  const d = mobile ? 0.55 : 1

  // На мобилке только вертикаль/fade — translateX раздувает scroll-width
  // и даёт белую полосу по краю экрана.
  const presets: Record<RevealPreset, gsap.TweenVars> = {
    rise: { opacity: 0, y: 28 * d },
    'slide-left': mobile
      ? { opacity: 0, y: 22 }
      : { opacity: 0, x: -32 },
    'slide-right': mobile
      ? { opacity: 0, y: 22 }
      : { opacity: 0, x: 32 },
    pop: { opacity: 0, scale: mobile ? 0.92 : 0.88 },
    drift: mobile
      ? { opacity: 0, y: 22 }
      : { opacity: 0, y: 28, rotate: -2 },
    fade: { opacity: 0 },
  }

  const from = presets[props.preset]
  const duration = mobile ? Math.min(props.duration, 0.55) : props.duration

  gsap.set(el.value, { ...from, force3D: true })

  tween = gsap.to(el.value, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    duration,
    ease: 'power2.out',
    force3D: true,
    paused: true,
  })

  // Вниз — play раньше (элемент только входит снизу)
  triggers.push(
    ScrollTrigger.create({
      trigger: el.value,
      start: 'clamp(top 90%)',
      onEnter: () => tween?.play(),
    }),
  )

  // Вверх — reverse раньше (пока блок ещё в кадре)
  triggers.push(
    ScrollTrigger.create({
      trigger: el.value,
      start: 'clamp(top 85%)',
      onLeaveBack: () => tween?.reverse(),
    }),
  )
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
  triggers.length = 0
  tween?.kill()
  tween = null
})
</script>

<template>
  <component :is="tag" ref="el" v-bind="attrs">
    <slot />
  </component>
</template>
