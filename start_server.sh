apt update & apt install mariadb-server -y

echo "You can use : mysql_secure_installation"

service mysql restart

mysql -u root < "startServer.sql"

npm run startdeploy