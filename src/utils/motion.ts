/** Учитывать системную настройку «уменьшить движение» */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Узкий экран / тач — для упрощённых анимаций */
export function isMobileMotion(): boolean {
  return window.matchMedia('(max-width: 768px), (hover: none)').matches
}

/**
 * Парсит ISO-дату с явным оффсетом (для Москвы: +03:00).
 * Date.parse даёт абсолютный UTC-момент — корректно для любого часового пояса устройства.
 */
export function parseCountdownTarget(iso: string): number {
  const ms = Date.parse(iso)
  if (Number.isNaN(ms)) {
    throw new Error(`Invalid countdownTarget: ${iso}`)
  }
  return ms
}
