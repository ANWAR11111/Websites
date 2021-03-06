var RfcCalculation,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RfcCalculation = (function() {
  var ARTICLES, COMMON_NAMES, VOCALS;

  ARTICLES = ["DEL", "LAS", "DE", "LA", "Y", "A", "MC", "LOS", "VON", "VAN", "MAC", "MI"];

  COMMON_NAMES = ["JOSE", "J.", "J", "MARIA", "MA", "MA."];

  VOCALS = ["A", "E", "I", "O", "U"];

  function RfcCalculation(name, paternalLname, maternalLname, birthDate) {
    this._calculateHomoClave = bind(this._calculateHomoClave, this);
    this._ignoresSecondCommonName = bind(this._ignoresSecondCommonName, this);
    this._ignoresCommonName = bind(this._ignoresCommonName, this);
    this._removeBlankSpacesForNameAndLastName = bind(this._removeBlankSpacesForNameAndLastName, this);
    this._toUpperCase = bind(this._toUpperCase, this);
    this._calculateDate = bind(this._calculateDate, this);
    var i, j, ref;
    this.name = name;
    this.paternalLname = paternalLname;
    this.maternalLname = maternalLname;
    this.birthDate = birthDate;
    this.rfc = "";
    this._toUpperCase();
    this._removeBlankSpacesForNameAndLastName();
    this.paternalLname = this._removeArticlesFrom(this.paternalLname);
    this.maternalLname = this._removeArticlesFrom(this.maternalLname);
    this.rfc = this.paternalLname[0];
    for (i = j = 0, ref = this.paternalLname.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (this._isVocal(this.paternalLname[i])) {
        this.rfc += this.paternalLname[i];
        break;
      }
    }
    if (this.maternalLname !== '') {
      this.rfc += this.maternalLname[0];
    }
    this.rfc += this._ignoresCommonName();
    if (this.maternalLname === '') {
      this.rfc += this._ignoresSecondCommonName();
    }
    this.rfc += this._calculateDate();
    this._calculateHomoClave();
  }

  RfcCalculation.prototype._calculateDate = function() {
    var date, day, month, year;
    date = this.birthDate.split("-");
    year = date[0].substring(2, 4);
    month = date[1];
    day = date[2];
    return "" + year + month + day;
  };

  RfcCalculation.prototype._toUpperCase = function() {
    this.name = this.name.toUpperCase();
    this.paternalLname = this.paternalLname.toUpperCase();
    return this.maternalLname = this.maternalLname.toUpperCase();
  };

  RfcCalculation.prototype._removeBlankSpacesForNameAndLastName = function() {
    this.name = this.name.trim();
    this.paternalLname = this.paternalLname.trim();
    return this.maternalLname = this.maternalLname.trim();
  };

  RfcCalculation.prototype._removeArticlesFrom = function(aString) {
    var j, len, sanitizedString, splittedString, string, validStrings;
    sanitizedString = "";
    splittedString = aString.split(" ");
    validStrings = [];
    for (j = 0, len = splittedString.length; j < len; j++) {
      string = splittedString[j];
      if (indexOf.call(ARTICLES, string) < 0) {
        validStrings.push(string);
      }
    }
    return validStrings.join(" ").trim();
  };

  RfcCalculation.prototype._isVocal = function(char) {
    return indexOf.call(VOCALS, char) >= 0;
  };

  RfcCalculation.prototype._ignoresCommonName = function() {
    var names, ref;
    names = this.name.split(" ");
    if (names.length > 1 && (ref = names[0], indexOf.call(COMMON_NAMES, ref) >= 0)) {
      return names[1][0];
    }
    return this.name[0];
  };

  RfcCalculation.prototype._ignoresSecondCommonName = function() {
    var names, ref;
    names = this.name.split(" ");
    if (names.length > 1 && (ref = names[0], indexOf.call(COMMON_NAMES, ref) >= 0)) {
      return names[1][1];
    }
    return this.name[1];
  };

  RfcCalculation.prototype._calculateHomoClave = function() {
    var RFC1, RFC2, RFC3, currentValue, div, fullName, hc, i, index, j, key, mod, nameInNumber, nextValue, partialSum, ref, rfcToSum, sumValue, verifierModule;
    nameInNumber = "";
    sumValue = 0;
    RFC1 = {
      "&": "10",
      "Ñ": "10",
      "A": "11",
      "B": "12",
      "C": "13",
      "D": "14",
      "E": "15",
      "F": "16",
      "G": "17",
      "H": "18",
      "I": "19",
      "J": "21",
      "K": "22",
      "L": "23",
      "M": "24",
      "N": "25",
      "O": "26",
      "P": "27",
      "Q": "28",
      "R": "29",
      "S": "32",
      "T": "33",
      "U": "34",
      "V": "35",
      "W": "36",
      "X": "37",
      "Y": "38",
      "Z": "39",
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9"
    };
    RFC2 = {
      "0": "1",
      "1": "2",
      "2": "3",
      "3": "4",
      "4": "5",
      "5": "6",
      "6": "7",
      "7": "8",
      "8": "9",
      "9": "A",
      "10": "B",
      "11": "C",
      "12": "D",
      "13": "E",
      "14": "F",
      "15": "G",
      "16": "H",
      "17": "I",
      "18": "J",
      "19": "K",
      "20": "L",
      "21": "M",
      "22": "N",
      "23": "P",
      "24": "Q",
      "25": "R",
      "26": "S",
      "27": "T",
      "28": "U",
      "29": "V",
      "30": "W",
      "31": "X",
      "32": "Y"
    };
    RFC3 = {
      "A": "10",
      "B": "11",
      "C": "12",
      "D": "13",
      "E": "14",
      "F": "15",
      "G": "16",
      "H": "17",
      "I": "18",
      "J": "19",
      "K": "20",
      "L": "21",
      "M": "22",
      "N": "23",
      "O": "25",
      "P": "26",
      "Q": "27",
      "R": "28",
      "S": "29",
      "T": "30",
      "U": "31",
      "V": "32",
      "W": "33",
      "X": "34",
      "Y": "35",
      "Z": "36",
      "0": "0",
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5",
      "6": "6",
      "7": "7",
      "8": "8",
      "9": "9",
      "": "24",
      " ": "37"
    };
    nameInNumber += "0";
    fullName = this.paternalLname + " " + this.maternalLname + " " + this.name;
    i = 0;
    while (i < fullName.length) {
      nameInNumber += RFC1[fullName[i]] || "00";
      i++;
    }
    i = 0;
    while (i < nameInNumber.length - 1) {
      currentValue = parseInt(nameInNumber[i]);
      nextValue = parseInt(nameInNumber[i + 1]);
      sumValue += ((currentValue * 10) + nextValue) * nextValue;
      i++;
    }
    div = 0;
    mod = 0;
    div = parseInt(sumValue % 1000);
    mod = div % 34;
    div = (div - mod) / 34;
    index = 0;
    hc = "";
    while (index <= 1) {
      key = index === 0 ? "" + div : "" + mod;
      hc += RFC2[key] || "Z";
      index++;
    }
    this.rfc += hc;
    rfcToSum = 0;
    partialSum = 0;
    for (i = j = 0, ref = this.rfc.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (RFC3.hasOwnProperty("" + this.rfc[i])) {
        rfcToSum = parseInt(RFC3["" + this.rfc[i]]);
        partialSum += rfcToSum * (14 - (i + 1));
      }
    }
    verifierModule = partialSum % 11;
    if (verifierModule === 0) {
      this.rfc += "0";
    } else {
      partialSum = 11 - verifierModule;
    }
    if (partialSum === 10) {
      return this.rfc += "A";
    } else {
      return this.rfc += partialSum;
    }
  };

  module.exports = RfcCalculation;

  return RfcCalculation;

})();