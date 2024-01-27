import { ButtonProps } from '@/types/models'
import React from 'react'

const Button: React.FC<ButtonProps> = ({ title, onClick, color }) => {
    return (
        <div>
            <button
                className={`border-2 p-2 rounded-lg ${color === 'red' ? 'bg-red-400 hover:bg-red-500' : color === 'blue' ? 'bg-blue-400 hover:bg-blue-500' : 'bg-green-400 hover:bg-green-500'} hover:text-white`}
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    )
}

export default Button