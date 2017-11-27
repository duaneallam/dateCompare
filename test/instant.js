const assert = require('assert');
const Instant = require('../Instant.js');
const moment = require('moment');

describe('Instant.js', () => {
	describe('constructor', () => {
		it('should instantiate a class and parse a date string formatted as DD/MM/YYYY', () => {

			let date = new Instant('25/11/2017');

			assert.equal(date.day, 25);
			assert.equal(date.month, 11);
			assert.equal(date.year, 2017);
		});
		it('should throw an error with an invalid date string', () => {
			assert.throws(() => {
				let date = new Instant('bad_str/ng');
			}, Error);
			assert.throws(() => {
				let date = new Instant('+-/?9/3.14');
			}, Error);
			assert.throws(() => {
				let date = new Instant('32/14/2999');
			}, Error);
		});
	});
	describe('_isLeapYear', () => {
		it('should return true if a year is a leap year, false if otherwise', () => {
			assert.equal(Instant._isLeapYear(2016), true);
			assert.equal(Instant._isLeapYear(1900), false);
			assert.equal(Instant._isLeapYear(2000), true);
			assert.equal(Instant._isLeapYear(2011), false);
		});
	});
	describe('compare', () => {
		it('should return the number of days elapsed between 2 dates (same month & year)', () => {
			let dateA = new Instant('02/06/1983');
			let dateB = new Instant('22/06/1983');

			assert.equal(dateA.compare(dateB), 20);
			assert.equal(dateB.compare(dateA), -20);
		});
		it('should return the number of days elapsed between 2 dates (same year, not accounting for leap years)', () => {
			let dateA = new Instant('04/07/1984');
			let dateB = new Instant('25/12/1984');

			assert.equal(dateA.compare(dateB), 174);
			assert.equal(dateB.compare(dateA), -174);
		});
		it('should return the number of days elapsed between 2 dates (not accounting for leap years)', () => {
			let dateA = new Instant('12/02/2017');
			let dateB = new Instant('10/01/2018');

			assert.equal(dateA.compare(dateB), 332);
			assert.equal(dateB.compare(dateA), -332);
		});
		it('should return the number of days elapsed between 2 dates (accounting for leap years)', () => {
			let dateA = new Instant('12/02/2016');
			let dateB = new Instant('10/01/2017');

			assert.equal(dateA.compare(dateB), 333);
			assert.equal(dateB.compare(dateA), -333);
		});
		it('should return the number of days elapsed between 2 dates (same year, accounting for leap years)', () => {
			let dateA = new Instant('12/02/1984');
			let dateB = new Instant('12/03/1984');

			assert.equal(dateA.compare(dateB), 29);
			assert.equal(dateB.compare(dateA), -29);
		});
		it('should return the number of days elapsed between 2 dates (longer range accouting for leap years)', () => {
			let dateA = new Instant('03/01/1989');
			let dateB = new Instant('03/08/1983');

			assert.equal(dateA.compare(dateB), -1980);
			assert.equal(dateB.compare(dateA), 1980);
		});
		it('should match the results of another date library (moment.js)', () => {
			let instantA = new Instant('03/10/1979');
			let instantB = new Instant('03/08/1983');

			let momentA = moment('03/10/1979', 'DD/MM/YYYY');
			let momentB = moment('03/08/1983', 'DD/MM/YYYY');

			assert.equal(instantA.compare(instantB), momentB.diff(momentA, 'days'));
			assert.equal(instantB.compare(instantA), momentA.diff(momentB, 'days'));

			let instantC = new Instant('03/10/2019');
			let instantD = new Instant('10/02/2049');

			let momentC = moment('03/10/2019', 'DD/MM/YYYY');
			let momentD = moment('10/02/2049', 'DD/MM/YYYY');

			assert.equal(instantC.compare(instantD), momentD.diff(momentC, 'days'));
			assert.equal(instantD.compare(instantC), momentC.diff(momentD, 'days'));
		});
	});
	
});