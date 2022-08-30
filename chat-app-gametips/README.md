Run these commands in the commandline of this project.

Download NVM

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

Install node 16 (Note: if your command console is saying that nvm is not a valid command,
close then reopen the console. If that doesn't work, refer to https://github.com/nvm-sh/nvm.)

nvm install 16

Commands	

cd into server 
  server :
	  npm i express pg cors
    npm install nodemon --save-dev

cd into frontend
  Front end:
    rm -rf node_modules       (remove node_modules if there are any previous dependencies)
	  npm install               (Install the node dependencies (Note: yes, its npm not nvm.))
    
    npm install @mui/material @emotion/react @emotion/styled

