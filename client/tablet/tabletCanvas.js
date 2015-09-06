var stitchConfig = {
    scale: 10,
    strokeColor: 'black'
};


var weaveRows = formatWeave();


Template.tabletCanvas.helpers({
    data: function () {
        return PatternData.first;
    },

    weaveRows: weaveRows,
    stitch: {
        color: '#0f0',
        x: 10,
        y: 20
    },

    stitchConf: stitchConfig
});


function formatWeave(){
    var pattern = PatternData.first;

    var weaveRows = [];
    var totalRows = 0;

    var cards = pattern.cards.map(function(card){
        return new Card({colors: card.colors, type: card.type});
    });

    // For each set of sequences
    _.each(pattern.turns, function(sequenceName){

        var sequence = pattern.sequences[sequenceName];

        // For each row in a sequence.
        _.each(sequence, function(sequenceRow){
            var stitches = [];

            _.each(sequenceRow, function(direction, column){
                var card = cards[column];
                var flip = ( sequenceRow[column] === 0 && card.type === card.TYPE_S ) || ( sequenceRow[column] === 1 && card.type === card.TYPE_Z ) ;//true;

                console.log(flip);
                console.log(sequenceRow[column], card.type);

                card.turnCard(sequenceRow[column]);

                stitches.push({
                    x: flip? column : column + 1,
                    y: totalRows * 2,
                    color: card.currentColor(),
                    flip: flip, //sequenceRow[column],
                    scale : stitchConfig.scale
                });
            });

            weaveRows[totalRows] = {
                rowIndex: totalRows,
                stitches: stitches
            };

            totalRows++;
        });
    });

    return weaveRows;

}