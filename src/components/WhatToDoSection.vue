<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import MapsAddress from '@/components/MapsAddress.vue'
import MapsButton from '@/components/MapsButton.vue'
import PlaceCard from '@/components/PlaceCard.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, ref } from 'vue'
import { config, getPlace } from '@/data/config'
import { prefersReducedMotion } from '@/utils/motion'

const { whatToDo } = config
const { route, coffee } = whatToDo

const routeCard = ref<HTMLElement | null>(null)
const routePath = ref<SVGPathElement | null>(null)

let pathTriggers: ScrollTrigger[] = []
let pathTween: gsap.core.Tween | null = null

onMounted(() => {
  if (!routeCard.value || !routePath.value) return
  if (prefersReducedMotion()) return

  const path = routePath.value
  const length = path.getTotalLength()

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  const tween = gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.4,
    ease: 'power1.inOut',
    paused: true,
  })

  const playTrigger = ScrollTrigger.create({
    trigger: routeCard.value,
    start: 'top 85%',
    onEnter: () => tween.play(),
  })

  const reverseTrigger = ScrollTrigger.create({
    trigger: routeCard.value,
    start: 'top 55%',
    onLeaveBack: () => tween.reverse(),
  })

  pathTriggers = [playTrigger, reverseTrigger]
  pathTween = tween
})

onUnmounted(() => {
  pathTriggers.forEach((t) => t.kill())
  pathTriggers = []
  pathTween?.kill()
  pathTween = null
})
</script>

<template>
  <section id="what-to-do" class="scroll-section px-4 py-10">
    <div class="mx-auto max-w-[640px]">
      <AnimatedReveal
        preset="rise"
        tag="h2"
        class="text-center text-3xl font-semibold text-[var(--color-text)]"
      >
        {{ whatToDo.title }}
      </AnimatedReveal>

      <AnimatedReveal
        preset="rise"
        tag="div"
        class="intro-card mt-6 rounded-2xl border border-[var(--color-peach)]/70 bg-white/50 px-6 py-6 text-center shadow-sm"
      >
        <p
          v-for="(line, i) in whatToDo.lines"
          :key="i"
          class="leading-relaxed text-[var(--color-text-muted)]"
          :class="i === 0 ? 'text-lg font-medium text-[var(--color-text)]' : 'mt-2 text-base'"
        >
          {{ line }}
        </p>
      </AnimatedReveal>

      <div class="mt-12">

        <AnimatedReveal preset="rise" tag="div" class="mt-6 text-center">
          <MapsButton
              :href="route.mapUrl"
              :label="route.routeButtonLabel"
              variant="primary"
              :icon-size="18"
          />
        </AnimatedReveal>

        <div
          ref="routeCard"
          class="relative mt-6 rounded-2xl bg-white/70 px-4 py-8 shadow-sm"
        >
          <svg
            class="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref="routePath"
              class="route-path"
              d="M 50 8 Q 62 22 50 36 Q 38 50 50 64 Q 62 78 50 92"
              fill="none"
              stroke="var(--color-gold)"
              stroke-width="1.1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <ol class="relative space-y-5">
            <AnimatedReveal
              v-for="point in route.points"
              :key="point.name"
              preset="rise"
              tag="li"
              class="rounded-xl border border-[var(--color-peach)] bg-[var(--color-page-bg)] px-4 py-3"
            >
              <p class="text-lg font-semibold text-[var(--color-text)]">
                {{ point.name }}
              </p>
              <MapsAddress
                :href="getPlace(point.placeId).mapUrl"
                class="mt-1 block text-sm text-[var(--color-text-muted)]"
              >
                {{ getPlace(point.placeId).address }}
              </MapsAddress>
            </AnimatedReveal>
          </ol>
        </div>
      </div>

      <div class="mt-12">
        <AnimatedReveal preset="rise" tag="h3" class="section-h3">
          {{ coffee.subtitle }}
        </AnimatedReveal>

        <div v-if="coffee.shops.length" class="mt-6 space-y-3">
          <PlaceCard
            v-for="(shop, index) in coffee.shops"
            :key="shop.name"
            :name="shop.name"
            :address="shop.address"
            :map-url="shop.mapUrl"
            :note="shop.note"
            :preset="index % 2 === 0 ? 'slide-left' : 'slide-right'"
            card-class="rounded-2xl border border-[var(--color-peach)]/60 bg-white/45 px-5 py-4"
          />
        </div>

        <p
          v-else
          class="mt-6 text-center text-lg text-[var(--color-text-muted)]"
        >
          {{ coffee.emptyMessage }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-h3 {
  font-family: var(--font-heading);
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.route-path {
  opacity: 0.85;
}
</style>
