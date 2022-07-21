### Rate my Guinness Backend

## Run application

```
docker-compose up --build
```

## Test

```
yarn test:cov
```

```
yarn test:integration
```

## Database migrations

If you want to make a change one or more database by adding or changing columns, you make the change in the specific folder, in the entities folder, in the entity file. When you are satisfied with the way that looks you can run 
```
yarn typeorm:migration:generate [NameOfChange]
```
Now you can either spin up the docker again which will run the migration for you, as it will do as well when deploying on the production database. Otherwise you can run
```
yarn typeorm:migration:run
```
Make sure not to make changes to the database that will break it or that will complain if the database is populated (it is fine if it is empty)
If you want to undo a migration that you have already run, run
```
yarn typeorm:migration revert
```