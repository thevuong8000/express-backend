# express-backend

2. Set up environment:
- Create `.env.development` and `.env.test` in folders `api-server`, `mongo-express`, and `mongodb`
- Copy `example.env` to corresponding `.env.*` and assign values.

3. Get Started
- Run command: `docker-compose -f docker-compose.base.yml -f docker-compose.development.yml up --build`

4. Terminate application:
- Run command: `docker-compose -f docker-compose.base.yml -f docker-compose.development.yml down`
