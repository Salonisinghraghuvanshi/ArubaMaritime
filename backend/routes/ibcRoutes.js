import mongoose from "mongoose"

const IBCSchema = new mongoose.Schema(
  {
    // Company Information
    companyName: {
      type: String,
      required: true,
      index: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    incorporationDate: {
      type: Date,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },

    // Contact Information
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    contactPerson: {
      name: String,
      position: String,
      email: String,
      phone: String,
    },

    // Directors and Shareholders
    directors: [
      {
        name: String,
        nationality: String,
        position: String,
      },
    ],
    shareholders: [
      {
        name: String,
        nationality: String,
        sharePercentage: Number,
      },
    ],

    // Financial Information
    authorizedCapital: {
      amount: Number,
      currency: String,
    },
    issuedCapital: {
      amount: Number,
      currency: String,
    },

    // Legal Information
    legalStatus: {
      type: String,
      enum: ["Active", "Dissolved", "Suspended", "In Liquidation"],
      default: "Active",
    },
    annualReturnDate: {
      type: Date,
    },

    // Additional Information
    remarks: {
      type: String,
    },

    // Metadata
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Text index for search functionality
IBCSchema.index({
  companyName: "text",
  registrationNumber: "text",
})

export default mongoose.model("IBC", IBCSchema)
