import "server-only"

// Checks whether the configured download URL is actually reachable (returns
// a successful response). Used to show a live "available / unavailable"
// status dot instead of just always assuming the file is there.
export async function checkDownloadAvailable(url: string): Promise<boolean> {
  if (!url || url === "#") return false

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)

    const headRes = await fetch(url, { method: "HEAD", signal: controller.signal, cache: "no-store" })
    clearTimeout(timeout)

    if (headRes.ok) return true

    // Some static hosts / CDNs don't implement HEAD correctly — fall back
    // to a tiny ranged GET before giving up.
    if (headRes.status === 405 || headRes.status === 501) {
      const getController = new AbortController()
      const getTimeout = setTimeout(() => getController.abort(), 4000)
      const getRes = await fetch(url, {
        method: "GET",
        headers: { Range: "bytes=0-0" },
        signal: getController.signal,
        cache: "no-store",
      })
      clearTimeout(getTimeout)
      return getRes.ok
    }

    return false
  } catch {
    return false
  }
}
