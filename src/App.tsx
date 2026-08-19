import { useEffect, useRef, useState, type ReactNode } from 'react'
import imgJavier from '@/imports/JAVIER_TELLO.png'
import imgJoseCarlos from '@/imports/JOSE_CARLOS.png'
import imgCamila from '@/imports/CAMILA_CEJAS.png'
import imgValeria from '@/imports/Valeri_Cervantes.png'
import imgJesus from '@/imports/JESUS_CASTA_EDA.png'
import imgDiego from '@/imports/DIEGO_GARCIA.png'
import imgIleana from '@/imports/ILEANA_Tapia.jpeg'
import imgMarco from '@/imports/MARCO.jpeg'
import imgYael from '@/imports/YAEL_SEBASTIAN.jpeg'
import imgEverardo from '@/imports/EVARARDO.jpeg'
import imgKiara from '@/imports/KIARA_HER.jpeg'
import imgAngel from '@/imports/ANGEL_MONROY-1.png'
import imgAlan from '@/imports/ALAN-1.png'
import imgErick from '@/imports/ERICK_SANTIAGO-1.png'

// ─── GALAXY CANVAS ────────────────────────────────────────────────────────────
function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let W = (canvas.width = canvas.offsetWidth)
    let H = (canvas.height = canvas.offsetHeight)

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    // Galaxy arms
    const ARMS = 3
    const STARS_PER_ARM = 320
    const TOTAL = ARMS * STARS_PER_ARM + 200

    type Star = { angle: number; radius: number; arm: number; size: number; speed: number; opacity: number; color: string }

    const COLORS = ['#D4E55A', '#7DD3FC', '#FFFFFF', '#C8D8FF', '#FFE8A0']

    const stars: Star[] = []

    // Spiral arm stars
    for (let a = 0; a < ARMS; a++) {
      for (let i = 0; i < STARS_PER_ARM; i++) {
        const t = i / STARS_PER_ARM
        const radius = 20 + t * Math.min(W, H) * 0.42
        const spread = (1 - t) * 0.6 + 0.05
        stars.push({
          angle: (a / ARMS) * Math.PI * 2 + t * Math.PI * 3.5 + (Math.random() - 0.5) * spread,
          radius: radius + (Math.random() - 0.5) * 30 * (1 - t * 0.5),
          arm: a,
          size: Math.random() * (t < 0.3 ? 2.2 : 1.4) + 0.3,
          speed: 0.00008 + Math.random() * 0.00004,
          opacity: 0.4 + Math.random() * 0.6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    // Random background stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.min(W, H) * 0.5,
        arm: -1,
        size: Math.random() * 0.9 + 0.2,
        speed: Math.random() * 0.00003,
        opacity: 0.15 + Math.random() * 0.35,
        color: '#FFFFFF',
      })
    }

    let rotation = 0

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2
      const cy = H / 2

      // Core glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60)
      grd.addColorStop(0, 'rgba(212,229,90,0.55)')
      grd.addColorStop(0.3, 'rgba(125,211,252,0.18)')
      grd.addColorStop(1, 'transparent')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(cx, cy, 60, 0, Math.PI * 2)
      ctx.fill()

      for (const s of stars) {
        const angle = s.angle + rotation * (s.arm >= 0 ? 1 : 0.3)
        const x = cx + Math.cos(angle) * s.radius
        const y = cy + Math.sin(angle) * s.radius * 0.42 // flatten to ellipse

        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = s.color.replace(')', `,${s.opacity})`).replace('rgb', 'rgba').replace('#', '')

        // Handle hex color
        const hex = s.color
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        ctx.fillStyle = `rgba(${r},${g},${b},${s.opacity})`
        ctx.fill()
      }

      rotation += 0.0004
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// ─── NEURAL CANVAS ────────────────────────────────────────────────────────────
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const N = 75
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 165) {
            const alpha = (1 - dist / 165) * 0.45
            ctx.beginPath()
            ctx.strokeStyle = `rgba(212,229,90,${alpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
        const n = nodes[i]
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212,229,90,0.8)'
        ctx.fill()
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} />
}

// ─── TILT CARD ────────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({})
  const [spotlight, setSpotlight] = useState<React.CSSProperties>({})

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -10
    const rotY = ((x - cx) / cx) * 10
    setCardStyle({ transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`, transition: 'transform 0.1s ease-out' })
    setSpotlight({ background: `radial-gradient(220px circle at ${x}px ${y}px, rgba(212,229,90,0.13), transparent 65%)` })
  }

  const onLeave = () => {
    setCardStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 0.55s ease-out' })
    setSpotlight({})
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={cardStyle} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]" style={spotlight} />
      {children}
    </div>
  )
}

