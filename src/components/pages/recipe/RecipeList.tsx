import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store'
import { fetchPaginatedData } from '../../../redux/actions/paginationActions'; // Adjust the path as needed
import { Button } from '../../common/Button';
import axiosClient from '../../../axios.client';

const RecipeList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { recipes, currentPage, totalPages } = useSelector((state: RootState) => state.pagination);
  const itemsPerPage = 10;
  const endpoint = 'recipe';

 

  useEffect(() => {
    dispatch(fetchPaginatedData({ endpoint: endpoint, page: currentPage, pageSize: itemsPerPage }));
  }, [currentPage, dispatch]);

  const handleNextPage = () => {
   
      if (currentPage < totalPages) {
        dispatch(fetchPaginatedData({ endpoint: endpoint, page: currentPage + 1, pageSize: itemsPerPage }));
      }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchPaginatedData({ endpoint: endpoint, page: currentPage - 1, pageSize: itemsPerPage }));
    }
  };

  const handleDelete = async (recipeId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');

    if (confirmDelete) {
        try {
            await axiosClient.delete(`recipe/${recipeId}`);
            dispatch(fetchPaginatedData({ endpoint: endpoint, page: currentPage, pageSize: itemsPerPage }));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    }
};

  return (
    <div>
      <div className="add-recipe">
        <Link to="/recipe/add">
          <button className="btn btn-primary">Add Recipe</button>
        </Link>
      </div>
      { recipes.length > 0 ? (
          <div className="recipe-table">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
              
                  {recipes.map((recipe) => (
                    <tr key={recipe.id}>
                      <td>{recipe.id}</td>
                      <td>{recipe.title}</td>
                      <td>{recipe.description}</td>
                      <td>
                        <Link to={`/recipe/${recipe.id}`}>View</Link> |  
                        <Link to={`/recipe/edit/${recipe.id}`}> Edit</Link> | 
                        <button 
                          type="button" 
                          className="btn btn-block btn-danger" 
                          style={{ marginLeft: '5px' }} 
                          onClick={() => handleDelete(recipe.id)}
                        > 
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              }
              </tbody>
            </table>
            <div className="text-center">
                <Button 
                styling="btn btn-outline-dark" 
                onClick={handlePreviousPage} 
                disabled={currentPage === 1} 
                text={'Previous'} 
              /> 
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                styling="btn btn-outline-dark" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages} 
                text={'Next'} 
              /> 
            </div>
         
        </div>

      ) : 
      <div>
          <p>
            No Recipes Yet. Start adding now!
          </p>
      </div>
    
      }
      
      </div>
  );
};

export default RecipeList;
