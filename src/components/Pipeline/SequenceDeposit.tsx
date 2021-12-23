import React from 'react';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';

function SequenceDeposit({arr, load, toggle, remove, loadFile}:{arr: any[], load: any, toggle: any, remove: any, loadFile: any}) {

  const LoadSequence = (list: any[]) => {
    load(list);
    toggle();
  }

  const contents = () => {
    if (arr.length !== 0) {
      return(
        <div className="pipeline-object">
        {arr.map((item) => (
          <ButtonGroup>
            <Button variant="outline-primary" onClick={() => LoadSequence(item.list)}>Load: {item.name}</Button>
            <Button variant="danger" style={{ maxWidth: '50px' }} onClick={() => remove(item)}>🗑</Button>
          </ButtonGroup>
        ))}
        </div>
      );
    }
    else return(<h6 style={{color: '#757575',opacity: '0.7'}}>Memory is currently empty...</h6>);
  }

  const openFile = (evt: any) => {
    const fileObj = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = LOADIT;
    reader.readAsText(fileObj);
}

function LOADIT (event: any) {
	let str = event.target.result;
  let arr = JSON.parse(str)
	console.log('arr:', arr);
  loadFile(arr);
}






  return(
    <>
      <input type="file" className="hidden"
      multiple={false}
      accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
      onChange={(event: any) => openFile(event)}
      />
      {contents()}
    </>
  );
  
}

export default SequenceDeposit;