class Crossword {

   constructor(selector) {
      this.tableEl = document.querySelector(selector);
      this.trs = this.tableEl.querySelectorAll('tr');
      this.size = this.trs.length;
      this.minimumWordLength = 4;
      this.validWordLengths = this.getValidWordLengths();
      return this;
   }

   initialise() {
      this.colourMapping = this.merge(this.buildColourMapping(), this.buildColourMapping());
      this.colourBoard();
   }

   /**
    * Returns a multi array where multiArrayB has been turned on it's side and merged into the multiArrayA.
    * @param {[[]]} multiArrayA
    * @param {[[]]} multiArrayB
    * @returns {{[[]]}}
    */
   merge(multiArrayA, multiArrayB) {
      var innerLength = multiArrayA.length;
      var arr = new Array(innerLength);
      for (var i = 0; i < innerLength; i++) {
         arr[i] = [];
         for (var j =0; j < innerLength; j++) {
            arr[i][j] = [];
            if(multiArrayA[i][j] || multiArrayB[j][i]) {
               arr[i][j] = 1;
            } else {
               arr[i][j] = 0;
            }
         }
      }
      return arr;
   };

   /**
    * Colours the board black and white using the colourMapping.
    */
   colourBoard() {
      for (let i = 0; i < this.colourMapping.length; i++) {
         var tds = this.tableEl.querySelectorAll('tr')[i].querySelectorAll('td');
         for (let j = 0; j < tds.length; j++) {
            if (!this.colourMapping[i][j]) {
               tds[j].className = 'blank';
            }
         }
      }
   };

   /**
    * Decides which word lengths to use on the board.
    * Ensures rotational symmetry is adhered to.
    */
   buildColourMapping() {
      var topHalf = [];
      var startWhite = this.getRandomInt(0,1);
      var i = startWhite;
      var len = Math.floor(this.size/2) + i;
      for (i; i < len; i++) {
         if (i % 2 == 0) {
            topHalf.push(new Array(this.size))
         } else {
            topHalf.push(this.buildLineArray());
         }
      }
      var middleRow = startWhite ? this.buildSymmetricalLineArray() : new Array(this.size);
      var secondSection = [];
      for (let row of topHalf) {
         secondSection.push(row.slice().reverse());
      }
      topHalf.push(middleRow);
      return topHalf.concat(secondSection.reverse());
   };

   /**
    * @returns {Number[]} e.g [1,1,1,1,0,1,1,1,1,1,1,1];
    */
   buildLineArray() {
      var lineArr = [];
      var firstWordLength = this.getRandomWordLength();

      for (let i = 0; i < firstWordLength; i++) {
         lineArr.push(1);
      }
      if (firstWordLength !== this.size) {
         lineArr.push(0);
      }
      var secondWordLength = this.size - 1 - firstWordLength;
      for (let i = 0; i < secondWordLength; i++) {
         lineArr.push(1);
      }
      return lineArr;
   };

   buildSymmetricalLineArray() {
      var wordLength = this.getRandomWordLength();
      var lineArr = [];
      var halfLength = Math.floor(this.size/2);
      for (let i = 0; i < halfLength; i++) {
         if (i < wordLength) {
            lineArr.push(1);
         } else {
            lineArr.push(0);
         }
      }
      return lineArr.concat(this.getRandomInt(0,1)).concat(lineArr.slice().reverse());
   };

   /**
    * Gets an random whole number between min and max.
    * @param {Number} min
    * @param {Number} max
    */
   getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   getRandomWordLength(arr) {
      var choices = arr || this.validWordLengths;
      return choices[this.getRandomInt(0, choices.length - 1)];
   };

   getValidWordLengths() {
      var arr = [];
      for (var i = this.minimumWordLength - 1; i < (this.size - 3); i++) {
         arr.push(i);
      }
      return arr;
   };

}

var crossword = new Crossword('table');
crossword.initialise();

