apt update

echo "===================================="
echo "Waiting end of apt update : 10 seconds"
sleep 10
echo "===================================="
echo "Starting mysql install"

apt-get install mariadb-server -y
mysqladmin --version

echo "===================================="
echo "Waiting end of mysql installation : 10 seconds"
sleep 10
echo "===================================="
echo "Starting restart"



service mysql restart

echo "===================================="
echo "Waiting restart of mysql : 10 seconds"
sleep 10
echo "===================================="
echo "Starting set Up BDD"

mysql -u root < "startServer.sql"

echo "===================================="
echo "Waiting end setting up mysql server : 5 seconds"
sleep 5
echo "===================================="
echo "Starting node Part"

npm run startdeploy
