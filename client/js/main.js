/**
 * Created with IntelliJ IDEA.
 * User: Maxime
 * Date: 22/03/13
 * Time: 10:54
 * To change this template use File | Settings | File Templates.
 */

define(['jquery', 'controllers/app', 'controllers/userController', 'controllers/gameController', 'controllers/farmerController', 'controllers/farmingController', 'controllers/tchatController'], function(jQuery, App, UserController, GameController, FarmerController, FarmingController, TchatController) {

    jQuery(function($) {

        app = undefined;
        var userController, gameController, farmerController, farmingController, tchatController;

        //Load the App (html part)
        var initApp = function() {

                app = new App();
                socket = app.init();

                //Load Controllers
                userController = new UserController(app);
                gameController = new GameController(app);
                farmerController = new FarmerController();
                farmingController = new FarmingController();
                tchatController = new TchatController();

                //Call init configurations
                app.center();
                app.loadRessources();

                var first = true;
                $(document).on('loadRessourcesOver', function() {
                    if(first)
                    {
                        first = false;

                        //Init all events from controllers
                        userController.initEvents();

                        //Log+ContinueLoad
                        console.log("App initialized.");
                        initGame();
                    }
                });
        };

        //Load the Game (canvas part)
        var initGame = function() {
            gameController.initEvents();
            farmerController.initEvents();
            farmingController.initEvents();
            tchatController.initEvents();
        };

        initApp();
    });

});
