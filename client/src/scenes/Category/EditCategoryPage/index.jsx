import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importez useParams
import SideBar from 'components/SideBar';
import TopBarBack from 'components/TopBarBack';

function CategoryForm() {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
    });
    const [message, setMessage] = useState('');
    const { id } = useParams(); // Utilisez useParams pour obtenir l'ID

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/categories/${id}`);
                setFormState({
                    name: response.data.name,
                    description: response.data.description,
                });
            } catch (error) {
                console.error('Failed to fetch category data:', error);
                setMessage('Failed to load category data.');
            }
        };

        if (id) fetchCategoryData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/categories/${id}`, formState);
            setMessage('Category updated successfully!');
        } catch (error) {
            console.error('Failed to update category:', error);
            setMessage('Failed to update category. Please try again.');
        }
    };

    return (
        <main>
            <SideBar />
            <div className="page-content">
                <TopBarBack />
                <div className="container mt-4">
                    <h2>Update Category</h2>
                    {message && <div className="alert alert-success">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Category Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formState.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" rows="3" value={formState.description} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Category</button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default CategoryForm;
