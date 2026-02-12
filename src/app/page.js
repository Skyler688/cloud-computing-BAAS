"use client";

import "./app.css";

import { useEffect, useState } from "react";

export default function Home() {
  const [people, setPeople] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState(0);
  const [activeId, setActiveId] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [warning, setWarning] = useState(false);

  // Poll rows every 5 seconds so every client is updated with the current people list.
  useEffect(() => {
    listRows();
    const interval = setInterval(() => {
      listRows();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Not used in this app but still made the end point according to the tableDB docs.
  async function getRow(rowId) {
    const res = await fetch("/api/fetch_row", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowId: rowId }),
    });

    if (!res.ok) {
      console.error("Failed to fetch row");
    }

    if (res.status === 500) {
      console.log("Internal server error->", res.body);
    }

    const data = await res.json();

    console.log(data);
  }

  async function listRows() {
    const res = await fetch("/api/list_rows", {
      method: "GET",
    });

    if (!res.ok) {
      console.error("Failed to list rows");
    }

    if (res.status === 200) {
      const data = await res.json();

      setPeople(data.rows);
    }
  }

  async function updateRow() {
    const res = await fetch("/api/update_row", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rowId: activeId,
        data: {
          name: name,
          age: age,
          city: city,
          email: email,
        },
      }),
    });

    if (!res.ok) {
      console.error("Failed to update row");
      setWarning(true);
    }

    if (res.status === 200) {
      console.log("Row updated successfully");
      listRows();
      toggleModal();
    }
  }

  async function createRow() {
    const res = await fetch("/api/create_row", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        age: age,
        city: city,
        email: email,
      }),
    });

    if (!res.ok) {
      console.error("Failed to create row");
      setWarning(true);
    }

    if (res.status === 200) {
      console.log("New row created");
      listRows();
      toggleModal();
    }
  }

  async function deleteRow(rowId) {
    const res = await fetch("/api/delete_row", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowId: rowId }),
    });

    if (!res.ok) {
      console.error("Failed to delete row.");
    }

    if (res.status === 200) {
      listRows();
      console.log("Row deleted successfully");
    }
  }

  function setPlaceholders(person) {
    setName(person.name);
    setEmail(person.email);
    setCity(person.city);
    setAge(person.age);
  }

  function toggleModal() {
    const modal = document.getElementById("modal");

    modal.classList.toggle("hidden");
    setWarning(false);
  }
  return (
    // NOTE-> I had chat gpt do the bulk of the css and html layout then i just went in a fixed stuff after.
    <main>
      <ul className="people-list">
        {people.map((person) => (
          <li key={person.$id} className="person-item">
            <div className="person-info">
              <h3 className="person-name">{person.name}</h3>
              <p className="person-detail">{person.email}</p>
              <p className="person-detail">{person.city}</p>
              <p className="person-detail">{person.age} years old</p>
            </div>
            <div className="person-actions">
              <button
                onClick={() => {
                  setIsEdit(true);
                  setActiveId(person.$id);
                  setPlaceholders(person);
                  toggleModal();
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteRow(person.$id)}>Delete</button>
            </div>
          </li>
        ))}

        <li className="add-button-container">
          <button
            className="add-button"
            onClick={() => {
              setIsEdit(false);
              toggleModal();
            }}
          >
            Add
          </button>
        </li>
      </ul>

      {/* Modal placeholder */}
      <div id="modal" className="hidden">
        <div className="flex-container">
          <div className="modal-content">
            <h2>{isEdit ? "Edit Person" : "Add Person"}</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  placeholder="Name"
                  value={isEdit ? name : ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  placeholder="Email"
                  value={isEdit ? email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  placeholder="City"
                  value={isEdit ? city : ""}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  placeholder="Age"
                  value={isEdit ? age : ""}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              {warning ? <p id="warning">Something when wrong.</p> : <p></p>}
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    isEdit ? updateRow() : createRow();
                  }}
                >
                  Save
                </button>
                <button onClick={() => toggleModal()} type="button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
