/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
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
    cursor: pointer;
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
    cursor: pointer;
  }

  a:hover {
    color: #2563eb;
  }
`;

// -------------------- Modal Styles --------------------
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 41, 59, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.25s ease-out;
`;

const modalContent = css`
  background: linear-gradient(to bottom right, #ffffff, #f8fafc);
  border-radius: 18px;
  padding: 28px 26px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: ${fadeIn} 0.3s ease-out;
`;

const tabs = css`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 24px;

  button {
    padding: 10px 20px;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .active {
    background: #2563eb;
    color: white;
    box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
  }

  .inactive {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: 14px;

  input,
  select {
    padding: 12px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
  }

  button {
    margin-top: 10px;
    padding: 12px 16px;
    background: #2563eb;
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
  }
`;

const churchDropdownWrapper = css`
  position: relative;
`;

const churchList = css`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  margin-top: 4px;
  max-height: 160px;
  overflow-y: auto;
  z-index: 200;

  div {
    padding: 10px 14px;
    cursor: pointer;
  }

  div:hover {
    background: #f1f5f9;
  }
`;

// -------------------- Component --------------------
export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "register">("login");

  // search engine state for churches
  const churches = [
    "Central PAG",
    "East PAG",
    "West PAG",
    "South PAG",
    "North PAG",
    "Kampala PAG",
    "Nairobi PAG",
    "Mombasa PAG",
  ];
  const [search, setSearch] = useState("");
  const [selectedChurch, setSelectedChurch] = useState("");

  const filteredChurches = churches.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
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
            <a href=".">Home</a>
            <a href=".">News & Events</a>
            <a href=".">Churches & Sermons</a>
            <a href=".">Assembly Programs</a>
            <a
              href="."
              css={myPagTabStyles}
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
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
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav
          css={mobileNavStyles(isMobileMenuOpen)}
          aria-label="Mobile navigation"
        >
          <a href="." onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </a>
          <a href="." onClick={() => setIsMobileMenuOpen(false)}>
            News & Events
          </a>
          <a href="." onClick={() => setIsMobileMenuOpen(false)}>
            Churches & Sermons
          </a>
          <a href="." onClick={() => setIsMobileMenuOpen(false)}>
            Assembly Programs
          </a>
          <a
            href="."
            css={myPagTabStyles}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setIsModalOpen(true);
            }}
          >
            My PAG
          </a>
        </nav>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div css={modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Tabs */}
            <div css={tabs}>
              <button
                className={tab === "login" ? "active" : "inactive"}
                onClick={() => setTab("login")}
              >
                Login
              </button>
              <button
                className={tab === "register" ? "active" : "inactive"}
                onClick={() => setTab("register")}
              >
                Register
              </button>
            </div>

            {/* Forms */}
            {tab === "login" ? (
              <form css={formStyles}>
                <input type="tel" placeholder="Phone Number" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
              </form>
            ) : (
              <form css={formStyles}>
                <input type="text" placeholder="Full Name" required />
                <input type="tel" placeholder="Phone Number" required />
                <input type="email" placeholder="Email (optional)" />

                {/* Searchable Church Dropdown */}
                <div css={churchDropdownWrapper}>
                  <input
                    type="text"
                    placeholder="Search and select your church"
                    value={selectedChurch || search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelectedChurch("");
                    }}
                    required
                  />
                  {search && !selectedChurch && (
                    <div css={churchList}>
                      {filteredChurches.length > 0 ? (
                        filteredChurches.map((church) => (
                          <div
                            key={church}
                            onClick={() => {
                              setSelectedChurch(church);
                              setSearch("");
                            }}
                          >
                            {church}
                          </div>
                        ))
                      ) : (
                        <div>No church found</div>
                      )}
                    </div>
                  )}
                </div>

                <select required>
                  <option value="">Select Role</option>
                  <option value="member">Member</option>
                  <option value="pastor">Pastor</option>
                  <option value="bishop">Bishop</option>
                  <option value="overseer">Overseer</option>
                  <option value="secretary">Secretary</option>
                  <option value="treasurer">Treasurer</option>
                  <option value="ced">CED</option>
                  <option value="choir">Choir</option>
                  <option value="usher">Usher</option>
                  <option value="youth">Youth</option>
                  <option value="women">Women Dept</option>
                  <option value="men">Men Dept</option>
                </select>
                <input type="password" placeholder="Password" required />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
                <button type="submit">Register</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
