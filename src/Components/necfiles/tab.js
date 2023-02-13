import React, { useState } from "react";
import axios from "axios";

const Cell = ({ value, id, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    onUpdate(id, newValue);
  };

  const handleChange = (event) => {
    setNewValue(event.target.value);
  };

  return editMode ? (
    <input
      type="text"
      value={newValue}
      onChange={handleChange}
      onBlur={handleSave}
    />
  ) : (
    <div onClick={handleEdit}>{value}</div>
  );
};

const Table = ({ data, onUpdate }) => {
  return (
    <table>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <Cell
                value={row.role}
                id={row.id}
                onUpdate={onUpdate}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [data, setData] = useState([
    { id: 1, role: "Admin" },
    { id: 2, role: "User" },
    { id: 3, role: "Guest" },
  ]);

  const handleUpdate = (id, newValue) => {
    axios
      .patch(`/api/roles/${id}`, { role: newValue })
      .then((res) => {
        setData(
          data.map((row) =>
            row.id === id ? { ...row, role: newValue } : row
          )
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Table data={data} onUpdate={handleUpdate} />
    </div>
  );
};

export default App;

 // const tempdata = usersData.length > 0 ? usersData.map((item) => {
    //     return {
    //         id: item.id,
    //         sn: item.sn,
    //         date: item.date,
    //         task: item.task,
    //         time: item.time,
    //         timeTaken: item.timeTaken,
    //         remarks: item.remarks,
    //         status: item.status,
    //         action: item.id,
    //         createdBy: item.createdBy,
    //         createdAt: item.createdAt,
    //     }
    // }) : []

    // // //mapping tempdata
    // const extractedData = tempdata.length > 0 ? tempdata.map(({ id, sn, date, task, timeTaken, remarks, action, createdAt, time, status, createdBy }) => {

    //     const arr = new Date(createdAt).toLocaleString()
    //     console.log("Arr:" , arr)

    //     console.log(time)
    //     let startintTime = new Date(createdAt);
    //     startintTime.setMinutes(startintTime.getMinutes() + time);
    //     const Finaltime = startintTime.toLocaleString()
    //     console.log("Final :",Finaltime , typeof(Finaltime));

    //     return {
    //         id,
    //         sn,
    //         date,
    //         task,
    //         timeTaken,
    //         remarks,
    //         action,
    //         createdAt,
    //         time,
    //         status,
    //         Finaltime,
    //         createdBy,
    //     };

    // }) : [];

    // console.log(typeof (extractedData))
