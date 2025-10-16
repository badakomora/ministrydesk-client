/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useState } from "react";

// -------------------- Header --------------------
const headerStyles = css`
  position: sticky;
  top: 0;
  z-index: 60;
  background: white;
  width: 100%;
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
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
    box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
  }

  h1 {
    font-size: 20px;
    margin: 0;
    font-weight: 800;
  }

  p {
    margin: 0;
    font-size: 12px;
  }
`;

const navStyles = css`
  display: flex;
  align-items: center;
  gap: 22px;

  a {
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
    cursor: pointer;
    color: black;
  }

  a:hover {
    color: white;
    background: #2563eb;
    padding: 8px 12px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const myPagTabStyles = css`
  background: #2563eb;
  color: white;
  padding: 8px 12px;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
`;

const mobileMenuBtn = (isOpen: boolean) => css`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${isOpen ? "#2563eb" : "transparent"};
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
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 24px 20px;
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
  z-index: 50;

  a {
    width: 100%;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;
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
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.25s ease-out;
`;

const modalContent = css`
  background: white;
  border-radius: 18px;
  padding: 28px 26px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
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
    box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
  }

  .inactive {
    background: white;
  }
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: 14px;

  input,
  select {
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  input:focus,
  select:focus {
    outline: none;
    padding: 12px 14px;
    border-color: #2563eb;
    box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
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
    background: #fbbf24;
    box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
  }
`;

const churchDropdownWrapper = css`
  position: relative;
  width: 100%; /* make wrapper match other inputs */

  input {
    width: 100%; /* force input to be same width */
    box-sizing: border-box;
  }
`;

const churchList = css`
  position: absolute;
  top: 100%;
  width: 100%; /* match parent width */
  left: 0;
  background: white;
  border: 1px solid white;
  border-radius: 8px;
  margin-top: 4px;
  max-height: 160px;
  overflow-y: auto;
  z-index: 200;

  div {
    padding: 10px 14px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
  }

  div:hover {
    background: white;
  }
`;

interface componentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

// -------------------- Component --------------------
export const Navbar: React.FC<componentProps> = ({ setActiveTab }) => {
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
              <h1>Ministry Desk</h1>
              <p>Connecting churches & people</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav css={navStyles} aria-label="Primary navigation">
            <a
              href="."
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("home");
              }}
            >
              Home
            </a>
            <a
              href="."
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("NewsList");
              }}
            >
              News & Events
            </a>
            <a
              href="."
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("SermonsList");
              }}
            >
              Churches & Sermons
            </a>
            <a
              href="."
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("AssemblyProgramsList");
              }}
            >
              Assembly Programs
            </a>
            <a
              href="."
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("PAGProgramsList");
              }}
            >
              Community
            </a>
            <a
              href="."
              css={myPagTabStyles}
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              Membership
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
          <a
            href="."
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("home");
              setIsMobileMenuOpen(false);
            }}
          >
            Home
          </a>
          <a
            href="."
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("NewsList");
              setIsMobileMenuOpen(false);
            }}
          >
            News & Events
          </a>
          <a
            href="."
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("SermonsList");
              setIsMobileMenuOpen(false);
            }}
          >
            Churches & Sermons
          </a>
          <a
            href="."
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("AssemblyProgramsList");
              setIsMobileMenuOpen(false);
            }}
          >
            Assembly Programs
          </a>
          <a href="." onClick={() => setIsMobileMenuOpen(false)}>
            PAG Programs
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
              <div css={logoStyles}>
                <div className="mark" aria-hidden>
                  ⛪
                </div>
                <div>
                  <h1>Ministry Desk</h1>
                  <p>Connecting churches & people</p>
                </div>
              </div>
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
                {/* <input type="password" placehold  er="Password" required /> */}
                <a href="." style={{ textDecoration: "none", color: "black" }}>
                  Forgot Password?
                </a>
                <button type="submit">Login</button>
              </form>
            ) : (
              <form css={formStyles}>
                <input type="text" placeholder="Full Name" required />
                <input type="tel" placeholder="Phone Number" required />
                <input type="number" placeholder="ID Number" required />
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
                {/* <input type="password" placeholder="Create Password" required />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                /> */}
                <button type="submit">Register</button>
              </form>
            )}
            <a
              href="."
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "12px",
                textDecoration: "none",
                color: "black",
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
            >
              close
            </a>
          </div>
        </div>
      )}
    </>
  );
};
