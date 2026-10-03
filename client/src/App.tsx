import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  AtSign,
  Code2,
  Home as HomeIcon,
  Mail,
  Menu as MenuIcon,
  UserRound,
  X,
} from "lucide-react";
import { profile } from "./data/site";
import "./index.css";

type Route = {
  page: string;
};

function parseRoute(): Route {
  const value = window.location.hash.replace(/^#\/?/, "") || "home";

  return {
    page: value.split("/")[0],
  };
}

function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parseRoute());

  useEffect(() => {
    const onChange = () => setRoute(parseRoute());

    window.addEventListener("hashchange", onChange);

    return () => {
      window.removeEventListener("hashchange", onChange);
    };
  }, []);

  return route;
}

function Arrow() {
  return (
    <ArrowRight
      className="arrow"
      aria-hidden="true"
    />
  );
}

function Snowfall() {
  return (
    <div
      className="snow-layer"
      aria-hidden="true"
    >
      {Array.from({ length: 15 }, (_, index) => (
        <span
          className={`snowflake snowflake-${index + 1}`}
          key={index}
        />
      ))}
    </div>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="site-header">
      <a
        className="brand"
        href="#home"
        aria-label="Kembali ke Home"
      >
        <span className="brand-mark">.threew</span>
      </a>

      <div className="header-tools">
        <a
          className="header-contact"
          href={`mailto:${profile.email}`}
        >
          <span className="status-dot" />
          tersedia
          <Arrow />
        </a>

        <button
          className="menu-trigger"
          onClick={onMenu}
          aria-label="Buka menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Sidebar({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: string;
  onClose: () => void;
}) {
  const links = [
    ["home", "Home"],
    ["profile", "About Me"],
    ["contact", "Contact"],
  ];

  return (
    <>
      <button
        className={`sidebar-scrim ${open ? "visible" : ""}`}
        onClick={onClose}
        aria-label="Tutup menu"
      />

      <aside
        className={`sidebar ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <header className="sidebar-top">
          <a
            className="sidebar-brand"
            href="#home"
            onClick={onClose}
          >
            .threew
          </a>

          <button
            className="close-trigger"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            <X size={16} />
          </button>
        </header>

        <nav className="sidebar-nav">
          {links.map(([key, label]) => (
            <a
              key={key}
              className={active === key ? "active" : ""}
              href={`#${key}`}
              onClick={onClose}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          className="sidebar-email"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
      </aside>
    </>
  );
}

function BottomNav({
  active,
  onMenu,
}: {
  active: string;
  onMenu: () => void;
}) {
  return (
    <nav
      className="bottom-nav"
      aria-label="Navigasi mobile"
    >
      <a
        className={active === "home" ? "active" : ""}
        href="#home"
        aria-label="Home"
      >
        <HomeIcon size={17} />
      </a>

      <a
        className={active === "profile" ? "active" : ""}
        href="#profile"
        aria-label="About Me"
      >
        <UserRound size={17} />
      </a>

      <a
        className={active === "contact" ? "active" : ""}
        href="#contact"
        aria-label="Contact"
      >
        <Mail size={17} />
      </a>

      <button
        onClick={onMenu}
        aria-label="Buka menu"
      >
        <MenuIcon size={18} />
      </button>
    </nav>
  );
}

function PageIntro({
  title,
  description,
}: {
  title: ReactNode;
  description?: string;
}) {
  return (
    <header className="page-intro">
      <h1>{title}</h1>

      {description && (
        <p className="intro-description">
          {description}
        </p>
      )}
    </header>
  );
}

function HomePage() {
  return (
    <main className="page home-page page-transition">
      <section className="hero-grid">
        <article className="hero-copy">
          <h1>
            Halo, aku <em>ojithreew.</em>
          </h1>

          <p className="hero-lede">
            Backend Developer dari Indonesia. Bagi saya,
            website yang bagus bukan cuma soal tampilannya,
            tapi juga tentang bagaimana sistem di baliknya
            bekerja.
          </p>

          <nav className="home-actions">
            <a
              className="button button-primary"
              href="#profile"
            >
              Kenalan
              <Arrow />
            </a>

            <a
              className="text-link"
              href="#contact"
            >
              Hubungi aku
              <Arrow />
            </a>
          </nav>
        </article>
      </section>

      <section className="signal-strip">
        <span>
          <i className="signal-dot" />
        </span>

        <strong>Active</strong>

        <span className="signal-bars">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </section>

      
    </main>
  );
}

function AboutMePage() {
  return (
    <main className="page page-transition">
      <PageIntro
        title={
          <>
            Halo aku,
            <br />
            <em>ojithreew.</em>
          </>
        }
        description="Aku ojithreew, developer dari Indonesia. Aku membangun API, mengelola data, dan membuat otomasi kecil yang membantu pekerjaan sehari-hari."
      />

      <section className="about-text-grid">
        <article className="about-lede">
          <p>
            Software yang bagus tidak perlu ramai.
            Cukup jelas, kuat, dan mudah dirawat.
          </p>

          
        </article>

        <ul className="about-facts">
          <li>
            <span>Domisili</span>
            <strong>{profile.location}</strong>
          </li>

          <li>
            <span>Peran</span>
            <strong>Backend developer</strong>
          </li>

          
        </ul>
      </section>

      
    </main>
  );
}

function ContactPage() {
  const socials = [
    {
      label: "Instagram",
      detail: "@ojithreew",
      href: "https://instagram.com/ojithreew",
      Icon: AtSign,
    },
    {
      label: "GitHub",
      detail: "ojithreew",
      href: "https://github.com/ojithreew",
      Icon: Code2,
    },
    {
      label: "Email",
      detail: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
    },
  ];

  return (
    <main className="page page-transition">
      <PageIntro
        title={
          <>
            Punya ide?
            <br />
            <em>Ayo mulai dari sini.</em>
          </>
        }
        description="Tidak harus langsung sempurna. Kirim pesan atau sekadar bilang halo."
      />

      <section className="contact-grid">
        

        <nav className="social-grid">
          {socials.map(
            ({ label, detail, href, Icon }) => (
              <a
                className="social-card"
                href={href}
                target={
                  href.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel="noreferrer"
                key={label}
              >
                <Icon size={17} />

                <span>
                  <b>{label}</b>
                  <small>{detail}</small>
                </span>

                <ArrowRight size={15} />
              </a>
            ),
          )}
        </nav>
      </section>

      
    </main>
  );
}

function NotFound() {
  return (
    <main className="page empty-page">
      <span className="eyebrow">
        404 / tidak ditemukan
      </span>

      <h1>
        Halaman ini
        <br />
        <em>tidak ada.</em>
      </h1>

      <a
        className="button button-primary"
        href="#home"
      >
        Kembali
        <Arrow />
      </a>
    </main>
  );
}

export default function App() {
  const route = useHashRoute();
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  let content: ReactNode;

  if (route.page === "home") {
    content = <HomePage />;
  } else if (route.page === "profile") {
    content = <AboutMePage />;
  } else if (route.page === "contact") {
    content = <ContactPage />;
  } else {
    content = <NotFound />;
  }

  const active = [
    "home",
    "profile",
    "contact",
  ].includes(route.page)
    ? route.page
    : "";

  return (
    <div className="app-shell">
      <Snowfall />

      <Header
        onMenu={() => setSidebarOpen(true)}
      />

      <Sidebar
        open={sidebarOpen}
        active={active}
        onClose={() => setSidebarOpen(false)}
      />

      {content}

      <footer className="site-footer">
        <span>© 2026 ojithreew</span>
        <span>All Rights Reserverd</span>
      </footer>

      <BottomNav
        active={active}
        onMenu={() => setSidebarOpen(true)}
      />
    </div>
  );
}
