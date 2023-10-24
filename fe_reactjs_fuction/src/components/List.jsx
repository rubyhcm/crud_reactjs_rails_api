import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { deleteActor, getList } from '../lib/api/actor';

function List() {
  // State to hold the list of actors
  const [dataList, setDataList] = useState([]);
  // React Router hook for navigation
  const navigate = useNavigate();

  // Fetch the list of actors when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  // Function to fetch the list of actors from the API
  const fetchList = async () => {
    try {
      const response = await getList();
      console.log(response);
      setDataList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle the deletion of an actor
  const handleDelete = async (item) => {
    try {
      // Delete the actor from the API
      await deleteActor(item.id);
      // Remove the deleted item from the dataList state
      setDataList((prevDataList) => prevDataList.filter((dataItem) => dataItem.id !== item.id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Actors</h1>
      {/* Button to navigate to the "Add Actor" page */}
      <button className="btn btn-primary" onClick={() => navigate('/new')}>
        Add
      </button>
      <div className="card-deck mt-3">
        {/* Map through the list of actors and display them */}
        {dataList.map((item) => (
          <div className="card mb-3" style={{ width: '18rem' }} key={item.id}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <h6 className="card-text text-muted">Country: {item.country}</h6>
              {/* Link to navigate to the "Edit Actor" page */}
              <Link to={`/edit/${item.id}`} className="btn btn-primary me-2">
                Edit
              </Link>
              {/* Button to delete the actor */}
              <button className="btn btn-danger" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;