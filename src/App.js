import React from 'react';
import './App.css';

import Layout from './components/Layout/Layout.js';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder.js';

const app = props => {
  return (
    <div className="App">
      <Layout>
        <BurguerBuilder>
        </BurguerBuilder>
      </Layout>
    </div>
  );
}

export default app;
