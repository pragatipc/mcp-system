import mongoose, { Schema, type Document } from "mongoose"

export interface IWallet extends Document {
  balance: number
  createdAt: Date
  updatedAt: Date
}

const WalletSchema: Schema = new Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Wallet || mongoose.model<IWallet>("Wallet", WalletSchema)