// ─── FADE UP ──────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  )
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const duration = 2200
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
const TAGS = [
  '#DivulgaciónCientífica', '⟡', '#Sinapsis', '⟡', '#Ingeniería', '⟡',
  '#TecDeMonterry', '⟡', '#CienciaAccesible', '⟡', '#IngenieríaYCiencias', '⟡',
  '#GrupoEstudiantil', '⟡', '#Innovación', '⟡',
]

function MarqueeStrip() {
  const doubled = [...TAGS, ...TAGS]
  return (
    <div className="overflow-hidden border-y" style={{ borderColor: 'rgba(212,229,90,0.18)', background: '#080f1e', paddingTop: '14px', paddingBottom: '14px' }}>
      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {doubled.map((tag, i) => (
          <span key={i} className="mx-5 font-display text-xs font-semibold tracking-widest uppercase whitespace-nowrap" style={{ color: 'rgba(212,229,90,0.65)' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── DOT NAV ──────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'portada',      label: 'Portada' },
  { id: 'background',  label: 'Background' },
  { id: 'integrantes',  label: 'Mesa Directiva' },
  { id: 'integrantes2', label: 'Integrantes' },
  { id: 'asesores',    label: 'Asesores' },
  { id: 'actividades', label: 'Actividades' },
  { id: 'proyectos',   label: 'Proyectos' },
  { id: 'necesidades', label: '¿Qué necesitamos?' },
  { id: 'que-sigue',   label: '¿Qué sigue?' },
  { id: 'gracias',     label: 'Gracias' },
]

function NavDots({ active }: { active: string }) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-2.5 hidden lg:flex">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={label}
          className="group flex items-center justify-end gap-2"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-display font-semibold tracking-wide whitespace-nowrap px-2 py-0.5 rounded"
            style={{ color: '#D4E55A', background: 'rgba(13,26,50,0.9)' }}>
            {label}
          </span>
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: active === id ? '10px' : '6px',
              height: active === id ? '10px' : '6px',
              background: active === id ? '#D4E55A' : 'rgba(255,255,255,0.28)',
              boxShadow: active === id ? '0 0 8px #D4E55A' : 'none',
            }}
          />
        </button>
      ))}
    </div>
  )
}

// ─── LOGOS / ICONS ────────────────────────────────────────────────────────────
function TecLogo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={small ? 22 : 28} height={small ? 22 : 28} viewBox="0 0 28 28" fill="none">
        <polygon points="14,1 27,14 14,27 1,14" fill="#003087" stroke="#D4E55A" strokeWidth="0.8" />
        <text x="14" y="19" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="Sora, sans-serif">T</text>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold uppercase" style={{ fontSize: small ? '7px' : '8px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.75)' }}>Tec de</span>
        <span className="font-display font-bold uppercase" style={{ fontSize: small ? '7px' : '8px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.75)' }}>Monterrey</span>
      </div>
    </div>
  )
}

