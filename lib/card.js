Card = function(options){
    var holes, currentThread, prevThread, colors;

    init();

    return{
        TYPE_S: "s",
        TYPE_Z: "z",
        type: type,
        holes: holes,
        colors: colors,
        currentTread: currentThread,
        prevThread: prevThread,
        nextThread: nextThread,
        turnCard: turnCard,
        setColors: setColors,
        currentColor: currentColor,
        nextColor: nextColor,
        prevColor: prevColor
    };

    function init(){
        options = options || {};
        numHoles = (options.numHoles)? options.numHoles : 4;
        holes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].splice(0, numHoles);
        currentThread = holes[numHoles - 1];
        prevThread = 'a';
        type = "s";

        colors = {};

        _.each(holes, function(hole){
            colors[hole] = '#fff';
        });

        if(options.colors){
            setColors(options.colors)
        }

        if(options.type){
            setType(options.type);
        }
    }

    function nextThread(direction){

        // Direction is 1 (truthy) for forward and 0 (falsey) for backward
        // Forward (Turn the card away from the weaver)
        if(direction){

            if(currentThread === _.last(holes)){
                return _.first(holes);
            }else{
                return holes[_.indexOf(currentThread) + 1];
            }
        }
        // Backwards (Turn the card towards from the weaver)
        else{
            if(currentThread === _.first(holes)){
                return _.last(holes);
            }else{
               return holes[_.indexOf(currentThread) - 1];
            }
        }
    }

    function turnCard(direction){
        prevThread = currentThread;
        return currentThread = nextThread(direction);
    }

    function setColors(newColors){
        return colors = _.extend(colors, newColors);
    }

    function currentColor(){
        return colors[currentThread];
    }

    function nextColor(direction){
        return colors[nextThread(direction)];
    }

    function prevColor(){
        return colors[prevThread];
    }

    function setType(newType){
        return type = (newType === "z")? "z" : "s";
    }

};
