import type React from "react"

interface ImageUploadProps {
    onImageUpload: (file: File) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onImageUpload(file)
        }
    }

    return (
        <div>
            <label htmlFor='nidCard' className='text-gray-500 ml-3 text-sm font-medium '>Upload NID Card</label>
            <input
                type='file'
                id='nidCard'
                accept='image/*'
                onChange={handleFileChange}
                className='block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark'
            />
        </div>
    )
}
