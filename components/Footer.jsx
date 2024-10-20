"use client"
import { useState } from 'react';
export default function Footer() {
    const [count, setCount] = useState(0);
    function handleClick(prev) {
        setCount( prev => prev + 1 );
    }
    return (
        <footer>
            <p>&copy; Our company</p>
            <p>You've clicked {count} <button onClick={handleClick}>click</button></p>        
        </footer>
    );
}