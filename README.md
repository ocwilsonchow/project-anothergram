# Instructions
- Clone and rename folder `$ git clone git@github.com:dented-academy/express-full-starter.git [your_project_name_here]`
- Find and rename all instance of `[your_project_name_here]` to your actual project name
- Run `$ npm install`
- Run `$ npx prisma init`
- Add to `.env` file (create if not exist)
  ```env
  DATABASE_URL="postgresql://[user]:[password]@localhost:5432/[your_project_name_here]"
  SECRET_COOKIE_PASSWORD="complex_password_at_least_32_characters_long"
  ```
- Add `models` to `prisma/schema.prisma`
- Run `$ npx prisma migrate dev`
- Run `$ rm -rf .git`
- Create a new repo in github and add the repo ssh link to remote
- Run `$ git add .`
- Run `$ git commit -m 'init'`
- Run `$ git push origin master`

# Heroku Deploy
- Run `$ heroku create` (This create another remote name `heroku` just like `origin`)
- Run `$ heroku addons:create papertrail` (this adds a service that will keep your logs)
- Run `$ heroku addons:create heroku-postgresql:hobby-dev` (this adds a postgresql)
- Add env variables to heroku
  - Through Website
    - Login to heroku dashboard and select your app
    - Go to `Settings -> Config Vars -> Reveal Config Vars`
    - Add all items you have in `.env` (You should add a different value for keys like S3)
  - Through CLI
    - Use `$ heroku config:set KEY=value`
    - Add all items you have in `.env` (You should add a different value for keys like S3)
- Add an extra `NODE_ENV=production` env to heroku
- Run `$ git push heroku [branch-name:]master` (add `branch-name:` if you are not in the master branch)
- Run `$ heroku open`
