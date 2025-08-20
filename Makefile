# Variables
SERVICE_BACKEND=gymtracker-backend
SERVICE_DB=gymtracker-db

# Levantar los contenedores en segundo plano
up:
	docker-compose up -d --build

# Apagar los contenedores
down:
	docker-compose down

# Ver logs del backend
logs:
	docker-compose logs -f $(SERVICE_BACKEND)

# Ejecutar migraciones Prisma
migrate:
	docker exec -it $(SERVICE_BACKEND) npx prisma migrate deploy

# Ejecutar seed inicial
seed:
	docker exec -it $(SERVICE_BACKEND) npm run seed

# Acceso a la base de datos via psql
db:
	docker exec -it $(SERVICE_DB) psql -U postgres -d gymtracker