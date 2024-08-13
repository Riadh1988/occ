import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  user: { type: String, required: true }, // User email or ID
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ticketSchema = new mongoose.Schema({
  type: { type: String, required: true },
  status: { type: String, required: true },
  user: { type: String, required: true },
  additionalData: {
    type: Map,
    of: String,
  },
  chat: [chatSchema], // Add this field
}, { timestamps: true });

export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
