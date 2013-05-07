
/*
 Game Controller class
 */
GameController = function(socket, db, mongoose){

    //Models

    socket.on('getMapToDraw', function(){

        //TEMP - WORLD GENERATION
        var world = new Object();
        for(var i = -25; i<25; i++){
            world[i] = new Object();
            for (var j=-25; j<25; j++){
                world[i][j] = new Object();
                world[i][j].X = i;
                world[i][j].Y = j;
            }
        }

        var position = new Object();
        position.X = 0;
        position.Y = 0;
        world = putFarm(world, position);

        var position = new Object();
        position.X = 0;
        position.Y = 5;
        //world = putFarm(world, position);

        var position = new Object();
        position.X = 2;
        position.Y = 1;
        //world = putFarm(world, position);

        socket.emit('drawMap', {'worldToDraw': world});

    });

    function putFarm(world, position) {

        var errors = false;

        //Create Farm
        var farm = new Object();
        farm.type = "farm";
        farm.mainPos = position;

        //Set Owner
        farm.owner = socket.sessions.user;

        //Set locations of the farm
        farm.locations = new Array();
        for(var i = position.X; i < position.X + 2; i++)
        {
            for(var j = position.Y; j < position.Y + 2; j++)
            {
                var pos = new Object();
                pos.X = i;
                pos.Y = j;
                farm.locations.push(pos);
            }
        }

        //Add farm in the world
        for(var i=0; i<farm.locations.length; i++)
        {
            var pos = farm.locations[i];
            if(world[pos.X] != undefined && world[pos.X][pos.Y] != undefined)
            {
                world[pos.X][pos.Y].contentTile = farm;
            }
            else
            {
                errors = true;
            }
        }

        //Return farm
        if(errors)
        {
            return false;
        }
        else
        {
            return world;
        }
    }

};

module.exports = GameController;




