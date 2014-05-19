class Crossword {

   constructor(selector:String) {
      this.tableEl = document.querySelector(selector);
      this.trs = this.tableEl.querySelectorAll('tr');
      this.size = this.trs.length;
      this.minimumWordLength = 4;
      return this;
   }

   initialise() {
      this.colourMapping = this.processInitialGrid();
      this.colourBoard();
      return this;
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
    * Gets a random whole number between min and max.
    */
   getRandomInt (min:Number = 0, max:Number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   /**
    * e.g. ([1,2], 2)
    */
   getRandom(arr:Array, avoider:Number) {
      var arry = arr;
      if (typeof avoider == 'number') {
         arry = arr.filter(function(item){
            return Math.abs(arr.indexOf(item) - arr.indexOf(avoider)) > 1;
         });
      }
      return arr[this.getRandomInt(0,arr.length-1)];
   };

   processInitialGrid() {
      var originalGrid = this.buildInitialGrid(1);
      this.grid = originalGrid.slice();
      var lightRowWasFirst = (originalGrid[0].toString() == this.lightRow.toString());
      var rowStartDarkWasFirst = (originalGrid[0].toString() == this.rowStartDark.toString());
      var rowStartLightWasFirst = (originalGrid[0].toString() == this.rowStartLight.toString());
      var lightRowWasSecond = (originalGrid[1].toString() == this.lightRow.toString());
      var rowStartDarkWasSecond = (originalGrid[1].toString() == this.rowStartDark.toString());
      var rowStartLightWasSecond = (originalGrid[1].toString() == this.rowStartLight.toString());
      if (rowStartLightWasSecond) {
         this.removeWhites(0, [0,3,5,7,9,12]);
         this.removeWhites(1, [2,4,8,10]);
         this.removeWhites(2, [5,7,9,11]);
         this.removeWhites(4, [0,3,5,7,9,12]);
         this.buildCentreRow(6, [1,4,6,11]);
      // TODO, currently forcing rowStartLightWasSecond...
      } else if (rowStartDarkWasSecond) {
         this.removeWhites(0, [4,6,8]);
      } else if (rowStartLightWasFirst) {
         this.removeWhites(0, [2,4,6,8,10]);
      } else if (rowStartDarkWasFirst) {
         this.removeWhites(0, [4,6,8]);
      }
      return this.grid;
   }

   removeWhites(rowIndex:Number, arr:Array, avoider:Number) {
      var rand = this.getRandom(arr, avoider);
      console.log('rand', rand, 'range: '+arr);
      this.grid[rowIndex][rand] = 0;
      this.grid[this.size-(1+rowIndex)][(this.size-1)-rand] = 0; // symmetry
      if (typeof avoider !== "number") {
         this.removeWhites(rowIndex, arr, rand);
      }
   };

   buildCentreRow(rowIndex:Number, arr:Array){
      var rand = this.getRandom(arr);
      console.log('row', rowIndex, 'rand', rand, 'range: '+arr);
      this.grid[rowIndex][rand] = 0;
      this.grid[rowIndex][(this.size-1)-rand] = 0; // symmetry
   };

   buildInitialGrid(choiceIndex) {
      var arr = [];
      this.lightRow = new String(new Array(13)).split(',').map(function(){ return 1 });
      this.rowStartLight = this.lightRow.map(function(num, i) { return +(i % 2 == 0) });
      this.rowStartDark = this.rowStartLight.map(function(num) { return Math.abs(num-1) });
      var choices = [this.lightRow, this.rowStartDark, this.rowStartLight];
      var firstChoiceIndex = this.getRandomInt(0, choices.length-1);
      var firstChoice = choices.splice(firstChoiceIndex, 1)[0];
      var secondChoice, secondChoiceIndex;
      if (firstChoice.toString() !== this.lightRow.toString()) {
         secondChoice = this.lightRow;
      } else {
         secondChoiceIndex = this.getRandomInt(0, choices.length-1);
         secondChoice = choices.splice(secondChoiceIndex, 1)[0];
      }

      // for development force rowStartLightWasSecond
      if (choiceIndex == 1) {
         firstChoice = this.lightRow;
         secondChoice = this.rowStartLight;
      }

      while (arr.length < this.size) {
         arr.push(firstChoice.slice());
         arr.push(secondChoice.slice());
      }

      return arr.splice(0, this.size);
   }
}

var crossword = new Crossword('table').initialise();
