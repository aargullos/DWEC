import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [hours, setHours] = useState('');
  const [actionList, setActionList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const handleAddHours = () => {
    if (selectedDate && hours) {
      const newAction = {
        date: selectedDate,
        hours: hours !== '' ? +hours : 0,
      };

      if (editIndex !== -1) {
        const updatedActionList = [...actionList];
        updatedActionList[editIndex] = newAction;
        setActionList(updatedActionList);
        setEditIndex(-1);
      } else {
        setActionList([...actionList, newAction]);
      }

      setSelectedDate('');
      setHours('');
    }
  };

  const handleEdit = (index) => {
    const { date, hours } = actionList[index];
    setSelectedDate(date);
    setHours(hours.toString());
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedActionList = [...actionList];
    updatedActionList.splice(index, 1);
    setActionList(updatedActionList);
  };

  return (
    <div>
      <h1>My Calendar App</h1>
      <input
        type="text"
        placeholder="Date (dd/MM/yyyy)"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <br />
      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={handleHoursChange}
      />
      <br />
      <button onClick={handleAddHours}>{editIndex !== -1 ? 'Update' : 'Add'}</button>
      <br />
      <ul>
        {actionList.map((action, index) => (
          <li key={index}>
            {action.date} - {action.hours} hours
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
