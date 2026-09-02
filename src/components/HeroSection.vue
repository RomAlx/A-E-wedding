<script setup lang="ts">
import gsap from 'gsap'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { config } from '@/data/config'
import { prefersReducedMotion } from '@/utils/motion'

const { coupleDisplay, dateDisplay, hero } = config

const heroImageUrl = computed(
  () => `${import.meta.env.BASE_URL}${hero.image}`,
)

const imageEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const dateEl = ref<HTMLElement | null>(null)
const taglineEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)

let timeline: gsap.core.Timeline | null = null

onMounted(() => {
  if (prefersReducedMotion()) return

  const targets = [
    imageEl.value,
    titleEl.value,
    dateEl.value,
    taglineEl.value,
    ctaEl.value,
  ].filter(Boolean)

  gsap.set(targets, { opacity: 0, y: 28 })

  timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
  timeline
    .to(imageEl.value, { opacity: 1, y: 0, duration: 0.85 })
    .to(titleEl.value, { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
    .to(dateEl.value, { opacity: 1, y: 0, duration: 0.45 }, '-=0.28')
    .to(taglineEl.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.22')
    .to(ctaEl.value, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
})

onUnmounted(() => {
  timeline?.kill()
  timeline = null
})
</script>

<template>
  <section class="flex min-h-[100dvh] flex-col bg-[var(--color-hero-bg)]">
    <div
      class="mx-auto flex min-h-[100dvh] w-full max-w-[640px] flex-col justify-between px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))]"
    >
      <div class="flex min-h-0 flex-[1.35] flex-col items-center justify-center">
        <img
          ref="imageEl"
          :src="heroImageUrl"
          :alt="`${coupleDisplay} — свадебное приглашение`"
          class="hero-enter h-full max-h-[min(62dvh,560px)] w-full object-contain"
          width="640"
          height="480"
        />
      </div>

      <div class="flex shrink-0 flex-col items-center pb-1 pt-2 text-center">
        <h1
          ref="titleEl"
          class="hero-enter text-[clamp(1.75rem,5vw,2.25rem)] font-semibold leading-tight text-[var(--color-text)]"
        >
          {{ coupleDisplay }}
        </h1>
        <p
          ref="dateEl"
          class="hero-enter mt-1.5 text-lg font-medium text-[var(--color-text-muted)]"
        >
          {{ dateDisplay }}
        </p>
        <p
          ref="taglineEl"
          class="hero-enter mt-2 max-w-sm whitespace-pre-line text-base leading-relaxed text-[var(--color-text)] sm:text-lg"
        >
          {{ hero.tagline }}
        </p>
        <a
          ref="ctaEl"
          :href="hero.ctaHref"
          class="btn-primary btn-hero-cta hero-enter mt-4"
        >
          <span>{{ hero.ctaLabel }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
