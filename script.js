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
