import MaterialTable from "material-table";
import React, { useEffect } from "react";
import { db } from "../firebase";

export default function Parametre() {
  const { useState } = React;

  //const [columns, setColumns] = useState([
  const columns = [
    { title: "ID", field: "id", hidden: true },

    { title: "Type", field: "type" },
    {
      title: "Max-hue",
      field: "MaxHue",
      type: "numeric",
    },
    {
      title: "Max-temp",
      field: "MaxTemp",
      type: "numeric",
    },
  ];
  const [data, setData] = useState([]);
  const s = useEffect(() => {
    db.collection("SetParametre").onSnapshot((querySnapshot) => {
      var par = [];
      querySnapshot.forEach((doc) => {
        par.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setData(par);
    });
    return () => s;
  }, []);

  return (
    <MaterialTable
      title="Parametre"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              var n = new Date().toString();
              newData.date = n;
              console.log(newData);
              db.collection("SetParametre")
                .doc()
                .set(newData)
                .then(() => {});
              resolve();
            }, 1000);
          }),

        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              db.collection("SetParametre")
                .doc(oldData.id)
                .delete()
                .then(() => {
                  console.log("Document successfully deleted!");
                })
                .catch((error) => {
                  console.error("Error removing document: ", error);
                });

              resolve();
            }, 1000);
          }),
      }}
    />
  );
}
