import express from 'express';

const router = express.Router();

import Person from './../models/Person';

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try{
    const person = await Person.findOne({_id: id});

    if(!person) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => {
  try{
    const persons = await Person.find();

    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const { name, age, email } = req.body;

  const person = {
    name,
    age,
    email
  };

  try{

    const addPerson = await Person.create(person);

    res.status(201).json(addPerson);

  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const { name, age, email } = req.body;

  const person = { name, age, email };

  try{
    const updated = await Person.updateOne({ _id: id }, person);

    if (updated.matchedCount === 0) {
      res.status(422).json({ message: 'User not found' });
      return;
    }

    res.status(201).json(person);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try{
    const deletePerson = await Person.deleteOne({ _id: id });

    if (!deletePerson) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(201).json({message: 'deleted person'});
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
