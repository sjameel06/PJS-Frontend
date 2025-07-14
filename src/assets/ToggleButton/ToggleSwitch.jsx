import React from 'react';
import './ToggleSwitch.css'; // Make sure to import your CSS

const ToggleSwitch = ({ checked, onChange, label }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="slider round"></span>
      {label && <span style={{ marginLeft: '10px' }}>{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
