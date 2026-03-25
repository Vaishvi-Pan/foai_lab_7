import React, { useState, useEffect } from 'react';
import { Card } from './Card';

export function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const randomStart = Math.floor(Math.random() * 95);
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_start=${randomStart}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const actions = (
        <button className="btn btn-primary" onClick={fetchPosts} disabled={loading}>
            Get Posts
        </button>
    );

    return (
        <Card title="Recent Posts" actions={actions}>
            {loading ? (
                <div className="loader"></div>
            ) : error ? (
                <p className="error-text">Error: {error}</p>
            ) : (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
                    {posts.map(post => (
                        <div key={post.id} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500', textTransform: 'capitalize' }}>
                                {post.title}
                            </h4>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
