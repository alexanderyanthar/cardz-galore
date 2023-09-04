import React, { useState } from 'react'


// General form for user authentication
const AuthForm = ({ fields, onSubmit, buttonLabel }) => {
    const [formData, setFormData] = useState({});

    // Handle changes to DOM state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // prevent default submission and save onSubmit prop from front end form
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

  return (
    // Front end form styling - unformity in styling all user forms
    <form className='flex flex-col w-full items-center justify-center container mx-auto lg:max-w-screen-lg lg:w-8/12' onSubmit={handleSubmit}>
        {/* mapping over fields so proper form data is displayed */}
        {fields.map((field) => (
            <div className='w-11/12' key={field.name}>
                <label>
                    <input
                        className='w-full outline outline-blue-600 rounded mt-4 last-of-type:mb-4 py-2 px-2'
                        type={field.type}
                        placeholder={field.name}
                        name={field.name}
                        value={formData[field.name] || ''} 
                        onChange={handleChange}
                    />
                </label>
            </div>
        ))}
        <button className='bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors m-4 px-3 py-2 rounded w-1/6' type='submit'>{buttonLabel}</button>
    </form>
  )
}

export default AuthForm