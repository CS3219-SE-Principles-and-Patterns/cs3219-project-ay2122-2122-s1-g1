# Do not use NUS Wifi for MongoDB

## npm start

## On postman, try the following:

### POST localhost:8080/auth/signup
#### Provide 1) username 2) password 3) isAdmin: true/false

### POST localhost:8080/auth/login
#### Provide 1) username 2) password

### POST localhost:8080/auth/refresh_token
#### Provide 1) refreshToken

### DELETE localhost:8080/auth/logout Provide 1) refreshToken

### For the GET requests below,

### Add a new header: "x-auth-token", then provide an access token to it

### GET localhost:8080/authenticated_resource

### GET localhost:8080/authorized_resource