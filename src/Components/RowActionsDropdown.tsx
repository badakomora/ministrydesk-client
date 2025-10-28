import { useEffect, useRef, useState } from "react";

const bus = new EventTarget(); // shared event to close others

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
  border: "1px solid #ddd",
  borderRadius: "6px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  padding: "6px 0",
  zIndex: 1000,
  minWidth: "160px",
};

const dropdownItem: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "9px 14px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "14px",
};

const dropdownItemHover: React.CSSProperties = {
  background: "#f5f5f5",
};

function normalize(str: string) {
  return str.trim().toLowerCase();
}

function getVisibleActions(status: string, category: string) {
  const s = normalize(status);
  const c = normalize(category);

  return {
    view: true,
    schedule: c === "church members",
    approve: s === "pending",
    edit: true,
  };
}

interface RowActionsDropdownProps {
  status: string;
  category: string;
}

export const RowActionsDropdown = ({ status, category }: RowActionsDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null); // <<< ADDED

  // close when other dropdown opens
  useEffect(() => {
    const close = () => setOpen(false);
    bus.addEventListener("closeAll", close);
    return () => bus.removeEventListener("closeAll", close);
  }, []);

  // close when clicking outside
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
          e.stopPropagation(); // <<< prevent immediate close
          bus.dispatchEvent(new Event("closeAll"));
          setOpen((p) => !p);
        }}
      >
        •••
      </button>

      {open && (
        <div style={dropdownMenu}>
          {items.map((item, idx) => (
            <button
              key={item}
              style={{
                ...dropdownItem,
                ...(hovered === idx ? dropdownItemHover : {}),
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
