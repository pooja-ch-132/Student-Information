import React, { useState } from "react";

function GenderSelection() {
  // Initialize state for gender
  const [gender, setGender] = useState("");

  // Function to handle gender change
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <h2>Choose Your Gender:</h2>
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={handleGenderChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={handleGenderChange}
        />
        Female
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="other"
          checked={gender === "other"}
          onChange={handleGenderChange}
        />
        Other
      </label>
      <div>
        <p>Your selected gender: {gender}</p>
      </div>
    </div>
  );
}

export default GenderSelection;
