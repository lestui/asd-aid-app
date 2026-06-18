export async function copyText(text, textAreaRef) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    textAreaRef?.current?.select()
    return document.execCommand('copy')
  } catch {
    return false
  }
}
