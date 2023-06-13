# Carpool Take Home Project

This is a [Carpool](https://app-beta.carpool.dev) project bootstrapped with `create-t3-app`.

This project is a simple UI that connects with a couple of Carpool API endpoints to show useful data to the customer. Specifically, this web app contains a customized explorer for instructions involving Bubblegum’s “treeAuthority” accounts.

Data is aggregated by leveraging elasticsearch aggregations directly within the carpool API calls. This helps tremendously so that we don’t have to do any intense post-processing on the data.

## API Calls

The main API call used for the homepage is the instructions POST endpoint: "[Perform aggregations of instructions of a program.](https://carpool-dev.readme.io/reference/solanainstructionscontroller_aggregateinstructions)". This was used to gather and display treeAccount data by the number of transfers in the past 24hrs. The exact implementation including the aggregations can be found in the src/lib/transferData.ts file.

Additionally, I made use of the instrucitons GET endpoint: "[List instructions of a program which involved a particular account.](https://carpool-dev.readme.io/reference/solanainstructionscontroller_findinstructionswithaccount)". This was used to populate instruction data for the given treeAuthority account. The implementation for this can be found in the src/lib/instructionData.ts file.

## Running / Deploying

This project is currently deployed to [https://carpool-takehome.vercel.app/](https://carpool-takehome.vercel.app/). Feel free to check it out!

To run locally, you can clone this repo and run `npm install` followed by `npm run dev`. This will start the development server on port 3000. Note that you will also need a valid API_KEY in your .env file
