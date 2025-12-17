export const serverurl = "http://localhost:4000";

//1 = assembly, 2 = district, 3 = executive
export const roles = [
  /* =========================
     NATIONAL LEVEL (3)
  ========================== */
  { value: "N1", label: "General Superintendent", level: 3 },
  { value: "N2", label: "Mama Kenya", level: 3 },
  { value: "N3", label: "General Treasurer", level: 3 },
  { value: "N4", label: "National CED Director", level: 3 },
  { value: "N5", label: "General Secretary / Administrator", level: 3 },
  { value: "N6", label: "Border Director", level: 3 },
  { value: "0", label: "N/A", level: 3 },

  /* =========================
     DISTRICT LEVEL (2)
  ========================== */
  { value: "D1", label: "Overseer / Bishop", level: 2 },
  { value: "D2", label: "District Secretary", level: 2 },
  { value: "D3", label: "District Treasurer", level: 2 },
  { value: "D4", label: "District Clerk", level: 2 },
  { value: "D5", label: "Mama District", level: 2 },
  { value: "D6", label: "District CED Director", level: 2 },
  { value: "D7", label: "Auditing Pastor 1", level: 2 },
  { value: "D8", label: "Auditing Pastor 2", level: 2 },
  { value: "0", label: "N/A", level: 2 },

  /* =========================
     ASSEMBLY LEVEL (1)
  ========================== */
  { value: "A1", label: "Reverend", level: 1 },
  { value: "A2", label: "Secretary", level: 1 },
  { value: "A3", label: "Treasurer", level: 1 },
  { value: "A4", label: "Deacon (Men Department)", level: 1 },
  { value: "A5", label: "Deaconess (Women Department)", level: 1 },
  { value: "A6", label: "Sunday School Superintendent", level: 1 },
  { value: "A7", label: "CED – Christian Education Department", level: 1 },
  { value: "0", label: "N/A", level: 1 },

  /* =========================
     N/A
  ========================== */
];

export const getRoleLabel = (roleNumber: string | number) => {
  // If roleNumber is 0, return empty string
  if (String(roleNumber) === "0") return "";

  return roles.find((r) => r.value === String(roleNumber))?.label || "";
};

// Appconfig.ts or a helpers file
export const getCombinedRoles = (item: any) => {
  const roles = [
    item.nationalrole,
    item.executiverole,
    item.districtrole,
    item.assemblyrole,
  ];

  return roles
    .map((r) => getRoleLabel(r)) // convert role numbers to labels
    .filter((r) => r !== "") // skip empty or 0 roles
    .join(", "); // join as a string
};

// Save all logged roles in one object
const rolesData = {
  national: localStorage.getItem("nationalRole"),
  assembly: localStorage.getItem("executiveRole"),
  executive: localStorage.getItem("districtRole"),
  district: localStorage.getItem("assemblyRole"),
};

localStorage.setItem("loggedRoles", JSON.stringify(rolesData));

export function getUserRoles(roles: { value: string; label: string }[]) {
  const stored = localStorage.getItem("loggedRoles");
  if (!stored) return "";

  const { national, assembly, executive, district } = JSON.parse(stored);

  const selected: string[] = [];

  const checkAndPush = (roleValue: string) => {
    if (roleValue && roleValue !== "0") {
      const role = roles.find((r) => r.value === roleValue);
      if (role) selected.push(role.label);
    }
  };

  checkAndPush(national);
  checkAndPush(assembly);
  checkAndPush(executive);
  checkAndPush(district);

  return selected.length ? selected.join(", ") : "";
}

export const getStatusLabel = (status: number) => {
  return status === 1 ? "Approved" : "Pending";
};

export const getSubscriptionLabel = (sub: number) => {
  return sub === 1 ? "Active" : "Expired";
};

export const getStatusStyle = (status: number) => {
  switch (status) {
    case 1:
      return { color: "white", background: "green", padding: "4px 6px" };
    case 0:
      return { color: "white", background: "#fbbf24", padding: "4px 6px" };
    default:
      return { color: "white", background: "gray", padding: "4px 6px" };
  }
};

export const getSubscriptionStyle = (sub: number) => {
  switch (sub) {
    case 1:
      return { color: "white", background: "blue", padding: "4px 6px" };
    case 0:
      return { color: "white", background: "red", padding: "4px 6px" };
    default:
      return { color: "white", background: "gray", padding: "4px 6px" };
  }
};

export const formatSearchableDate = (dateStr: string) => {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  // Long month name
  const longMonth = d.toLocaleString("en-US", { month: "long" }).toLowerCase(); // "november"
  const shortMonth = d
    .toLocaleString("en-US", { month: "short" })
    .toLowerCase(); // "nov"

  return [
    `${year}-${month}-${day}`, // 2025-11-21
    `${day}/${month}/${year}`, // 21/11/2025
    `${day}-${month}-${year}`, // 21-11-2025
    `${longMonth} ${day} ${year}`, // november 21 2025
    `${shortMonth} ${day}`, // nov 21
    `${day} ${shortMonth}`, // 21 nov
    `${day}`, // 21
    longMonth, // november
    shortMonth, // nov
  ].join(" ");
};
