import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, ButtonGroup, Card } from 'react-bootstrap';
import { HttpClient } from '@butter-robotics/mas-javascript-api';

const scenarios: Map<string, any> = new Map<string, any>([
    ['Baseline', {
        start: () => alert('starting baseline'),
        stop: () => alert('stopping baseline')
    }],
    ['In-Group', {
        start: () => alert('starting In-Group'),
        stop: () => alert('stopping In-Group')
    }],
    ['Out-Group', {
        start: () => alert('starting Out-Group'),
        stop: () => alert('stopping Out-Group')
    }],

    ]);

export const ScenarioButtons = ({ scenario } : { scenario: string }) => {
    const { start, stop } = scenarios.get(scenario);
    return <div>
    <Container className='scenario-component'>
      <Card >
        <Card.Header>
            {scenario}
        </Card.Header>
        <Card.Body>
            <Button onClick={start} variant="success">Start</Button>
            <Button onClick={stop} variant="danger">Stop</Button>
        </Card.Body>
      </Card>
    </Container>


    </div>
}

export function BaselineButton () {

    const kip = new HttpClient('192.168.57.30');

    const playBaselineAnimations = () => {
        kip.playAnimation('kip_start').then(kip.playAnimation('kip_H_Breath')).then(playBaselineAnimations()); //check with benny animation pipeline + recursion using while is better??
      }

    return <>
    
    <Button variant='secondary' className='animation-button' onClick={() => playBaselineAnimations()}>
        Start Baseline Scenario
    </Button>
    </>
}

export function InGroupEmpowermentButton () {
    return <>
     
     </>
}

export function OutGroupEmpowermentButton () {
    return <>
     
     </>
}