import React, { useState, useEffect } from 'react';
import { calculateEndDate, calculateTotalHoursByDay } from './Utils';

const Calendar = () => {
  const [name, setName] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [hoursByDay, setHoursByDay] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
  });
  const [actionList, setActionList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleTotalHoursChange = (e) => {
    setTotalHours(e.target.value);
  };
  const handleHoursByDayChange = (e, day) => {
    setHoursByDay({
      ...hoursByDay,
      [day]: e.target.value,
    });
  };
  const handleAddAction = () => {
    if (name && totalHours) {
      const hoursByDay = calculateTotalHoursByDay(parseInt(totalHours));
      const startDate = new Date();
      const endDate = calculateEndDate(startDate, parseInt(totalHours));

      const newAction = {
        name,
        totalHours: parseInt(totalHours),
        startDate,
        endDate,
        hoursByDay,
      };
      if (editIndex !== -1) {
        const updatedActionList = [...actionList];
        updatedActionList[editIndex] = newAction;
        setActionList(updatedActionList);
        setEditIndex(-1);
      } else {
        setActionList([...actionList, newAction]);
      }

      setName('');
      setTotalHours('');
      setHoursByDay({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
      });
    }
  };

  const handleEdit = (index) => {
    const action = actionList[index];
    setName(action.name);
    setTotalHours(action.totalHours);
    setHoursByDay(action.hoursByDay);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedActionList = [...actionList];
    updatedActionList.splice(index, 1);
    setActionList(updatedActionList);
  };
  const [searchEndDate, setSearchEndDate] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredActionList, setFilteredActionList] = useState([]);
  const handleSearchEndDateChange = (e) => {
    setSearchEndDate(e.target.value);
  };
  const handleSearchStartDateChange = (e) => {
    setSearchStartDate(e.target.value);
  };
  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };
  useEffect(() => {
    const filteredActions = actionList.filter((action) => {
      const endDateMatch = action.endDate.toDateString().toLowerCase().includes(searchEndDate.toLowerCase());
      const startDateMatch = action.startDate.toDateString().toLowerCase().includes(searchStartDate.toLowerCase());
      const nameMatch = action.name.toLowerCase().includes(searchName.toLowerCase());
      return endDateMatch && startDateMatch && nameMatch;
    });
    setFilteredActionList(filteredActions);
  }, [actionList, searchEndDate, searchStartDate, searchName]);
  const applyFilter = () => {
    const filteredActions = actionList.filter((action) => {
      const endDateMatch = action.endDate.toDateString().toLowerCase().includes(searchEndDate.toLowerCase());
      const startDateMatch = action.startDate.toDateString().toLowerCase().includes(searchStartDate.toLowerCase());
      const nameMatch = action.name.toLowerCase().includes(searchName.toLowerCase());
  
      return endDateMatch && startDateMatch && nameMatch;
    });
    setFilteredActionList(filteredActions);
  };
  return (
    <div>
      <h1>My Calendar App</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <br />
       <input
       type="number"
       placeholder="Total Hours"
       value={totalHours}
       onChange={handleTotalHoursChange}
     />
     <br />
     <label>Hours by Day:</label>
     <br />
     <input
       type="number"
       placeholder="Monday"
       value={hoursByDay.Monday}
       onChange={(e) => handleHoursByDayChange(e, 'Monday')}
     />
     <br />
     <input
       type="number"
       placeholder="Tuesday"
       value={hoursByDay.Tuesday}
       onChange={(e) => handleHoursByDayChange(e, 'Tuesday')}
     />
     <br />
     <input
       type="number"
       placeholder="Wednesday"
       value={hoursByDay.Wednesday}
       onChange={(e) => handleHoursByDayChange(e, 'Wednesday')}
     />
     <br />
     <input
       type="number"
       placeholder="Thursday"
       value={hoursByDay.Thursday}
       onChange={(e) => handleHoursByDayChange(e, 'Thursday')}
     />
     <br />
     <input
       type="number"
       placeholder="Friday"
       value={hoursByDay.Friday}
       onChange={(e) => handleHoursByDayChange(e, 'Friday')}
     />
     <br />
     <button onClick={handleAddAction}>{editIndex !== -1 ? 'Update' : 'Add'}</button>
     <br />
     <div>
       <label>Filter:</label>
       <input
         type="text"
         placeholder="End Date"
         value={searchEndDate}
         onChange={handleSearchEndDateChange}
       />
       <input
         type="text"
         placeholder="Start Date"
         value={searchStartDate}
         onChange={handleSearchStartDateChange}
       />
       <input
         type="text"
         placeholder="Name"
         value={searchName}
         onChange={handleSearchNameChange}
       />
     </div>
     <br />
     <ul>
       {filteredActionList.map((action, index) => (
         <li key={index}>
           Name: {action.name}
           <br />
           Total Hours: {action.totalHours}
           <br />
           Start Date: {action.startDate.toDateString()}
           <br />
           End Date: {action.endDate.toDateString()}
           <br />
           Hours by Day:
           <ul>
             {Object.entries(action.hoursByDay).map(([day, hours]) => (
               <li key={day}>
                 {day}: {hours}
               </li>
             ))}
           </ul>
           <button onClick={() => handleEdit(index)}>Edit</button>
           <button onClick={() => handleDelete(index)}>Delete</button>
         </li>
       ))}
     </ul>
   </div>
 );
};
export default Calendar;
