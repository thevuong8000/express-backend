# express-backend

1. Test by command line **curl**:

- `/GET` : `curl url`
- `/POST` : `curl --data {query} url`
- `/DELETE` : `curl -X DELETE url`
- `/PUT` : `curl -X PUT -d {query} url`

2. Set up environment:
- Create `/backend/.env`
- Copy `/backend/.env.example` to `/backend/.env` and assign values.

3. Run with docker:
- Run command: `SSH_PRIVATE_KEY=$(cat ~/.ssh/id_rsa) docker-compose up --build`

4. Terminate application:
- Run command: `SSH_PRIVATE_KEY=$(cat ~/.ssh/id_rsa) docker-compose down`
