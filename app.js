const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Assuming you're using EJS templates
app.use(express.static(path.join(__dirname, 'public')));
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/shanti', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a contact model
const User = mongoose.model('User', {
    name: String,
    email: String,
    phone : Number,
    subject: String,
    message: String
});





app.get('/', (req, res) => {
  res.render('home', {title: 'Home'});
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});
});

app.get('/doctors', (req, res) => {
    res.render('doctors', {title: 'Doctors'});
  });

  app.get('/doctor1', (req, res) => {
    res.render('doctor1', {title: 'Doctor1'});
  });

  app.get('/doctor2', (req, res) => {
    res.render('doctor2', {title: 'Doctor2'});
  });

  app.get('/appointment', (req, res) => {
    res.render('appointment', {title: 'Appointment'});
  });

  app.get('/services', (req, res) => {
    res.render('services', {title: 'Services'});
  });

  app.get('/medical', (req, res) => {
    res.render('medical', {title: 'Medical'});
  });

  app.get('/vaccination', (req, res) => {
    res.render('vaccination', {title: 'Vaccination'});
  });

  app.get('/vaccine_form', (req, res) => {
    res.render('vaccine_form', {title: 'Vaccination Form'});
  });

  app.get('/team', (req, res) => {
    res.render('team', {title: 'Team'});
  });

  app.get('/pathology', (req, res) => {
    res.render('pathology', {title: 'Pathology'});
  });

  app.get('/pathology_form', (req, res) => {
    res.render('pathology_form', {title: 'Testing Form'});
  });

  app.get('/cart', (req, res) => {
    res.render('cart', {title: 'Cart'});
  });
      

app.get('/contact', (req, res) => {
  res.render('contact', {title: 'Contact'});
});

app.post('/submit', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  try {
      const user = new User({ name, email, phone, subject, message });
      await user.save();
      res.redirect('/');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
  }
});

// Define Appointment schema
const Appointment = mongoose.model('Appointment', {
  name: String,
  email: String,
  phone: String,
  department: String,
  doctor: String,
  date: Date,
  message: String
});

// Route to handle form submission
app.post('/appointment', async (req, res) => {
  const { name, email, phone, department, doctor, date, message } = req.body;
  try {
      const newAppointment = new Appointment({ name, email, phone, department, doctor, date, message });
      await newAppointment.save();
      res.redirect('/');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
  }
});

// Define Pathology schema
const Pathology = mongoose.model('Pathology', {
  name: String,
  email: String,
  phone: String,
  testType: String,
  time: String,
  date: Date
});

// Route to handle pathology form submission
app.post('/pathology', async (req, res) => {
  const { name, email, phone, testType, time, date } = req.body;
  try {
    const newPathology = new Pathology({ name, email, phone, testType, time, date });
    await newPathology.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Define Vaccination schema
const Vaccination = mongoose.model('Vaccination', {
  name: String,
  email: String,
  phone: String,
  forWhom: String, // 'for' is a reserved keyword in JavaScript, so use a different name like 'forWhom'
  date: Date,
  time: String,
  message: String
});

// Route to handle vaccination form submission
app.post('/vaccination', async (req, res) => {
  const { name, email, phone, forWhom, date, time, message } = req.body;
  try {
    const newVaccination = new Vaccination({ name, email, phone, for: forWhom, date, time, message });
    await newVaccination.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
