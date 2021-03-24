import React, { Component, useEffect, useState } from 'react'
import { HttpClient } from '@butter-robotics/mas-javascript-api';

export function RobotObject( { butterClient, onRemove }:  { butterClient: HttpClient, onRemove: (ip: string) => void } ) {

  const [animations, setAnimations] = useState<string[]>([]);

  useEffect(() => {
    loadAnimations();
  }, []);

  const loadAnimations = async () => {
    setTimeout(() => {
    }, 5000)
    const res = await butterClient.getAvailableAnimations();
    if (res.status !== 200) {
      console.error('Failed to get robot animations', res);
      return;
    }
    const animations = res.data.Result.match(/\[.*\]/ig)[0].replace('[', '').replace(']', '').replace(' ', '').split(',');
    setAnimations(animations);
}

  const playAnimationByName = (animation: string) => {
    butterClient.playAnimation(animation);
  }

  return (
    <div>
      <div key={butterClient.ip} className='robot-object'>
      <div>
        <button onClick={() => onRemove(butterClient.ip)}>remove</button>
      </div>
        {animations.length === 0 ? 'loading...' : animations.map(animation => (
          <button key={animation} onClick={()=>playAnimationByName(animation)}>{animation}</button>
        ))}
      </div>
    </div>
  );
}

