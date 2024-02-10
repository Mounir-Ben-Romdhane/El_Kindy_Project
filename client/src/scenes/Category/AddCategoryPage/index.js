import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from 'components/SideBar';
import TopBarBack from 'components/TopBarBack';

function CategoryForm() {
    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState(''); // État pour le message de succès

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const [formState, setFormState] = useState({
        name: '', // Assurez-vous que les noms des champs correspondent à ceux attendus par votre API
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/categories', formState);
            setSuccessMessage('Category added successfully!'); // Mise à jour du message de succès
            setFormState({ name: '', description: '' }); // Réinitialiser le formulaire
        } catch (error) {
            console.error('Failed to add category:', error);
            setSuccessMessage(''); // Réinitialiser le message de succès en cas d'erreur
        }
    };

    return (
        <main>
            <SideBar />
            <div className="page-content">
                <TopBarBack />
                <div className="container mt-4">
                    <h2>Add New Category</h2>
                    {/* Afficher le message de succès si défini */}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Category Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Category Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                value={formState.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Category</button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default CategoryForm;
