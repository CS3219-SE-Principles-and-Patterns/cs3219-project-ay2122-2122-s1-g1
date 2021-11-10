# cs3219 PeerPrep Group 1

## Client

In `/client` folder,
- Run `npm install`
- Run `npm start`
- Access `http://localhost:3000`

## Server
### 1. Run redis in you local computer
1. On windows, you can download the Windows Subsystem for Linus (WSL) and install redis from there. After successful installation of WSL, perform the following commands on the terminal:
- `sudo apt update`
- `sudo apt install redis-server`
- `redis-server --version` (to check if redis is successfully installed)
- `redis-server`
2. On mac, you can use homebrew package manager to instsall then run the redis using the command `redis-server`:
- `brew update`
- `brew install redis`
- `redis-server --version` (to check if redis is successfully installed)
- `redis-server`
### 2. In `/api` folder:
  - Run `npm install`
  - Run `npm start` (runs with nodemon)
  - Backend service can be accessed at `http://localhost:8080`
  - *Note: we have discovered that using NUS wifi while running the backend service may not work as NUS wifi blocks access to mongoDB*

### Backend APIs:
you can try the backend service by following this postman collection: 
- https://www.getpostman.com/collections/299db8bcde704d90e3ce
