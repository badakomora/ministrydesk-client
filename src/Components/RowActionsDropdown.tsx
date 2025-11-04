import { useEffect, useRef, useState } from "react";

const bus = new EventTarget(); // shared event to close all dropdowns

const dropdownContainer: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
};

const iconButton: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "20px",
};

const dropdownMenu: React.CSSProperties = {
  position: "absolute",
  top: "0",
  left: "100%",
  marginLeft: "8px",
  background: "#fff",
  padding: "8px 14px",
  border: "none",
  zIndex: 1000,
  minWidth: "160px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
};

const dropdownItem: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "8px 14px",
  background: "transparent",
  borderBottom: "2px solid #f3f4f6",
  cursor: "pointer",
  fontSize: "14px",
  color: "#374151",
  transition: "all 150ms ease",
};

// ✅ Safe normalize function
function normalize(str: any) {
  if (str === null || str === undefined) return "";
  return String(str).trim().toLowerCase();
}

// ✅ Uses number for status, string for category
function getVisibleActions(status: number, category: string) {
  const c = normalize(category);

  return {
    view: true,
    schedule: c === "church members",
    approve: status === 0, // 0 = pending (show Approve)
    edit: true,
  };
}

// ✅ Updated TS types
interface RowActionsDropdownProps {
  status: number;   // was string before ❌
  category: string;
}

export const RowActionsDropdown = ({ status, category }: RowActionsDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when another dropdown opens
  useEffect(() => {
    const close = () => setOpen(false);
    bus.addEventListener("closeAll", close);
    return () => bus.removeEventListener("closeAll", close);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  const actions = getVisibleActions(status, category);
  const items: string[] = [];

  if (actions.view) items.push("View");
  if (actions.schedule) items.push("Schedule Meeting");
  if (actions.approve) items.push("Approve");
  if (actions.edit) items.push("Edit");

  const handleClick = (action: string) => {
    console.log(action, "clicked");
    setOpen(false);
  };

  return (
    <div style={dropdownContainer} ref={ref}>
      <button
        style={iconButton}
        onClick={(e) => {
          e.stopPropagation();
          bus.dispatchEvent(new Event("closeAll"));
          setOpen((prev) => !prev);
        }}
      >
        •••
      </button>

      {open && (
        <div style={dropdownMenu}>
          {items.map((item) => (
            <span
              key={item}
              style={dropdownItem}
              onClick={() => handleClick(item)}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
