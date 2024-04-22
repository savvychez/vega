"use client"
import './Profile.css'; 
import React, { useEffect, useState } from 'react';

interface ProfileRowProps {
    images: string[];
}

const ProfileRow: React.FC<ProfileRowProps> = ({ images }) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const shuffled = images.sort(() => 0.5 - Math.random());
        setSelectedImages(shuffled.slice(0, Math.floor(Math.random() * 2) + 2));
    }, [images]);

    return (
        <div 
            className=' rounded-3xl p-1 border border-slate-100 flex items-center transition-all duration-200'
            style={{ 
                width: 'auto', 
                maxWidth: '100%', 
                minWidth: '35px',
                background: isHovered ? "rgba(255, 255, 255, 0.5)" : "transparent",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {selectedImages.map((image, index) => (
                <div 
                    key={index} 
                    style={{ 
                        borderRadius: '50%', 
                        width: '35px', 
                        height: '35px', 
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: index !== selectedImages.length - 1 ? '5px' : '0px'
                    }}
                >
                    <img
                        src={image}
                        alt={`Profile ${index}`}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                        }}
                    />
                </div>
            ))}
            <h1 
                className=' text-zinc-700 text-sm font-bold transition-opacity duration-200'
                style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    margin: isHovered ?  '0 8px 0 8px' : '0px', // Dynamically update margin
                    width: isHovered ? 'auto' : '0px', // Dynamically update width
                    opacity: isHovered ? 1 : 0, // Dynamically update opacity
                }}
            >
                ❤️ by {selectedImages.length} friends
            </h1>
        </div>
    );
};

export default ProfileRow;