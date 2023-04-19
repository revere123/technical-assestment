module.exports = mongoose => {
  var PersonAddressesSchema = mongoose.Schema(
    {
      addressId: { type: String },
      zipCode: { type: String },
      street: { type: String },
    },

    { timestamps: true }
  );
  const PersonAddresses = mongoose.model("person_addresses", PersonAddressesSchema);
  return PersonAddresses;
};