function SynapseIsotipo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow rings */}
      <circle cx="150" cy="150" r="120" stroke="#D4E55A" strokeWidth="0.5" opacity="0.12" />
      <circle cx="150" cy="150" r="90" stroke="#D4E55A" strokeWidth="0.5" opacity="0.2" />
      {/* Upper neural arc */}
      <path d="M 50,150 C 80,55 140,45 150,45 C 160,45 220,55 250,150" stroke="#D4E55A" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      {/* Lower neural arc */}
      <path d="M 50,150 C 80,245 140,255 150,255 C 160,255 220,245 250,150" stroke="#D4E55A" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      {/* Vertical connectors */}
      <line x1="150" y1="45" x2="150" y2="100" stroke="#7DD3FC" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.8" />
      <line x1="150" y1="200" x2="150" y2="255" stroke="#7DD3FC" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.8" />
      {/* Side connectors */}
      <line x1="50" y1="150" x2="80" y2="150" stroke="#7DD3FC" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <line x1="220" y1="150" x2="250" y2="150" stroke="#7DD3FC" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      {/* End nodes */}
      <circle cx="50" cy="150" r="9" fill="#D4E55A" />
      <circle cx="50" cy="150" r="16" stroke="#D4E55A" strokeWidth="1" opacity="0.25" />
      <circle cx="250" cy="150" r="9" fill="#D4E55A" />
      <circle cx="250" cy="150" r="16" stroke="#D4E55A" strokeWidth="1" opacity="0.25" />
      {/* Top/bottom nodes */}
      <circle cx="150" cy="45" r="6" fill="#7DD3FC" />
      <circle cx="150" cy="255" r="6" fill="#7DD3FC" />
      {/* Mid-arc nodes */}
      <circle cx="95" cy="88" r="4" fill="#D4E55A" opacity="0.8" />
      <circle cx="205" cy="88" r="4" fill="#D4E55A" opacity="0.8" />
      <circle cx="95" cy="212" r="4" fill="#D4E55A" opacity="0.8" />
      <circle cx="205" cy="212" r="4" fill="#D4E55A" opacity="0.8" />
      {/* Central node */}
      <circle cx="150" cy="150" r="20" fill="#1B2A4A" stroke="#D4E55A" strokeWidth="2" />
      <circle cx="150" cy="150" r="10" fill="#D4E55A" className="animate-pulse-dot" />
    </svg>
  )
}

// ─── CAREER ICON ─────────────────────────────────────────────────────────────
const CAREERS = [
  { name: 'Tecnologías Computacionales', abbr: 'ITC', icon: '⟨⟩', color: '#7DD3FC' },
  { name: 'Industrial', abbr: 'IIS', icon: '⚙', color: '#6EE7B7' },
  { name: 'Biotecnología', abbr: 'IBT', icon: '⊕', color: '#F9A8D4' },
  { name: 'Mecatrónica', abbr: 'IRM', icon: '◈', color: '#FCD34D' },
  { name: 'Nanotecnología', abbr: 'NAN', icon: '◉', color: '#D4E55A' },
  { name: 'Mecánica', abbr: 'IM', icon: '⛭', color: '#FB923C' },
]

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-display font-bold text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(212,229,90,0.5)' }}>{num}</span>
      <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(212,229,90,0.3)' }} />
      <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: 'rgba(212,229,90,0.5)' }}>{label}</span>
    </div>
  )
}

// ─── MEMBER CARD ─────────────────────────────────────────────────────────────
function MemberCard({ name, role, initials, color = '#D4E55A', photo }: { name: string; role: string; initials: string; color?: string; photo?: string }) {
  return (
    <TiltCard className="rounded-2xl p-6 flex flex-col items-center gap-4 gradient-border" style={{ background: '#16213E' } as React.CSSProperties}>
      <div
        className="w-20 h-20 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-xl font-display font-bold"
        style={photo ? { border: `2px solid ${color}55` } : { background: `linear-gradient(135deg, ${color}22, ${color}44)`, border: `2px solid ${color}55`, color }}
      >
        {photo
          ? <img src={photo} alt={name} className="w-full h-full object-cover object-center" />
          : initials}
      </div>
      <div className="text-center">
        <p className="font-display font-semibold text-sm leading-tight" style={{ color: '#E8EDF5' }}>{name}</p>
        <p className="text-xs mt-1 font-medium tracking-wide" style={{ color: 'rgba(212,229,90,0.7)' }}>{role}</p>
      </div>
    </TiltCard>
  )
}

