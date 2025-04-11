import mongoose, { Schema, type Document } from "mongoose"

export interface ITransaction extends Document {
  type: "deposit" | "transfer" | "withdrawal"
  amount: number
  description: string
  date: Date
  status: "pending" | "completed" | "failed"
  partnerId?: string
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema: Schema = new Schema(
  {
    type: { type: String, enum: ["deposit", "transfer", "withdrawal"], required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
    partnerId: { type: String },
  },
  { timestamps: true },
)

export default mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema)
