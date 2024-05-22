import { useState } from "react";
import "./dropdown.css";
export default function Dropdown({ dropTarget, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown">
      <div className="drop-target" onClick={() => setOpen(true)}>
        {dropTarget}
      </div>

      <div className={"dropdown-content dropdown-" + open}>
        {children}

        <p className={"shadow cursor"} onClick={() => setOpen(false)}>
          x
        </p>
      </div>
    </div>
  );
}
