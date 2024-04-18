import React from "react";
import "../styles/custom_button.css";

export default function CustomButton({ onClick, title }) {
  return (
    <button className="btn custom-button" onClick={onClick}>
      {title || "Generate Graph"} 
    </button>
  );
}
