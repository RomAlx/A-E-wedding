<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import MapsButton from '@/components/MapsButton.vue'
import { Camera, Heart, Users, UtensilsCrossed, type LucideIcon } from 'lucide-vue-next'
import { config, getPlace, type TimelineIcon } from '@/data/config'

const { timeline } = config

const iconMap: Record<TimelineIcon, LucideIcon> = {
  users: Users,
  heart: Heart,
  camera: Camera,
  utensils: UtensilsCrossed,
}

function getIcon(name: TimelineIcon): LucideIcon {
  return iconMap[name]
}
</script>

<template>
  <section id="timeline" class="scroll-section px-4 py-10">
    <div class="mx-auto max-w-[640px]">
      <AnimatedReveal
        preset="slide-left"
        tag="h2"
        class="text-center text-3xl font-semibold text-[var(--color-text)]"
      >
        Расписание дня
      </AnimatedReveal>

      <ol class="relative mt-10 space-y-0">
        <AnimatedReveal
          v-for="(event, index) in timeline"
          :key="event.time + event.title"
          preset="slide-left"
          tag="li"
          class="relative flex gap-4 pb-10 last:pb-0"
        >
          <div class="flex flex-col items-center">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-md"
            >
              <component :is="getIcon(event.icon)" :size="20" :stroke-width="2" />
            </div>
            <div
              v-if="index < timeline.length - 1"
              class="mt-2 w-0 flex-1 border-l-2 border-dashed border-[var(--color-gold)]"
              style="min-height: 2.5rem"
            />
          </div>

          <div class="min-w-0 flex-1 pt-1">
            <time
              class="text-sm font-bold uppercase tracking-wide text-[var(--color-accent)]"
            >
              {{ event.time }}
            </time>
            <h3 class="mt-1 text-xl font-semibold text-[var(--color-text)]">
              {{ event.title }}
            </h3>
            <p
              v-if="event.details"
              class="mt-1 text-base text-[var(--color-text-muted)]"
            >
              {{ event.details }}
            </p>
            <a
              v-if="event.ctaHref && event.ctaLabel"
              :href="event.ctaHref"
              class="btn-secondary mt-3"
            >
              {{ event.ctaLabel }}
            </a>
            <MapsButton
              v-if="event.placeId"
              :href="getPlace(event.placeId).mapUrl"
              class="mt-3"
            />
          </div>
        </AnimatedReveal>
      </ol>
    </div>
  </section>
</template>
