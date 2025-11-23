/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { serverurl } from "./Appconfig";

// -------------------- ROLE HIERARCHY --------------------
const roles = [
  { value: "1", label: "Reverend", level: 1 },
  { value: "2", label: "Pastor", level: 1 },
  { value: "3", label: "Secretary", level: 1 },
  { value: "3", label: "Secretary", level: 2 },
  { value: "3", label: "Administrator", level: 3 },
  { value: "3", label: "National Coordinator", level: 4 },
  { value: "4", label: "Member", level: 1 },
  { value: "6", label: "Overseer", level: 2 },
  { value: "7", label: "Treasurer", level: 1 },
  { value: "7", label: "Treasurer", level: 3 },
  { value: "7", label: "Finance Director", level: 4 },
  { value: "9", label: "Choir", level: 1 },
  { value: "10", label: "Usher", level: 1 },
  { value: "11", label: "Youth", level: 1 },
  { value: "12", label: "Women Dept", level: 1 },
  { value: "13", label: "Men Dept", level: 1 },
  { value: "14", label: "General Superintendent", level: 3 },
  { value: "15", label: "Mama Kenya", level: 3 },
  { value: "16", label: "National CED Director", level: 4 },
  { value: "0", label: "N/A", level: 1 },
  { value: "0", label: "N/A", level: 2 },
  { value: "0", label: "N/A", level: 3 },
  { value: "0", label: "N/A", level: 4 },
];

const ROLE_HIERARCHY = {
  4: "National Level",
  3: "Executive Level",
  2: "District Level",
  1: "Assembly Level",
} as const;

const getRolesByLevel = (level: number) => {
  return roles.filter((r) => r.level === level);
};

// -------------------- Header Styles --------------------
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
    color: white;
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
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

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

const profileCard = css`
  background: #fff;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  width: 100%;
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .row {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #efefef;
    color: #444;

    span.label {
      font-weight: 600;
      color: #222;
    }

    span.value {
      font-weight: 500;
    }
  }

  .active {
    color: #16a34a;
    font-weight: 700;
  }

  .expired {
    color: #dc2626;
    font-weight: 700;
  }

  .logout-btn {
    margin-top: 18px;
    text-align: center;
    padding: 10px 0;
    background: #f59e0b;
    color: white;
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s ease-in-out;
    cursor: pointer;

    &:hover {
      background: #2563eb;
    }
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

const roleProgressStyles = css`
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #666;
  font-weight: 600;
`;

const roleSelectedStyles = css`
  padding: 8px 12px;
  background: #e0f2fe;
  border: 1px solid #0284c7;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 0.9rem;

  strong {
    color: #0c4a6e;
  }
