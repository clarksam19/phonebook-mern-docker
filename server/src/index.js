const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

let data = require('./data.json');

morgan.token('body', (req, res) => JSON.stringify(req.body));

const uniqueName = (name) => {
  return !(data.map(entry => entry.name).includes(name));
};

const missingData = (contact) => {
  return !(contact.name || contact.number);
}

const app = express();

app.use(express.static(CLIENT_BUILD_PATH));
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.post('/api/contacts', (req, res) => {

  if (!uniqueName(req.body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  } else if (missingData(req.body)) {
    return res.status(400).json({
      error: 'must include name and number'
    });
  } else {
    const id = Math.floor(Math.random() * 1000000);
    const contact = {
      name: req.body.name,
      number: req.body.number,
      id: id
    };

    data = data.concat(contact);
    res.status(201).json(contact);
  }
});



app.get('/api/contacts', (req, res) => {
  res.send(data);
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has ${data.length} people</p>` +
    `<p>${new Date()}</p>`
    )
});

app.get('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.find(entry => entry.id === id);

  if (person) {
    res.send(person);
  } else {
    res.status(404).json({
      error: `no contact with id of ${id}`
    });
  }
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.find(entry => entry.id === id);

  if (person) {
    data = data.filter(entry => entry.id !== id);
    res.status(204).json().end();
  } else {
    res.status(404).json({
      error: `no contact with id of ${id}`
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => `listening on port ${PORT}`);