FROM library/ubuntu:14.04
FROM python:2.7

COPY /. /.
COPY /. /var/www/qweryNinja/.
COPY /0.0.0.0.conf /etc/apache2/sites-available/0.0.0.0.conf
COPY /host /etc/host

RUN pip install -r requirements.txt

RUN \
  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
  apt-get update && \
  apt-get install emacs24 -y && \
  apt-get install lsof -y && \
  apt-get install emacs24 -y && \
  apt-get install -y apache2 && \
  apt-get install -y apache2.2-common && \
  apt-get install -y apache2-mpm-prefork && \
  apt-get install -y apache2-utils && \
  apt-get install -y libexpat1 && \
  apt-get install -y ssl-cert && \
  apt-get install -y libapache2-mod-wsgi && \
  rm -rf /var/lib/apt/lists/* && \
  a2ensite 0.0.0.0.conf && \
  /etc/init.d/apache2 restart

EXPOSE 80
EXPOSE 443
