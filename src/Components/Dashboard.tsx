import type React from "react";

import { useState } from "react";

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
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  flex: 1,
  fontSize: "14px",
  transition: "all 200ms ease",
  background: "#fff",
} as const;

const select = {
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  background: "#fff",
  cursor: "pointer",
  transition: "all 200ms ease",
} as const;

const primaryBtn = {
  padding: "12px 14px",
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
} as const;

const right = {
  flex: 5,
  background: "linear-gradient(135deg, #f0f4ff 0%, #fef8f0 100%)",
  borderRadius: "12px",
  padding: "20px",
  border: "1px solid #e5e7eb",
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
  borderRadius: "10px",
  overflowX: "auto",
  overflowY: "hidden",
  background: "#fff",
  position: "relative",
  WebkitOverflowScrolling: "touch",
} as const;

const table = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "900px",
} as const;

const tableHeader = {
  background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)",
  borderBottom: "2px solid #2563eb",
} as const;

const tableHeaderCell = {
  padding: "12px 8px",
  fontWeight: 700,
  fontSize: "13px",
  color: "#1e293b",
  textAlign: "left",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
} as const;

const tableBodyRow = {
  borderBottom: "1px solid #e5e7eb",
  transition: "background-color 150ms ease",
} as const;

const tableCell = {
  padding: "12px 8px",
  fontSize: "14px",
  color: "#374151",
  whiteSpace: "normal",
  wordBreak: "break-word",
} as const;

const tableCellAction = {
  textAlign: "right",
  maxWidth: "none",
  overflow: "visible",
  whiteSpace: "normal",
} as const;

const approveBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "5px 14px",
  margin: "1px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
  transition: "all 200ms ease",
  whiteSpace: "nowrap",
} as const;

const cancelBtn = {
  background: "#fbbf24",
  color: "#fff",
  border: "none",
  padding: "5px 14px",
  margin: "1px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
  transition: "all 200ms ease",
  whiteSpace: "nowrap",
} as const;

const rightHead = {
  fontWeight: 700,
  fontSize: "15px",
  marginBottom: "16px",
  color: "#1e293b",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
} as const;

const permissionsList = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
} as const;

const permissionItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px",
  background: "#fff",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  transition: "all 150ms ease",
} as const;

const permissionName = {
  fontWeight: 600,
  color: "#1e293b",
  fontSize: "14px",
} as const;

const permissionBadge = {
  background: "linear-gradient(135deg, #dbeafe 0%, #fef3c7 100%)",
  color: "#1e40af",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.3px",
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
  borderRadius: "8px",
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
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  background: "#fff",
  cursor: "pointer",
  transition: "all 200ms ease",
  borderRadius: "6px",
} as const;

const paginationControls = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
} as const;

const paginationBtn = {
  padding: "10px 14px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "13px",
  transition: "all 200ms ease",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
  borderRadius: "6px",
} as const;

const pageInfo = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#1e293b",
  minWidth: "120px",
  textAlign: "center",
} as const;

const tooltipContainer = {
  position: "relative",
  display: "flex",
} as const;

const tooltip = {
  position: "absolute",
  bottom: "calc(100% + 8px)",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#1e293b",
  color: "#fff",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "12px",
  zIndex: 2001,
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  maxWidth: "250px",
  width: "max-content",
  pointerEvents: "none",
} as const;

const tooltipContent = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
} as const;

const tooltipRow = {
  display: "flex",
  gap: "8px",
  wordBreak: "break-word",
} as const;

const tooltipLabel = {
  fontWeight: 600,
  color: "#fbbf24",
  minWidth: "50px",
  flexShrink: 0,
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
    },
    {
      id: 3,
      name: "Developers Group",
      type: "Group",
      category: "Church Members",
      phone: "+1-555-0103",
      email: "devs@church.com",
      role: "Group",
    },
    {
      id: 4,
      name: "Bob Smith",
      type: "User",
      category: "Church Members",
      phone: "+1-555-0102",
      email: "bob@church.com",
      role: "Member",
    },
    {
      id: 8,
      name: "Diana Prince",
      type: "User",
      category: "Church Members",
      phone: "+1-555-0104",
      email: "diana@church.com",
      role: "Admin",
    },
    {
      id: 10,
      name: "Finance Group",
      type: "Group",
      category: "Church Members",
      phone: "+1-555-0105",
      email: "finance@church.com",
      role: "Group",
    },
    {
      id: 13,
      name: "HR Department",
      type: "Group",
      category: "Church Members",
      phone: "+1-555-0106",
      email: "hr@church.com",
      role: "Group",
    },
    {
      id: 17,
      name: "Ivan Petrov",
      type: "User",
      category: "Church Members",
      phone: "+1-555-0107",
      email: "ivan@church.com",
      role: "Member",
    },
    {
      id: 25,
      name: "Operations Group",
      type: "Group",
      category: "Church Members",
      phone: "+1-555-0108",
      email: "ops@church.com",
      role: "Group",
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
    },
  ],
};

