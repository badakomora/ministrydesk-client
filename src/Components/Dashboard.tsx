import { useState } from "react";

// Mock data with 25 items for pagination demo
const mockData = [
  { id: 1, name: "Alice", type: "User" },
  { id: 2, name: "Beta App", type: "Application" },
  { id: 3, name: "Developers Group", type: "Group" },
  { id: 4, name: "Bob Smith", type: "User" },
  { id: 5, name: "Charlie Brown", type: "User" },
  { id: 6, name: "Delta System", type: "Application" },
  { id: 7, name: "Engineering Team", type: "Group" },
  { id: 8, name: "Diana Prince", type: "User" },
  { id: 9, name: "Echo Platform", type: "Application" },
  { id: 10, name: "Finance Group", type: "Group" },
  { id: 11, name: "Frank Miller", type: "User" },
  { id: 12, name: "Gamma Tool", type: "Application" },
  { id: 13, name: "HR Department", type: "Group" },
  { id: 14, name: "Grace Lee", type: "User" },
  { id: 15, name: "Horizon App", type: "Application" },
  { id: 16, name: "IT Support", type: "Group" },
  { id: 17, name: "Ivan Petrov", type: "User" },
  { id: 18, name: "Iris System", type: "Application" },
  { id: 19, name: "Marketing Team", type: "Group" },
  { id: 20, name: "Jack Wilson", type: "User" },
  { id: 21, name: "Jupiter App", type: "Application" },
  { id: 22, name: "Legal Team", type: "Group" },
  { id: 23, name: "Karen Davis", type: "User" },
  { id: 24, name: "Kestrel Tool", type: "Application" },
  { id: 25, name: "Operations Group", type: "Group" },
];

export default function PermissionsModal() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleAddOption = (option: string) => {
    console.log("Selected:", option);
    setIsDropdownOpen(false);
  };

  const totalItems = mockData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = mockData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div style={overlay}>
      <div style={dialog}>
        <div style={header}>
          <h5 style={title}>Dashboard</h5>
        </div>
        <div style={body}>
          <div style={searchRow}>
            <input
              style={input}
              placeholder="Search for users, apps, or groups..."
            />
            <select style={select}>
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

          <div style={cols}>
            <div style={left}>
              <div style={resultsHead}>
                Results{" "}
                <span style={muted}>
                  {startIndex + 1}‑{endIndex} of {totalItems}
                </span>
              </div>
              <div style={tableBox}>
                <table style={table}>
                  <thead style={tableHeader}>
                    <tr>
                      <th style={tableHeaderCell}>Name</th>
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
                        <td style={tableCell}>{item.name}</td>
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

            <div style={right}>
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
        <div style={footer}>
          <div style={paginationContainer}>
            <select
              style={paginationSelect}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
            <div style={paginationControls}>
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
      `}</style>
    </div>
  );
}

const overlay = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "50px",
  backdropFilter: "blur(4px)",
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

const header = {
  padding: "24px",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
} as const;

const title = {
  margin: 0,
  fontWeight: 700,
  fontSize: "20px",
  color: "#1e293b",
  letterSpacing: "-0.5px",
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
  background: "#2563eb",
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
  overflow: "hidden",
  background: "#fff",
} as const;

const table = {
  width: "100%",
  borderCollapse: "collapse",
} as const;

const tableHeader = {
  background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)",
  borderBottom: "2px solid #2563eb",
} as const;

const tableHeaderCell = {
  padding: "5px",
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
  padding: "5px",
  fontSize: "14px",
  color: "#374151",
} as const;

const tableCellAction = {
  textAlign: "right",
} as const;

const approveBtn = {
  background: "linear-gradient(135deg, #2563eb 0%, #fbbf24 100%)",
  color: "#fff",
  border: "none",
  padding: "5px 14px",
  margin: "1px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
  transition: "all 200ms ease",
} as const;

const cancelBtn = {
  background: "linear-gradient(135deg,#fbbf24 100%)",
  color: "#fff",
  border: "none",
  padding: "5px 14px",
  margin: "1px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
  transition: "all 200ms ease",
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
