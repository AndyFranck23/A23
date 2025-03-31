'use client'
import React, { useState } from 'react'

const MyInput = ({ label, type, ...props }) => {
    const [showPassword, setShowPassword] = useState(true);

    return (
        <div className='mt-2 relative'>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                placeholder={props.placeholder || label}
                className="w-full p-2 border focus:ring-1 focus:ring-blue-500 outline-none bg-transparent dark:border-gray-600"
                {...props}
                type={
                    type == "password"
                        ? showPassword
                            ? "password"
                            : "text"
                        : type
                }
            />
            {
                type === "password" && (
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-400"
                        type="button"
                    >
                        {showPassword ? (
                            <i className="fa-solid fa-eye text-black"></i>
                        ) : (
                            <i className="fa-solid fa-eye-slash text-black"></i>
                        )}
                    </button>
                )
            }
        </div>
    )
}

export default MyInput