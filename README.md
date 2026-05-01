"# dev-tinder" 

#deployment

- signup on aws
- launch a new instance in aws
- chmod 400 <secret>.pem
- connect to the system where the .pem file is located.
    ssh -i "devTinder-secret.pem" ubuntu@ec2-16-171-37-141.eu-north-1.compute.amazonaws.com
- install node version v20.19.6 
- git clone repo 
    https://github.com/karthi-jsdev/dev-tinder.git

frontend -
- npm install - install dependencies     
- npm run build
- sudo apt update
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from dist(build files) to /var/www/html/
- sudo scp -r dist/* /var/www/html/
- enable the port 80
    add the rule in the security group -> inbound rules
- modifty the BASEURL in frontend project to "/api"    

 backend - 
- inside the folder install all the dependencies
    npm install
- add the ip address in mongodb network access
- add the .env file with the mongodb credentials
- in the aws console add the backend port(7777) in the security group -> inbound rules


pm2 installation -
    process manager
    need to install this run the node application in aws server
    - npm install pm2 -g 
    - pm2 start npm -- start
    - pm2 logs
    - pm2 list
    - pm2 flush<name>
    - pm2 stop<name> 
    - pm2 delete<name>
    - pm2 stop<name> 
    - pm2 start npm --name "devtinder-backend" -- start

Database - 
    mongodb -> network access -> add the IP Access List
        localip
        aws public ipv4(http://16.171.37.141/)

nginx - 
    edit the nginx for the proxy pass
    nginx proxy pass /api to 7777 node application
    path - sudo nano etc/nginx/sites-available/default
    =============================================================================================================
    nginx config file update
    =============================================================================================================
    server_name http://16.171.37.141
    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    sudo systemctl restart nginx

    =============================================================================================================
    Adding Custom Domain Name
    =============================================================================================================
    - purchased domain name from godaddy
    - signup on cloudflare and add a new domain name on cloudflare
    - change the nameservers on godaddy and point it to cloud flare
    - wait for sometime till your nameservers are updated(approx 15 mins it will take)
    - DNS record: A devtinder.in, 16.171.37.141
    - enable ssl in cloudflare to the website


    =============================================================================================================
    Sending Emails via SES
    =============================================================================================================
    - Create a IAM user
    - Give Acccess to AmazonSESFull Access
    - Create and Identity in Amazon SES
    - Verify your domain name
    - Verify email address
    - install AWS SDK -v3
    code Example - https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples

    https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html

