import type React from "react";
import { useState } from "react";
import { RowActionsDropdown } from "./RowActionsDropdown";

const overlay = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
  backdropFilter: "blur(4px)",
  padding: "12px",
} as const;

const dialog = {
  background: "#fff",
  borderRadius: "12px",
  width: "94%",
  maxWidth: "1100px",
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
} as const;

const body = {
  padding: "24px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  flex: 1,
} as const;

const footer = {
  padding: "20px 24px",
  borderTop: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  background: "#f8fafc",
} as const;

const input = {
  padding: "8px 14px",
  border: "1px solid #d1d5db",
  flex: 1,
  fontSize: "14px",
  transition: "all 200ms ease",
  background: "#fff",
} as const;

const select = {
  padding: "8px 14px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  background: "#fff",
  cursor: "pointer",
  gap: "8px",
  transition: "all 200ms ease",
} as const;

const primaryBtn = {
  padding: "8px 14px",
  background: "linear-gradient(135deg, #2563eb, #fbbf24)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "14px",
  transition: "all 200ms ease",
  boxShadow: "0 6px 20px rgba(16, 24, 40, 0.08)",
} as const;

const searchRow = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
} as const;

const cols = {
  display: "flex",
  gap: "24px",
} as const;

const left = {
  flex: 7,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minWidth: 0,
  overflow: "hidden",
} as const;

const resultsHead = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: 600,
  fontSize: "14px",
  color: "#1e293b",
  padding: "0 4px",
  marginBottom: "8px",
} as const;

const muted = {
  fontWeight: 400,
  color: "#6b7280",
  fontSize: "13px",
} as const;

const tableBox = {
  border: "1px solid #e5e7eb",
  padding: "4px",
  overflowX: "auto",
  overflowY: "hidden",
  background: "#fff",
  position: "relative",
  WebkitOverflowScrolling: "touch",
  direction: "rtl" as const,
} as const;

const table = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "900px",
  direction: "ltr" as const,
} as const;

const tableHeader = {
  background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)",
  borderBottom: "2px solid #2563eb",
} as const;

const tableRow = {
  borderBottom: "1px solid #e5e7eb",
} as const;

const tableHeaderCell = {
  padding: "4px",
  fontWeight: 700,
  fontSize: "13px",
  color: "#1e293b",
  textAlign: "left",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
} as const;

const tableCell = {
  padding: "4px",
  fontSize: "14px",
  color: "#374151",
  whiteSpace: "normal",
  wordBreak: "break-word",
  position: "relative",
  overflow: "visible",
} as const;

const tableCellAction = {
  textAlign: "right",
  maxWidth: "none",
  overflow: "visible",
  whiteSpace: "normal",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
} as const;


const dropdownContainer = {
  position: "relative",
  display: "inline-block",
} as const;

const dropdownMenu = {
  position: "absolute",
  top: "100%",
  right: 0,
  marginTop: "8px",
  background: "#fff",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  minWidth: "160px",
  overflow: "hidden",
  maxHeight: "200px",
  overflowY: "auto",
} as const;

const dropdownItem = {
  display: "block",
  width: "100%",
  padding: "12px 16px",
  background: "none",
  border: "none",
  textAlign: "left",
  fontSize: "14px",
  color: "#374151",
  cursor: "pointer",
  transition: "all 150ms ease",
  borderBottom: "1px solid #f3f4f6",
} as const;

const paginationContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  width: "100%",
} as const;

const paginationSelect = {
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  background: "#fff",
  cursor: "pointer",
  transition: "all 200ms ease",
} as const;

const paginationControls = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
} as const;

const paginationBtn = {
  padding: "8px 14px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "13px",
  transition: "all 200ms ease",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
} as const;

const pageInfo = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#1e293b",
  minWidth: "120px",
  textAlign: "center",
} as const;

