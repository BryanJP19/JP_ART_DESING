import { useState, useEffect, useMemo } from "react";
import "./App.css";

const PHONE = "829-637-5424";
const WA_NUMBER = "18296375424";
const EMAIL = "pena57481@gmail.com";
const INSTAGRAM = "JORDANYART_";
const wa = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const NAV = [
  ["inicio", "Inicio"],
  ["servicios", "Servicios"],
  ["agenda", "Agenda & Calendario"],
  ["ofertas", "Ofertas"],
  ["contacto", "Contacto"],
];

const Icon = ({ children }) => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const SERVICES = [
  {
    title: "Productos personalizados",
    items: ["Tazas", "Termos", "T-Shirts", "Camisetas", "Gorras"],
    icon: <Icon><path d="M16 3l5 4-3 3-2-1v12H8V9l-2 1-3-3 5-4a4 4 0 0 0 8 0z" /></Icon>,
  },
  {
    title: "Impresión",
    items: ["Sublimación", "DTF"],
    icon: <Icon><path d="M12 2l10 5-10 5L2 7l10-5z" /><path d="M2 12l10 5 10-5" /><path d="M2 17l10 5 10-5" /></Icon>,
  },
  {
    title: "Diseño gráfico",
    items: ["Logos", "Covers", "Maquetas", "Publicidad"],
    icon: <Icon><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><circle cx="11" cy="11" r="2" /></Icon>,
  },
  {
    title: "Foto y video",
    items: ["Edición", "Fotografía", "Flyers", "Videos publicitarios"],
    icon: <Icon><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></Icon>,
  },
];

const OFFERS = [
  {
    title: "2 GORRAS BORDADAS POR 600 PESOS",
    image: "./ofertas/gorras.jpeg",
    alt: "Gorras bordadas personalizadas en Santo Domingo, 2 por 600 pesos",
    details: ["Personaliza tus gorras a tu estilo", "Alta calidad", "Diseños personalizados", "Ideal para regalos"],
    msg: "Hola, quiero pedir la oferta: 2 gorras bordadas por 600 pesos.",
  },
  {
    title: "2 TERMOS POR 2,000 PESOS",
    image: "./ofertas/termos.jpeg",
    alt: "Termos personalizados con diseño propio en Santo Domingo, 2 por 2,000 pesos",
    details: ["Mantiene la temperatura", "Alta calidad", "Diseños personalizados", "Ideal para regalos"],
    msg: "Hola, quiero pedir la oferta: 2 termos por 2,000 pesos.",
  },
];

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const SERVICE_OPTIONS = ["Tazas", "Termos", "T-Shirts / Camisetas", "Gorras", "Sublimación / DTF", "Logos / Covers / Maquetas", "Publicidad / Flyers", "Edición / Fotografía / Videos"];

// Horario de 8:30 AM a 5:30 PM, cada 30 minutos
const fmtTime = (mins) => {
  const h = Math.floor(mins / 60);
  const m = String(mins % 60).padStart(2, "0");
  return `${h % 12 === 0 ? 12 : h % 12}:${m} ${h >= 12 ? "PM" : "AM"}`;
};
const SLOTS = Array.from({ length: 19 }, (_, i) => 510 + i * 30);

