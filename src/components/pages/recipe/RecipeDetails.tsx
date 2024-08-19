import { useEffect, useState } from 'react';
import axiosClient from '../../../axios.client';
import { useParams } from 'react-router-dom';
import { RecipeType } from '../../../models/Recipe';


export const RecipeDetails = () => {

 const { id } = useParams<{ id?: string }>();
 const [recipe, setRecipe] = useState<RecipeType | null>(null);

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        const response = await axiosClient.get<{ data: RecipeType }>(`recipe/${id}`);
        setRecipe(response.data.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipeById();
  }, [id]);
  
    return (
        <div>
        {
            recipe ? 
            (
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center img-container">
                        <img src={recipe.photoUrl} alt="plate"/>
                    </div>
                    <div className="recipe-heading">
                        <h1 className="main-heading">{recipe.title}</h1>
                        <p>{recipe.description}</p>
                    </div>
                    <div className="ingredients">
                        <div className="ingredients-heading">
                            <h2 className="heading">Ingredients</h2>
                        </div>
                        
                        <div className="ingredients-content">
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    <div className="instructions-heading">
                    <h2 className="heading">Preparation Steps</h2>
                </div>
                <div className="instructions-content">
                                    {recipe.preparation_steps}
                </div>
                </div>
            ):  (
                <p>Loading recipe...</p>
              )
        }
        </div>
    )
}