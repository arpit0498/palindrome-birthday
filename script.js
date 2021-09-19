var dateRef= document.querySelector('#bday-input');
var showbtn =document.querySelector('#show-btn');
var resultref = document.querySelector('#result');


showbtn.addEventListener('click', clickHandler);

function reverseStr(str){
    var listOfChars =str.split('');
    var reverseListOfChars= listOfChars.reverse();

    var reversedStr=reverseListOfChars.join('');
    return reversedStr;

}

function isPalindrome(str){
    var reverse=reverseStr(str);
    
   return str===reverse;
}

function convertDateToString(date)
{
    var dateStr={day:'', months:'', years:''};

    if(date.day < 10){
        dateStr.day='0'+ date.day;
    }else{
        dateStr.day =date.day.toString();
    }

      if(date.month < 10){
        dateStr.month='0'+ date.month;
    }else{
        dateStr.month =date.month.toString();
    }

    dateStr.year=date.year.toString();

    return dateStr;

}

function getAllDateFormats(date){
    var dateStr= convertDateToString(date);

    var ddmmyyyy=dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy= dateStr.month + dateStr.day+ dateStr.year;
    var yyyymmdd=dateStr.year+ dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy=dateStr.month + dateStr.day+ dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+ dateStr.month+dateStr.day;

    return [ddmmyyyy,mmddyyyy,mmddyyyy,yyyymmdd,mmddyy,yymmdd];
}

 function checkPalindrome(date){
     var listOfPalindromes = getAllDateFormats(date);
     var flag = false;

     for (var i=0; i< listOfPalindromes.length ;i++)
     {
         if(isPalindrome(listOfPalindromes[i])){
             flag =true;
             break;
         }
     }

     return flag;

}
//check for leap year
function isLeapYear(year){
    if(year % 400 ===0){
        return true;
    }
    if(year % 100 ===0){
        return false;
    }
    if(year % 4===0){
        return true;
    }
    return false;
}

//get nxt date (29feb -> 1 march; 12 jan to 13 jan)
function getNextDate(date)
{
    var day = date.day +1; //increment the day
    var month = date.month;
    var year = date.year;

    var daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];// Different days in month
//check for february
    if(month === 2)
    {   //check for leap year
        if(isLeapYear){
                if(day>29){
                    day =1;
                    month++;
                }
        }else{
                if(day>29){
                    day=1;
                    month++;// increment month
                }
        }
    }
    //check for other months
    else
    {   //check if the day exceeds the max days in month
         if(day>daysInMonth[month-1])// get month index
         {
             day=1;
             month++;
         }
    }
    //increment year if month > 12
            if (month>12)
            {
                month=1;
                year++;
            }
    return {
        //return object
        day:day,
        month:month,
        year:year,

    };
}

function getNextPalindromeDate(date){
    var ctr =0;
    var nextDate= getNextDate(date);
    while(1){
        ctr++;
        var isPalindrome = checkPalindrome(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate= getNextDate(nextDate);
    }

    return [ctr, nextDate]
}

function getPreDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    }
    else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      }
      else {
        day = 28;
      }
    }
    else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}
function getPrePalindromeDate(date) {

  var previousDate = getPreDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = convertDateToString(previousDate);
    var resultList = checkPalindrome(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPreDate(previousDate);
  }
}

function clickHandler(e)
{
    var bdayStr = dateRef.value;
    if(bdayStr !== '')
    {
        var listofDate = bdayStr.split('-');

        var date= 
                {
                    day:Number(listofDate[2]),
                    month:Number( listofDate[1]),
                    year:Number(listofDate[0])
                };

        var isPalindrome= checkPalindrome(date);
        if(isPalindrome)
                {
                  resultref.innerText="ur bday is palindrome";
                }
        else
        {
              const [ctr1, nextDate] = getNextPalindromeDate(date);
              const [ctr2, prevDate] = getPrePalindromeDate(date);

                if (ctr1 > ctr2)
                    {
                     resultref.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
                    }
                else
                {
                 resultref.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
                }
            
         }
    }
}
