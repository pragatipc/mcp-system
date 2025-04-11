import mongoose, { Schema, type Document } from "mongoose"

export interface IOrder extends Document {
  customer: string
  partner: string | null
  amount: number
  status: "pending" | "in-progress" | "completed"
  date: Date
  address: string
  createdAt: Date
  updatedAt: Date
}

const OrderSchema: Schema = new Schema(
  {
    customer: { type: String, required: true },
    partner: { type: String, default: null },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    date: { type: Date, default: Date.now },
    address: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
