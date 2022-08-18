import MaterialTable from 'material-table';
import React, { useEffect } from 'react';
import { db } from '../firebase';

export default function Capteure() {
  const { useState } = React;

  const columns = [
    { title: 'ID', field: 'id', hidden: true },
    { title: 'Nom', field: 'name' },
    {
      title: 'Type',
      field: 'type',
    },
    {
      title: 'Date',
      field: 'date',
      type: 'string',
      initialEditValue: new Date().toString(),
    },
    {
      title: 'Hue', field: 'hue', hidden: true, initialEditValue: 0,
    },
    {
      title: 'Temp', field: 'temp', hidden: true, initialEditValue: 0,
    }, {
      title: 'Max-hue',
      field: 'maxHue',
      type: 'numeric',
    },
    {
      title: 'Max-temp',
      field: 'maxTemp',
      type: 'numeric',
    }
  ];
  const [data, setData] = useState([]);

  const s = useEffect(() => {
    db.collection('capteur').onSnapshot((querySnapshot) => {
      const cap = [];
      querySnapshot.forEach((doc) => {
        cap.push({
          name: doc.data().name,
          type: doc.data().type,
          date: doc.data().date,
          maxHue: doc.data().maxHue,
          maxTemp: doc.data().maxTemp,
          id: doc.id,
        });
      });

      setData(cap);
    });
    return () => s;
  }, []);

  return (
    <MaterialTable
      title="Capteure"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) => new Promise((resolve, reject) => {
          setTimeout(() => {
            const date = new Date().toString();
            const temp = 0;
            const hue = 0;
            db.collection('capteur')
              .doc()
              .set({
                ...newData, date, temp, hue,
              })
              .then(() => {});
            resolve();
          }, 1000);
        }),

        onRowDelete: (oldData) => new Promise((resolve, reject) => {
          setTimeout(() => {
            db.collection('capteur')
              .doc(oldData.id)
              .delete()
              .then(() => {
                console.log('Document successfully deleted!');
              })
              .catch((error) => {
                console.error('Error removing document: ', error);
              });

            resolve();
          }, 1000);
        }),
      }}
    />
  );
}
