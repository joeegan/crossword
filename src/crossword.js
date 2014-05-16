class Crossword {

   constructor(selector:String) {
      this.tableEl = document.querySelector(selector);
      this.trs = this.tableEl.querySelectorAll('tr');
      this.size = this.trs.length;
      this.minimumWordLength = 4;
      return this;
   }

   initialise() {
      this.colourMapping = this.buildInitialGrid();
      this.colourBoard();
   }

   /**
    * Colours the board black and white using the colourMapping.
    */
   colourBoard() {
      for (let i = 0; i < this.colourMapping.length; i++) {
         var tds = this.tableEl.querySelectorAll('tr')[i].querySelectorAll('td');
         for (let j = 0; j < tds.length; j++) {
            if (this.colourMapping[i][j] == 0) {
               tds[j].className = 'blank';
            }
         }
      }
   };

   /**
    * Gets an random whole number between min and max.
    */
   getRandomInt (min:Number = 0, max:Number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   buildInitialGrid() {
      var arr = [];
      var lightRow = new String(new Array(13)).split(',').map(function(){
         return 1
      });
      var altRowStartDark = lightRow.map(function(num, i) {
         return +(i % 2 == 0)
      });
      var altRowStartLight = altRowStartDark.map(function(num) {
         return Math.abs(num-1)
      });
      var choices = [lightRow, altRowStartDark, altRowStartLight];

      var firstChoiceIndex = this.getRandomInt(0, choices.length-1);
      var firstChoice = choices.splice(firstChoiceIndex, 1)[0];
      var secondChoice, secondChoiceIndex;
      if (firstChoice.toString() !== lightRow.toString()) {
         secondChoice = lightRow;
      } else {
         secondChoiceIndex = this.getRandomInt(0, choices.length-1);
         secondChoice = choices.splice(secondChoiceIndex, 1)[0];
      }

      while (arr.length < this.size) {
         arr.push(firstChoice);
         arr.push(secondChoice);
      }
      return arr.splice(0, this.size);
   }
}

var crossword = new Crossword('table').initialise();
