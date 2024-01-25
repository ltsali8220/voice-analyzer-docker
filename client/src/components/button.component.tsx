import { ButtonProps } from '@/types/models'
import React from 'react'

const Button: React.FC<ButtonProps> = ({ title, onClick, color }) => {
    return (
        <div>
            <button
                className={`border-2 p-2 rounded-lg bg-${color}-400 hover:bg-${color}-500 hover:text-white`}
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    )
}

export default Button