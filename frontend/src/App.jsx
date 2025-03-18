import React from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import { Toaster, toast } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Toaster/>
        <h1>Bug Tracker</h1>
        <BugForm />
        <BugList />
      </div>
    </ErrorBoundary>
  );
}

export default App;