apt update
apt install mariadb-server -y

echo "DOSN'T FORGET TO PROTECT THE MYSQL CONNECTION AND SERVER"
echo "You can use : mysql_secure_installation"

service mysql restart

mysql -u root

use mysql;

SET PASSWORD FOR 'root'@'localhost' = PASSWORD('94dy8vURzDEF78DHZ8DZ8712DKz3Nh7');

CREATE DATABASE IF NOT EXISTS tickets;

flush privileges;

quit;

npm run startdeploy