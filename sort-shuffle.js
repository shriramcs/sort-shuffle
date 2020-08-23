(function iife(){
    const globalBoxes = [1,2,3,4,5,6,7,8,9];
    
    const sortShuffle = function fe(params) {
        if(!(params && params.length > 0)){
            throw Error('Box list passed is not valid, ex: [1,2,3,4]');
            return;
        }
        const MAX_BOXES = params.length;

        /**
         * we can optimize the sort method
         * 
         * @param {boxes} boxes 
         */
        function optimizedSort(boxes) {
            return boxes.sort((a, b) => a-b);
        }
        
        function getRandomIndexes() {
            const arr = [];
            let count = 0;

            while(arr.length < MAX_BOXES){
                const randomVal = Math.floor(Math.random() * MAX_BOXES);
                if((randomVal >= 0 || randomVal <= (MAX_BOXES - 1)) && !arr.includes(randomVal)) {
                    arr.push(randomVal);
                }
                count++;
            }
            
            return arr;
        }

        function getBox(box) {
            const boxEl = document.createElement('div');
            const textEl = document.createTextNode(box.toString());
            boxEl.appendChild(textEl);
            boxEl.className = `box color-${box}`
            return boxEl;
        }

        /**
         * Method to construct HTML code for boxes and attach it to container element
         * @param {array of boxes to display} boxes 
         */
        function displayBoxes(boxes){
            const containerRef = document.getElementById('boxContainer');
            if(!boxContainer){
                console.log('Element with boxContainer id does not exist!!!');
                return;
            }
            containerRef.innerHTML = '';
            boxes.forEach(box => {
                const boxEl = getBox(box);
                
                containerRef.appendChild(boxEl);
            })
        }

        /**
         * Method to shuffle the displayed boxes.
         * 
         * @param {Array of boxes} boxes 
         */
        function shuffle(boxes) {
            const newBoxes = [];
            
            getRandomIndexes().forEach((indexVal, index) => newBoxes[index] = boxes[indexVal]);
            displayBoxes(newBoxes);
        }

        /**
         * Method to sort the displayed boxes
         * 
         * @param {array of boxes} boxes 
         */
        function sort(boxes){
            const sortedArray = optimizedSort(boxes);

            displayBoxes(sortedArray);
        }

        return {
            sort,
            shuffle,
            displayBoxes
        }

    };

    
    const gamified = sortShuffle(globalBoxes);
    

    //initial display of numbered boxes
    gamified.displayBoxes(globalBoxes);

    
    // Event handlers for sort and shuffle buttons

    const sortButton = document.getElementById('sortBtn');
    const shuffleButton = document.getElementById('shuffleBtn');

    sortButton.addEventListener('click', () => {
        gamified.sort(globalBoxes);
    });

    shuffleButton.addEventListener('click', () => {
        gamified.shuffle(globalBoxes);
    });

}());
