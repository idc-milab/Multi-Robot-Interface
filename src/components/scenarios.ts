import { HttpClient } from "@butter-robotics/mas-javascript-api";

export const playAnimationsOfScenarioOne = () => {
    const kip = new HttpClient('192.168.57.30');
    kip.playAnimation('kip_start').then(kip.playAnimation('kip_H_Breath')).then(playAnimationsOfScenarioOne()); //check with benny animation pipeline + recursion using while is better??
}

