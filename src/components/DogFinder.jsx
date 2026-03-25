import React, { useState, useEffect } from 'react';
import { Card } from './Card';

export function DogFinder() {
    const [data, setData] = useState({ imageUrl: '', breed: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDog = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            if (!res.ok) throw new Error('Failed to fetch');
            const json = await res.json();

            const parts = json.message.split('/');
            const breedIndex = parts.indexOf('breeds');
            let breedName = 'Unknown';
            if (breedIndex !== -1 && parts.length > breedIndex + 1) {
                breedName = parts[breedIndex + 1].replace('-', ' ');
                breedName = breedName.charAt(0).toUpperCase() + breedName.slice(1);
            }

            setData({ imageUrl: json.message, breed: breedName });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDog();
    }, []);

    const copyUrl = () => {
        if (data.imageUrl) {
            navigator.clipboard.writeText(data.imageUrl);
            alert('URL copied to clipboard!');
        }
    };

    const actions = (
        <>
            <button className="btn btn-primary" onClick={fetchDog} disabled={loading}>
                Get Dog
            </button>
            <button className="btn" onClick={copyUrl} disabled={!data.imageUrl || loading}>
                Copy URL
            </button>
        </>
    );

    return (
        <Card title="Dog Finder" actions={actions}>
            {loading ? (
                <div className="loader"></div>
            ) : error ? (
                <p className="error-text">Error: {error}</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div style={{ width: '100%', height: '240px', overflow: 'hidden', borderRadius: '0.5rem', margin: '0 0 1rem 0', background: 'rgba(0,0,0,0.2)' }}>
                        <img
                            src={data.imageUrl}
                            alt={data.breed}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <h3 style={{ textTransform: 'capitalize', width: '100%', textAlign: 'center' }}>Breed: {data.breed}</h3>
                </div>
            )}
        </Card>
    );
}
