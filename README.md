# dcomp #

A command line tool for comparing 2 dates formatted as DD/MM/YYYY using instant.js - a diy date library

## Requirements ##

None

## Running the Application ##

Ensure `dcomp` is executable: `chmod +x ./dcomp`.

The application can be run in 3 different ways: reading input from command line arguments, reading input from a file or reading input from stdin.

### Command Line Arguments ###

Run `./dcomp` with 2 dates as arguments formatted as DD/MM/YYYY:

```
	./dcomp 02/06/1983 22/06/1983
```

### Input from file ###

Run `./dcomp` with the path of the input file as an argument:

```
	./dcomp ./input.txt
```

The input file should be a plain text file with a pair of properly formatted dates, separated by a space on each line.

### Input from stdin ###

Run `./dcomp` with no arguments.  After starting the application enter 2 properly formatted dates separated by a space then press enter to calculate the number of days elapsed.

Can also be combined with pipe and redirection operators to read input from other sources.

## Testing ##

The tests have been written in mocha with asser.js for assertions, it is assumed that these are available locally.  Moment.js is also required and can be installed using `npm install` to run tests use `npm test`.

## Deployment and CI ##

Due to the CLI use case of the application I would consider distributing this via public or private npm repository for easy installation and updating.  I would also recommend installing the application globally so that it could be found in the system path.  A CI development environment could easily be confgured to run `npm update` on any new commits or publications.  I would leave it up to the end user or adminstrator to update their production environments.