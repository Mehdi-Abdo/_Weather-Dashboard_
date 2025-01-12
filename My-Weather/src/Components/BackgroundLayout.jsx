import React, { useState } from 'react';
import Rainy from '../assets/images/Rainy.jpg';
import Sunny from '../assets/images/Sunny.jpg';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';

import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';


function BackgroundLayout() {
  // Create a state to store the background image
  const [background, setBackground] = useState(Sunny); // Default to Sunny image
  const [checked, setChecked] = useState(false); // State to manage switch (true or false)

  // Function to toggle the background based on switch state
  const handleSwitchChange = (event) => {
    setChecked(event.target.checked); // Update the state of the switch
    if (event.target.checked) {
      setBackground(Rainy); // If switch is on, set to rainy background
    } else {
      setBackground(Sunny); // If switch is off, set to sunny background
    }
  };

  return (
    <div>
      {/* Weather mode toggle */}
      <div className="mode flex items-center gap-2">
        <button>
          <LightModeOutlinedIcon className="light" />
        </button>
        <Switch checked={checked} onChange={handleSwitchChange} />
        <button>
          <NightsStayOutlinedIcon className="dark" />
        </button>
      </div>


      {/* Background image that changes based on the switch state */}
      <img src={background} alt="weather_image" className='h-full w-full fixed left-0 top-0 -z-[10]' />
    </div>
  );
}

export default BackgroundLayout;
