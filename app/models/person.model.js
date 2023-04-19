module.exports = mongoose => {
  var PersonSchema = mongoose.Schema(
    {

      personId: { type: String },
      gender: { type: String },
      dob: { type: String }, // YYYY-MM-DD
      dod: { type: String }, // YYYY-MM-DD
     
      name: {
        first: { type: String },
        middle: { type: String },
        last: { type: String },
        isAlive:{type:Boolean}
      },
      addresses: [
        {
          from: { type: String }, // YYYY-MM-DD
          to: { type: String }, // YYYY-MM-DD, will be empty for current address
          addressId: { type: String },
          status: { type: String }, // @living
          zipCodes: { type: String } //12345
        },
      ],
    },
    { timestamps: true }
  );
  const Person = mongoose.model("person_collection", PersonSchema);
  return Person;
};
