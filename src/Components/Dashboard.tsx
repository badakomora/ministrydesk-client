/** @jsxImportSource @emotion/react */
import type React from "react";
import { useEffect, useState } from "react";
import {
  getRoleLabel,
  getStatusLabel,
  getStatusStyle,
  getSubscriptionLabel,
  getSubscriptionStyle,
  serverurl,
} from "./Appconfig";
import axios from "axios";

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
  width: "100%",
  maxWidth: "1200px",
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
} as const;
const body = {
  padding: "24px",
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
  transition: "all 0.2s ease",
  color: "#1e293b",
  appearance: "none",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
} as const;
const primaryBtn = {
  padding: "8px 16px",
  background: "linear-gradient(135deg, #2563eb, #fbbf24)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "14px",
  transition: "all 0.2s ease",
  boxShadow: "0 6px 20px rgba(16, 24, 40, 0.1)",
  display: "flex",
  alignItems: "center",
  gap: "6px",
} as const;
const searchRow = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
} as const;
const cols = { display: "flex", gap: "24px" } as const;
const left = {
  flex: 7,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minWidth: 0,
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
const muted = { fontWeight: 400, color: "#6b7280", fontSize: "13px" } as const;
const tableBox = {
  border: "1px solid #e5e7eb",
  padding: "4px",
  background: "#fff",
  position: "relative",
  overflowX: "auto",
  overflowY: "visible",
  maxHeight: "none",
  WebkitOverflowScrolling: "touch",
  direction: "ltr" as const,
} as const;
const table = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px",
} as const;
const tableHeader = {
  background: "linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)",
  borderBottom: "2px solid #2563eb",
} as const;
const tableRow = { borderBottom: "1px solid #e5e7eb" } as const;
const tableHeaderCell = {
  padding: "5px",
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
} as const;
const tableCellAction = {
  textAlign: "right",
  maxWidth: "none",
  whiteSpace: "normal",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
} as const;
const dropdownContainer = {
  position: "relative",
  display: "inline-block",
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

// (mockDataByCategory omitted for brevity — keep your mock array as before)
// I leave it in your file above; no changes required for mocks.

const columnConfigs = {
  "Church Members": {
    columns: [
      "fullname",
      "role",
      "datecreated",
      "status",
      "subscription",
      "action",
    ],
    headers: [
      "Full Name",
      "Ministry Role",
      "Member Since",
      "Account Status",
      "Subscription",
      "Action",
    ],
    // optional mobile overrides — safe to omit
  },
  "News & Events": {
    columns: [
      "title",
      "dateposted",
      "userid",
      "description",
      "documentfile",
      "audiofile",
      "showdownload",
      "showcomment",
      "showcontribution",
      "showdonation",
      "carouselimages",
      "action",
    ],
    headers: [
      "Title",
      "Date Posted",
      "Posted By",
      "Description",
      "Document",
      "Audio",
      "Download",
      "Comment",
      "Contribution",
      "Donation",
      "Images",
      "Action",
    ],
  },
  Sermons: {
    columns: [
      "title",
      "dateposted",
      "userid",
      "department",
      "description",
      "documentfile",
      "audiofile",
      "showdownload",
      "showcomment",
      "showcontribution",
      "showdonation",
      "carouselimages",
      "action",
    ],
    headers: [
      "Title",
      "Date Posted",
      "Posted By",
      "Department",
      "Description",
      "Document",
      "Audio",
      "Download",
      "Comment",
      "Contribution",
      "Donation",
      "Images",
      "Action",
    ],
  },
  "Assembly Programs": {
    columns: [
      "title",
      "dateposted",
      "userid",
      "department",
      "description",
      "documentfile",
      "audiofile",
      "showdownload",
      "showcomment",
      "showcontribution",
      "showdonation",
      "carouselimages",
      "action",
    ],
    headers: [
      "Title",
      "Date Posted",
      "Posted By",
      "Department",
      "Description",
      "Document",
      "Audio",
      "Download",
      "Comment",
      "Contribution",
      "Donation",
      "Images",
      "Action",
    ],
  },
};

interface componentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const Dashboard: React.FC<componentProps> = ({ setActiveTab }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("Church Members");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // initialize as array to avoid .map() on undefined
  const [users, setUsers] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Fetch users
  useEffect(() => {
    let mounted = true;

    // USERS FETCH
    setLoadingUsers(true);
    axios
      .post(`${serverurl}/user/list`, {
        churchid: localStorage.getItem("userChurchId"),
      })
      .then((res) => {
        if (!mounted) return;
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching user list:", err);
        if (mounted) setUsers([]);
      })
      .finally(() => {
        if (mounted) setLoadingUsers(false);
      });

    axios
      .get(`${serverurl}/item/list`)
      .then((res) => {
        if (!mounted) return;
        setItems(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        if (mounted) setItems([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number.parseInt(e.target.value));
    setCurrentPage(1); // reset to first page
  };

  const handlePreviousPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  // const handleNextPage = () => {
  //   setCurrentPage((p) => Math.min(totalPages, p + 1));
  // };

  const filterBySearch = (items: any[]) => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();

    return items.filter((item) => {
      if (selectedCategory === "Church Members") {
        // search fullname, email, phonenumber
        return (
          String(item.fullname ?? "")
            .toLowerCase()
            .includes(query) ||
          String(item.email ?? "")
            .toLowerCase()
            .includes(query) ||
          String(item.phonenumber ?? "")
            .toLowerCase()
            .includes(query)
        );
      } else if (selectedCategory === "News & Events") {
        return (
          String(item.title ?? "")
            .toLowerCase()
            .includes(query) ||
          String(item.date ?? "")
            .toLowerCase()
            .includes(query) ||
          String(item.church ?? "")
            .toLowerCase()
            .includes(query)
        );
      } else if (selectedCategory === "Sermons") {
        return (
          String(item.title ?? "")
            .toLowerCase()
            .includes(query) ||
          String(item.date ?? "")
            .toLowerCase()
            .includes(query) ||
          String(item.church ?? "")
            .toLowerCase()
            .includes(query)
        );
      } else if (selectedCategory === "Assembly Programs") {
        return (
          String(item.title ?? "")
            .toLowerCase()
            .includes(query) ||
          String(item.date ?? "")
            .toLowerCase()
            .includes(query) ||
          String(item.church ?? "")
            .toLowerCase()
            .includes(query)
        );
      }
      return true;
    });
  };
  const categoryMap: Record<string, string> = {
    "News & Events": "1",
    Sermons: "2",
    "Assembly Programs": "3",
    "Church Members": "4",
  };

  const rawCategoryData =
    selectedCategory === "Church Members"
      ? users
      : items.filter((item) => item.category === categoryMap[selectedCategory]);

  const filteredData = filterBySearch(rawCategoryData);

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const currentConfig =
    (columnConfigs as any)[selectedCategory] ?? columnConfigs["Church Members"];

  // safe mobile fallback if mobileColumns/mobileHeaders don't exist
  const displayColumns = isMobile
    ? currentConfig.mobileColumns ?? currentConfig.columns
    : currentConfig.columns;
  const displayHeaders = isMobile
    ? currentConfig.mobileHeaders ?? currentConfig.headers
    : currentConfig.headers;

  const [churches, setChurches] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchAllChurches = async () => {
      const res = await axios.get(`${serverurl}/church/list`);
      const map: Record<number, string> = {};

      res.data.forEach((c: any) => {
        map[c.id] = c.name;
      });

      setChurches(map);
    };

    fetchAllChurches();
  }, []);

  const getCellValue = (item: any, column: string) => {
    const value = item[column];

    // ✅ Colored status badge
    if (column === "status") {
      const statusNum = Number(value);
      return (
        <span style={getStatusStyle(statusNum)}>
          {getStatusLabel(statusNum)}
        </span>
      );
    }

    // ✅ Colored subscription badge
    if (column === "subscription") {
      const subNum = Number(value);
      return (
        <span style={getSubscriptionStyle(subNum)}>
          {getSubscriptionLabel(subNum)}
        </span>
      );
    }

    if (column === "role") return getRoleLabel(value);

    if (column === "churchid") return churches[value] ?? "Unknown";

    if (column === "carouselimages") {
      if (!value) return <span style={{ color: "#9ca3af" }}>No images</span>;

      try {
        const images = Array.isArray(value) ? value : JSON.parse(value);
        return (
          <div
            style={{
              display: "flex",
              gap: "2px",
              alignItems: "center",
            }}
          >
            {images.map((img: any, idx: number) => {
              const imgUrl = typeof img === "string" ? img : img.url || img;
              return (
                <a
                  key={idx}
                  href={imgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    borderRadius: "4px",
                    overflow: "hidden",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                    transition: "transform 200ms ease, box-shadow 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  title={`View carousel image ${idx + 1}`}
                >
                  <img
                    src={imgUrl || "/placeholder.svg"}
                    alt={`Carousel file ${idx + 1}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </a>
              );
            })}
          </div>
        );
      } catch {
        // Fallback for single image string
        if (typeof value === "string" && value.trim()) {
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid #d1d5db",
                cursor: "pointer",
              }}
              title="View carousel image"
            >
              <img
                src={value || "/placeholder.svg"}
                alt="Carousel file"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  display: "block",
                }}
                loading="lazy"
              />
            </a>
          );
        }
        return <span style={{ color: "#9ca3af" }}>—</span>;
      }
    }

    if (column === "documentfile") {
      if (!value)
        return (
          <span style={{ color: "#9ca3af" }} title="No document">
            —
          </span>
        );

      const fileName =
        typeof value === "string"
          ? value.split("/").pop() || "document"
          : "document";
      return (
        <a
          href={value}
          download
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            borderRadius: "3px",
            transition: "background-color 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#eff6ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          title={`Download document: ${fileName}`}
        >
          <span>📄</span>
          <span>{fileName}</span>
        </a>
      );
    }

    if (column === "audiofile") {
      if (!value)
        return (
          <span style={{ color: "#9ca3af" }} title="No audio">
            —
          </span>
        );

      const fileName =
        typeof value === "string" ? value.split("/").pop() || "audio" : "audio";
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: "0",
          }}
        >
          <audio
            controls
            controlsList="nodownload"
            style={{ height: "24px", maxWidth: "120px", flex: "1 1 auto" }}
            title={`Play audio: ${fileName}`}
          >
            <source src={value} type="audio/mpeg" />
            <track kind="captions" src="" label="English" />
            Your browser does not support the audio element.
          </audio>
          <span
            style={{ fontSize: "11px", color: "#6b7280", flex: "0 0 auto" }}
            title={`Audio file: ${fileName}`}
          >
            {fileName}
          </span>
        </div>
      );
    }

    if (
      column === "showdownload" ||
      column === "showcomment" ||
      column === "showcontribution" ||
      column === "showdonation"
    ) {
      const isEnabled = value === 1 || value === true || value === "true";
      const labels: Record<string, string> = {
        showdownload: "Download enabled",
        showcomment: "Comments enabled",
        showcontribution: "Contributions enabled",
        showdonation: "Donations enabled",
      };
      const labelText = labels[column] || column.replace("show", "");

      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            backgroundColor: isEnabled ? "#d1fae5" : "#f3f4f6",
            border: `2px solid ${isEnabled ? "#10b981" : "#d1d5db"}`,
            color: isEnabled ? "#059669" : "#9ca3af",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "default",
          }}
          role="status"
          aria-label={labelText}
          title={`${labelText}: ${isEnabled ? "Yes" : "No"}`}
        >
          {isEnabled ? "✓" : "—"}
        </span>
      );
    }

    if ((column === "datecreated" || column === "dateposted") && value) {
      try {
        return new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } catch {
        return value ?? "N/A";
      }
    }

    return value ?? "N/A";
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
                  onClick={() => setActiveTab("UserForm")}
                >
                  📝 Create New
                </button>
              </div>
            </div>
          </div>

          <div style={cols} className="cols-mobile">
            <div style={left}>
              <div style={resultsHead} className="results-head-mobile">
                <span>{selectedCategory}</span>
                <span style={muted}>
                  {totalItems === 0 ? 0 : startIndex + 1}-{endIndex} of{" "}
                  {totalItems}
                </span>
              </div>

              <div style={tableBox} className="table-box-mobile">
                <table style={table}>
                  <thead style={tableHeader}>
                    <tr style={tableRow}>
                      {Array.isArray(displayHeaders) &&
                        displayHeaders.map(
                          (header: any, idx: React.Key | null | undefined) => (
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
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td
                          colSpan={displayHeaders.length}
                          style={{ textAlign: "center", padding: 16 }}
                        >
                          {loadingUsers && selectedCategory === "Church Members"
                            ? "Loading users..."
                            : "No records found"}
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((item) => {
                        return (
                          <tr
                            style={tableRow}
                            key={item.id ?? JSON.stringify(item)}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f0f4ff")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                          >
                            {Array.isArray(displayColumns) &&
                              displayColumns.map(
                                (
                                  column: string,
                                  cidx: React.Key | null | undefined
                                ) => (
                                  <td
                                    key={String(cidx)}
                                    style={
                                      column === "action"
                                        ? tableCellAction
                                        : tableCell
                                    }
                                  >
                                    {column === "action" ? (
                                      <div style={{ cursor: "pointer" }}>
                                        {/* ensure we pass number for status if available; fallback to -1 */}
                                        •••
                                      </div>
                                    ) : (
                                      getCellValue(item, column)
                                    )}
                                  </td>
                                )
                              )}
                          </tr>
                        );
                      })
                    )}
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
                onClick={() => {
                  if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                }}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        button:hover { transform: translateY(-2px); }
        button:active { transform: translateY(0); }
        tbody tr:hover { background-color: #f9fafb; }
        input:focus, select:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }

        @media (max-width: 768px) {
          .search-row-mobile { flex-direction: column !important; gap: 8px !important; }
          .search-row-mobile input, .search-row-mobile select, .search-row-mobile button { width: 100%; }
          .cols-mobile { flex-direction: column !important; gap: 16px !important; }
          .table-box-mobile table { font-size: 12px; min-width: 600px; }
          .table-box-mobile th, .table-box-mobile td { padding: 10px 8px !important; margin: 0 !important; white-space: normal !important; word-break: break-word !important; }
          .results-head-mobile { flex-direction: column !important; gap: 8px !important; align-items: flex-start !important; }
          .footer-mobile { flex-direction: column !important; gap: 12px !important; }
          .pagination-mobile { flex-direction: column !important; gap: 12px !important; }
          .pagination-controls-mobile { flex-direction: column !important; width: 100%; }
          .pagination-controls-mobile button { width: 100%; }
          .pagination-controls-mobile span { width: 100%; text-align: center; }
        }

        @media (max-width: 480px) {
          .search-row-mobile input, .search-row-mobile select, .search-row-mobile button { font-size: 12px; padding: 10px 12px; }
          .table-box-mobile table { font-size: 11px; min-width: 500px; }
          .table-box-mobile th, .table-box-mobile td { padding: 8px 6px !important; margin: 0 !important; white-space: normal !important; word-break: break-word !important; }
          button { padding: 8px 14px; font-size: 12px; }
          .right-panel-mobile { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
};
