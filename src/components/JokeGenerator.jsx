import React, { useState, useEffect } from 'react';
import { Card } from './Card';

export function JokeGenerator() {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJoke = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setJoke(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    const actions = (
        <button className="btn btn-primary" onClick={fetchJoke} disabled={loading}>
            Next Joke
        </button>
    );

    return (
        <Card title="Joke Generator" actions={actions}>
            {loading ? (
                <div className="loader"></div>
            ) : error ? (
                <p className="error-text">Error: {error}</p>
            ) : joke ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', textAlign: 'left' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: '500', margin: 0 }}>
                        "{joke.setup}"
                    </p>
                    <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', borderLeft: '3px solid var(--accent-purple)' }}>
                        <p style={{ margin: 0, fontWeight: '600', color: 'var(--accent-purple)' }}>
                            {joke.punchline}
                        </p>
                    </div>
                </div>
            ) : null}
        </Card>
    );
}
