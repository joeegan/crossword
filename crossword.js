(function(){

   function Crossword(selector){
      this.tableEl = document.querySelector(selector);
      this.trs = this.tableEl.querySelectorAll('tr');
      this.size = this.trs.length;
      this.validWordLengths = this.getValidWordLengths();
      return this;
   }

   /**
    * The length of the sides of the crossword.
    * @type {Number}
    */
   Crossword.prototype.size = null;

   /**
    * The legal lengths a word can be.
    * @type {Number[]}
    */
   Crossword.prototype.validWordLengths = null;

   Crossword.prototype.initialise = function(){
      this.colourMapping = this.merge(this.buildColourMapping(), this.buildColourMapping());
      this.colourBoard();
   };

   /**
    * Returns a multi array where multiArrayB has been turned on it's side and merged into the multiArrayA.
    * @param {[[]]} multiArrayA
    * @param {[[]]} multiArrayB
    * @returns {{[[]]}}
    */
   Crossword.prototype.merge = function(multiArrayA, multiArrayB) {
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
   Crossword.prototype.colourBoard = function() {
      for (var i = 0; i < this.colourMapping.length; i++) {
         var tds = this.tableEl.querySelectorAll('tr')[i].querySelectorAll('td');
         for (var j = 0; j < tds.length; j++) {
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
   Crossword.prototype.buildColourMapping = function(){
      var arr = [];
      var startWhite = this.getRandomInt(0,1);
      var i = startWhite;
      var len = Math.floor(this.size/2) + i;
      for (i; i < len; i++) {
         if (i % 2 == 0) {
            arr.push(new Array(this.size))
         } else {
            arr.push(this.buildLineArray());
         }
      }
      var middleRow = startWhite ? this.buildSymmetricalLineArray() : new Array(this.size);
      var secondSection = [];
      for (var i = 0; i < arr.length; i++) {
         secondSection.push(arr[i].slice().reverse());
      }
      arr.push(middleRow);
      return arr.concat(secondSection.reverse());
   };

   /**
    * @returns {Number[]} e.g [1,1,1,1,0,1,1,1,1,1,1,1];
    */
   Crossword.prototype.buildLineArray = function() {
      var lineArr = [];
      var firstWordLength = this.getRandomWordLength();
      for (var j = 0; j < firstWordLength; j++) {
         lineArr.push(1);
      }
      if (firstWordLength !== this.size) {
         lineArr.push(0);
      }
      var secondWordLength = this.size - 1 - firstWordLength;
      for (var j = 0; j < secondWordLength; j++) {
         lineArr.push(1);
      }
      return lineArr;
   };

   Crossword.prototype.buildSymmetricalLineArray = function() {
      var wordLength = this.getRandomWordLength();
      var lineArr = [];
      var halfLength = Math.floor(this.size/2);
      for (var i = 0; i < halfLength; i++) {
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
   Crossword.prototype.getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   Crossword.prototype.getRandomWordLength = function(arr) {
      var choices = arr || this.validWordLengths;
      return choices[this.getRandomInt(0, choices.length - 1)];
   };

   Crossword.prototype.getValidWordLengths = function() {
      var arr = []
      for (var i = Crossword.minimumWordLength - 1; i < (this.size - 3); i++) {
         arr.push(i);
      }
      return arr;
   };

   Crossword.minimumWordLength = 4;

   window.Crossword = Crossword;

})();