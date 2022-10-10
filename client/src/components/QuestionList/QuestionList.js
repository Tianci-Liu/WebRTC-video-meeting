import React, { useState } from 'react';

const QuestionList = (props) => {
  const { items, onDelete, onSelect } = props;
  const [show, setShow] = useState(false);

  return <div className='q-body'>
    <div className='q-title row align-center font-bold'>
      <span className='mr-10 col-1 text-center'>Question list</span>
      <i className={`fas fa-chevron-circle-${show ? 'up' : 'down'} mr-10`} onClick={() => setShow(!show)}></i>
    </div>
    <div className={`q-message-black text-left ${!show ? 'q-message-black-hide' : ''}`}>
      {
        items && items.map((p, index) => {
          return <div className='q-item py-5 fs-md row align-center' key={index} style={{ whiteSpace: 'normal' }}>
            <div className={`col-1 message2 ${p.select ? 'select-green' : ''}`}>
              <div className='q-message-sender'>{p.sender}</div>
              <div className='q-message-content'>{p.question}</div>
            </div>

            <div className="col-0 row ml-10 mr-5" style={{ fontSize: '24px' }}>
              <div className='col-0 mr-5 text-nowrap'>
                <i className={`far fa-${p.select ? 'check-' : ''}circle`} onClick={() => onSelect(p)}></i>
              </div>
              <div className='col-0'><i className="far fa-times-circle" onClick={() => onDelete(p)}></i></div>
            </div>
          </div>
        })
      }
    </div>
  </div>
}

export default QuestionList
