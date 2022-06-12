# How to test
1. Make sure you have docker installed and running.
2. Cd to the directory of the project and run `docker-compose up`.
3. With postman, make a many post requests to the following endpoints: http://localhost:3000/users
4. Check the db to see that the data is created. with delays depending on the number of requests and the delay time and the max concurrent by which jobs are processed.