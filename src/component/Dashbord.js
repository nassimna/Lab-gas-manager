import MaterialTable from "material-table";
import React, { useEffect } from "react";
import { db } from "../firebase";
export default function Capteure() {
  const { useState } = React;
  const [parametre, setParametre] = useState([]);
  const [capteur, setCapteur] = useState([]);
  const columns = [
    { title: "ID", field: "id", hidden: false },
    { title: "Nom", field: "name" },
    {
      title: "Type",
      field: "type",
    },
    {
      title: "Date",
      field: "date",
      type: "string",
      initialEditValue: new Date().toISOString(),
    },
    { title: "Hue", field: "hue", hidden: false },
    { title: "Temp", field: "temp", hidden: false },
  ];
  const [data, setData] = useState([]);
  const s = useEffect(() => {
    db.collection("capteur").onSnapshot((querySnapshot) => {
      let studentlist = [];
      querySnapshot.forEach((doc) => {
        studentlist.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setData(studentlist);
    });
    return () => s;
  }, []);

  function sendAlert(messageBody, capType) {
    db.collection("alert").doc().set({
      type: capType,
      message: messageBody,
      date: new Date().toString(),
    });
  }

  const a = useEffect(() => {
    db.collection("capteur").onSnapshot((querySnapshot) => {
      var cap = [];
      querySnapshot.forEach((doc) => {
        cap.push(doc.data());
      });

      setCapteur(cap);
    });
    // fetch parametre
    db.collection("SetParametre").onSnapshot((querySnapshot) => {
      var par = [];
      querySnapshot.forEach((doc) => {
        par.push({
          temp: doc.data().MaxTemp,
          type: doc.data().type,
          hue: doc.data().MaxHue,
        });
      });

      setParametre(par);
    });
    return () => a;
  }, []);
  parametre.forEach((par) => {
    capteur.forEach((cap) => {
      if (
        par.type === cap.type &&
        (par.hue <= cap.hue || par.temp <= cap.temp)
      ) {
        let messageBody =
          " Capteur : '" +
          cap.name +
          "' de type '" +
          cap.type +
          "' overheat \n Humidity =  " +
          cap.hue +
          "\n Temiprature = " +
          cap.temp;
        alert(messageBody);
        sendAlert(messageBody, cap.type);
      }
    });
  });
  return <MaterialTable title="Dashboard" columns={columns} data={data} />;
}
