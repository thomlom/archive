import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: String,
  tag: String,
  joker: Number,
  jokerHistory: Array,
  data: Object
});

export default mongoose.model('Member', memberSchema);