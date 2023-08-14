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
    <form className='flex flex-col ' onSubmit={handleSubmit}>
        {fields.map((field) => (
            <div key={field.name}>
                <label>
                    <input
                        className='w-9/12 outline outline-blue-600 rounded mt-4 last-of-type:mb-4'
                        type={field.type}
                        placeholder={field.name}
                        name={field.name}
                        value={formData[field.name] || ''} 
                        onChange={handleChange}
                    />
                </label>
            </div>
        ))}
        <button className='bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded w-1/6' type='submit'>{buttonLabel}</button>
    </form>
  )
}

export default AuthForm