import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function SequenceDeposit({arr, toggle, remove}:{arr: any[], toggle: any, remove: any}) {

  const [LoadMode, setLoadMode] = useState(false);

  const LoadSequence = (list: any[]) => {
    toggle();
  }

  const contents = () => {
    if (arr.length !== 0) {
      return(
        <div className="pipeline-object">
        {arr.map((item) => (
          <ButtonGroup>
            <Button variant="outline-secondary" onClick={() => LoadSequence(item.list)}>Load: {item.name}</Button>
            <Button variant="danger" style={{ maxWidth: '50px' }} onClick={() => remove(item)}>🗑</Button>
          </ButtonGroup>
        ))}
        </div>
      );
    }
    else return(<h6 style={{color: '#757575',opacity: '0.7'}}>Memory is currently empty...</h6>);
  }

  return(
    <>
      {contents()}
    </>
  );
  
}

export default SequenceDeposit;