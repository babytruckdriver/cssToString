/*jslint indent:8, devel:true, browser:true, vars:true*/
/*global require*/

require.config({
        baseUrl: "javascript",
        paths: {
                jquery: "vendor/jquery-2.1.0"
        }
});

require(['clientApp'], function (Application) {
        "use strict";

        Application.App.init();
});
