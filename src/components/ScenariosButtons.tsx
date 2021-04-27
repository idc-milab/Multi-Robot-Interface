import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, ButtonGroup, Card } from 'react-bootstrap';
import { HttpClient } from '@butter-robotics/mas-javascript-api';
import { start } from 'repl';

const kip1 = new HttpClient('192.168.57.30');
const kip2 = new HttpClient('192.168.56.188');

kip1.timeout = 240;
kip2.timeout = 240;

let interval1: NodeJS.Timeout;
let interval2: NodeJS.Timeout;

const scenarios: Map<string, any> = new Map<string, any>([
    ['Baseline', {
        kip1up: () => kip1.playAnimation('kip_start_45'),
        kip1breath: () => {
            kip1.playAnimation('kip_H1_Breath', true)
            interval1 = setInterval(() => kip1.playAnimation('kip_H1_Breath', true), 4000)
        },        
        kip1down: () => {
            if (interval1) clearInterval(interval1);
            kip1.clearAnimation();
            kip1.stopAnimation();
            setTimeout(() => {
                kip1.playAnimation('kip_H1_back_90', false)
            }, 500);
        },
        
        kip2up: () => kip2.playAnimation('kip_start_45'),
        kip2breath: () => {
            kip1.playAnimation('kip_H1_Breath', true)
            interval2 = setInterval(() => kip2.playAnimation('kip_H1_Breath', true), 4000)
        },
        kip2down: () => {
            if (interval2) clearInterval(interval2);
            kip2.clearAnimation();
            kip2.stopAnimation();
            setTimeout(() => {
                kip2.playAnimation('kip_H1_back_90', false)
            }, 500);
        },
    }],

    ['In-Group', {
        kip1up: () => kip1.playAnimation('kip_start_45'),
        kip1breath: () => {
            kip1.playAnimation('kip_H1_Breath', true)
        },        
        kip1down: () => {
            if (interval2) clearInterval(interval2);
            kip1.clearAnimation();
            kip1.stopAnimation();
            setTimeout(() => kip1.playAnimation('kip_stop', true), 200);
        },
        
        kip2up: () => kip2.playAnimation('kip_start'),
        kip2breath: () => {
            kip2.playAnimation('kip_H_Breath'); 
            interval2 = setInterval(() => kip2.playAnimation('kip_H_Breath', true), 4000)
        },
        kip2down: () => {
            if (interval2) clearInterval(interval2);
            kip2.clearAnimation();
            kip2.stopAnimation().then(() => kip2.playAnimation('kip_stop', true));
        },    
    }],
]);

export const ScenarioButtons = ({ scenario } : { scenario: string }) => {

    const { kip1up, kip1breath, kip1down, kip2up, kip2breath, kip2down } = scenarios.get(scenario);
    return <div>
    <Container className='scenario-component'>
      <Card>
        <Card.Header>
            {scenario}
        </Card.Header>
        <Card.Body>
            <Button onClick={kip1up} variant="success">Start Kip 1</Button>
            <Button onClick={kip1breath} variant="warning">Breath Kip 1</Button>
            <Button onClick={kip1down} variant="danger">Stop Kip 1</Button>
            <p></p>
            <Button onClick={kip2up} variant="success">Start Kip 2</Button>
            <Button onClick={kip2breath} variant="warning">Breath Kip 2</Button>
            <Button onClick={kip2down} variant="danger">Stop Kip 2</Button>
        </Card.Body>
      </Card>
    </Container>


    </div>
}


