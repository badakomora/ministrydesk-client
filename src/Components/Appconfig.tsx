export const serverurl = "http://localhost:4000";

//1 = assembly, 2 = district, 3 = executive
export const roles = [
  { value: "1", label: "Senior Pastor", level: 1 },
  { value: "2", label: "Junior Pastor", level: 1 },

  { value: "3", label: "Secretary", level: 1 },
  { value: "3", label: "Secretary", level: 2 },
  { value: "3", label: "Administrator", level: 3 },

  { value: "4", label: "Member", level: 1 },
  { value: "6", label: "Overseer", level: 2 },

  { value: "7", label: "Treasurer", level: 1 },
  { value: "7", label: "Treasurer", level: 3 },

  { value: "9", label: "Choir", level: 1 },
  { value: "10", label: "Usher", level: 1 },
  { value: "11", label: "Youth", level: 1 },
  { value: "12", label: "Women Dept", level: 1 },
  { value: "13", label: "Men Dept", level: 1 },
  { value: "14", label: "General Superintendent", level: 3 },
  { value: "15", label: "Mama Kenya", level: 3 },
  { value: "16", label: "National CED Director", level: 3 },
];

export const getRoleLabel = (roleNumber: string | number) => {
  return (
    roles.find((r) => r.value === String(roleNumber))?.label || "Unknown Role"
  );
};

export const getStatusLabel = (status: number) => {
  return status === 1 ? "Approved" : "Pending";
};

export const getSubscriptionLabel = (sub: number) => {
  return sub === 1 ? "Active" : "Expired";
};

export const getStatusStyle = (status: number) => {
  switch (status) {
    case 1:
      return { color: "white", background: "green", padding: "4px 6px",  };
    case 0:
      return { color: "white", background: "#fbbf24", padding: "4px 6px", };
    default:
      return { color: "white", background: "gray", padding: "4px 6px",  };
  }
};

export const getSubscriptionStyle = (sub: number) => {
  switch (sub) {
    case 1:
      return { color: "white", background: "blue", padding: "4px 6px",  };
    case 0:
      return { color: "white", background: "red", padding: "4px 6px",  };
    default:
      return { color: "white", background: "gray", padding: "4px 6px",  };
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
  const shortMonth = d.toLocaleString("en-US", { month: "short" }).toLowerCase(); // "nov"

  return [
    `${year}-${month}-${day}`,     // 2025-11-21
    `${day}/${month}/${year}`,     // 21/11/2025
    `${day}-${month}-${year}`,     // 21-11-2025
    `${longMonth} ${day} ${year}`, // november 21 2025
    `${shortMonth} ${day}`,        // nov 21
    `${day} ${shortMonth}`,        // 21 nov
    `${day}`,                      // 21
    longMonth,                     // november
    shortMonth                     // nov
  ].join(" ");
};
