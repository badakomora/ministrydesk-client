/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserRoles, roles, serverurl } from "./Appconfig";

// -------------------- ROLE HIERARCHY --------------------

const ROLE_HIERARCHY = {
  3: "National Level",
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
    background: #2563eb;
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
  overflow-y: auto;
`;

const modal = css`
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
  width: 90%;
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

// const churchDropdownWrapper = css`
//   position: relative;
//   width: 100%;

//   input {
//     width: 100%;
//     box-sizing: border-box;
//     outline: none;
//     padding: 12px 14px;
//     border: #2563eb 1px solid;
//     font-size: 0.95rem;
//     background: white;
//   }
// `

// const churchList = css`
//   position: absolute;
//   top: 100%;
//   width: 100%;
//   left: 0;
//   background: white;
//   border: 1px solid #2563eb;
//   margin-top: 4px;
//   max-height: 160px;
//   overflow-y: auto;
//   z-index: 200;
//   box-shadow: 0 6px 20px rgba(16, 24, 40, 0.08);

//   div {
//     padding: 8px 14px;
//     cursor: pointer;
//     width: 100%;
//     box-sizing: border-box;
//   }

//   div:hover {
//     background: #f0f0f0;
//   }
// `

// const roleProgressStyles = css`
//   margin-bottom: 12px;
//   font-size: 0.85rem;
//   color: #666;
//   font-weight: 600;
// `

// const roleSelectedStyles = css`
//   padding: 8px 12px;
//   background: #e0f2fe;
//   border: 1px solid #0284c7;
//   border-radius: 4px;
//   margin-bottom: 8px;
//   font-size: 0.9rem;

//   strong {
//     color: #0c4a6e;
//   }
// `

interface componentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPageContent: React.Dispatch<React.SetStateAction<string>>;
  isModalOpen: boolean;
  pageContent: string;
}

interface LoadingProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

type Idprops = {
  itemId: number | null;
};

// -------------------- Component --------------------
export const Navbar: React.FC<
  componentProps & ModalProps & LoadingProps & Idprops
