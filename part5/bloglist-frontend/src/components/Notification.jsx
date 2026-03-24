import { useState, useEffect } from 'react'

const Notification = ({ text }) => {
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer);
    }, [text])

    if (!text || !visible) return null;

    return (
        <div style={{
            color: 'blue',
            border: `1px solid grey`,
            padding: '10px',
            width: '25%',
            margin: '10px 0'
        }}>
            <h4>{text}</h4>
        </div>
    );
};

export default Notification;