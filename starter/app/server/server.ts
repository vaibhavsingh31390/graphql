import app from "./app";
import connectDB from "./config/connect";
import standAloneApolloServer from "./controller/graphQlController";

app.listen(process.env.APP_PORT || 3000, async () => {
  try {
    await connectDB();
    const { url } = await standAloneApolloServer;
    console.log(`Apollo is running on ${url}`);
    console.log(
      `${process.env.APP_NAME || "node_dev_app"} is running on port ${
        process.env.APP_PORT || 3000
      }`
    );
  } catch (error) {
    console.error(error);
  }
});
