/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

// -------------------- Header --------------------
const headerStyles = css`
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
  border-bottom: 2px solid #e2e8f0;
`;

const headerContentStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;

  .mark {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #2563eb, #fbbf24);
    color: white;
    font-weight: 700;
    font-size: 20px;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
  }

  h1 {
    font-size: 20px;
    margin: 0;
    font-weight: 800;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #64748b;
  }
`;

const navStyles = css`
  display: flex;
  gap: 22px;

  a {
    font-weight: 600;
    color: #1e293b;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: #2563eb;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const myPagTabStyles = css`
  background: #2563eb;
  color: white !important;
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
`;

const mobileMenuBtn = (isOpen: boolean) => css`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${isOpen ? "#2563eb" : "transparent"};
    color: ${isOpen ? "white" : "#1e293b"};
    border: 2px solid #2563eb;
    border-radius: 999px;
    padding: 8px 14px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.25s ease;
  }
`;

const mobileNavStyles = (isOpen: boolean) => css`
  display: ${isOpen ? "flex" : "none"};
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  position: absolute;
  top: 72px;
  right: 18px;
  width: calc(100% - 36px);
  max-width: 360px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.15);
  z-index: 50;

  a {
    font-weight: 600;
    color: #1e293b;
    text-decoration: none;
  }

  a:hover {
    color: #2563eb;
  }
`;

// -------------------- Component --------------------
export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header css={headerStyles} aria-label="Site header">
      <div css={headerContentStyles}>
        {/* Logo */}
        <div css={logoStyles}>
          <div className="mark" aria-hidden>
            ⛪
          </div>
          <div>
            <h1>PAG Family</h1>
            <p>Connecting churches & people</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav css={navStyles} aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#news-events">News & Events</a>
          <a href="#churches-sermons">Churches & Sermons</a>
          <a href="#ministry-programs">Assembly Programs</a>
          <a css={myPagTabStyles} href="#account">
            My PAG
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            css={mobileMenuBtn(isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen((s) => !s)}
          >
            {isMobileMenuOpen ? (
              // Close (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger (☰)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        css={mobileNavStyles(isMobileMenuOpen)}
        aria-label="Mobile navigation"
      >
        <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>
          Home
        </a>
        <a href="#news-events" onClick={() => setIsMobileMenuOpen(false)}>
          News & Events
        </a>
        <a href="#churches-sermons" onClick={() => setIsMobileMenuOpen(false)}>
          Churches & Sermons
        </a>
        <a href="#ministry-programs" onClick={() => setIsMobileMenuOpen(false)}>
          Assembly Programs
        </a>
        <a
          css={myPagTabStyles}
          href="#account"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          My PAG
        </a>
      </nav>
    </header>
  );
};
