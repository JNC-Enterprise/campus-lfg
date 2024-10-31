import './GroupCreation.css'
import React, { useState } from 'react'

function GroupCreation() {

  /* Should eventually make these drop down menus */
  return(
    <div className='group-creation-container'>
      <h1>Group Creation</h1>
      <button /*onClick={}*/ className='group-game-selector'>
      Select Game
      </button>
      <button /*onClick={}*/ className='group-rank-selector'>
      Select Rank
      </button>
      <button /*onClick={}*/ className='group-mode-selector'>
      Select Mode
      </button>
      <button /*onClick={}*/ className='group-players-selector'>
      Number of Players
      </button>
      <button /*onClick={}*/ className='group-title-selector'>
      Enter Group Title
      </button>
      <button /*onClick={}*/ className='group-done-button'>
      DONE
      </button>

    </div>
  );
};

export default GroupCreation;