# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /server

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install
RUN npx prisma generate 

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "app.js"]