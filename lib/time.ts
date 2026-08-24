export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ""
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000))

  if (seconds < 60) return "الآن"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `منذ ${minutes} د`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `منذ ${hours} س`
  const days = Math.floor(hours / 24)
  if (days < 7) return `منذ ${days} ي`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `منذ ${weeks} أسبوع`
  const months = Math.floor(days / 30)
  if (months < 12) return `منذ ${months} شهر`
  const years = Math.floor(days / 365)
  return `منذ ${years} سنة`
}
