import { useEffect, useState } from 'react';
import axios from './config/axios';
import './App.scss';
import { Training } from './models/Training';
import Layout from './components/Layout/Layout';

function App() {
  const [training, setTraining] = useState<Training>();

  useEffect(() => {
    axios
      .get('trainings')
      .then((response) => response.data)
      .then((data: Training) => {
        console.log('data', data);
        setTraining(data);
      });
  }, []);

  const trainingDate = training ? training.createdAt : 'Date not found.';

  const worksheets = training?.worksheets.map((worksheet) => (
    <div key={worksheet.id}>{worksheet.name}</div>
  ));

  return (
    <Layout>
      <div className="App">
        <div>
          <img
            src="/android-chrome-192x192.png"
            className="logo"
            alt="Vite logo"
          />
        </div>
        <h1>Welcome to FitBuddy</h1>
        <div className="card">
          {trainingDate}
          {worksheets}
        </div>
      </div>
    </Layout>
  );
}

export default App;
