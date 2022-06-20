import MaterialTable from "material-table";
import React, { useEffect } from "react";
import { db } from "../firebase";
export default function Alert() {
  const { useState } = React;

  const [message, setMessage] = useState([]);

  //const [columns, setColumns] = useState([
  const columns = [
    { title: "ID", field: "id", hidden: true },

    { title: "Type", field: "type" },
    {
      title: "Message",
      field: "message",
    },

    {
      title: "Date",
      field: "date",
      type: "string",
      initialEditValue: new Date().toString(),
    },
  ];

  const s = useEffect(() => {
    db.collection("alert").onSnapshot((querySnapshot) => {
      let messageBody = [];
      querySnapshot.forEach((doc) => {
        messageBody.push(doc.data());
      });

      setMessage(messageBody);
    });
    return () => s;
  }, []);

  const deletAll = (e) => {
    e.preventDefault();

    db.collection("alert")
      .get()

      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  };

  return (
    <div>
      <MaterialTable title="Alert" columns={columns} data={message} />
      <button onClick={deletAll}>DELETE ALL</button>
    </div>
  );
}
