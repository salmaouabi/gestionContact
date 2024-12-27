import React, { useState } from "react";
import { Link } from "react-router-dom";

const contactsData = [
  {
    id: "1",
    name: "Dennis Beatty",
    image: "s1.PNG",
    info: "React Developer",
  },
  {
    id: "2",
    name: "Henri Helvetica",
    image:"s2.PNG",
    info: "Web Performance Expert",
  },
  {
    id: "3",
    name: "Sarah Dayan",
    image: "s3.PNG",
    info: "Frontend Developer",
  },
];

function Contacts() {
  const [contacts, setContacts] = useState(contactsData);
  const [search, setSearch] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    image: "",
    info: "",
  });

  const [isContactAdded, setIsContactAdded] = useState(false);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle edit click (show an alert for now)
  const handleEditClick = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      alert(`Edit ${contactToEdit.name}`);
    }
  };

  // Handle delete click (remove the contact from the list)
  const handleDeleteClick = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  // Handle add contact form submit
  const handleAddContactSubmit = (e) => {
    e.preventDefault();
    const newContactId = (contacts.length + 1).toString();
    setContacts([
      ...contacts,
      { id: newContactId, name: newContact.name, image: newContact.image, info: newContact.info },
    ]);
    setNewContact({ name: "", image: "", info: "" }); // Clear the form after adding
    setIsContactAdded(true); // Show the "Back to Contacts" button
  };

  // Handle Back to Contacts click
  const handleBackToContacts = () => {
    setIsAddFormVisible(false); // Hide the form
    setIsContactAdded(false); // Hide the "Back to Contacts" button
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Add Contact Button */}
      {!isContactAdded && (
        <button
          onClick={() => setIsAddFormVisible(!isAddFormVisible)}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
          }}
        >
          {isAddFormVisible ? "Cancel" : "Add Contact"}
        </button>
      )}

      {/* Add Contact Form */}
      {isAddFormVisible && !isContactAdded && (
        <form onSubmit={handleAddContactSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newContact.image}
            onChange={(e) => setNewContact({ ...newContact, image: e.target.value })}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Info"
            value={newContact.info}
            onChange={(e) => setNewContact({ ...newContact, info: e.target.value })}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white" }}>
            Add Contact
          </button>
        </form>
      )}

      {/* Back to Contacts Button after adding contact */}
      {isContactAdded && (
        <button
          onClick={handleBackToContacts}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Back to Contacts
        </button>
      )}

      {/* Contacts List */}
      {!isAddFormVisible && !isContactAdded && filteredContacts.length > 0 && (
        <ul>
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                listStyle: "none",
              }}
            >
              {/* Contact Image */}
              <img
                src={contact.image}
                alt={contact.name}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              {/* Contact Name */}
              <Link to={`/contacts/${contact.id}`} style={{ flex: 1, textDecoration: "none", color: "black" }}>
                {contact.name}
              </Link>
              {/* Buttons */}
              <button
                onClick={() => handleEditClick(contact.id)}
                style={{ marginRight: "5px" }}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteClick(contact.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* If no contacts found */}
      {filteredContacts.length === 0 && !isAddFormVisible && !isContactAdded && <p>Contact not found</p>}
    </div>
  );
}

export default Contacts;
