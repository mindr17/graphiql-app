HOST="vds"
PROJECT_NAME="badges-frontend"
DIR="/root/badges/frontend"

echo "Uploading"
rsync --files-from=rsync-files -r --delete . $HOST:$DIR

echo "Building docker image"

ssh $HOST "cd $DIR && docker compose -p $PROJECT_NAME up -d --build"

echo "Deleting unused docker resources"
ssh $HOST docker system prune -a --filter "until=24h" -f

echo "DONE"
