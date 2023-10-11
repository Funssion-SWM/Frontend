export function validateNickname(nickname: string): boolean {
  if (!checkIsEngOrKorOrNum(nickname)) return false;

  let totalWeight = 0;

  for (const char of nickname) {
    if (isKor(char)) totalWeight += 2;
    else if (isEng(char) || isNum(char)) totalWeight += 1;
    else throw Error('예상치 못한 오류 발생');
  }

  if (!(4 <= totalWeight && totalWeight <= 14)) return false;

  return true;
}

function checkIsEngOrKorOrNum(string: string): boolean {
  return /^[a-zA-z0-9가-힣]*$/.test(string);
}

function isKor(char: string): boolean {
  if (char.length !== 1) throw Error('char type이 아님');
  return /^[가-힣]$/.test(char);
}

function isEng(char: string): boolean {
  if (char.length !== 1) throw Error('char type이 아님');
  return /^[A-Za-z]$/.test(char);
}

function isNum(char: string): boolean {
  if (char.length !== 1) throw Error('char type이 아님');
  return /^[0-9]$/.test(char);
}

export function hasSpecialChar(string: string): boolean {
  return /[!@#$%^&*()_+{}\[\]:;<>,.?~|]+/.test(string);
}

export function validatePassword(pw: string): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(
    pw
  );
}

export function validateEmail(email: string): boolean {
  return /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+[.][a-zA-Z]{2,3}$/.test(
    email
  );
}
