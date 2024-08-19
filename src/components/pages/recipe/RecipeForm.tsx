import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../../common/Button";
import axiosClient from "../../../axios.client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

type InputField = {
    id: number;
    value: string;
}


export const RecipeForm = () => {

    const { id } = useParams<{ id?: string }>();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [preparationSteps, setPreparationSteps] = useState<string>("");
    const [inputs, setInputs] = useState<InputField[]>([{ id: Date.now(), value: '' }]);
    const [file, setFile] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] =  useState<string>("");

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                try {
                    const response = await axiosClient.get(`recipe/${id}`);
                    const recipe = response.data.data;
                    setTitle(recipe.title);
                    setDescription(recipe.description);
                    setPreparationSteps(recipe.preparation_steps);
                    setInputs(recipe.ingredients.map((ingredient: string, index: number) => ({ id: Date.now() + index, value: ingredient })));
                    setPhotoUrl(recipe.photoUrl); 
                } catch (error) {
                    console.error('Error fetching recipe data:', error);
                }
            };
            fetchRecipe();
        }
    }, [id]);

    const handleChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
        const newInputs = inputs.map(input =>
            input.id === id ? { ...input, value: event.target.value } : input
        );
        setInputs(newInputs);
    };

    const handleAdd = () => {
        setInputs([...inputs, { id: Date.now(), value: '' }]);
    };

    const handleRemove = (id: number) => {
        setInputs(inputs.filter(input => input.id !== id));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!id && !file) {
            alert('Please upload a photo for the recipe.');
            return;
        }
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('preparation_steps', preparationSteps);
    
        // Stringify the array of ingredients
        const ingredientsString = JSON.stringify(inputs.map(input => input.value));
        formData.append('ingredients', ingredientsString);
    
        if (file) {
            formData.append('photo', file);
        }
        
        try {
            if (id) {
                // Update existing recipe
                const response = await axiosClient.put(`recipe/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const photoUrl = response.data.data.photoUrl;
                setPhotoUrl(photoUrl);
                alert('Recipe was successfully updated!');
            } else {
                // Add new recipe
                const response = await axiosClient.post('recipe', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
               
                alert('Recipe was successfully added!');
                console.log('Response:', response.data);
            }
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
    };

    return(
        <div>
            <div className="backToList">
                <Link to='/recipe/list'> Back to Recipe List </Link>
            </div>
            <h3> {id ? 'Update ' : 'Add '} Recipe Form </h3>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                    </div>
                    <label htmlFor="ingredients">Ingredients</label>
                    <div>
                        {inputs.map((input) => (
                            <div key={input.id} className="input-group mb-3">
                                <input
                                    type="text"
                                    id="ingredients"
                                    value={input.value}
                                    onChange={(event) => handleChange(input.id, event)}
                                    placeholder="Enter value"
                                    className="form-control"
                                />
                                <Button onClick={() => handleRemove(input.id)} text="Remove" styling="btn btn-outline-danger" />
                            </div>
                        ))}
                        
                        <Button styling="btn btn-outline-primary" onClick={handleAdd} text="Add Field" />
                    </div>
                   
                    <div className="form-group mb-3">
                        <label htmlFor="steps">Brief Description</label>
                        <textarea
                                id="title"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description">Preparation Steps</label>
                        <textarea
                                id="title"
                                className="form-control"
                                value={preparationSteps}
                                onChange={(e) => setPreparationSteps(e.target.value)}
                                required
                            />
                    </div>
                    <div className="form-group mb-3">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile"  onChange={(e) => e.target.files && setFile(e.target.files[0])}/>
                            {id && <img src={photoUrl} alt="plate" style={{ maxWidth: '200px' }}/> }
                        </div>
                    </div>
                <button type="submit" className="btn btn-primary">{id ? 'Update Recipe' : 'Add Recipe'}</button>
                </form>
            </div>
            
        </div>
       
    )
}