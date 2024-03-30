# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Bundle your source code inside the Docker image
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["yarn", "start"]
