# Use the official Node.js image from the Docker registry
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (run `npm install`)
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Expose the port your app runs on (example: 3000)
EXPOSE 3000

# Define the command to run your app (example: `npm start`)
CMD ["npm", "start"]