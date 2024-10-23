const audioContext = new window.AudioContext()
const gainNode = audioContext.createGain()
export async function playSound(url: string, volume: number = 0.2) {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

  const source = audioContext.createBufferSource()
  source.buffer = audioBuffer

  source.connect(gainNode)
  gainNode.connect(audioContext.destination)

  gainNode.gain.value = volume
  source.start(0)

  return source
}
