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
var date={
    day:5,
    month:11,
    year:2020
};

console.log(getAllDateFormats(date));