const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function Logo({ onClick }) {
  return (
    <a href="#inicio" className="logo" onClick={onClick} aria-label="JP ART Desing">
      <img className="logo-mark" src="/logo-jp.png" alt="Logo de JP ART Desing, diseño gráfico y sublimación en Santo Domingo" />
      <span className="logo-text">JP DESING AND ART</span>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="navbar">
      <Logo onClick={close} />
      <button className="burger" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav className={`menu ${open ? "open" : ""}`}>
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={close}>{label}</a>
        ))}
        <a className="btn btn-sm" href={wa("Hola, quiero información sobre sus servicios.")} target="_blank" rel="noreferrer">WhatsApp {PHONE}</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <h1 className="neon-3d">CREA TUS TRABAJOS CON NOSOTROS</h1>
      <p className="subtitle">Tu Idea, Nuestro Diseño</p>
      <div className="cta-row">
        <a className="btn" href="#ofertas">Ver Ofertas</a>
        <a className="btn btn-outline" href="#agenda">Agendar Cita</a>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="section">
      <h2 className="neon-title">SERVICIOS</h2>
      <div className="grid services">
        {SERVICES.map((s) => (
          <article className="card" key={s.title}>
            {s.icon}
            <h3>{s.title}</h3>
            <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Agenda() {
  const [now, setNow] = useState(new Date());
  const [view, setView] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const year = view.getFullYear();
  const month = view.getMonth();
  const cells = useMemo(() => {
    const offset = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    return [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => new Date(year, month, i + 1))];
  }, [year, month]);

  const isSunday = day && day.getDay() === 0;
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const slots = day && !isSunday ? SLOTS.filter((m) => !sameDay(day, today) || m > nowMins) : [];
  const canGoBack = year > today.getFullYear() || month > today.getMonth();

  const pickDay = (d) => { setDay(d); setTime(null); };
  const dayLabel = day ? `${WEEKDAYS[day.getDay()]} ${day.getDate()} de ${MONTHS[day.getMonth()]} de ${day.getFullYear()}` : "";
  const message = day && time !== null
    ? `Hola, quiero agendar una cita en Art Desing Discovery.\nNombre: ${name || "(sin indicar)"}\nServicio: ${service}\nFecha: ${dayLabel}\nHora: ${fmtTime(time)}`
    : "";

  return (
    <section id="agenda" className="section">
      <h2 className="neon-title">AGENDA ABIERTA</h2>
      <div className="clock" role="timer" aria-live="off">
        <span className="clock-time">{now.toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
        <span className="clock-date">{now.toLocaleDateString("es-DO", { weekday: "long", day: "numeric", month: "long" })}</span>
      </div>

      <ul className="hours">
        <li><strong>Lunes a Viernes</strong> 8:30 AM a 5:30 PM</li>
        <li><strong>Sábados</strong> 8:30 AM a 5:30 PM</li>
        <li className="closed"><strong>Domingos</strong> ¡CERRADO! (Pago Adicional)</li>
      </ul>

      <div className="booking">
        <div className="calendar card">
          <div className="cal-head">
            <button aria-label="Mes anterior" disabled={!canGoBack} onClick={() => setView(new Date(year, month - 1, 1))}>‹</button>
            <strong>{MONTHS[month]} {year}</strong>
            <button aria-label="Mes siguiente" onClick={() => setView(new Date(year, month + 1, 1))}>›</button>
          </div>
          <div className="cal-grid">
            {WEEKDAYS.map((w) => <span className="cal-wd" key={w}>{w}</span>)}
            {cells.map((d, i) =>
              d ? (
                <button
                  key={i}
                  disabled={d < today}
                  className={`cal-day ${d.getDay() === 0 ? "sunday" : ""} ${sameDay(d, today) ? "today" : ""} ${day && sameDay(d, day) ? "selected" : ""}`}
                  onClick={() => pickDay(d)}
                >
                  {d.getDate()}
                </button>
              ) : (
                <span key={i} />
              )
            )}
          </div>
        </div>

        <div className="slots card">
          <h3>{day ? dayLabel : "Elige un día del calendario"}</h3>
          {isSunday && (
            <div className="notice">
              Los domingos estamos ¡CERRADOS! Si necesitas el servicio ese día, tiene un pago adicional.{" "}
              <a href={wa(`Hola, quiero consultar un servicio para el domingo ${dayLabel} (pago adicional).`)} target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
            </div>
          )}
          {day && !isSunday && slots.length === 0 && <p className="muted">Ya no quedan horas disponibles hoy. Elige otro día.</p>}
          {slots.length > 0 && (
            <div className="slot-grid">
              {slots.map((m) => (
                <button key={m} className={`slot ${time === m ? "selected" : ""}`} onClick={() => setTime(m)}>{fmtTime(m)}</button>
              ))}
            </div>
          )}

          {time !== null && (
            <div className="summary">
              <h4>Resumen de tu cita</h4>
              <label>Tu nombre
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Escribe tu nombre" />
              </label>
              <label>Servicio
                <select value={service} onChange={(e) => setService(e.target.value)}>
                  {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <p><strong>Fecha:</strong> {dayLabel}</p>
              <p><strong>Hora:</strong> {fmtTime(time)}</p>
              <a className="btn" href={wa(message)} target="_blank" rel="noreferrer">Confirmar cita por WhatsApp</a>
            </div>
          )}
        </div>
      </div>

      <p className="policy">
        TODOS LOS CLIENTES QUE QUIERAN CUALQUIER TIPO DE TRABAJO DEBERÁN DE PAGAR UN 50% DE ADELANTO Y EL OTRO 50% CUANDO SE TERMINE EL TRABAJO ESTO SE DEBE A QUE ME HAN DEJADO MUCHOS TRABAJOS A MEDIA Y NUNCA LO RECLAMAN &amp; SE DA POR PERDIDO!
      </p>
    </section>
  );
}

function Offers() {
  return (
    <section id="ofertas" className="section">
      <h2 className="neon-title">OFERTAS IMPERDIBLES</h2>
      <div className="grid offers">
        {OFFERS.map((o) => (
          <article className="card offer" key={o.title}>
            <img
              className="offer-img"
              src={o.image}
              alt={o.alt}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <h3>{o.title}</h3>
            <ul className="checks">{o.details.map((d) => <li key={d}>{d}</li>)}</ul>
            <a className="btn" href={wa(o.msg)} target="_blank" rel="noreferrer">Pedir esta Oferta por WhatsApp</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="section">
      <h2 className="neon-title">CONTACTO</h2>
      <div className="grid contact">
        <a className="card contact-item" href={`mailto:${EMAIL}`}><span>Correo</span><strong>{EMAIL}</strong></a>
        <a className="card contact-item" href={wa("Hola, quiero información.")} target="_blank" rel="noreferrer"><span>WhatsApp / Teléfono</span><strong>{PHONE}</strong></a>
        <a className="card contact-item" href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer"><span>Instagram</span><strong>@{INSTAGRAM}</strong></a>
      </div>
      <div className="cta-row">
        <a className="btn" href={`https://ig.me/m/${INSTAGRAM}`} target="_blank" rel="noreferrer">Escribir al DM</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <p>© {new Date().getFullYear()} JP DESING AND ART. Todos los derechos reservados.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Agenda />
        <Offers />
        <Contact />
      </main>
      <Footer />
      <a className="wa-float" href={wa("Hola, quiero información sobre sus servicios.")} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp">WA</a>
    </>
  );
}
