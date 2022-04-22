echo "Cloning repository..."
git clone https://github.com/JoDi-2903/MyWatchlist.git
echo "Repository cloned"

cd ./MyWatchlist

cp ../config.env ./config.env
cp ../config_spring.env ./config_spring.env

echo "Starting container..."
docker-compose build
docker-compose up -d

echo "Clean up"
rm -rf ~/MyWatchlist

exit 0