const express = require("express");
const router = express.Router();
const fs = require('fs');
var child_process = require('child_process');


/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */
router.post("/exec", async (req, res) => {
    const {
        script
    } = req.body;
    try {
        await fs.writeFile('./scripts/foo.swift', script, function (err) {
            if (err) return console.log(err);
            console.log('Writing File...');
        });

        run_script('/usr/bin/env swift ./scripts/foo.swift', function(output, exit_code, error) {
            console.log("Process Finished.");
            console.log('closing code: ' + exit_code);
            console.log('Full output of script: ',output);
            error = output.split('foo.');
            error.shift()
            res.json({output, exitCode: exit_code, error})
        });
    } catch (e) {
        res.send({ message: "Error: " + e });
    }
});

function run_script(command, callback) {
    console.log("Starting Process.");
    var child = child_process.spawn(command , {
        shell: '/bin/bash',

        // detached: true,
        stdio: ['pipe', 'pipe', 'pipe']
    })
    child.unref();

    var scriptOutput = "";
    var error = [];

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function(data) {
        console.log('stdout: ' + data);

        data=data.toString();
        scriptOutput+=data;

        // send live data
        global.io.emit('script', { script: data });
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function(data) {
        console.log('stderr: ' + data);

        data=data.toString();
        scriptOutput+=data;
        error.push(data);
    });

    child.on('close', function(code) {
        callback(scriptOutput,code,error);
    });
}

module.exports = router;