> = ({
  setActiveTab,
  setIsModalOpen,
  setPageContent,
  pageContent,
  isModalOpen,
  setLoading,
  loading,
  itemId,
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
  const [amount, setAmount] = useState(""); // Amount input
  const [churchEmail, setChurchEmail] = useState("");
  const [loggedFullname, setLoggedFullname] = useState("");
  const [loggedPhone, setLoggedPhone] = useState("");
  const [loggedNationalRole, setLoggedNationalRole] = useState("");
  const [loggedDistrictRole, setLoggedDistrictRole] = useState("");
  const [loggedAssemblyRole, setLoggedAssemblyRole] = useState("");
  const [loggedEmail, setLoggedEmail] = useState("");
  const [loggedChurchId, setLoggedChurchId] = useState("");
  const [loggedIdNumber, setLoggedIdNumber] = useState("");
  const [loggedSubscription, setLoggedSubscription] = useState("");
  const [loggedDateJoined, setLoggedDateJoined] = useState("");
  const [userChurch, setUserChurch] = useState("");

  const [dashboardShow, setDashboardShow] = useState(false);

  const [currentRoleLevel, setCurrentRoleLevel] = useState<3 | 2 | 1 | null>(3);
  const [selectedRolesByLevel, setSelectedRolesByLevel] = useState<{
    [key: number]: string;
  }>({});

  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    const storedName = localStorage.getItem("userFullname");
    const storedNationalRole = localStorage.getItem("nationalRole");
    const storedDistrictRole = localStorage.getItem("districtRole");
    const storedAssemblyRole = localStorage.getItem("assemblyRole");
    const storedIdNumber = localStorage.getItem("userIdNumber");
    const storedChurchId = localStorage.getItem("userChurchId");
    const storedEmail = localStorage.getItem("userEmail");
    const storedSubscription = localStorage.getItem("userSubscription");
    const storedDateJoined = localStorage.getItem("userDateJoined");

    if (
      storedPhone &&
      storedName &&
      storedNationalRole &&
      storedDistrictRole &&
      storedAssemblyRole &&
      storedChurchId &&
      storedEmail &&
      storedIdNumber &&
      storedSubscription &&
      storedDateJoined
    ) {
      setLoggedPhone(storedPhone);
      setLoggedFullname(storedName);
      setLoggedNationalRole(storedNationalRole);
      setLoggedAssemblyRole(storedAssemblyRole);
      setLoggedDistrictRole(storedDistrictRole);
      setLoggedChurchId(storedChurchId);
      setLoggedEmail(storedEmail);
      setLoggedIdNumber(storedIdNumber);
      setLoggedSubscription(storedSubscription);
      setLoggedDateJoined(storedDateJoined);

      if (
        loggedNationalRole === "3" ||
        loggedDistrictRole === "2" ||
        loggedAssemblyRole === "1"
      ) {
        setDashboardShow(true);
      }
    }
  }, [loggedAssemblyRole, loggedDistrictRole, loggedNationalRole]);

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

    const fetchRegions = async () => {
      try {
        const response = await axios.get(`${serverurl}/region/list`);
        setRegions(response.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    if (loggedChurchId) {
      fetchChurch();
    }
    fetchChurches();
    fetchRegions();
  }, [loggedChurchId]);

  useEffect(() => {
    // If a district role is selected, ensure a region is also selected or prompt for it.
    // If a region is selected and currentRoleLevel is 2, move to Assembly Level.
    if (selectedRegion && currentRoleLevel === 2) {
      // Automatically move to the next step if region is selected and current level is district
      setCurrentRoleLevel(1);
    } else if (selectedRolesByLevel[1] && currentRoleLevel === 1) {
      // Automatically move to the next step if assembly role is selected and current level is assembly
      setCurrentRoleLevel(null); // Indicates all roles are selected
    }
  }, [selectedRolesByLevel, selectedRegion, currentRoleLevel]);

  const filteredChurches = churches.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const LogOut = () => {
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userFullname");
    localStorage.removeItem("nationalRole");
    localStorage.removeItem("districtRole");
    localStorage.removeItem("assemblyRole");
    localStorage.removeItem("userIdNumber");
    localStorage.removeItem("userChurchId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userDateJoined");
    localStorage.removeItem("userSubscription");

    setLoggedPhone("");
    setLoggedFullname("");
    setDashboardShow(false);
    setLoggedSubscription("");
    setActiveTab("Home");

    toast.success("You have logged out successfully.");
  };

  const handleRoleSelection = (roleValue: string, level: number) => {
    setSelectedRolesByLevel((prev) => ({
      ...prev,
      [level]: roleValue,
    }));
    setSelectedRole(roleValue); // This might be redundant if selectedRolesByLevel is used consistently

    // Determine the next level to present
    let nextLevel: 3 | 2 | 1 | null = null;

    // If national role is selected, next is district (level 2)
    if (level === 3) {
      nextLevel = 2;
    }
    // If district role is selected, next is assembly (level 1)
    else if (level === 2) {
      // Ensure region is selected before moving to assembly
      if (selectedRegion) {
        nextLevel = 1;
      } else {
        // If region not selected, prompt user and stay on district level or re-evaluate
        // toast.warn("Please select a region for your district role.")
        setCurrentRoleLevel(2); // Stay on district level
        return; // Stop further processing
      }
    }
    // If assembly role is selected, all roles are done
    else if (level === 1) {
      nextLevel = null; // All roles selected
    }

    setCurrentRoleLevel(nextLevel as any); // Cast to any to avoid strict type issues if nextLevel becomes null

    // If we've completed all selections, ensure the state reflects that
    if (nextLevel === null) {
      setCurrentRoleLevel(null); // Explicitly set to null when done
    } else {
      setCurrentRoleLevel(nextLevel);
    }
  };

  const resetRoleSelection = () => {
    setCurrentRoleLevel(3);
    setSelectedRolesByLevel({});
    setSelectedRole(""); // Reset any individual role selection state if needed
    setSelectedRegion(null); // Also reset region selection
    setSelectedChurch(null); // Reset church selection
  };

  const goBackLevel = () => {
    if (currentRoleLevel === null) {
      // If at church selection, go back to Assembly
      setCurrentRoleLevel(1);
      setSelectedChurch(null);
      setSearch("");
    } else if (currentRoleLevel === 1) {
      // If at Assembly, go back to Region selection (District level)
      setCurrentRoleLevel(2);
      const newRoles = { ...selectedRolesByLevel };
      delete newRoles[1];
      setSelectedRolesByLevel(newRoles);
      setSelectedRole("");
    } else if (currentRoleLevel === 2) {
      // If at District/Region, check if region is selected
      if (selectedRegion) {
        // Go back from region to district role
        setSelectedRegion(null);
      } else if (selectedRolesByLevel[2]) {
        // Go back from district role to National
        setCurrentRoleLevel(3);
        const newRoles = { ...selectedRolesByLevel };
        delete newRoles[2];
        setSelectedRolesByLevel(newRoles);
        setSelectedRole("");
      } else {
        // Already at start of district, go to National
        setCurrentRoleLevel(3);
      }
    } else if (currentRoleLevel === 3) {
      // At National level, clear national selection if exists
      if (selectedRolesByLevel[3]) {
        const newRoles = { ...selectedRolesByLevel };
        delete newRoles[3];
        setSelectedRolesByLevel(newRoles);
        setSelectedRole("");
      }
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

        localStorage.setItem("nationalRole", String(res.data.nationalrole));
        localStorage.setItem("districtRole", String(res.data.districtrole));
        localStorage.setItem("assemblyRole", String(res.data.assemblyrole));

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
        localStorage.setItem(
          "nationalRole",
          String(res.data.user.nationalrole)
        );
        localStorage.setItem(
          "districtRole",
          String(res.data.user.districtrole)
        );
        localStorage.setItem(
          "assemblyRole",
          String(res.data.user.assemblyrole)
        );
        localStorage.setItem("userChurchId", res.data.user.churchid);
        localStorage.setItem("userSubscription", res.data.user.subscription);
        localStorage.setItem("userDateJoined", res.data.user.datecreated);

        setLoggedIdNumber(res.data.user.idnumber);
        setLoggedFullname(res.data.user.fullname);
        setLoggedPhone(res.data.user.phonenumber);
        setLoggedEmail(res.data.user.email);
        setLoggedNationalRole(res.data.user.nationalrole);
        setLoggedDistrictRole(res.data.user.districtrole);
        setLoggedAssemblyRole(res.data.user.assemblyrole);
        setLoggedChurchId(res.data.user.churchid);
        setLoggedSubscription(res.data.user.subscription);
        setLoggedDateJoined(res.data.user.datecreated);

        toast.success("Login successful!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading

    try {
      const transactionData = {
        idnumber: idnumber ? idnumber : loggedIdNumber,
        phone: phone,
        amount: amount ? amount : 149,
        activity: pageContent,
        itemid: itemId ? itemId : null,
      };

      const res = await axios.post(
        `${serverurl}/transaction/deposit`,
        transactionData
      );

      console.log("Response:", res.data);
      toast.success("Transaction successful!");
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const handleSpecialPrayer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverurl}/prayerrequest/new`, {
        idnumber: loggedIdNumber,
        description,
        churchid: itemId,
      });

      toast.success(
        response.data.message || "Prayer request sent successfully!"
      );
    } catch (error: any) {
      console.error("Error creating church:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while creating the church.");
      }
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

    // Ensure all required fields for registration are filled
    if (!idnumber || !fullname || !phonenumber) {
      return toast.warning(
        "Please fill in all required fields (ID, Name, Phone)."
      );
    }

    if (currentRoleLevel === 2 && !selectedRegion) {
      return toast.warning("Please select a region for your district role.");
    }

    if (currentRoleLevel === 1 && !selectedChurch) {
      return toast.warning(
        "Please select or register your church for your assembly role."
      );
    }

    // Ensure that if a higher-level role was skipped, the lower level is selected correctly
    // For example, if National (3) was skipped, District (2) should not be selected without a National role.
    // However, the current flow forces selection from National, so this might be implicitly handled.
    // Let's assume the user selects roles sequentially.

    const data = {
      idnumber,
      fullname,
      phonenumber,
      email,
      // If a role was selected for a level, include it. Otherwise, it's null.
      nationalRole: selectedRolesByLevel[3] || null,
      districtRole: selectedRolesByLevel[2] || null,
      assemblyRole: selectedRolesByLevel[1] || null,
      churchid: selectedChurch, // Will be null if no assembly role or church selected
      regionid: selectedRegion, // Will be null if no district role or region selected
    };

    try {
      const response = await axios.post(`${serverurl}/user/register`, data);

      toast.success(response.data.message || "User registered successfully!");

      // Clear form and reset states
      setIdnumber("");
      setFullname("");
      setPhonenumber("");
      setEmail("");
      setSelectedChurch(null);
      setSearch(""); // Clear search for church dropdown
      setSelectedRegion(null);
      resetRoleSelection(); // Resets currentRoleLevel and selectedRolesByLevel
      setTab("login"); // Optionally switch to login tab after successful registration
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
    // Start by showing the National Level selector if no role is selected yet
    if (currentRoleLevel === 3) {
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
            {ROLE_HIERARCHY[3]} (Select one to continue)
          </label>
          <select
            required
            onChange={(e) => {
              if (e.target.value) {
                handleRoleSelection(e.target.value, 3);
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
            {getRolesByLevel(3).map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (currentRoleLevel === 2) {
      return (
        <div>
          {/* Show selected National Role */}
          {selectedRolesByLevel[3] && (
            <div
              style={{
                padding: "10px 14px",
                background: "#f0f9ff",
                border: "1px solid #bfdbfe",
                borderRadius: "6px",
                marginBottom: "14px",
                fontSize: "0.9rem",
              }}
            >
              <span style={{ fontWeight: 600, color: "#1e40af" }}>
                National Role:
              </span>{" "}
              <span style={{ color: "#1e3a8a" }}>
                {
                  getRolesByLevel(3).find(
                    (r) => r.value === selectedRolesByLevel[3]
                  )?.label
                }
              </span>
            </div>
          )}

          {/* District Role Selection */}
          {!selectedRolesByLevel[2] ? (
            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {ROLE_HIERARCHY[2]} (Select one to continue)
              </label>
              <select
                required
                onChange={(e) => {
                  if (e.target.value) {
                    handleRoleSelection(e.target.value, 2);
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
                <option value="">Select District Level Role</option>
                {getRolesByLevel(2).map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            /* Show District Role and Region Selection */
            <div>
              <div
                style={{
                  padding: "10px 14px",
                  background: "#f0f9ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "6px",
                  marginBottom: "14px",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ fontWeight: 600, color: "#1e40af" }}>
                  District Role:
                </span>{" "}
                <span style={{ color: "#1e3a8a" }}>
                  {
                    getRolesByLevel(2).find(
                      (r) => r.value === selectedRolesByLevel[2]
                    )?.label
                  }
                </span>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Select Your Region:
                </label>
                <select
                  value={selectedRegion || ""}
                  onChange={(e) =>
                    setSelectedRegion(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  required
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
                  <option value="">-- Select a Region --</option>
                  <option value="1">North Coast</option>
                  <option value="2">South Coast</option>
                  <option value="3">Nairobi Central</option>
                  <option value="4">Nairobi East</option>
                  <option value="5">Nairobi West</option>
                  <option value="6">Nairobi North</option>
                  <option value="7">Nairobi South</option>
                  <option value="8">Central Region</option>
                  <option value="9">Kiambu Region</option>
                  <option value="10">Murang'a Region</option>
                  <option value="11">Nyeri Region</option>
                  <option value="12">North Rift</option>
                  <option value="13">Central Rift</option>
                  <option value="14">South Rift</option>
                  <option value="15">Upper Eastern</option>
                  <option value="16">Lower Eastern</option>
                  <option value="17">Western Region</option>
                  <option value="18">North Nyanza</option>
                  <option value="19">South Nyanza</option>
                  <option value="20">North Eastern Region</option>
                </select>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (currentRoleLevel === 1) {
      return (
        <div>
          {/* Show selected National Role */}
          {selectedRolesByLevel[3] && (
            <div
              style={{
                padding: "10px 14px",
                background: "#f0f9ff",
                border: "1px solid #bfdbfe",
                borderRadius: "6px",
                marginBottom: "10px",
                fontSize: "0.9rem",
              }}
            >
              <span style={{ fontWeight: 600, color: "#1e40af" }}>
                National Role:
              </span>{" "}
              <span style={{ color: "#1e3a8a" }}>
                {
                  getRolesByLevel(3).find(
                    (r) => r.value === selectedRolesByLevel[3]
                  )?.label
                }
              </span>
            </div>
          )}

          {/* Show selected District Role */}
          {selectedRolesByLevel[2] && (
            <div
              style={{
                padding: "10px 14px",
                background: "#f0f9ff",
                border: "1px solid #bfdbfe",
                borderRadius: "6px",
                marginBottom: "10px",
                fontSize: "0.9rem",
              }}
            >
              <span style={{ fontWeight: 600, color: "#1e40af" }}>
                District Role:
              </span>{" "}
              <span style={{ color: "#1e3a8a" }}>
                {
                  getRolesByLevel(2).find(
                    (r) => r.value === selectedRolesByLevel[2]
                  )?.label
                }
              </span>
            </div>
          )}

          {/* Show selected Region */}
          {selectedRegion && (
            <div
              style={{
                padding: "10px 14px",
                background: "#f0f9ff",
                border: "1px solid #bfdbfe",
                borderRadius: "6px",
                marginBottom: "14px",
                fontSize: "0.9rem",
              }}
            >
              <span style={{ fontWeight: 600, color: "#1e40af" }}>Region:</span>{" "}
              <span style={{ color: "#1e3a8a" }}>
                {
                  [
                    { id: 1, name: "North Coast" },
                    { id: 2, name: "South Coast" },
                    { id: 3, name: "Nairobi Central" },
                    { id: 4, name: "Nairobi East" },
                    { id: 5, name: "Nairobi West" },
                    { id: 6, name: "Nairobi North" },
                    { id: 7, name: "Nairobi South" },
                    { id: 8, name: "Central Region" },
                    { id: 9, name: "Kiambu Region" },
                    { id: 10, name: "Murang'a Region" },
                    { id: 11, name: "Nyeri Region" },
                    { id: 12, name: "North Rift" },
                    { id: 13, name: "Central Rift" },
                    { id: 14, name: "South Rift" },
                    { id: 15, name: "Upper Eastern" },
                    { id: 16, name: "Lower Eastern" },
                    { id: 17, name: "Western Region" },
                    { id: 18, name: "North Nyanza" },
                    { id: 19, name: "South Nyanza" },
                    { id: 20, name: "North Eastern Region" },
                  ].find((r) => r.id === selectedRegion)?.name
                }
              </span>
            </div>
          )}

          {/* Assembly Role Selection */}
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              {ROLE_HIERARCHY[1]} (Select one to continue)
            </label>
            <select
              required
              onChange={(e) => {
                if (e.target.value) {
                  handleRoleSelection(e.target.value, 1);
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
              <option value="">Select Assembly Level Role</option>
              {getRolesByLevel(1).map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* Show all selected roles */}
        {selectedRolesByLevel[3] && (
          <div
            style={{
              padding: "10px 14px",
              background: "#f0f9ff",
              border: "1px solid #bfdbfe",
              borderRadius: "6px",
              marginBottom: "10px",
              fontSize: "0.9rem",
            }}
          >
            <span style={{ fontWeight: 600, color: "#1e40af" }}>
              National Role:
            </span>{" "}
            <span style={{ color: "#1e3a8a" }}>
              {
                getRolesByLevel(3).find(
                  (r) => r.value === selectedRolesByLevel[3]
                )?.label
              }
            </span>
          </div>
        )}

        {selectedRolesByLevel[2] && (
          <div
            style={{
              padding: "10px 14px",
              background: "#f0f9ff",
              border: "1px solid #bfdbfe",
              borderRadius: "6px",
              marginBottom: "10px",
              fontSize: "0.9rem",
            }}
          >
            <span style={{ fontWeight: 600, color: "#1e40af" }}>
              District Role:
            </span>{" "}
            <span style={{ color: "#1e3a8a" }}>
              {
                getRolesByLevel(2).find(
                  (r) => r.value === selectedRolesByLevel[2]
                )?.label
              }
            </span>
          </div>
        )}

        {selectedRegion && (
          <div
            style={{
              padding: "10px 14px",
              background: "#f0f9ff",
              border: "1px solid #bfdbfe",
              borderRadius: "6px",
              marginBottom: "10px",
              fontSize: "0.9rem",
            }}
          >
            <span style={{ fontWeight: 600, color: "#1e40af" }}>Region:</span>{" "}
            <span style={{ color: "#1e3a8a" }}>
              {
                [
                  { id: 1, name: "North Coast" },
                  { id: 2, name: "South Coast" },
                  { id: 3, name: "Nairobi Central" },
                  { id: 4, name: "Nairobi East" },
                  { id: 5, name: "Nairobi West" },
                  { id: 6, name: "Nairobi North" },
                  { id: 7, name: "Nairobi South" },
                  { id: 8, name: "Central Region" },
                  { id: 9, name: "Kiambu Region" },
                  { id: 10, name: "Murang'a Region" },
                  { id: 11, name: "Nyeri Region" },
                  { id: 12, name: "North Rift" },
                  { id: 13, name: "Central Rift" },
                  { id: 14, name: "South Rift" },
                  { id: 15, name: "Upper Eastern" },
                  { id: 16, name: "Lower Eastern" },
                  { id: 17, name: "Western Region" },
                  { id: 18, name: "North Nyanza" },
                  { id: 19, name: "South Nyanza" },
                  { id: 20, name: "North Eastern Region" },
                ].find((r) => r.id === selectedRegion)?.name
              }
            </span>
          </div>
        )}

        {selectedRolesByLevel[1] && (
          <div
            style={{
              padding: "10px 14px",
              background: "#f0f9ff",
              border: "1px solid #bfdbfe",
              borderRadius: "6px",
              marginBottom: "14px",
              fontSize: "0.9rem",
            }}
          >
            <span style={{ fontWeight: 600, color: "#1e40af" }}>
              Assembly Role:
            </span>{" "}
            <span style={{ color: "#1e3a8a" }}>
              {
                getRolesByLevel(1).find(
                  (r) => r.value === selectedRolesByLevel[1]
                )?.label
              }
            </span>
          </div>
        )}

        {/* Church Search */}
        <div style={{ marginBottom: "14px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            Search and Select Your Church:
          </label>
          <input
            type="text"
            placeholder="Type to search churches..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedChurch(null); // Clear selected church when search term changes
            }}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "#2563eb 1px solid",
              outline: "none",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              marginBottom: "8px",
            }}
          />
          {/* Display search results only if search has a value and no church is selected */}
          {search && !selectedChurch && filteredChurches.length > 0 && (
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                background: "white",
              }}
            >
              {filteredChurches.map((church) => (
                <div
                  key={church.id}
                  onClick={() => {
                    setSelectedChurch(church.id);
                    setSearch(church.name); // Set search input to the selected church name
                  }}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "white")
                  }
                >
                  {church.name}
                </div>
              ))}
            </div>
          )}
          {/* Option to register new church if search yields no results */}
          {search && !selectedChurch && filteredChurches.length === 0 && (
            <div
              onClick={() => setIsCreatingChurch(true)}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                background: "#eff6ff",
                color: "#2563eb",
                fontWeight: "600",
                border: "1px dashed #93c5fd",
                borderRadius: "6px",
                textAlign: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#dbeafe")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#eff6ff")
              }
            >
              + Register "{search}" as a new church
            </div>
          )}
        </div>
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
            {dashboardShow ? (
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
                setPageContent("Membership");
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
          {dashboardShow ? (
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
              setPageContent("Membership");
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
          <div css={modal} onClick={(e) => e.stopPropagation()}>
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
              {!loggedFullname && pageContent === "Membership" ? (
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
              ) : null}
            </div>

            {loggedFullname && pageContent === "Membership" ? (
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
                    {getUserRoles(roles)}, {userChurch}
                  </span>
                </div>

                <div className="row">
                  <span className="label">Subscription</span>
                  <span style={{ display: "flex", gap: "8px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        color:
                          Number(loggedSubscription) === 1 ? "#2563eb" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {loggedSubscription === "1" ? "Active" : "Expired"}
                    </span>
                    {loggedSubscription === "1" ? (
                      ""
                    ) : (
                      <button
                        style={{
                          padding: "6px 14px",
                          border: "none",
                          cursor: "pointer",
                          background:
                            " linear-gradient(90deg, #2563eb, #fbbf24)",
                          color: "white",
                          fontWeight: 500,
                        }}
                        onClick={() => {
                          setIsModalOpen(true);
                          setPageContent("Subscription");
                        }}
                      >
                        Renew
                      </button>
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
            ) : pageContent === "Subscription" ||
              pageContent === "Tithe" ||
              pageContent === "Donation" ||
              pageContent === "Offering" ? (
              <form css={formStyles} onSubmit={handleTransaction}>
                {!loggedFullname ? (
                  <input
                    type="text"
                    placeholder="Enter your ID"
                    value={idnumber}
                    onChange={(e) => setIdnumber(e.target.value)}
                    required
                  />
                ) : null}

                <input
                  type="tel"
                  placeholder="Phone Number (0700000000)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {pageContent === "Tithe" ||
                pageContent === "Donation" ||
                pageContent === "Offering" ? (
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                ) : null}
                <p
                  style={{
                    fontSize: "13px",
                    color: "#1c6069",
                    marginTop: "-5px",
                  }}
                >
                  ℹ️ Transactions are processed securely and instantly.
                </p>

                <button type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Pay For " + pageContent}
                </button>
              </form>
            ) : pageContent === "SpecialPrayer" ? (
              <form css={formStyles} onSubmit={handleSpecialPrayer}>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={100}
                  placeholder="say something..."
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Send"}
                </button>
              </form>
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

                <fieldset
                  style={{
                    border: "1px solid #2563eb",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <legend
                    style={{
                      color: "#2563eb",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      padding: "0 10px",
                    }}
                  >
                    Ministry Role Selection
                  </legend>

                  {(currentRoleLevel !== 3 || selectedRolesByLevel[3]) && (
                    <button
                      type="button"
                      onClick={goBackLevel}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        marginBottom: "16px",
                        background: "#f3f4f6",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        color: "#374151",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e5e7eb";
                        e.currentTarget.style.borderColor = "#9ca3af";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f3f4f6";
                        e.currentTarget.style.borderColor = "#d1d5db";
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>←</span>
                      Back to Previous Step
                    </button>
                  )}

                  {renderCascadingRoleSelector()}
                </fieldset>

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
