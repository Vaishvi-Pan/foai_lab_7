import React from 'react';
import './App.css';
import { DogFinder } from './components/DogFinder';
import { JokeGenerator } from './components/JokeGenerator';
import { UserProfile } from './components/UserProfile';
import { Posts } from './components/Posts';

function App() {
  return (
    <>
      <header>
        <h1>Public API Playground</h1>
      </header>
      <main className="app-grid">
        <DogFinder />
        <JokeGenerator />
        <UserProfile />
        <Posts />
      </main>
      <footer style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-secondary)', paddingBottom: '2rem' }}>
        <p>Built with React & Vite. Dark modern interface.</p>
      </footer>
    </>
  );
}

export default App;
