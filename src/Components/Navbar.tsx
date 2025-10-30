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
  justify-content: center;
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
  padding: 8px 14px;
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background: white;
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);
  z-index: 50;

  a {
    width: 100%;
    font-weight: 600;
    text-decoration: none;
    color: black;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.25s ease-out;
`;

const modalContent = css`
  background: white;
  padding: 8px 14px;
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
    padding: 8px 14px;
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
    outline: none;
    padding: 12px 14px;
    border: #2563eb 1px solid;
    border-radius: 0;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.95rem;
    background: white;
  }

  button {
    padding: 12px 14px;
    background: #2563eb;
    color: white;
    font-weight: 700;
    border: none;
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
  width: 100%;

  input {
    width: 100%;
    box-sizing: border-box;
    outline: none;
    padding: 12px 14px;
    border: #2563eb 1px solid;
    font-size: 0.95rem;
    background: white;
  }
`;

const churchList = css`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  background: white;
  border: 1px solid #2563eb;
  margin-top: 4px;
  max-height: 160px;
  overflow-y: auto;
  z-index: 200;
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);

  div {
    padding: 8px 14px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
  }

  div:hover {
    background: #f0f0f0;
  }
`;

interface componentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

// -------------------- Component --------------------
export const Navbar: React.FC<componentProps & ModalProps> = ({
  setActiveTab,
  setIsModalOpen,
  isModalOpen,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [tab, setTab] = useState<"login" | "register">("login");

  const [churches, setChurches] = useState([
    "Central PAG",
    "East PAG",
    "West PAG",
    "South PAG",
    "North PAG",
    "Kampala PAG",
    "Nairobi PAG",
    "Mombasa PAG",
  ]);
  const [search, setSearch] = useState("");
  const [selectedChurch, setSelectedChurch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isCreatingChurch, setIsCreatingChurch] = useState(false);
  const [newChurchName, setNewChurchName] = useState("");

  const filteredChurches = churches.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateChurch = () => {
    if (newChurchName.trim()) {
      setChurches([...churches, newChurchName]);
      setSelectedChurch(newChurchName);
      setSearch("");
      setIsCreatingChurch(false);
      setNewChurchName("");
    }
  };

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
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("Dashboard");
              }}
            >
              Dashboard
            </a>
            <a
              href="."
              css={myPagTabStyles}
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{ color: "white" }}
            >
              My Membership
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              css={mobileMenuBtn(isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              style={{ color: "white", background: "#2563eb" }}
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
          <a
            href="."
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("PAGProgramsList");
              setIsMobileMenuOpen(false);
            }}
          >
            Community
          </a>
          <a
            href="."
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("Dashboard");
              setIsMobileMenuOpen(false);
            }}
          >
            Dashboard
          </a>
          <a
            href="."
            css={myPagTabStyles}
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              setIsModalOpen(true);
            }}
            style={{ color: "white" }}
          >
            My Membership
          </a>
        </nav>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div css={modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2px",
              }}
            >
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
            </div>

            {/* Forms */}
            {tab === "login" ? (
              <form css={formStyles}>
                <input type="tel" placeholder="Phone Number" required />
                <a href="." style={{ textDecoration: "none", color: "black" }}>
                  Forgot Password?
                </a>
                <button type="submit">Login</button>
              </form>
            ) : (
              <form css={formStyles}>
                <input type="number" placeholder="ID Number" required />
                <input type="text" placeholder="Full Name" required />
                <input type="tel" placeholder="Phone Number" required />

                <input type="email" placeholder="Email (optional)" />
                <select
                  required
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="" style={{ color: "#999" }}>
                    Select Role
                  </option>
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
                        <>
                          {selectedRole === "pastor" ? (
                            <div
                              onClick={() => setIsCreatingChurch(true)}
                              style={{
                                color: "#2563eb",
                                fontWeight: "600",
                              }}
                            >
                              + Create "{search}"
                            </div>
                          ) : (
                            <div style={{ color: "#999" }}>No church found</div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button type="submit">Register</button>
              </form>
            )}

            {isCreatingChurch && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 200,
                }}
                onClick={() => setIsCreatingChurch(false)}
              >
                <div
                  style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "8px",
                    maxWidth: "400px",
                    width: "90%",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 style={{ marginTop: 0, marginBottom: "16px" }}>
                    Create New Church
                  </h2>
                  <input
                    type="text"
                    placeholder="Church Name"
                    value={newChurchName}
                    onChange={(e) => setNewChurchName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid #2563eb",
                      boxShadow: "0 6px 20px rgba(16, 24, 40, 0.08)",
                      boxSizing: "border-box",
                      marginBottom: "16px",
                    }}
                  />
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={handleCreateChurch}
                      style={{
                        flex: 1,
                        padding: "12px 14px",
                        background: "#2563eb",
                        color: "white",
                        fontWeight: "700",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingChurch(false);
                        setNewChurchName("");
                      }}
                      style={{
                        flex: 1,
                        padding: "12px 14px",
                        background: "#f0f0f0",
                        color: "black",
                        fontWeight: "700",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
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
