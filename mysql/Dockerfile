FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=alkadycenter917382
ENV MYSQL_DATABASE=alkadycenter

# Expose the MySQL port
EXPOSE 3306

# The default command to run when starting the container
CMD ["mysqld"]

# Docker commands to build, run, and manage this container:

# 1. Build the Docker image
# docker build -t mysql-alkadycenter .

# 2. Run the container
# docker run -d --name mysql-alkadycenter -p 3307:3306 mysql-alkadycenter

# 3. Stop the container
# docker stop mysql-alkadycenter

# 4. Start a stopped container
# docker start mysql-alkadycenter

# restart the container
# docker restart mysql-alkadycenter

# 5. Remove the container (must be stopped first)
# docker rm mysql-alkadycenter

# 6. View logs
# docker logs mysql-alkadycenter

# 7. Execute commands inside the container
# docker exec -it mysql-alkadycenter mysql -uroot -p

# 8. Check running containers
# docker ps

# 9. Check all containers (including stopped ones)
# docker ps -a

# 10. View container details
# docker inspect mysql-alkadycenter

# 11. View Docker images
# docker images

# 12. Remove the Docker image
# docker rmi mysql-alkadycenter

# 13. To edit the Dockerfile, simply modify it with a text editor
# and rebuild the image using the build command (step 1)

# stop all running containers
# docker stop $(docker ps -aq)

# delete all containers
# docker rm $(docker ps -aq)

# delete all images
# docker rmi $(docker images -aq)       

# delete all volumes
# docker volume rm $(docker volume ls -q)       

# delete all networks
# docker network rm $(docker network ls -q)

# delete all stopped containers
# docker ps -aq | xargs docker rm

# delete all stopped images
# docker images -aq | xargs docker rmi

# delete all stopped volumes
# docker volume ls -q | xargs docker volume rm


