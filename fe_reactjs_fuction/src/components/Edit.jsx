import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateActor, getDetail } from '../lib/api/actor';
import FormBody from './Form';

function Edit() {
  // State to hold the actor's data for editing
  const [value, setValue] = useState({
    name: '',
    country: '',
  });

  // Extract the URL parameters using useParams
  const query = useParams();
  // React Router hook for navigation
  const navigate = useNavigate();

  // Fetch actor details when the component mounts or the query changes
  useEffect(() => {
    fetchData(query);
  }, [query]);

  // Function to fetch actor details for editing
  const fetchData = async (query) => {
    try {
      const response = await getDetail(query.id);
      const { name, country } = response.data;
      // Set the fetched data in the state for editing
      setValue({
        name,
        country,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the state with the new value for the corresponding input field
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // Function to handle form submission for updating actor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the actor's details using the provided data
      await updateActor(query.id, value);
      // Navigate back to the main list after successful update
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Edit</h1>
      {/* Render the form component with appropriate props */}
      <FormBody
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        buttonType="Update"
      />
    </div>
  );
}

export default Edit;