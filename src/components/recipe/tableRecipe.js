import { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios';
const TableRecipe = () => {
    const [dataRecipe, setDataRecipt] = useState([]);
    console.log(dataRecipe);
    useEffect(() => {
        axios.get('http://localhost:5000/recipe').then(dataRecipe => { setDataRecipt(dataRecipe.data.allRecipe) });
    }, [])
    return (<div className='list-recipe'>
        <h2>Your Recipes</h2>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Date created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                
                    {
                        dataRecipe.map((data,index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.createdAt}</td>
                                    <td><button className='btn btn-outline-danger'>Edit </button><button className='btn btn-outline-danger'>Delete </button></td>
                                    </tr>
                            )
                        })
                    }

                


            </tbody>
        </table>
    </div>
    )
}
export default TableRecipe