import React, { useState } from 'react'

const AuthForm = ({ fields, onSubmit, buttonLabel }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

  return (
    <form onSubmit={handleSubmit}>
        {fields.map((field) => (
            <div key={field.name}>
                <label>{field.label}:</label>
                <input 
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''} 
                    onChange={handleChange}
                />
            </div>
        ))}
        <button className='ml-4 bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded' type='submit'>{buttonLabel}</button>
    </form>
  )
}

export default AuthForm