// Mock data organized by category
const mockDataByCategory = {
  all: [
    // Church Members
    {
      id: 1,
      name: "Alice",
      type: "User",
      category: "Church Members",
      phone: "+1-555-0101",
      email: "alice@church.com",
      role: "Admin",
      status: "approved",
    },
    {
      id: 3,
      name: "Developers Group",
      type: "Group",
      category: "Church Members",
      phone: "+1-555-0103",
      email: "devs@church.com",
      role: "Group",
      status: "pending",
    },
    {
      id: 4,
      name: "Bob Smith",
      type: "User",
      category: "Church Members",
      phone: "+1-555-0102",
      email: "bob@church.com",
      role: "Member",
      status: "approved",
    },
    {
      id: 8,
      name: "Diana Prince",
      type: "User",
      category: "Church Members",
      phone: "+1-555-0104",
      email: "diana@church.com",
      role: "Admin",
      status: "pending",
    },
    {
      id: 10,
      name: "Finance Group",
      type: "Group",
      category: "Church Members",
      phone: "+1-555-0105",
      email: "finance@church.com",
      role: "Group",
      status: "approved",
    },
    {
      id: 13,
      name: "HR Department",
      type: "Group",
      category: "Church Members",
      phone: "+1-555-0106",
      email: "hr@church.com",
      role: "Group",
      status: "paused",
    },
    {
      id: 17,
      name: "Ivan Petrov",
      type: "User",
      category: "Church Members",
      phone: "+1-555-0107",
      email: "ivan@church.com",
      role: "Member",
      status: "pending",
    },
    {
      id: 25,
      name: "Operations Group",
      type: "Group",
      category: "Church Members",
      phone: "+1-555-0108",
      email: "ops@church.com",
      role: "Group",
      status: "approved",
    },
    // News & Events
    {
      id: 2,
      title: "Christmas Food Drive",
      type: "Event",
      category: "News & Events",
      date: "Dec 25, 2025",
      postedby: "Peter Komora",
      description: "Annual Christmas food drive for the community",
      church: "Main Church",
      status: "approved",
    },
    {
      id: 6,
      title: "New Year Celebration",
      type: "Event",
      category: "News & Events",
      date: "Jan 1, 2026",
      postedby: "Sarah Johnson",
      description: "Join us for our New Year celebration service",
      church: "Main Church",
      status: "pending",
    },
    {
      id: 11,
      title: "Community Outreach",
      type: "News",
      category: "News & Events",
      date: "Nov 15, 2025",
      postedby: "Frank Miller",
      description: "Monthly community outreach program",
      church: "Downtown Branch",
      status: "approved",
    },
    {
      id: 19,
      title: "Youth Conference",
      type: "Event",
      category: "News & Events",
      date: "Aug 10, 2025",
      postedby: "Marketing Team",
      description: "Annual youth conference and fellowship",
      church: "Main Church",
      status: "paused",
    },
    {
      id: 23,
      title: "Prayer Meeting",
      type: "News",
      category: "News & Events",
      date: "Every Wednesday",
      postedby: "Karen Davis",
      description: "Weekly prayer meeting for all members",
      church: "Prayer Room",
      status: "approved",
    },
    // Sermons
    {
      id: 5,
      title: "Faith and Trust",
      type: "Sermon",
      category: "Sermons",
      date: "Oct 20, 2025",
      preacher: "Charlie Brown",
      description: "A powerful message about faith in difficult times",
      church: "Main Church",
      status: "approved",
    },
    {
      id: 9,
      title: "Love Your Neighbor",
      type: "Sermon",
      category: "Sermons",
      date: "Oct 13, 2025",
      preacher: "Grace Lee",
      description: "Understanding the greatest commandment",
      church: "Main Church",
      status: "pending",
    },
    {
      id: 14,
      title: "The Power of Prayer",
      type: "Sermon",
      category: "Sermons",
      date: "Oct 6, 2025",
      preacher: "Grace Lee",
      description: "How prayer transforms our lives",
      church: "Downtown Branch",
      status: "approved",
    },
    {
      id: 18,
      title: "Forgiveness and Healing",
      type: "Sermon",
      category: "Sermons",
      date: "Sep 29, 2025",
      preacher: "Charlie Brown",
      description: "Finding peace through forgiveness",
      church: "Main Church",
      status: "paused",
    },
    {
      id: 22,
      title: "God's Love",
      type: "Sermon",
      category: "Sermons",
      date: "Sep 22, 2025",
      preacher: "Grace Lee",
      description: "Exploring the depth of God's unconditional love",
      church: "Main Church",
      status: "approved",
    },
    // Assembly Programs
    {
      id: 7,
      title: "Sunday School",
      type: "Program",
      category: "Assembly Programs",
      date: "Every Sunday 10am",
      leader: "Engineering Team",
      description: "Bible study and fellowship for all ages",
      church: "Main Church",
      status: "approved",
    },
    {
      id: 12,
      title: "Choir Practice",
      type: "Program",
      category: "Assembly Programs",
      date: "Every Friday 7pm",
      leader: "Gamma Tool",
      description: "Weekly choir rehearsal and training",
      church: "Music Hall",
      status: "pending",
    },
    {
      id: 16,
      title: "Youth Group",
      type: "Program",
      category: "Assembly Programs",
      date: "Every Saturday 6pm",
      leader: "IT Support",
      description: "Fellowship and activities for young adults",
      church: "Youth Center",
      status: "approved",
    },
    {
      id: 20,
      title: "Bible Study",
      type: "Program",
      category: "Assembly Programs",
      date: "Tuesdays & Thursdays",
      leader: "Jack Wilson",
      description: "In-depth study of scripture",
      church: "Main Church",
      status: "paused",
    },
    {
      id: 24,
      title: "Missions Committee",
      type: "Program",
      category: "Assembly Programs",
      date: "Monthly meetings",
      leader: "Kestrel Tool",
      description: "Planning and coordinating mission activities",
      church: "Conference Room",
      status: "approved",
    },
  ],
};

