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