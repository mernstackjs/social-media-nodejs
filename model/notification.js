const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["Follow", "Like", "Comment"] },
  content: { type: mongoose.Schema.Types.ObjectId, refPath: "onModel" },
  onModel: {
    type: String,
    required: true,
    enum: ["Post", "Comment"],
  },
});
