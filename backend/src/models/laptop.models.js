import { Schema, model } from "mongoose";

const laptopSchema = new Schema(
    {
        laptop_id: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            trim: true,
            enum: ["Issued", "Check-Up", "Free"],
        },
        conditon: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Laptop = model("Laptop", laptopSchema);
