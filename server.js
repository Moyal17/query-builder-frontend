const express = require('express');
const path = require('path');
const compression = require('compression');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 8080;

const app = express();
app.use(compression());
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './build')));

// All remaining requests return the React app, so it can handle routing.
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

app.listen(PORT, () => {
  console.error(`Node ${isDev ? 'dev server' : `cluster worker ${process.pid}`}: listening on port http://localhost:${PORT}`);
});
