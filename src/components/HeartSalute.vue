<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { prefersReducedMotion } from '@/utils/motion'

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Heart {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rot: number
  vr: number
  life: number
  maxLife: number
  hue: number
}

let raf = 0
let hearts: Heart[] = []
let running = false
let resizeObserver: ResizeObserver | null = null

function spawnBurst(w: number, h: number, count: number) {
  const cx = w / 2
  const cy = h * 0.72
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.95
    const speed = 2.2 + Math.random() * 4.5
    hearts.push({
      x: cx + (Math.random() - 0.5) * w * 0.35,
      y: cy + Math.random() * 12,
      vx: Math.cos(angle) * speed * (0.4 + Math.random()),
      vy: Math.sin(angle) * speed - 2.5,
      size: 8 + Math.random() * 14,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.12,
      life: 0,
      maxLife: 70 + Math.random() * 50,
      hue: Math.random() > 0.45 ? 12 : 28,
    })
  }
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rot: number,
  alpha: number,
  hue: number,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.scale(size / 16, size / 16)
  ctx.beginPath()
  ctx.moveTo(0, 3)
  ctx.bezierCurveTo(-9, -5, -14, 6, 0, 14)
  ctx.bezierCurveTo(14, 6, 9, -5, 0, 3)
  ctx.closePath()
  ctx.fillStyle = `hsla(${hue}, 72%, 58%, ${alpha})`
  ctx.fill()
  ctx.restore()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas || prefersReducedMotion()) return

  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  const parent = canvas.parentElement
  if (!parent) return

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const { width, height } = parent.getBoundingClientRect()
    canvas.width = Math.max(1, Math.floor(width * dpr))
    canvas.height = Math.max(1, Math.floor(height * dpr))
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resize()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(parent)

  const w = () => canvas.clientWidth
  const h = () => canvas.clientHeight

  spawnBurst(w(), h(), 28)
  let burstAt = 0
  running = true

  const tick = () => {
    if (!running) return
    const width = w()
    const height = h()
    ctx.clearRect(0, 0, width, height)

    burstAt++
    if (burstAt % 42 === 0 && hearts.length < 50) {
      spawnBurst(width, height, 10)
    }

    hearts = hearts.filter((p) => p.life < p.maxLife)
    for (const p of hearts) {
      p.life++
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.06
      p.vx *= 0.992
      p.rot += p.vr
      const t = p.life / p.maxLife
      const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85
      drawHeart(ctx, p.x, p.y, p.size, p.rot, Math.max(0, alpha), p.hue)
    }

    raf = requestAnimationFrame(tick)
  }

  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  running = false
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  resizeObserver = null
  hearts = []
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>
