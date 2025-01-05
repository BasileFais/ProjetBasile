"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var fs_1 = require("fs");
var path_1 = require("path");
var app = (0, express_1.default)();
var port = 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public')); // Suppose que vos fichiers HTML et statiques sont dans le répertoire 'public'
// Route pour ajouter un nouvel appareil
app.post('/addCamera', function (req, res) {
    var newCamera = req.body;
    fs_1.default.readFile(path_1.default.join(__dirname, 'public', 'cameras_data.json'), 'utf8', function (err, data) {
        if (err) {
            console.error('Erreur de lecture du fichier JSON:', err);
            return res.status(500).send('Erreur du serveur');
        }
        var appareils = JSON.parse(data);
        appareils.push(newCamera);
        fs_1.default.writeFile(path_1.default.join(__dirname, 'public', 'cameras_data.json'), JSON.stringify(appareils, null, 2), 'utf8', function (err) {
            if (err) {
                console.error('Erreur d\'écriture dans le fichier JSON:', err);
                return res.status(500).send('Erreur du serveur');
            }
            res.send('Appareil ajouté avec succès');
        });
    });
});
app.listen(port, function () {
    console.log("Serveur en cours d'ex\u00E9cution sur http://localhost:".concat(port));
});