`;

interface componentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

interface LoadingProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

// -------------------- Component --------------------
export const Navbar: React.FC<componentProps & ModalProps & LoadingProps> = ({
  setActiveTab,
  setIsModalOpen,
  isModalOpen,
  setLoading,
  loading,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [tab, setTab] = useState<"login" | "register">("login");
  const [idnumber, setIdnumber] = useState("");
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [churches, setChurches] = useState<{ id: number; name: string }[]>([]);

  const [selectedChurch, setSelectedChurch] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isCreatingChurch, setIsCreatingChurch] = useState(false);
  const [newChurchName, setNewChurchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [churchEmail, setChurchEmail] = useState("");
  const [loggedFullname, setLoggedFullname] = useState("");
  const [loggedPhone, setLoggedPhone] = useState("");
  const [loggedRole, setLoggedRole] = useState("");
  const [loggedEmail, setLoggedEmail] = useState("");
  const [loggedChurchId, setLoggedChurchId] = useState("");
  const [loggedIdNumber, setLoggedIdNumber] = useState("");
  const [loggedSubscription, setLoggedSubscription] = useState("");
  const [loggedDateJoined, setLoggedDateJoined] = useState("");
  const [userChurch, setUserChurch] = useState("");

  const [currentRoleLevel, setCurrentRoleLevel] = useState<
    4 | 3 | 2 | 1 | null
  >(null);
  const [selectedRolesByLevel, setSelectedRolesByLevel] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    const storedName = localStorage.getItem("userFullname");
    const storedRole = localStorage.getItem("userRole");
    const storedIdNumber = localStorage.getItem("userIdNumber");
    const storedChurchId = localStorage.getItem("userChurchId");
    const storedEmail = localStorage.getItem("userEmail");
    const storedSubscription = localStorage.getItem("userSubscription");
    const storedDateJoined = localStorage.getItem("userDateJoined");

    if (
      storedPhone &&
      storedName &&
      storedRole &&
      storedChurchId &&
      storedEmail &&
      storedIdNumber &&
      storedSubscription &&
      storedDateJoined
    ) {
      setLoggedPhone(storedPhone);
      setLoggedFullname(storedName);
      setLoggedRole(storedRole);
      setLoggedChurchId(storedChurchId);
      setLoggedEmail(storedEmail);
      setLoggedIdNumber(storedIdNumber);
      setLoggedSubscription(storedSubscription);
      setLoggedDateJoined(storedDateJoined);
    }
  }, []);

  useEffect(() => {
    const fetchChurches = async () => {
      try {
        const response = await axios.get(`${serverurl}/church/list`);
        setChurches(response.data);
      } catch (error) {
        console.error("Error fetching churches:", error);
      }
    };

    const fetchChurch = async () => {
      try {
        const response = await axios.post(`${serverurl}/church/church`, {
          id: loggedChurchId,
        });

        setUserChurch(response.data.church.name);
      } catch (error) {
        console.error("Error fetching church:", error);
      }
    };

    if (loggedChurchId) {
      fetchChurch();
    }
    fetchChurches();
  }, [loggedChurchId]);

  const filteredChurches = churches.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const LogOut = () => {
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userFullname");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userIdNumber");
    localStorage.removeItem("userChurchId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userDateJoined");
    localStorage.removeItem("userSubscription");

    setLoggedPhone("");
    setLoggedFullname("");
    setLoggedRole("");
    setActiveTab("");

    toast.success("You have logged out successfully.");
  };

  const handleRoleSelection = (roleValue: string, level: number) => {
    setSelectedRolesByLevel((prev) => ({
      ...prev,
      [level]: roleValue,
    }));
    setSelectedRole(roleValue);

    // Auto-advance to next level
    const nextLevel = level - 1;
    if (nextLevel > 0) {
      setCurrentRoleLevel(nextLevel as 4 | 3 | 2 | 1);
    } else {
      // All levels completed
      setCurrentRoleLevel(null);
    }
  };

  const resetRoleSelection = () => {
    setCurrentRoleLevel(4);
    setSelectedRolesByLevel({});
    setSelectedRole("");
  };

  const goBackLevel = () => {
    const levels = [4, 3, 2, 1];
    const currentIndex = levels.indexOf(currentRoleLevel || 4);
    if (currentIndex > 0) {
      setCurrentRoleLevel(levels[currentIndex - 1] as 4 | 3 | 2 | 1);
      const newRoles = { ...selectedRolesByLevel };
      delete newRoles[levels[currentIndex]];
      setSelectedRolesByLevel(newRoles);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!otpSent) {
        const res = await axios.post(`${serverurl}/user/login`, {
          phonenumber: phone,
        });

        setOtpSent(true);
        toast.success(`OTP sent to ${res.data.fullname}`);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("userIdNumber", res.data.idnumber);
        localStorage.setItem("userFullname", res.data.fullname);
        localStorage.setItem("userPhone", res.data.phonenumber);
        localStorage.setItem("userEmail", res.data.email);
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("userChurchId", res.data.churchid);
        localStorage.setItem("userSubscription", res.data.subscription);
        localStorage.setItem("userDateJoined", res.data.datecreated);
      } else {
        const res = await axios.post(`${serverurl}/user/verifyotp`, {
          phonenumber: phone,
          otp,
        });

        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userFullname", res.data.user.fullname);
        localStorage.setItem("userPhone", res.data.user.phonenumber);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userRole", String(res.data.user.role));
        localStorage.setItem("userChurchId", res.data.user.churchid);
        localStorage.setItem("userSubscription", res.data.user.subscription);
        localStorage.setItem("userDateJoined", res.data.user.datecreated);

        setLoggedIdNumber(res.data.user.idnumber);
        setLoggedFullname(res.data.user.fullname);
        setLoggedPhone(res.data.user.phonenumber);
        setLoggedEmail(res.data.user.email);
        setLoggedRole(res.data.user.role);
        setLoggedChurchId(res.data.user.churchid);
        setLoggedSubscription(res.data.user.subscription);
        setLoggedDateJoined(res.data.user.datecreated);

        toast.success("Login successful!");
        if (res.data.user.role === 3) {
          setActiveTab("Dashboard");
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleNewChurch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newChurchName.trim())
      return toast.warning("Please enter a church name.");

    try {
      const response = await axios.post(`${serverurl}/church/register`, {
        name: newChurchName,
        description,
        categoryid: selectedCategory,
        location,
        phone,
        email: churchEmail,
      });

      const registeredChurch = response.data;

      toast.success(response.data.message || "Church registered successfully!");

      setChurches([...churches, registeredChurch]);
      setSelectedChurch(registeredChurch.id);
      setSearch("");
      setNewChurchName("");
      setIsCreatingChurch(false);
    } catch (error: any) {
      console.error("Error creating church:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the church.");
      }
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedChurch) {
      return toast.warning(
        "Please select or register your church if you are a senior pastor."
      );
    }

    const data = {
      idnumber,
      fullname,
      phonenumber,
      email,
      nationalRole: selectedRolesByLevel[4] || null,
      executiveRole: selectedRolesByLevel[3] || null,
      districtRole: selectedRolesByLevel[2] || null,
      assemblyRole: selectedRolesByLevel[1] || null,
      churchid: selectedChurch,
    };

    try {
      const response = await axios.post(`${serverurl}/user/register`, data);

      toast.success(response.data.message || "User registered successfully!");

      setIdnumber("");
      setFullname("");
      setPhonenumber("");
      setEmail("");
      setSelectedRole("");
      setSelectedChurch(null);
      resetRoleSelection();
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  };

  const renderCascadingRoleSelector = () => {
    if (currentRoleLevel === null && !selectedRole) {
      return (
        <div style={{ marginBottom: "14px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            {ROLE_HIERARCHY[4]} (Select one to continue)
          </label>
          <select
            required
            onChange={(e) => {
              if (e.target.value) {
                handleRoleSelection(e.target.value, 4);
              }
            }}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "#2563eb 1px solid",
              outline: "none",
              fontSize: "0.95rem",
              background: "white",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select National Level Role</option>
            {getRolesByLevel(4).map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    const levels = [4, 3, 2, 1];
    const currentIndex = levels.indexOf(currentRoleLevel || 4);

    return (
      <div style={{ marginBottom: "14px" }}>
        <div css={roleProgressStyles}>
          Select Ministry Role: {Object.keys(selectedRolesByLevel).length} of 4
          levels
        </div>

        {Object.entries(selectedRolesByLevel).map(([level, roleValue]) => {
          const role = roles.find((r) => r.value === roleValue);
          const lvlKey = Number.parseInt(level) as keyof typeof ROLE_HIERARCHY;
          return (
            <div key={level} css={roleSelectedStyles}>
              <strong>{ROLE_HIERARCHY[lvlKey]}</strong>: {role?.label}
            </div>
          );
        })}

        {currentRoleLevel && (
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              {ROLE_HIERARCHY[currentRoleLevel]}
            </label>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleRoleSelection(e.target.value, currentRoleLevel);
                }
              }}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "#2563eb 1px solid",
                outline: "none",
                fontSize: "0.95rem",
                background: "white",
                boxSizing: "border-box",
                marginBottom: "8px",
              }}
            >
              <option value="">
                Select {ROLE_HIERARCHY[currentRoleLevel]}
              </option>
              {getRolesByLevel(currentRoleLevel).map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            {currentIndex > 0 && (
              <button
                type="button"
                onClick={goBackLevel}
                style={{
                  width: "100%",
                  padding: "8px 14px",
                  background: "#f0f0f0",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  fontWeight: 600,
                  marginBottom: "12px",
                }}
              >
                ← Back to Previous Level
              </button>
            )}
          </div>
        )}

        {selectedRole && (
          <button
            type="button"
            onClick={resetRoleSelection}
            style={{
              width: "100%",
              padding: "8px 14px",
              background: "#fee2e2",
              border: "1px solid #fca5a5",
              cursor: "pointer",
              fontWeight: 600,
              color: "#991b1b",
            }}
          >
            Reset Role Selection
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ==================== HEADER & NAV ==================== */}
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
            {loggedRole === "3" ? (
              <a
                href="."
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("Dashboard");
                }}
              >
                Dashboard
              </a>
            ) : (
              ""
            )}

            <a
              href="."
              css={myPagTabStyles}
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{ color: "white" }}
            >
              {loggedFullname ? loggedFullname : "My Membership"}
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
          {loggedRole === "3" ? (
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
          ) : (
            ""
          )}

          <a
            href="."
            css={myPagTabStyles}
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            style={{ color: "white" }}
          >
            {loggedFullname ? loggedFullname : "My Membership"}
          </a>
        </nav>
      </header>

      {/* ==================== MODAL ==================== */}
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
              <div css={logoStyles}>
                <div className="mark" aria-hidden>
                  ⛪
                </div>
                <div>
                  <h1>Ministry Desk</h1>
                  <p>Connecting churches & people</p>
                </div>
              </div>
              {loggedFullname ? (
                ""
              ) : (
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
              )}
            </div>

            {loggedFullname ? (
              <div css={profileCard}>
                <div className="row">
                  <span className="label">Name</span>
                  <span className="value">{loggedFullname}</span>
                </div>

                <div className="row">
                  <span className="label">ID No.</span>
                  <span className="value">{loggedIdNumber}</span>
                </div>

                <div className="row">
                  <span className="label">Email</span>
                  <span className="value">
                    {loggedEmail ? loggedEmail : "N/A"}
                  </span>
                </div>

                <div className="row">
                  <span className="label">Phone</span>
                  <span className="value">{loggedPhone}</span>
                </div>

                <div className="row">
                  <span className="label">Ministry Role & Assembly</span>
                  <span className="value">
                    {roles.find((r) => r.value === loggedRole)?.label},{" "}
                    {userChurch}
                  </span>
                </div>

                <div className="row">
                  <span className="label">Subscription</span>
                  <span style={{ display: "flex", gap: "8px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        background:
                          Number(loggedSubscription) === 1 ? "#2563eb" : "red",
                        color: "white",
                        fontWeight: 500,
                      }}
                    >
                      {loggedSubscription === "1" ? "Active" : "Expired"}
                    </span>
                    {loggedSubscription === "1" ? (
                      ""
                    ) : (
                      <span
                        style={{
                          padding: "4px 8px",
                          background:
                            " linear-gradient(90deg, #2563eb, #fbbf24)",
                          color: "white",
                          fontWeight: 500,
                        }}
                      >
                        Renew
                      </span>
                    )}
                  </span>
                </div>

                <div className="row">
                  <span className="label">Member Since</span>
                  <span className="value">
                    {new Date(loggedDateJoined).toDateString()}
                  </span>
                </div>

                <a
                  href="."
                  className="logout-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    LogOut();
                  }}
                >
                  Logout
                </a>
              </div>
            ) : tab === "login" ? (
              <form css={formStyles} onSubmit={handleLogin}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={otpSent}
                />

                {otpSent && (
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                )}

                <a href="." style={{ textDecoration: "none", color: "black" }}>
                  Forgot Password?
                </a>

                <button type="submit" disabled={loading}>
                  {loading
                    ? "Processing..."
                    : otpSent
                    ? "Verify OTP"
                    : "Login with Phone"}
                </button>
              </form>
            ) : (
              <form css={formStyles} onSubmit={handleRegister}>
                <input
                  type="number"
                  placeholder="ID Number"
                  required
                  value={idnumber}
                  onChange={(e) => setIdnumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {renderCascadingRoleSelector()}

                <div css={churchDropdownWrapper}>
                  <input
                    type="text"
                    placeholder="Search and select your church"
                    value={
                      selectedChurch != null
                        ? churches.find((c) => c.id === selectedChurch)?.name ??
                          ""
                        : search ?? ""
                    }
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setSelectedChurch(null);
                    }}
                    required
                  />

                  {search && !selectedChurch && (
                    <div css={churchList}>
                      {filteredChurches.length > 0 ? (
                        filteredChurches.map((church) => (
                          <div
                            key={church.id}
                            onClick={() => {
                              setSelectedChurch(church.id);
                              setSearch("");
                            }}
                          >
                            {church.name}
                          </div>
                        ))
                      ) : (
                        <>
                          {selectedRole === "1" ? (
                            <div
                              onClick={() => setIsCreatingChurch(true)}
                              style={{
                                color: "#2563eb",
                                fontWeight: "600",
                                cursor: "pointer",
                              }}
                            >
                              + Register "{search}"
                            </div>
                          ) : (
                            <div style={{ color: "#999" }}>No church found</div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Register"}
                </button>
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
                    maxWidth: "400px",
                    width: "90%",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 style={{ marginTop: 0, marginBottom: "16px" }}>
                    Register My Church
                  </h2>
                  <form onSubmit={handleNewChurch}>
                    <input
                      type="text"
                      placeholder="Church Name"
                      value={newChurchName}
                      onChange={(e) => setNewChurchName(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid #2563eb",
                        marginBottom: "12px",
                        boxSizing: "border-box",
                      }}
                    />

                    <textarea
                      placeholder="Description (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={100}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid #2563eb",
                        marginBottom: "12px",
                        boxSizing: "border-box",
                        resize: "vertical",
                      }}
                    />

                    <select
                      required
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid #2563eb",
                        marginBottom: "12px",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="0">Select Church Category</option>
                      <option value="1">PAG</option>
                      <option value="2">Chapel</option>
                      <option value="3">Catholic</option>
                      <option value="4">Deliverance</option>
                      <option value="5">Presbyterian</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid #2563eb",
                        marginBottom: "12px",
                        boxSizing: "border-box",
                      }}
                    />

                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid #2563eb",
                        marginBottom: "12px",
                        boxSizing: "border-box",
                      }}
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={churchEmail}
                      onChange={(e) => setChurchEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid #2563eb",
                        marginBottom: "16px",
                        boxSizing: "border-box",
                      }}
                    />

                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        type="submit"
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
                        {loading ? "Loading..." : "Register Church"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingChurch(false);
                          setNewChurchName("");
                          setDescription("");
                          setSelectedCategory("");
                          setLocation("");
                          setPhone("");
                          setChurchEmail("");
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
                  </form>
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
