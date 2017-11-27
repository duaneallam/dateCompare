/*
 *	instant.js: A diy date library
 *
 *  Let's face it, the native date library sucks :)
 */

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class instant{

	constructor(dateString){
		let dateParts = dateString.split("/");
		if(dateParts.length != 3){
			throw new Error("invalid date string")
		}

		this.day = parseInt(dateParts[0]);
		this.month = parseInt(dateParts[1]);
		this.year = parseInt(dateParts[2]);
		
		if(!Number.isInteger(this.day) 
			|| !Number.isInteger(this.month) 
			|| !Number.isInteger(this.year)){
			throw new Error("invalid date string");
		}
		if(daysInMonth[this.month - 1] === undefined 
			|| this.day > daysInMonth[this.month - 1] 
			|| this.day < 1 
			|| this.year < 1901 
			|| this.year > 2999){
			throw new Error("invalid date");
		}
	}

	compare(target){

		let difference = 0;
		
		difference += instant._compareYears(this.year, target.year)
			+ instant._compareMonths(this.month, target.month, (this.year == target.year && instant._isLeapYear(this.year)))
			+ instant._compareDays(this.day, target.day);
		
		return difference;

	}

	/*
	 *	_compareDays: returns the number of days between 2 dates
	 */
	static _compareDays(a, b){
		return b - a;
	}

	/*
	 *	_compareMonths: returns the number of days between 2 months
	 */
	static _compareMonths(a, b, leapYear){
		let days = 0;
		
		if(a === b) return 0;
		
		else if(a < b){
			//count up
			for(let i = a - 1; i < b - 1; i++){
				days += daysInMonth[i%12];
				if(leapYear && i == 1) days++;
			}
		}else{
			//count down
			
			for(let i = a - 2; i >= b - 1; i--){
				days -= daysInMonth[i];
				if(leapYear && i == 1) days--;
			}
		}
		return days;
	}

	/*
	 *	_compareYears: returns the number of daus between 2 years
	 */
	static _compareYears(a, b){
		let days = 0;
		
		if(a === b) return 0;

		else if(a < b){
			//count up
			for(let i = a; i < b; i++){
				days += instant._isLeapYear(i) ? 366 : 365;
			}
		}else{
			//count down
			
			for(let i = a - 1; i >= b; i--){
				days -= instant._isLeapYear(i) ? 366 : 365;
			}
		}
		return days;
	}

	static _isLeapYear(year){
		if(year % 4 == 0){
			if(year % 100 == 0 && year % 400 == 0){
				return true;
			}else if(year % 100 == 0){
				return false;
			}else{
				return true;
			}
		}else{
			return false;
		}
	}

}

module.exports = instant;