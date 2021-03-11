import React, { Component, useEffect, useState } from 'react'
import { HttpClient } from '@butter-robotics/mas-javascript-api';

export function RobotObject( { butterClient }:  { butterClient: HttpClient } ) {

  const [animations, setAnimations] = useState<string[]>([]);

  useEffect(() => {
    loadAnimations();
  }, []);

  const loadAnimations = async () => {
    setTimeout(() => {
      // butterClient.playAnimation('KipFollowtoUser');
    }, 500)
    const res = await butterClient.getAvailableAnimations();
    if (res.status !== 200) {
      console.error('Failed to get robot animations', res);
      return;
    }
    const animations = res.data.Result.match(/\[.*\]/ig)[0].replace('[', '').replace(']', '').replace(' ', '').split(',');
    setAnimations(animations);
    // this.setState({animations : ["a" , "f"]});
    // console.log(this.state.animations)
    // this.animationsButtons = this.state.animations.map(animation => 
    //     <button onClick={(_e)=>this.playAnimationByName(animation)}>play {animation}</button>);
}

// butterClientAnimations = butterClient.getAvailableAnimations().then(res => {
//   this.state.animations = res.data.Result.match(/\[.*\]/ig)[0].replace('[', '').replace(']', '').replace(' ', '').split(',');
// })



//     const loadAnimations = async () => {
//     butterClient.getAvailableAnimations().then((res: { data: { Result: { match: (arg0: RegExp) => string[]; }; }; }) => {
//       butterClientAnimations = res.data.Result.match(/\[.*\]/ig)[0].replace('[', '').replace(']', '').replace(' ', '').split(',');
//       displayButtons = butterClientAnimations.map(animation => 
//       <button onClick={(_e)=>playAnimationByName(animation)}>play {animation}</button>);
//       console.log(butterClientAnimations);
//     });
//   }

//   loadAnimations();

  const playAnimationByName = (animation: string) => {
    butterClient.playAnimation(animation);
  }

  return (
    <div>
      <div>
        name: {butterClient.ip}
        <button>remove</button>
      </div>
      <div key={butterClient.ip} className='robot-object'>
        {animations.length === 0 ? 'loading...' : animations.map(animation => (
          <button key={animation} onClick={()=>playAnimationByName(animation)}>{animation}</button>
        ))}
      </div>
    </div>
  );
}

