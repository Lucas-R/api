import { model, Schema } from 'mongoose';

const Person = model('Person', new Schema({
  name: String,
  age: Number,
  email: String,
}));

export default Person;
