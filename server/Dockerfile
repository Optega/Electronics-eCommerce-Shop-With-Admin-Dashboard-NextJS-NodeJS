# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /server

# Copy only the package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "app.js"]
