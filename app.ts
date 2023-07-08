import {
    expressApp,
    mongooseLoader
} from './loaders';

// load components
console.log("➡️ Starting to load components in main app")
mongooseLoader();

// get port from env else default to 3014
const port: string = process.env.PORT || "3014";

expressApp.listen(port, () =>
    console.log(`✅  HouseHub Service is listening on port ${port}.`));

