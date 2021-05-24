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
    ['In-Group', {
        start: () => {
            kip1.playAnimation('kip_45_Full')
            kip2.playAnimation('kip_45_Full')
        },

        breathFull: () => {
            kip1.playAnimation('kip_Full_Breath', true)
            kip2.playAnimation('kip_Full_Breath', true)
        },  

        fullToHalf: () => {
            kip1.stopAnimation();
            kip2.stopAnimation();

            kip1.clearAnimation();
            kip2.clearAnimation();

            setTimeout(() => {
                kip1.playAnimation('kip_FullToHalf', true)
            }, 500);
            setTimeout(() => {
                kip2.playAnimation('kip_FullToHalf', true)
            }, 500);
        },

        breathHalf: () => {
            kip1.playAnimation('kip_Half_Breath')
            kip2.playAnimation('kip_Half_Breath')
        },

        halfToFull: () => {
            kip1.stopAnimation();
            kip2.stopAnimation();

            kip1.clearAnimation();
            kip2.clearAnimation();

            setTimeout(() => {
                kip1.playAnimation('kip_HalfToFull', true)
            }, 500);
            setTimeout(() => {
                kip2.playAnimation('kip_HalfToFull', true)
            }, 500);
        },

        stopFull: () => {
            kip1.stopAnimation();
            kip2.stopAnimation();

            kip1.clearAnimation();
            kip2.clearAnimation();

            setTimeout(() => {
                kip1.playAnimation('kip_45_FullStop', true)
            }, 500);
            setTimeout(() => {
                kip2.playAnimation('kip_45_FullStop', true)
            }, 500);
        },

        stopHalf: () => {
            kip1.stopAnimation();
            kip2.stopAnimation();

            kip1.clearAnimation();
            kip2.clearAnimation();

            setTimeout(() => {
                kip1.playAnimation('kip_45_HalfStop', true)
            }, 500);
            setTimeout(() => {
                kip2.playAnimation('kip_45_HalfStop', true)
            }, 500);
        },
        
    }],

    ['Out-Group', {
        start: () => {
            kip1.playAnimation('kip_45_Full')
            kip2.playAnimation('kip_72_Full')
        },

        breathFull: () => {
            kip1.playAnimation('kip_Full_Breath', true)
            kip2.playAnimation('kip_Full_Breath', true)
        },  

        fullToHalf: () => {
            kip1.stopAnimation();
            kip2.stopAnimation();

            kip1.clearAnimation();
            kip2.clearAnimation();

            setTimeout(() => {
                kip1.playAnimation('kip_FullToHalf', true)
            }, 500);
            setTimeout(() => {
                kip2.playAnimation('kip_FullToHalf', true)
            }, 500);
        },

        breathHalf: () => {
            kip1.playAnimation('kip_Half_Breath')
            kip2.playAnimation('kip_Half_Breath')
        },

        halfToFull: () => {
            kip1.stopAnimation();
            kip2.stopAnimation();

            kip1.clearAnimation();
            kip2.clearAnimation();

            setTimeout(() => {
                kip1.playAnimation('kip_HalfToFull', true)
            }, 500);
            setTimeout(() => {
                kip2.playAnimation('kip_HalfToFull', true)
            }, 500);
        },

        stopFull: () => {
            kip1.stopAnimation();
            kip2.stopAnimation();

            kip1.clearAnimation();
            kip2.clearAnimation();

            setTimeout(() => {
                kip1.playAnimation('kip_45_FullStop', true)
            }, 500);
            setTimeout(() => {
                kip2.playAnimation('kip_70_FullStop', true)
            }, 500);
        },

        stopHalf: () => {
            kip1.stopAnimation();
            kip2.stopAnimation();

            kip1.clearAnimation();
            kip2.clearAnimation();

            setTimeout(() => {
                kip1.playAnimation('kip_45_HalfStop', true)
            }, 500);
            setTimeout(() => {
                kip2.playAnimation('kip_70_HalfStop', true)
            }, 500);
        },
    }],
]);

export const ScenarioButtons = ({ scenario } : { scenario: string }) => {

    const { start, breathFull, fullToHalf, breathHalf, halfToFull, stopFull, stopHalf } = scenarios.get(scenario);
    return <div>
    <Container className='scenario-component'>
      <Card>
        <Card.Header>
            {scenario}
        </Card.Header>
        <Card.Body>
            <Button onClick={start} variant="success">Start</Button>
            <Button onClick={breathFull} variant="warning">Breath Full</Button>
            <Button onClick={fullToHalf} variant="warning">Full To Half</Button>
            <Button onClick={breathHalf} variant="warning">Breath Half</Button>
            <Button onClick={halfToFull} variant="warning">Half To Full</Button>
            <Button onClick={stopFull} variant="danger">Stop Full</Button>
            <Button onClick={stopHalf} variant="danger">Stop Half</Button>
        </Card.Body>
      </Card>
    </Container>


    </div>
}


