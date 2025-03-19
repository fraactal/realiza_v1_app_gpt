
#bajar los contenedores
docker compose down

#eliminar las imagenes de realiza
docker rmi realizapp_v01-fast-api-service
docker rmi realizapp_v01-realiza-web-app
docker rmi realizapp_v01-realiza-service

#docker rmi realizapp_v01-api-service
#docker rmi realizapp_v01-realiza-webapp

#eliminar el volumen de BD 
docker volume rm realizapp_v01_database-data

# Construir imagenes desde cero
docker compose build --no-cache
# Levantar Dockers containers
docker compose up


