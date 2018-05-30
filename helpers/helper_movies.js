export function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

export function mappingComma(arr){
    return arr.join(', ').replace(/,(?!.*,)/gmi, ',');
}

export function getExcerpt(text){
    return text.substring(0,122).concat('...');
}