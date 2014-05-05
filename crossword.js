(function(){

   function Crossword(selector){
      this.tableEl = document.querySelector(selector);
      this.trs = this.tableEl.querySelectorAll('tr');
      this.size = this.trs.length;
      return this;
   }

   /**
    * The length of the sides of the crossword.
    * @type {Number}
    */
   Crossword.prototype.size = null;

   /**
    * The legal lengths answers can be. Has the size added to this.
    * @type {Number[]}
    */
   Crossword.prototype.wordLengthChoices = [4,5,6,7,8];

   Crossword.prototype.initialise = function(){
      this.wordLengthChoices.push(this.size);
      this.buildColourMapping();
      this.colourBoard();
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
      for (var i = 0; i < Math.floor(this.size/2); i++) {
         if (i % 2 == 0) {
            arr.push(new Array(this.size))
         } else {
            var lineArr = [];
            var firstWordLength = this.getRandomChoice(4,5,6,7,8,13);
            for (var j = 0; j<firstWordLength; j++) {
               lineArr.push(1);
            }
            if (firstWordLength !== this.size) {
               lineArr.push(0);
            }
            var secondWordLength = this.size - 1 - firstWordLength;
            for (var j = 0; j<secondWordLength; j++) {
               lineArr.push(1);
            }
            arr.push(lineArr)
         }
      }
      var middleRow = new Array(this.size);
      var secondSection = [];
      for (var i = 0; i < arr.length; i++) {
         secondSection.push(arr[i].slice().reverse());
      }
      arr.push(middleRow);
      this.colourMapping = arr.concat(secondSection.reverse());
   };

   /**
    * Gets an random whole number between min and max.
    * @param {Number} min
    * @param {Number} max
    */
   Crossword.prototype.getRandomInt = function(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   /**
    * Returns a randomly selected argument.
    * @returns {*}
    */
   Crossword.prototype.getRandomChoice = function(){
      var choices = Array.prototype.slice.call(arguments, 0);;
      return choices[this.getRandomInt(0, choices.length - 1)];
   };

   window.Crossword = Crossword;

})();