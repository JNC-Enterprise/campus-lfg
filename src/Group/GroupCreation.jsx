import './GroupCreation.css'
import React, { useState } from 'react'

function GroupCreation() {

  /* Should eventually make these drop down menus */
  return(
    <div className='group-creation-page'>
      {/* Should probably remove this group-creation-page div. For now it is there to test the smaller, 
      group-creation-container, still being in the center */}
      <div className='group-creation-container'>
        <button /*onClick={}*/ className='group-creator-text'>
        CREATE GROUP
        </button>
        <button /*onClick={}*/ className='group-game-selector'>
        SELECT GAME
        </button>
        <button /*onClick={}*/ className='group-rank-selector'>
        SELECT RANK
        </button>
        <button /*onClick={}*/ className='group-mode-selector'>
        SELECT MODE
        </button>
        <button /*onClick={}*/ className='group-players-selector'>
        # OF PLAYERS
        </button>
        <button /*onClick={}*/ className='group-title-selector'>
        &lt;ENTER GROUP TITLE&gt;
        </button>
        <button /*onClick={}*/ className='group-done-button'>
        DONE
        </button>
      </div>
    </div>
  );
};

export default GroupCreation;