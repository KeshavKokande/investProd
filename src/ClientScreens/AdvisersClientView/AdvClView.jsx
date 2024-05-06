
import AdvisorsCarousel from "./AdvisorsCarousel";
import React, { useState, useEffect } from 'react';

function AdvClView() {
    const [adData, setAdData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/Client/get-all-advisors', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                
                const data = await response.json();
                console.log(data)
                setAdData(data.listOfNamesOfAdvisors);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
   
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <AdvisorsCarousel advisors={adData} />
        </div>
    );
}

export default AdvClView;
