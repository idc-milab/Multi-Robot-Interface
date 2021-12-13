import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function SequenceDeposit({arr, load, toggle}:{arr: any[], load: any, toggle: any}) {

  const LoadSequence = (list: any[]) => {
    load(list);
    toggle();
  }

  if (arr.length !== 0) {
    return(
      <div className='robot-object'>
      {arr.map((item) => (<ButtonGroup><Button variant="outline-primary" onClick={() => LoadSequence(item.list)}>Load: {item.name}</Button></ButtonGroup>))}
      </div>
    );
  }
  else return(<h6 style={{color: '#757575',opacity: '0.7'}}>Memory is currently empty...</h6>);

}

export default SequenceDeposit;