/*jslint indent:8, devel:true, browser:true, vars:true*/
/*global define, FileReader*/

define(["helper/util", "jquery"], function (util, $) {
        "use strict";

        // AJAX_IN_PROGRESS: La variable informa si hay una petición Ajax en proceso
        var     AJAX_IN_PROGRESS = false,
                ENTER_KEY = 13,
                FILE_FORMAT = "text/css",
                DEBUG = true;

        var log = function (msg) {
                if (DEBUG) {
                        console.log(msg);
                }
        };

        var App = {
                init: function () {

                        // Check for the File API support.
                        if (!window.File) {

                                // Se carga el elmento main de un documento HTML remoto informando de la incopativilidad del navegador con la aplicación
                                $("main").load("/incompatible.html main");
                        } //else {
                        // Great success! The File APIs are supported.

                        // Poner el foco en el primer campo de entrada visible
                        $("body").find("input[type=text]:visible:first").focus();
                        this.cacheElements();
                        this.bindEvents();
                },

                cacheElements: function () {
                        this.uploadField = $("#upload-field");
                        this.errorContainer = $("#error-container");
                        this.result = $("#result");
                        this.cssOutput = this.result.find(".css-output");
                },

                bindEvents: function () {
                        this.uploadField.on("change", this.validateSelectedFile.bind(this));

                        //NOTE: De esta forma se pasan parámetros a la función Handler del evento:
                        /*this.transformBto.on("click", {callback: this.submitForm}, this.validateSelectedFile.bind(this));*/
                        //Los datos se recogen de la siguiente manera: event.data.callback
                },

                /*
                Métodos utilizados desde 'bindEvents'
                */

                // Maneja los errores de la petición Ajax
                // err = { cod, desc }
                errorHandle: function (err) {
                        // Se para la animación que muestra y oculta el error de existir.
                        // FIX: Esta funcionlidad no funciona correctamente. Debe implementarse un método mejorado para la muestra
                        // de errores al usuario.
                        this.errorContainer.stop(true, true);

                        var errorMsg = err.statusText;
                        if (err.status) {
                                errorMsg += "\n Error " + err.status;
                        }

                        this.errorContainer.html(errorMsg);
                        this.errorContainer.slideDown(200).delay(5000).slideUp(2000);
                },

                validateSelectedFile: function (event) {

                        // Se oculta, por si estuviese visible, el resultado de una conversión anterior
                        this.result.hide();

                        // Se cargan los archivos adjuntados mediante la etiqueta <input type="file"
                        var files = event.target.files;
                        var file;

                        if (files && files[0]) {
                                file = files[0];
                                if (file.type !== FILE_FORMAT) {
                                        this.errorHandle({statusText: "Solo están permitidos ficheros CSS."});
                                } else if (file.size === 0) {
                                        this.errorHandle({statusText: "El fichero seleccionado está vacío."});

                                        //Se resetea el elemento "input"
                                        $(event.target).val("");
                                } else {
                                        log("Fichero seleccionado correcto.");
                                        var reader = new FileReader();
                                        reader.onload = this.handleFileContent.bind(this);
                                        reader.readAsText(file);
                                }
                        } else {

                                //Aquí nunca debería llegarse
                                this.errorHandle({statusText: "No hay ningún fichero seleccionado."});
                        }
                },

                handleFileContent: function (event) {
                        var css = event.target.result;
                        var string;

                        if (css) {
                                string = util.cssToString(css);
                                this.cssOutput.val(string);
                                this.result.show();
                        } else {
                                this.errorHandle({statusText: "El fichero seleccionado está vacío."});
                        }
                }
        };

        //Se exporta la funcionalidad que se desea exponer
        return {
                "App" : App
        };

}); //Fin requirejs
