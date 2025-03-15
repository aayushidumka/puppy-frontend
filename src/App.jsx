import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Section from "./components/Section";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, TextField, Box, Container, Stack, TableHead } from "@mui/material";

function App() {
  const [puppies, setPuppies] = useState([]);
  const [newPuppy, setNewPuppy] = useState({
    name: "",
    breed: "",
    age_est: "",
    current_kennel_number: "",
  });

  const [editPuppy, setEditPuppy] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((response) => setPuppies(response.data))
      .catch((error) => console.error("Error fetching puppies:", error));
  }, []);

  // ADD puppy (post)
  const handleAddPuppy = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/", newPuppy)
      .then((response) => {
        setPuppies([...puppies, response.data]);
        setNewPuppy({ name: "", breed: "", age_est: "", current_kennel_number: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding puppy:", error));
  };

  // EDIT puppy (put/:id)
  const handleEditPuppy = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/${editPuppy.pet_id}`, editPuppy)
      .then((response) => {
        setPuppies(
          puppies.map((puppy) =>
            puppy.pet_id === editPuppy.pet_id ? response.data : puppy
          )
        );
        setEditPuppy(null);
      })
      .catch((error) => console.error("Error editing puppy:", error));
  };

  // DELETE puppy (delete/:id)
  const handleDeletePuppy = (pet_id) => {
    axios
      .delete(`http://localhost:5000/${pet_id}`)
      .then(() => setPuppies(puppies.filter((puppy) => puppy.pet_id !== pet_id)))
      .catch((error) => console.error("Error deleting puppy:", error));
  };

  return (
    <>
      <Header />

      <Section title="Puppy Management Table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Age (est.)</th>
              <th>Kennel Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {puppies.map((pup, index) => (
              <tr key={index}>
                <td>{pup.name}</td>
                <td>{pup.breed}</td>
                <td>{pup.age_est}</td>
                <td>{pup.current_kennel_number}</td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" color="primary" onClick={() => setEditPuppy(pup)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeletePuppy(pup.pet_id)}>
                      Delete
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      </Section>

      <Section title={editPuppy ? "Edit Puppy" : "Add Puppy"}>
        <form onSubmit={editPuppy ? handleEditPuppy : handleAddPuppy}>
          <Stack spacing={2}>
            {["name", "breed", "age_est", "current_kennel_number"].map((field) => (
              <TextField
                key={field}
                label={field.split("_").join(" ").toUpperCase()} // Format label
                value={editPuppy ? editPuppy[field] : newPuppy[field]}
                onChange={(e) =>
                  editPuppy
                    ? setEditPuppy({ ...editPuppy, [field]: e.target.value })
                    : setNewPuppy({ ...newPuppy, [field]: e.target.value })
                }
                fullWidth
                variant="filled"
              />
            ))}
            <Button type="submit" variant="contained">
              {editPuppy ? "Update Puppy" : "Add Puppy"}
            </Button>
            {editPuppy && (
              <Button variant="outlined" onClick={() => setEditPuppy(null)}>
                Cancel
              </Button>
            )}
          </Stack>
        </form>
      </Section>


      <br></br>
      <br></br>
      <hr />
      <Footer />

    </>
  );
};

export default App;
