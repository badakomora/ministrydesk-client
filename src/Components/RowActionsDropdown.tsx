import { useState } from "react";

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
  top: "28px",
  right: 0,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "6px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  padding: "6px 0",
  zIndex: 100,
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

function getVisibleActions(status: string, category: string) {
  return {
    view: true,
    schedule:
      category === "Church Members", // only for Church Members
    approve: status === "Pending", // only when Pending
    requestModification: status !== "Approved", // not allowed after approval
  };
}

interface RowActionsDropdownProps {
  status: string;
  category: string; // NEW prop added
}

export const RowActionsDropdown = ({
  status,
  category,
}: RowActionsDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const actions = getVisibleActions(status, category);

  const handleClick = (action: string) => {
    console.log(action, "clicked");
    setOpen(false);
  };

  const renderItem = (label: string, index: number) => (
    <button
      key={label}
      style={{
        ...dropdownItem,
        ...(hovered === index ? dropdownItemHover : {}),
      }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => handleClick(label)}
    >
      {label}
    </button>
  );

  const items: string[] = [];
  if (actions.view) items.push("View");
  if (actions.schedule) items.push("Schedule Meeting");
  if (actions.approve) items.push("Approve");
  if (actions.requestModification) items.push("Request Modification");

  return (
    <div style={dropdownContainer}>
      <button style={iconButton} onClick={() => setOpen(!open)}>
        •••
      </button>

      {open && (
        <div style={dropdownMenu}>
          {items.map((item, idx) => renderItem(item, idx))}
        </div>
      )}
    </div>
  );
};
