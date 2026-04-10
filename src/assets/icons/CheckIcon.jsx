import React from "react";

const CheckIcon = ({ size = 24, color = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#fff"
        stroke={color}
        strokeWidth="2"
      />
      <polyline
        points="7.4,11.6 10,14.2 16.6,7.6"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};

export default CheckIcon;