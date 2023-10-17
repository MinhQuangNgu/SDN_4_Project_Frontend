import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CreatableSelect from 'react-select/creatable';

const EditRecipe = () => {
    const { id } = useParams();
    const [dataRecipe, setDataRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');

    const [recipe_name, setRecipe_name] = useState('')
    const [recipe_introduction, setRecipe_introduction] = useState('')
    const [recipe, setRecipe] = useState('')
    

    useEffect(() => {
        axios.put(`http://localhost:5000/recipe/${id}`).then(data => setDataRecipe(data.data.data.data.result))
    }, [])
    useEffect(() => {
        axios.get('http://localhost:5000/recipe/common').then((response) => {

            setOptions(response.data);
        });
    }, [])
    const createOption = (value) => ({
        label: value,
        value: value.toLowerCase().replace(/\W/g, ''),
    });
    const handleCreate = (inputValue) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            axios.post(
                "http://localhost:5000/recipe/common", {
                key: "country",
                label: inputValue,
                value: inputValue,
            })
            setOptions((prev) => [...prev, newOption]);
            setValue(newOption);
        }, 1000);
    }
    
    return (
        <div className="container mt-5">
            <form>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" id="name" name="name" required value={dataRecipe.name} />
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea class="form-control" id="description" name="description" required value={dataRecipe.introduction}></textarea>
                </div>
                <div class="form-group">
                    <label for="recipe">Recipes:</label>
                    <textarea class="form-control" id="recipe" name="recipe" required value={dataRecipe.recipes}></textarea>
                </div>
                <div class="form-group">
                    <label for="image">Image:</label>
                    <input type="file" class="form-control-file" id="image" name="image" />
                </div>
                <div class="form-group">
                    <label for="country">Country:</label>
                    <CreatableSelect onChange={(newValue) => setValue(newValue)}
                        isClearable
                        isLoading={isLoading}
                        onCreateOption={handleCreate}
                        options={options}
                        value={value}
                        placeholder="Chọn quốc gia"
                    />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default EditRecipe