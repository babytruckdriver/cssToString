/*jslint indent:8, devel:true, browser:true, vars:true*/
/*global define*/

// Objeto contenedor de utilidades.

define({

        // Itera y formatea cada linea del fichero (leído como texto) "css".
        cssToString: function (css) {
                "use strict";

                var     string = "",
                        lines = css.split("\n"),
                        numLines = lines.length,
                        suffix = "\" + \n";

                // NOTE: el 'for' tradicional es un 80% más rápido que el 'forEach'
                lines.forEach(function (line, key) {
                        if (key === numLines - 1) {
                                suffix = "\";";
                        }

                        //Depende del editor puede haber añadido retornos de linea. Se eliminan.
                        line = line.replace("\r","");

                        string += "\"" + line + suffix;
                });

                return string;
        }
});
