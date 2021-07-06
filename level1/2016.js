/*
문제 설명
2016년 1월 1일은 금요일입니다. 2016년 a월 b일은 무슨 요일일까요? 두 수 a ,b를 입력받아 2016년 a월 b일이 무슨 요일인지 리턴하는 함수, solution을 완성하세요. 요일의 이름은 일요일부터 토요일까지 각각 SUN,MON,TUE,WED,THU,FRI,SAT

입니다. 예를 들어 a=5, b=24라면 5월 24일은 화요일이므로 문자열 "TUE"를 반환하세요.

제한 조건
2016년은 윤년입니다.
2016년 a월 b일은 실제로 있는 날입니다. (13월 26일이나 2월 45일같은 날짜는 주어지지 않습니다)
*/





const solution = (a,b) => {
    let answer = '';
    const month_day = [31, 29, 31, 30, 31,30, 31, 31, 30, 31, 30, 31];
    let day_sum = 0;

    //1년 366일
    for(let i = 0; i < a-1; i++) {
        day_sum += month_day[i];
    }
    day_sum += b;


    switch(day_sum % 7) {
        case 0: return answer = 'THU';
        case 1: return answer = 'FRI';
        case 2: return answer = 'SAT';
        case 3: return answer = 'SUN';
        case 4: return answer = 'MON';
        case 5: return answer = 'TUE';
        case 6: return answer = 'WED';
    }

}

console.log(solution(5, 24));

//new Date를 이용해도 된다.