/*jslint indent:8, devel:true, node:true, vars: true*/
/*global console*/

"use strict";

/**
 * Module dependencies.
 */

var express = require("express");

var http = require("http");
var path = require("path");

var app = express();

// all environments
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "ejs");
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

// Hago pública la carpeta donde se alojan las vistas para poder cargar dinámicamente
// desde el frontal un documento HTML completo.
app.use(express.static(path.join(__dirname, "views")));

// development only
if ("development" === app.get("env")) {
        app.use(express.errorHandler());
}


//= Métodos y objetos de uso común =//



// Routes

app.get("/", function (req, res) {
        console.log("Index de la aplicación.");

        //Para usar HTML estandar en vez de JADE
        res.sendfile("views/index.html", {root: __dirname});
});

app.get("/index*", function (req, res) {
        console.log("Se redirige al Index de la aplicación.");

        res.redirect("/");
});

//La transformación del fichero *.css en un String se realizará en el Frontal
/*
app.post("/uploadFile", function (req, res) {
        console.log("Subiendo fichero");

        res.send("Fichero subido. Gracias ;)");
});
*/


app.listen(3000, function () {
        console.log("Express server listening on port %s in %s mode", app.get("port"),  app.settings.env);
});
