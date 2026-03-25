import React, { useState, useEffect } from 'react';
import { Card } from './Card';

export function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('https://randomuser.me/api/');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setUser(data.results[0]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const actions = (
        <button className="btn btn-primary" onClick={fetchUser} disabled={loading}>
            Get User
        </button>
    );

    return (
        <Card title="User Profile" actions={actions}>
            {loading ? (
                <div className="loader"></div>
            ) : error ? (
                <p className="error-text">Error: {error}</p>
            ) : user ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <img
                        src={user.picture.large}
                        alt={`${user.name.first} ${user.name.last}`}
                        style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem', border: '3px solid var(--accent-pink)', objectFit: 'cover' }}
                    />
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {user.name.first} {user.name.last}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--accent-cyan)' }}>{user.email}</p>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '0.5rem', flex: 1, textAlign: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Age</span>
                            <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.2rem' }}>{user.dob.age}</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '0.5rem', flex: 1, textAlign: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Country</span>
                            <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.location.country}</p>
                        </div>
                    </div>
                </div>
            ) : null}
        </Card>
    );
}