const columnConfigs = {
  "Church Members": {
    columns: ["name", "email", "phone", "role", "status", "action"],
    headers: ["Name", "Email", "Phone", "Role", "Status", "Action"],
    mobileColumns: ["name", "email", "phone", "role", "status", "action"],
    mobileHeaders: ["Name", "Email", "Phone", "Role", "Status", "Action"],
  },
  "News & Events": {
    columns: ["title", "date", "postedby", "church", "status", "action"],
    headers: ["Title", "Date", "Posted By", "Church", "Status", "Action"],
    mobileColumns: ["title", "date", "postedby", "church", "status", "action"],
    mobileHeaders: ["Title", "Date", "Posted By", "Church", "Status", "Action"],
  },
  Sermons: {
    columns: ["title", "date", "preacher", "church", "status", "action"],
    headers: ["Title", "Date", "Preacher", "Church", "Status", "Action"],
    mobileColumns: ["title", "date", "status", "action"],
    mobileHeaders: ["Title", "Date", "Status", "Action"],
  },
  "Assembly Programs": {
    columns: ["title", "date", "leader", "church", "status", "action"],
    headers: ["Title", "Date", "Leader", "Church", "Status", "Action"],
    mobileColumns: ["title", "date", "leader", "status", "action"],
    mobileHeaders: ["Title", "Date", "Leader", "Status", "Action"],
  },
};



