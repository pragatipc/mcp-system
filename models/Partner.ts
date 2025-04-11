import mongoose, { Schema, type Document } from "mongoose"

export interface IPartner extends Document {
  name: string
  phone: string
  email: string
  status: "active" | "inactive"
  orders: number
  completed: number
  walletBalance: number
  joinDate: Date
  createdAt: Date
  updatedAt: Date
}

const PartnerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    orders: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 0 },
    joinDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema)
