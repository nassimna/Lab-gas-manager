import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import './style.css';

function sendAlert(messageBody, capType) {
  db.collection('alert').doc().set({
    type: capType,
    message: messageBody,
    date: new Date().toString(),
  });
}
export default function Capteure() {
  const columns = [
    { title: 'ID', field: 'id', hidden: false },
    { title: 'Nom', field: 'name' },
    {
      title: 'Type',
      field: 'type',
    },
    {
      title: 'Date',
      field: 'date',
      type: 'string',
      initialEditValue: new Date().toISOString(),
    },
    { title: 'Hue', field: 'hue', hidden: false },
    { title: 'Temp', field: 'temp', hidden: false }
  ];
  const [data, setData] = useState([]);
  const [alertMessage, setAlert] = useState([]);
  const message = [];

  const clear = (e) => {
    e.preventDefault();
    setAlert([]);
  };
  const s = useEffect(() => {
    let messageBody = '';
    db.collection('capteur').onSnapshot((querySnapshot) => {
      const capteurs = [];
      querySnapshot.forEach((doc) => {
        capteurs.push({
          ...doc.data(),
          id: doc.id,
        });
        if (doc.data().hue >= doc.data().maxHue || doc.data().temp >= doc.data().maxTemp) {
          messageBody = ` Capteur : '${
            doc.data().name
          }' de type '${
            doc.data().type
          }' overheat \n Humidity = ${
            doc.data().hue
          }\n Temiprature = ${
            doc.data().temp
          }`;

          message.push(messageBody);
          setAlert(message);
          sendAlert(messageBody, doc.data().type);
        }
      });
      setData(capteurs);
    });
    setInterval(() => {
      db.collection('capteur').doc('xdnqdevBAZpgM9WGltEH')
        .update({ temp: Math.floor(Math.random() * 57), hue: Math.floor(Math.random() * 29) });
    }, 5000);
    return () => s;
  }, []);
  return (
    <div>
      <MaterialTable title="Dashboard" columns={columns} data={data} />
      <button type="submit" onClick={clear}>Clear</button>
      {alertMessage.map((element) => (
        <div className="error-div-dashboard">
          <p>{element}</p>
        </div>
      ))}
    </div>
  );
}