export const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("Church Members");
  const [isMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleAddOption = (type: string) => {
    // Implement your logic here
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number.parseInt(e.target.value));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(mockDataByCategory.all.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filterBySearch = (items: any[]) => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();

    return items.filter((item) => {
      if (selectedCategory === "Church Members") {
        // Search by name
        return item.name?.toLowerCase().includes(query);
      } else if (selectedCategory === "News & Events") {
        // Search by title, date, or church
        return (
          item.title?.toLowerCase().includes(query) ||
          item.date?.toLowerCase().includes(query) ||
          item.church?.toLowerCase().includes(query)
        );
      } else if (selectedCategory === "Sermons") {
        // Search by title, date, or church
        return (
          item.title?.toLowerCase().includes(query) ||
          item.date?.toLowerCase().includes(query) ||
          item.church?.toLowerCase().includes(query)
        );
      } else if (selectedCategory === "Assembly Programs") {
        // Search by title, date, or church
        return (
          item.title?.toLowerCase().includes(query) ||
          item.date?.toLowerCase().includes(query) ||
          item.church?.toLowerCase().includes(query)
        );
      }
      return true;
    });
  };

  const filteredData = filterBySearch(
    selectedCategory === "Church Members"
      ? mockDataByCategory.all.filter(
          (item) => item.category === "Church Members"
        )
      : mockDataByCategory.all.filter(
          (item) => item.category === selectedCategory
        )
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const currentConfig =
    selectedCategory === "Church Members"
      ? columnConfigs["Church Members"]
      : columnConfigs[selectedCategory as keyof typeof columnConfigs];

  const displayColumns = isMobile
    ? (currentConfig as any).mobileColumns
    : currentConfig.columns;
  const displayHeaders = isMobile
    ? (currentConfig as any).mobileHeaders
    : currentConfig.headers;

  const getCellValue = (item: any, column: string) => {
    const value = item[column as keyof typeof item];
    return value || "N/A";
  };

  return (
    <div style={overlay}>
      <div style={dialog}>
        <div style={body}>
          <div style={searchRow} className="search-row-mobile">
            <input
              style={input}
              placeholder={
                selectedCategory === "Church Members"
                  ? "Search by name..."
                  : "Search by title, date, or church..."
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <select style={select} onChange={handleCategoryChange}>
                <option>Reports</option>
                <option>Church Members</option>
                <option>News & Events</option>
                <option>Sermons</option>
                <option>Assembly Programs</option>
              </select>
              <select
                style={select}
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option>Church Members</option>
                <option>News & Events</option>
                <option>Sermons</option>
                <option>Assembly Programs</option>
              </select>
              <div style={dropdownContainer}>
                <button
                  style={primaryBtn}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  📝 Create New
                </button>
                {isDropdownOpen && (
                  <div style={dropdownMenu}>
                    <button
                      style={dropdownItem}
                      onClick={() => handleAddOption("User")}
                    >
                      News & Events
                    </button>
                    <button
                      style={dropdownItem}
                      onClick={() => handleAddOption("Application")}
                    >
                      Sermons
                    </button>
                    <button
                      style={dropdownItem}
                      onClick={() => handleAddOption("Group")}
                    >
                      Assembly Program
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={cols} className="cols-mobile">
            <div style={left}>
              <div style={resultsHead} className="results-head-mobile">
                <span>{selectedCategory}</span>
                <span style={muted}>
                  {startIndex + 1}‑{endIndex} of {totalItems}
                </span>
              </div>

              <div style={tableBox} className="table-box-mobile">
                <table style={table}>
                  <thead style={tableHeader}>
                    <tr style={tableRow}>
                      {displayHeaders.map(
                        (
                          header:
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactPortal
                                | React.ReactElement<
                                    unknown,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined,
                          idx: React.Key | null | undefined
                        ) => (
                          <th
                            key={idx}
                            style={{
                              ...tableHeaderCell,
                              ...(idx === displayHeaders.length - 1
                                ? tableCellAction
                                : {}),
                            }}
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item) => {

                      return (
                        <tr
                          style={tableRow}
                          key={item.id}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f0f4ff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          {displayColumns.map(
                            (
                              column: string,
                              cidx: React.Key | null | undefined
                            ) => (
                              <td
                                key={cidx}
                                style={
                                  column === "action"
                                    ? tableCellAction
                                    : tableCell
                                }
                              >
                                {column === "action" ? (
                                  <div style={tableCell}>
                                     <RowActionsDropdown status={item.status} category={selectedCategory} />
                                  </div>
                                ) : (
                                  // ✅ Normal cell
                                  getCellValue(item, column)
                                )}
                              </td>
                            )
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div style={footer} className="footer-mobile">
          <div style={paginationContainer} className="pagination-mobile">
            <select
              style={paginationSelect}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
            <div
              style={paginationControls}
              className="pagination-controls-mobile"
            >
              <button
                style={{
                  ...paginationBtn,
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              <span style={pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                style={{
                  ...paginationBtn,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        button:hover {
          transform: translateY(-2px);
        }
        button:active {
          transform: translateY(0);
        }
        tbody tr:hover {
          background-color: #f9fafb;
        }
        input:focus, select:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        /* Stat card hover effect */
        div[style*="display: flex"][style*="flexDirection: column"][style*="justifyContent: space-between"][style*="alignItems: flex-start"][style*="padding: 16px"] {
          cursor: pointer;
        }

        div[style*="display: flex"][style*="flexDirection: column"][style*="justifyContent: space-between"][style*="alignItems: flex-start"][style*="padding: 16px"]:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
          border-color: #2563eb;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .search-row-mobile {
            flex-direction: column !important;
            gap: 8px !important;
          }

          .search-row-mobile input,
          .search-row-mobile select,
          .search-row-mobile button {
            width: 100%;
          }

          .cols-mobile {
            flex-direction: column !important;
            gap: 16px !important;
          }

          .table-box-mobile {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .table-box-mobile table {
            font-size: 12px;
            min-width: 600px;
          }

          .table-box-mobile th,
          .table-box-mobile td {
            padding: 10px 8px !important;
            margin: 0 !important;
            white-space: normal !important;
            word-break: break-word !important;
          }

          .results-head-mobile {
            flex-direction: column !important;
            gap: 8px !important;
            align-items: flex-start !important;
          }

          .right-panel-mobile {
            order: -1;
          }

          .footer-mobile {
            flex-direction: column !important;
            gap: 12px !important;
          }

          .pagination-mobile {
            flex-direction: column !important;
            gap: 12px !important;
          }

          .pagination-controls-mobile {
            flex-direction: column !important;
            width: 100%;
          }

          .pagination-controls-mobile button {
            width: 100%;
          }

          .pagination-controls-mobile span {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .search-row-mobile input,
          .search-row-mobile select,
          .search-row-mobile button {
            font-size: 12px;
            padding: 10px 12px;
          }

          .table-box-mobile table {
            font-size: 11px;
            min-width: 500px;
          }

          .table-box-mobile th,
          .table-box-mobile td {
            padding: 8px 6px !important;
            margin: 0 !important;
            white-space: normal !important;
            word-break: break-word !important;
          }

          button {
            padding: 8px 10px;
            font-size: 12px;
          }

          .right-panel-mobile {
            padding: 16px !important;
          }

          .right-panel-mobile div:first-child {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};
