# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm ci --only=production
RUN npx prisma generate 

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3002

# Start the application
CMD ["npm", "start"]