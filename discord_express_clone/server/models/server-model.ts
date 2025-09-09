import mongoose from "mongoose";

enum ServerType {
  TEXT,
  AUDIO,
  VIDEO,
}


const serverSchema = new mongoose.Schema({
    serverName: {
        type: String,
        required: true,
        trim: true,
    },
    serverType: {
        default: ServerType.TEXT
    },
    serverImage: {
        type: String,
    }
})

const SERVER = mongoose.models.SERVER || mongoose.model("SERVER", serverSchema)
export default SERVER;