// ─── NEED ICON CARD ───────────────────────────────────────────────────────────
function NeedCard({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  return (
    <FadeUp delay={delay} className="flex flex-col items-center gap-3 group cursor-default">
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:-translate-y-2"
        style={{ background: 'rgba(212,229,90,0.08)', border: '1px solid rgba(212,229,90,0.25)' }}
      >
        {icon}
      </div>
      <span className="font-display text-xs font-semibold text-center tracking-wide" style={{ color: '#E8EDF5' }}>{label}</span>
    </FadeUp>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('portada')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }) },
      { threshold: 0.3 }
    )
    SECTIONS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="relative" style={{ background: '#0d1a32' }}>
      <NavDots active={active} />

      {/* ══ SLIDE 1 — PORTADA ══════════════════════════════════════════════════ */}
      <section id="portada" className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(160deg, #080f1e 0%, #0d1a32 55%, #111d38 100%)' }}>
        <NeuralCanvas />

        {/* Spinning wireframe */}
        <div className="absolute -right-40 top-10 w-[500px] h-[500px] opacity-8 pointer-events-none animate-spin-slow">
          <svg viewBox="0 0 400 400" fill="none">
            <ellipse cx="200" cy="200" rx="180" ry="80" stroke="#D4E55A" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="180" ry="80" stroke="#D4E55A" strokeWidth="1" transform="rotate(60 200 200)" />
            <ellipse cx="200" cy="200" rx="180" ry="80" stroke="#D4E55A" strokeWidth="1" transform="rotate(120 200 200)" />
            <circle cx="200" cy="200" r="180" stroke="#7DD3FC" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Nav bar */}
        <div className="relative z-10 flex items-center justify-between px-8 py-6">
          <TecLogo />
          <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'rgba(212,229,90,0.6)' }}>Campus Toluca</span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
          <div className="animate-float mb-10">
            <SynapseIsotipo className="w-44 h-44 md:w-56 md:h-56" />
          </div>

          {/* Central statement card */}
          <FadeUp>
            <div className="rounded-3xl px-10 py-8 md:px-16 md:py-10 mb-8 gradient-border" style={{ background: 'linear-gradient(135deg, rgba(27,42,74,0.9), rgba(22,33,62,0.9))' }}>
              <h1 className="font-display font-extrabold tracking-tight shimmer-text" style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}>
                SINAPSIS = DIVULGACIÓN
              </h1>
              <p className="mt-2 font-display text-sm tracking-widest uppercase" style={{ color: 'rgba(232,237,245,0.45)' }}>
                Grupo estudiantil · Tec de Monterrey
              </p>
            </div>
          </FadeUp>

          {/* Arrow */}
          <FadeUp delay={150} className="flex justify-center mb-6">
            <svg width="2" height="36" viewBox="0 0 2 36">
              <line x1="1" y1="0" x2="1" y2="36" stroke="#D4E55A" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            </svg>
          </FadeUp>

          {/* 3 pillars */}
          <FadeUp delay={250} className="w-full max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Proyectos', color: '#7DD3FC', bg: 'rgba(125,211,252,0.08)', icon: '◈' },
                { label: 'Exposiciones', color: '#FF6B6B', bg: 'rgba(255,107,107,0.08)', icon: '◉' },
                { label: '"Ciencia accesible"', color: '#6EE7B7', bg: 'rgba(110,231,183,0.08)', icon: '⊕' },
              ].map((p, i) => (
                <TiltCard key={p.label} className="rounded-2xl py-6 px-4 text-center gradient-border" style={{ background: p.bg } as React.CSSProperties}>
                  <span className="text-2xl block mb-2">{p.icon}</span>
                  <p className="font-display font-bold text-base" style={{ color: p.color }}>{p.label}</p>
                </TiltCard>
              ))}
            </div>
          </FadeUp>

          <div className="flex flex-col items-center gap-2 mt-12 opacity-40">
            <span className="font-display text-xs tracking-widest uppercase" style={{ color: '#D4E55A' }}>Scroll</span>
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #D4E55A, transparent)' }} />
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ══ SLIDE 2 — BACKGROUND ═══════════════════════════════════════════════ */}
      <section id="background" className="relative py-32 px-6" style={{ background: '#0d1a32' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          <FadeUp className="flex">
            <div className="rounded-3xl p-10 flex flex-col justify-between w-full" style={{ background: 'linear-gradient(145deg, #1B3A5A, #0F2A1A)', border: '1px solid rgba(212,229,90,0.15)' }}>
              <SectionLabel num="02" label="Trayectoria" />
              <div>
                <h2 className="font-display font-extrabold leading-none" style={{ fontSize: 'clamp(48px, 8vw, 88px)', color: '#D4E55A' }}>Back<br />ground</h2>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(232,237,245,0.6)' }}>
                  Experiencia real en eventos de ciencia y tecnología. Sinapsis nace de un equipo con trayectoria comprobada.
                </p>
              </div>
            </div>
          </FadeUp>

          <div className="flex flex-col gap-4 justify-center">
            {[
              { name: 'Noche de las estrellas', icon: '🌟', year: '2024' },
              { name: 'Biohack CCM 2024/2025', icon: '🧫', year: '2024–25' },
              { name: 'Biohack Nacional 2024', icon: '🏆', year: '2024' },
              { name: 'Competencia UAM Azcapotzalco', icon: '🎓', year: '2024' },
              { name: 'AAVAT', icon: '🛸', year: 'Activo' },
            ].map((item, i) => (
              <FadeUp key={item.name} delay={i * 100}>
                <div className="flex items-center justify-between rounded-xl px-5 py-4 gradient-border group hover:bg-[rgba(212,229,90,0.04)] transition-colors" style={{ background: '#16213E' }}>
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-display font-semibold text-sm" style={{ color: '#E8EDF5' }}>{item.name}</span>
                  </div>
                  <span className="font-display text-xs font-bold tracking-widest" style={{ color: 'rgba(212,229,90,0.55)' }}>{item.year}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ══ SLIDE 3 — INTEGRANTES ══════════════════════════════════════════════ */}
      <section id="integrantes" className="relative py-32 px-6" style={{ background: '#080f1e' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel num="03" label="Mesa Directiva" />
            <h2 className="font-display font-extrabold leading-tight mb-16" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#E8EDF5' }}>
              Integrantes
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {[
              { name: 'Javier Tello Vázquez', role: 'Presidente', initials: 'JT', color: '#D4E55A', photo: imgJavier },
              { name: 'José Carlos Ramos Martínez', role: 'Vice-presidente', initials: 'JR', color: '#7DD3FC', photo: imgJoseCarlos },
              { name: 'Camila Cejas Palacios', role: 'Coordinadora de Proyectos', initials: 'CC', color: '#F9A8D4', photo: imgCamila },
              { name: 'Valeria Cervantes Murguía', role: 'Responsabilidad Social', initials: 'VC', color: '#6EE7B7', photo: imgValeria },
              { name: 'Diego García Morales', role: 'Finanzas', initials: 'DG', color: '#FCD34D', photo: imgDiego },
              { name: 'Jesús Villafuerte Castañeda', role: 'Comunicación', initials: 'JV', color: '#FCD34D', photo: imgJesus },
            ].map((m, i) => (
              <FadeUp key={m.initials} delay={i * 90}>
                <MemberCard {...m} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SLIDE 4 — INTEGRANTES GENERALES ══════════════════════════════════ */}
      <section id="integrantes2" className="relative py-32 px-6" style={{ background: '#0d1a32' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel num="04" label="Integrantes" />
            <h2 className="font-display font-extrabold leading-tight mb-16" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#E8EDF5' }}>
              Integrantes
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Ileana Tapia Castillo',              initials: 'IT', color: '#F9A8D4', photo: imgIleana },
              { name: 'Marco Aurelio Tamez Roblez',         initials: 'MT', color: '#7DD3FC', photo: imgMarco },
              { name: 'Yael Sebastián Hernández González',  initials: 'YH', color: '#D4E55A', photo: imgYael },
              { name: 'Everardo Gonzalo Jaimez Vera',       initials: 'EJ', color: '#6EE7B7', photo: imgEverardo },
              { name: 'Kiara Hermann San Lucas',            initials: 'KH', color: '#FCD34D', photo: imgKiara },
            ].map((m, i) => (
              <FadeUp key={m.initials} delay={i * 90}>
                <MemberCard name={m.name} role="" initials={m.initials} color={m.color} photo={m.photo} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ══ SLIDE 5 — ASESORES ═════════════════════════════════════════════════ */}
      <section id="asesores" className="relative py-32 px-6" style={{ background: '#080f1e' }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <SectionLabel num="05" label="Mentores" />
            <h2 className="font-display font-extrabold leading-tight mb-16" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#E8EDF5' }}>
              Asesores
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Ángel Rafael Monroy Peláez', initials: 'AM', color: '#7DD3FC', photo: imgAngel },
              { name: 'Alan Joel Miralrio Pineda', initials: 'AJ', color: '#D4E55A', photo: imgAlan },
              { name: 'Erick Santiago Escobar Aguilar', initials: 'EE', color: '#6EE7B7', photo: imgErick },
            ].map((a, i) => (
              <FadeUp key={a.initials} delay={i * 130}>
                <MemberCard name={a.name} role="Asesor" initials={a.initials} color={a.color} photo={a.photo} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ══ SLIDE 6 — ACTIVIDADES ══════════════════════════════════════════════ */}
      <section id="actividades" className="relative py-32 px-6" style={{ background: '#080f1e' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <SectionLabel num="06" label="Continuo" />
            <h2 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#E8EDF5' }}>
              Actividades
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,237,245,0.5)' }}>
              Iniciativas continuas que extienden nuestro impacto más allá de los eventos puntuales.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-4">
            {[
              { num: '#01', text: 'Participación en Radio Mexiquense', icon: '📻', delay: 80 },
              { num: '#02', text: 'Podcast "Consciencia"', icon: '🎙', delay: 180 },
              { num: '#03', text: 'Aparecer en CONECTA y en pantallas de la Universidad', icon: '📡', delay: 280 },
              { num: '#04', text: 'Asesorías en cohetes de la F1025B y con la AAVAT', icon: '🚀', delay: 380 },
            ].map((item) => (
              <FadeUp key={item.num} delay={item.delay}>
                <div className="flex items-center gap-4 rounded-xl px-5 py-4 gradient-border" style={{ background: '#1B2A4A' }}>
                  <span className="font-display font-extrabold text-sm w-10 shrink-0" style={{ color: '#D4E55A' }}>{item.num}</span>
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="font-display font-semibold text-sm" style={{ color: '#E8EDF5' }}>{item.text}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SLIDE 7 — PROYECTOS ════════════════════════════════════════════════ */}
      <section id="proyectos" className="relative py-32 px-6" style={{ background: '#0d1a32' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel num="07" label="Eventos" />
            <h2 className="font-display font-extrabold leading-tight mb-16" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#E8EDF5' }}>
              Proyectos
            </h2>
          </FadeUp>

          <div className="flex flex-col md:flex-row gap-6">
            {[
              {
                num: '01',
                name: 'Feria de ciencias',
                color: '#7DD3FC',
                desc: 'Evento con niños de secundaria para exponer proyectos de ciencia con talleres gratuitos y de paga.',
                tags: ['Secundaria', 'Talleres', 'Exposición'],
              },
              {
                num: '02',
                name: 'Congreso',
                color: '#D4E55A',
                desc: 'Evento estilo expoingenierías, permitir la postulación de proyectos de participantes del Tec, UNAM, UAEMéx, e IPN. El primer lugar de cada carrera se llevará un premio (aún por definir).',
                tags: ['Tec · UNAM · UAEMéx · IPN', 'Premio por carrera'],
              },
              {
                num: '03',
                name: 'Hackathon',
                color: '#6EE7B7',
                desc: 'Evento donde estudiantes de ingeniería de diversas carreras o mecánica (aún por definir) participarán para crear una solución a algún reto propuesto. *Evento aún en planeación.',
                tags: ['Multidisciplinario', 'Reto abierto', 'En planeación'],
              },
            ].map((ev, i) => (
              <FadeUp key={ev.num} delay={i * 160} className="flex-1">
                <TiltCard className="rounded-2xl p-8 gradient-border h-full flex flex-col gap-4" style={{ background: '#16213E' } as React.CSSProperties}>
                  <span className="font-display font-extrabold text-5xl" style={{ color: ev.color, opacity: 0.18 }}>{ev.num}</span>
                  <h3 className="font-display font-extrabold text-xl" style={{ color: ev.color }}>{ev.name}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(232,237,245,0.65)' }}>{ev.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {ev.tags.map((t) => (
                      <span key={t} className="text-[10px] font-display font-semibold px-2 py-1 rounded" style={{ color: ev.color, background: `${ev.color}15` }}>{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ══ SLIDE 8 — ¿QUÉ NECESITAMOS? ═══════════════════════════════════════ */}
      <section id="necesidades" className="relative py-32 px-6" style={{ background: '#080f1e' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel num="08" label="Apoyo" />
            <h2 className="font-display font-extrabold leading-tight mb-16" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#E8EDF5' }}>
              ¿Qué necesitamos?
            </h2>
          </FadeUp>

          <div className="flex flex-col gap-5">
            {[
              {
                icon: '✅',
                color: '#6EE7B7',
                title: 'El visto bueno de las previas actividades',
                desc: '',
                delay: 0,
              },
              {
                icon: '🏛',
                color: '#7DD3FC',
                title: 'Un espacio físico dentro del campus',
                desc: 'Mesas, sillas, conectores, pizarrón. Sugerencias: Oficinas vacías del tercer piso del edificio de aulas, área detrás de zona EI, Kids club.',
                delay: 120,
              },
              {
                icon: '🧪',
                color: '#D4E55A',
                title: 'Uso de los laboratorios y herramientas de ingeniería',
                desc: 'Lab de ciencias básicas, laboratorio de electrónica, lab de química. Cortadora láser, impresoras 3D.',
                delay: 240,
              },
              {
                icon: '📦',
                color: '#FCD34D',
                title: 'Materiales para desarrollo de proyectos',
                desc: 'Filamento para impresoras 3D, componentes electrónicos, presupuesto para congreso.',
                delay: 360,
              },
            ].map((item) => (
              <FadeUp key={item.title} delay={item.delay}>
                <div className="rounded-2xl px-6 py-5 gradient-border flex gap-5 items-start" style={{ background: '#16213E' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5" style={{ background: `${item.color}15` }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm mb-1" style={{ color: item.color }}>{item.title}</p>
                    {item.desc && <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,237,245,0.6)' }}>{item.desc}</p>}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SLIDE 9 — ¿QUÉ SIGUE? ═════════════════════════════════════════════ */}
      <section id="que-sigue" className="relative py-32 px-6 overflow-hidden" style={{ background: '#0d1a32' }}>
        {/* Decorative galaxy behind */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GalaxyCanvas />
          <div className="absolute inset-0" style={{ background: 'rgba(13,26,50,0.82)' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeUp>
            <SectionLabel num="09" label="Próximos pasos" />
            <h2 className="font-display font-extrabold leading-tight mb-16" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#E8EDF5' }}>
              ¿Qué sigue?
            </h2>
          </FadeUp>

          <div className="flex flex-col gap-6">
            {[
              {
                num: '01',
                color: '#D4E55A',
                text: 'Discutir con área de admisiones para determinar las escuelas secundarias, cantidad de alumnos y logística para llegar e irse de la escuela.',
                icon: '🏫',
                delay: 100,
              },
              {
                num: '02',
                color: '#7DD3FC',
                text: 'Desglosar y solicitar inmuebles para los eventos directamente con grupos estudiantiles (espacio en el campus, mesas, sillas, extensiones, pantallas, tarimas, luces).',
                icon: '📋',
                delay: 250,
              },
            ].map((item) => (
              <FadeUp key={item.num} delay={item.delay}>
                <TiltCard className="rounded-2xl p-8 gradient-border flex gap-6 items-start" style={{ background: 'rgba(27,42,74,0.85)' } as React.CSSProperties}>
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="font-display font-extrabold text-2xl" style={{ color: item.color, opacity: 0.35 }}>{item.num}</span>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: 'rgba(232,237,245,0.82)' }}>{item.text}</p>
                </TiltCard>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* ══ SLIDE 9 — AGRADECIMIENTO ═══════════════════════════════════════════ */}
      <section id="gracias" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden" style={{ background: '#080f1e' }}>
        <NeuralCanvas />

        {/* Spinning isotipo de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-8">
          <SynapseIsotipo className="w-[600px] h-[600px] animate-spin-slow" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="flex justify-center mb-8">
              <TecLogo />
            </div>

            <p className="font-display font-bold text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(212,229,90,0.5)' }}>
              Sinapsis · Tec de Monterrey Campus Toluca
            </p>

            <h2 className="font-display font-extrabold leading-tight mb-6 shimmer-text" style={{ fontSize: 'clamp(52px, 10vw, 110px)' }}>
              ¡Gracias!
            </h2>

            <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-xl mx-auto" style={{ color: 'rgba(232,237,245,0.75)' }}>
              Esperamos que se unan a nuestros proyectos y que juntos hagamos la ciencia más accesible para todos.
            </p>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="my-10 flex items-center justify-center gap-4">
              <div className="h-px flex-1 max-w-20" style={{ background: 'rgba(212,229,90,0.25)' }} />
              <SynapseIsotipo className="w-16 h-16 animate-float" />
              <div className="h-px flex-1 max-w-20" style={{ background: 'rgba(212,229,90,0.25)' }} />
            </div>
          </FadeUp>

          <FadeUp delay={350}>
            <p className="font-display font-extrabold tracking-tight mb-10" style={{ fontSize: 'clamp(20px, 4vw, 36px)', color: '#D4E55A' }}>
              SINAPSIS = DIVULGACIÓN
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Proyectos', 'Exposiciones', 'Ciencia accesible', 'Podcast', 'Radio'].map((tag) => (
                <span key={tag} className="font-display text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border" style={{ color: '#D4E55A', borderColor: 'rgba(212,229,90,0.35)', background: 'rgba(212,229,90,0.06)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={550} className="mt-12 flex flex-col items-center gap-5">
            <a
              href="https://cdc-sinapsis.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full px-10 py-4 font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,229,90,0.45)]"
              style={{ background: '#D4E55A', color: '#080f1e' }}
            >
              <span className="relative z-10">Conoce nuestro evento →</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'skewX(-15deg)' }} />
            </a>
            <p className="font-display text-xs tracking-widest" style={{ color: 'rgba(212,229,90,0.4)' }}>
              cdc-sinapsis.netlify.app
            </p>
            <p className="font-display text-xs tracking-[0.25em] uppercase mt-4" style={{ color: 'rgba(232,237,245,0.2)' }}>
              © 2025 Sinapsis · Tec de Monterrey Campus Toluca
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
