import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import './App.css';

// Initial contacts data
const initialContacts = {
  "1": { name: "Dennis Beatty", info: "React Developer", image: "s1.PNG" },
  "2": { name: "Henri Helvetica", info: "Web Performance Expert", image: "s3.PNG" },
  "3": { name: "Sarah Dayan", info: "Frontend Developer", image: "s2.PNG" },
};

function ContactDetails() {
  const { id } = useParams();
  const [contacts, setContacts] = useState(initialContacts); // Store contacts in state
  const contact = contacts[id];

  const [isEditing, setIsEditing] = useState(false); // Toggle between view/edit mode
  const [editedContact, setEditedContact] = useState(contact);
  const [isAdding, setIsAdding] = useState(false); // Toggle between view and adding mode
  const [newContact, setNewContact] = useState({ name: "", info: "", image: "" }); // State for new contact

  if (!contact) {
    return <h2>Contact not found</h2>;
  }

  // Handle changes in the form fields for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle new contact input changes
  const handleNewContactChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle form submission for edited contact
  const handleSubmit = (e) => {
    e.preventDefault();
    setContacts((prevContacts) => ({
      ...prevContacts,
      [id]: editedContact, // Update the edited contact
    }));
    alert(`Updated contact: ${editedContact.name}`);
    setIsEditing(false);
  };

  // Handle form submission for new contact
  const handleAddContact = (e) => {
    e.preventDefault();
    const newId = (Object.keys(contacts).length + 1).toString(); // Generate new ID
    setContacts((prevContacts) => ({
      ...prevContacts,
      [newId]: newContact, // Add the new contact to the contacts state
    }));
    alert(`Added new contact: ${newContact.name}`);
    setIsAdding(false); // Hide the form after submission
  };

  // Handle click for editing the contact
  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" style={{ textDecoration: "none", color: "blue", marginBottom: "20px", display: "inline-block" }}>
        Back to Contacts
      </Link>

      {/* New Contact Button */}
      <button onClick={() => setIsAdding(true)} style={{ marginBottom: "20px" }}>
        Add New Contact
      </button>

      {/* New Contact Form */}
      {isAdding && (
        <form onSubmit={handleAddContact} style={{ marginTop: "20px" }}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={newContact.name}
              onChange={handleNewContactChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
          </div>
          <div>
            <label>Info: </label>
            <input
              type="text"
              name="info"
              value={newContact.info}
              onChange={handleNewContactChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
          </div>
          <div>
            <label>Image: </label>
            <input
              type="text"
              name="image"
              value={newContact.image}
              onChange={handleNewContactChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
          </div>
          <button type="submit">Save New Contact</button>
        </form>
      )}

      <div>
        <img
          src={`/images/${contact.image}`}
          alt={contact.name}
          style={{ width: "200px", height: "200px", borderRadius: "10px", marginBottom: "20px" }}
        />
        <h2>{contact.name}</h2>
        <p>{contact.info}</p>

        {/* Edit Button */}
        {!isEditing && (
          <button onClick={handleEditClick} style={{ marginBottom: "20px" }}>
            Edit
          </button>
        )}

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={editedContact.name}
                onChange={handleChange}
                style={{ marginBottom: "10px", padding: "5px" }}
              />
            </div>
            <div>
              <label>Info: </label>
              <input
                type="text"
                name="info"
                value={editedContact.info}
                onChange={handleChange}
                style={{ marginBottom: "10px", padding: "5px" }}
              />
            </div>
            <button type="submit" style={{ marginRight: "5px" }}>Save Changes</button>
          </form>
        )}

        {/* Delete Button */}
        <button onClick={() => alert("Delete Contact")}>Delete</button>
      </div>
    </div>
  );
}

export default ContactDetails;
