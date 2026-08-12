import { useRef, useEffect } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

interface Props {
  baseColor?: [number, number, number]
  speed?: number
  amplitude?: number
  frequencyX?: number
  frequencyY?: number
  interactive?: boolean
  className?: string
}

// LiquidChrome (ogl) — themed pastel. Tuned for integrated GPUs:
// single-sample (no 3×3 AA loop), half-resolution render, ~40fps cap,
// paused when scrolled offscreen, disabled for reduced-motion.
export default function LiquidChrome({
  baseColor = [0.72, 0.66, 0.94], // soft lavender - matches the violet accent
  speed = 0.3,
  amplitude = 0.3,
  frequencyX = 3,
  frequencyY = 2,
  interactive = true,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const renderer = new Renderer({ antialias: false, dpr: 1 })
    const gl = renderer.gl
    gl.clearColor(1, 1, 1, 1)

    const vertex = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
    `
    const fragment = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;
      void main() {
        vec2 fragCoord = vUv * uResolution.xy;
        vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);
        for (float i = 1.0; i < 8.0; i++) {
          uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
          uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
        }
        vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([1, 1, 1]) },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      // render at half the CSS size — the pattern is soft, upscaling is invisible
      const w = Math.max(1, Math.floor(container.offsetWidth * 0.5))
      const h = Math.max(1, Math.floor(container.offsetHeight * 0.5))
      renderer.setSize(w, h)
      const r = program.uniforms.uResolution.value as Float32Array
      r[0] = gl.canvas.width
      r[1] = gl.canvas.height
      r[2] = gl.canvas.width / gl.canvas.height
    }
    window.addEventListener('resize', resize)
    resize()

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const m = program.uniforms.uMouse.value as Float32Array
      m[0] = (e.clientX - rect.left) / rect.width
      m[1] = 1 - (e.clientY - rect.top) / rect.height
    }
    if (interactive) container.addEventListener('mousemove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(container)

    let raf = 0
    let last = 0
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || t - last < 25) return
      last = t
      program.uniforms.uTime.value = t * 0.001 * speed
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(loop)

    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    gl.canvas.style.display = 'block'
    container.appendChild(gl.canvas)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      if (interactive) container.removeEventListener('mousemove', onMove)
      if (gl.canvas.parentElement) gl.canvas.parentElement.removeChild(gl.canvas)
      const lose = gl.getExtension('WEBGL_lose_context')
      if (lose) lose.loseContext()
    }
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive])

  return <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`} aria-hidden />
}
