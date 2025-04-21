import mongoose from "mongoose"

const SpecialCertSchema = new mongoose.Schema(
  {
    // Certificate Information
    certificateName: {
      type: String,
      required: true,
      index: true,
    },
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    certificateType: {
      type: String,
      required: true,
      enum: [
        "Dangerous Goods Handling",
        "Passenger Ship Safety",
        "Oil Tanker Operations",
        "Gas Carrier Operations",
        "Chemical Tanker Operations",
        "Polar Waters Operations",
        "IGF Code Operations",
        "Other",
      ],
    },

    // Issuance Details
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    issuingAuthority: {
      type: String,
      required: true,
    },

    // Holder Information
    holderType: {
      type: String,
      enum: ["Individual", "Vessel", "Company"],
      required: true,
    },
    holderName: {
      type: String,
      required: true,
      index: true,
    },
    holderIdentification: {
      type: String,
      required: true,
    },

    // Scope and Limitations
    scope: {
      type: String,
      required: true,
    },
    limitations: {
      type: String,
      default: "None",
    },

    // Additional Information
    remarks: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "Suspended", "Revoked"],
      default: "Active",
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
SpecialCertSchema.index({
  certificateName: "text",
  certificateNumber: "text",
  holderName: "text",
})

export default mongoose.model("SpecialCert", SpecialCertSchema)
