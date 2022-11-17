const INPUT_FILE = `12
4873279
ITS-EASY
888-4567
3-10-10-10
888-GLOP
TUT-GLOP
967-11-11
310-GINO
F101010
888-1200
-4-8-7-3-2-7-9-
487-3279`;
const PHONE_DIGITS = 7;
const duplicates = checkDuplicates(INPUT_FILE);
console.log(duplicates);

function formatNumber(number){
    if(number.length < PHONE_DIGITS)
        return '';
    let string = number ? number.replace(/-/g, '')
        .replace(/[ABC]/g, '2')
        .replace(/[DEF]/g, '3')
        .replace(/[GHI]/g, '4')
        .replace(/[JKL]/g, '5')
        .replace(/[MNO]/g, '6')
        .replace(/[PRS]/g, '7')
        .replace(/[TUV]/g, '8')
        .replace(/[WXY]/g, '9') : '';
    
    let string2 = string.substring(0,3) + '-' + string.substring(3);
    return string2;
}

function checkDuplicates(inputFile){
    const result = inputFile.split(/\r?\n/);
    result.shift();
    const numbers = result.map(number => {
        return formatNumber(number);
    });
    numbers.sort();

    const map = new Map();
    numbers.forEach(element => {
        if(map.has(element)){
            map.set(element, map.get(element) + 1);
        }else{
            map.set(element, 1);
        }
    });

    map.forEach((value, key) => {
        if (value === 1) {
          map.delete(key);
        }
      });

    let response = '';
    if(map.size === 0)
      response= 'No duplicates';
    if(map.size > 0){
        let index = 0;
        map.forEach((value, key) => {
            response += key + ' ' + value;
            if(index < map.size - 1){
                response += '\n';
            }
            index +=1;
        });
    }
    return response;
}