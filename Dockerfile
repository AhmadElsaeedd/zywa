# Use the official Node.js 14 image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

# Install build tools and then dependencies, including any native modules.
RUN apt-get update && apt-get install -y build-essential && npm install

COPY . .

# Create a non-root user and give them ownership of the work directory
RUN useradd -m appuser && chown -R appuser /usr/src/app

# Switch to non-root user
USER appuser

# Inform Docker that the container listens on the specified port at runtime.
EXPOSE 3000

CMD [ "node", "app.js" ]