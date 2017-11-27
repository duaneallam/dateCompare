const assert = require('assert');
const moment = require('moment');
const path = require('path');
const child = require('child_process');
const readline = require('readline');

describe('dcomp', () => {
	let dcomp = path.join(__dirname, '..', 'dcomp');

	describe('with no arguments reading from stdin', () => {
		
		it('should compare the dates correctly with valid input', (done) =>{
			let proc = child.spawn(dcomp, {stdio: 'pipe'});
			proc.stdout.once('data', (output) => {
				assert.equal(output, '02/06/1983 - 22/06/1983: 19 days\n');
				proc.kill();
				done();
			});
			proc.stdin.write('02/06/1983 22/06/1983\n');
		});

    	it('should exit with an error message and exit code 1 with bad input', (done) => {
    		let proc = child.spawn(dcomp, {stdio: 'pipe'});
    		proc.stdout.once('data', (output) => {
				assert.equal(output.toString(), 'Invalid date parameter\n');
			});
    		proc.on('close',(code, sig) => {
    			assert.equal(code, 1);
    			done();
    		});
    		proc.stdin.write('+-/?9/3.14 32/14/2999\n');
    	});
    	
	});
	describe('with filename argument', () => {

		it('should read input from file and print results to stdout', (done) =>{
			let proc = child.spawn(dcomp, ['./input.txt'], {stdio: 'pipe'});
			let reader = readline.createInterface({
			    input: proc.stdout
			});
			let lines = ['02/06/1983 - 22/06/1983: 19 days',
						'04/07/1984 - 25/12/1984: 173 days',
						'03/01/1989 - 03/08/1983: 1979 days'];
			let i = 0;
			reader.on('line', (line) => {
				assert.equal(line, lines[i]);
				i++;
			});

			proc.on('close',(code, sig) => {
    			assert.equal(code, 0);
    			done();
    		});
		});
		it('should exit with an error message and exit code 1 with bad input', (done) =>{
			let proc = child.spawn(dcomp, ['./badinput.txt'], {stdio: 'pipe'});
			let reader = readline.createInterface({
			    input: proc.stdout
			});
			
			reader.on('line', (line) => {
				assert.equal(line, 'Invalid date parameter');
			});

			proc.on('close',(code, sig) => {
    			assert.equal(code, 1);
    			done();
    		});
		});

	});
	describe('with date parameters', () => {

		it('should print the differnce to stdout with valid input', (done) => {
			let proc = child.spawn(dcomp, ['03/01/1989', '03/08/1983'], {stdio: 'pipe'});
			proc.stdout.once('data', (output) => {
				assert.equal(output.toString(), '03/01/1989 - 03/08/1983: 1979 days\n');
			});
    		proc.on('close',(code, sig) => {
    			assert.equal(code, 0);
    			done();
    		});
		});

		it('should exit with an error message and exit code 1 with bad input', (done) =>{
			let proc = child.spawn(dcomp, ['+-/?9/3.14', '32/14/2999'], {stdio: 'pipe'});
			proc.stdout.once('data', (output) => {
				assert.equal(output.toString(), 'Invalid date parameter\n');
			});
    		proc.on('close',(code, sig) => {
    			assert.equal(code, 1);
    			done();
    		});
		});

	});
});