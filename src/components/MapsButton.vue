<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { computed } from 'vue'
import { config } from '@/data/config'

const props = withDefaults(
  defineProps<{
    href: string
    label?: string
    variant?: 'primary' | 'secondary'
    iconSize?: number
  }>(),
  {
    variant: 'secondary',
    iconSize: 16,
  },
)

const text = computed(() => props.label ?? config.labels.openInMaps)
const btnClass = computed(() =>
  props.variant === 'primary' ? 'btn-primary' : 'btn-secondary',
)
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="btnClass"
  >
    <MapPin :size="iconSize" />
    {{ text }}
  </a>
</template>
