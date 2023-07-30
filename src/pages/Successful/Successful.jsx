import React, { useEffect }     from 'react';
import { Card, Result }         from 'antd';
import { useNavigate }          from 'react-router-dom';

export const Successful = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate('/package-list'); 
        }, 2000);
        return () => clearTimeout(redirectTimer);
    }, [navigate]);

    return (
        <div className='successful_container'>
            <Card style={{ maxWidth: 300 }}>
                <Result
                    status="success"
                    title="Başarıyla Tamamlandı!"
                />
            </Card>
        </div>
    )
}