const columnConfigs = {
  "Church Members": {
    columns: ["name", "email", "phone", "role"],
    headers: ["Name", "Email", "Phone", "Role"],
    tooltipFields: ["id", "phone", "email"],
  },
  "News & Events": {
    columns: ["title", "date", "postedby", "church"],
    headers: ["Title", "Date", "Posted By", "Church"],
    tooltipFields: ["description", "church"],
  },
  Sermons: {
    columns: ["title", "date", "preacher", "church"],
    headers: ["Title", "Date", "Preacher", "Church"],
    tooltipFields: ["description", "church"],
  },
  "Assembly Programs": {
    columns: ["title", "date", "leader", "church"],
    headers: ["Title", "Date", "Leader", "Church"],
    tooltipFields: ["description", "church"],
  },
};

export const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("All Types");
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
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

  const filteredData =
    selectedCategory === "All Types"
      ? mockDataByCategory.all
      : mockDataByCategory.all.filter(
          (item) => item.category === selectedCategory
        );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const currentConfig =
    selectedCategory === "All Types"
      ? columnConfigs["Church Members"]
      : columnConfigs[selectedCategory as keyof typeof columnConfigs];

  const getCellValue = (item: any, column: string) => {
    const value = item[column as keyof typeof item];
    return value || "N/A";
  };

  return (
    <div style={overlay}>
      <div style={dialog}>
        <div style={body}>
          <div style={searchRow} className="search-row-mobile">
            <input style={input} placeholder="Search by name or title" />
            <select
              style={select}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option>All Types</option>
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
                + Add
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
                    <tr>
                      {currentConfig.headers.map((header, idx) => (
                        <th
                          key={idx}
                          style={{
                            ...tableHeaderCell,
                            ...(idx === currentConfig.headers.length - 1
                              ? tableCellAction
                              : {}),
                          }}
                        >
                          {header}
                        </th>
                      ))}
                      <th style={{ ...tableHeaderCell, ...tableCellAction }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item) => (
                      <tr
                        key={item.id}
                        style={tableBodyRow}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f0f4ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        {currentConfig.columns.map((column, idx) => (
                          <td
                            key={idx}
                            style={{
                              ...tableCell,
                              ...(idx === currentConfig.columns.length - 1
                                ? tableCellAction
                                : {}),
                            }}
                          >
                            {idx === 0 ? (
                              <div style={tooltipContainer}>
                                {getCellValue(item, column)}
                                <span
                                  onMouseEnter={() => setHoveredRowId(item.id)}
                                  onMouseLeave={() => setHoveredRowId(null)}
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "4px",
                                    fontSize: "12px",
                                  }}
                                >
                                  ℹ️
                                </span>
                                {hoveredRowId === item.id && (
                                  <div style={tooltip}>
                                    <div style={tooltipContent}>
                                      {currentConfig.tooltipFields.map(
                                        (field) => (
                                          <div key={field} style={tooltipRow}>
                                            <span style={tooltipLabel}>
                                              {field}:
                                            </span>
                                            <span>
                                              {getCellValue(item, field)}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              getCellValue(item, column)
                            )}
                          </td>
                        ))}
                        <td style={{ ...tableCell, ...tableCellAction }}>
                          <button style={approveBtn}>Approve</button>
                          <button style={cancelBtn}>Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={right} className="right-panel-mobile">
              <div style={rightHead}>Selected Principals & Permissions</div>
              <div style={permissionsList}>
                <div style={permissionItem}>
                  <div style={permissionName}>Alice</div>
                  <div style={permissionBadge}>read / write</div>
                </div>
                <div style={permissionItem}>
                  <div style={permissionName}>Developers Group</div>
                  <div style={permissionBadge}>read</div>
                </div>
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
            min-width: 900px;
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
            min-width: 800px;
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
