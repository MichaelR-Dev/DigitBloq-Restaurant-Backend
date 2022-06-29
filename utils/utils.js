const chalk = require("chalk");
const boxen = require("boxen");
const axios = require("axios");
const prompt = require("prompt");
const cfg = require("./config.js");

const boxenOptions = cfg.boxenOptions;

const MainMenu = () => {

    prompt.start();

    const titleBox = boxen( "Restaurant Simulator by Michael Reynolds", boxenOptions );
    console.log(titleBox);

    //Prompt Options
    promptMenu(null, ["Start Simulation", "Config Restaurant", "Config Simulation", "Exit Application"]);

};

const RunSim = async(config) => {
    
}

const handleChoice = (menu, opt) => {
    if(menu === "main"){
        switch (opt) {
            case '1':
                //Recieved run sim
                RunSim(cfg.config);
                break;
    
            case '2':
                //Recieved config restaurant
                ChangeConfig(cfg.config, "store");
                break;
    
            case '3':
                //Recieved config restaurant
                ChangeConfig(cfg.config, "sim");
                break;
    
            case '4':
                //Recieved exit application
                console.log("\nExiting Application...");
                setTimeout(() => { process.exit(); }, 500);
                break;

            default:
                //Recieved invalid response
                process.exit();
        }
    }
}

const ChangeConfig = async (config, category) => {

    console.log(`\n\n${category === "sim" ? "Simulator" : "Store"} Config\n`)

    await updateConfig(config[category])
    .then(result => {cfg.config[category] = result; cfg.writeConfig(cfg.config);})
    .catch(err => {console.log(err);});

    console.log(`\nConfigurations Saved!\n`);

    MainMenu();
}

const updateConfig = (config) => {
    return new Promise((resolve, reject) => {
        try{
            let promptObj = {
                properties: {}
            }

            for(const key of Object.keys(config)){
                promptObj.properties[key] =  {
                    pattern: RegExp(`${config[key].toString().match(/^[0-9]+$/) != null ? "^[0-9]+$" : "^[a-zA-Z\\s\\-]+$"}`),
                    message: `Please use proper type: ${typeof key}`,
                    required: true
                }
            };

            prompt.get(promptObj, (err, res) => {
                if(err){ return console.log(err);}
            
                for(const key of Object.keys(res)){
                    config[key] = res[key];
                };

                resolve(config);
                return;
            });


        }catch(err){
            reject(`Error during loop: ${err}`);
        }

    })

}

const promptMenu = (title, options) =>{

    //Prompt Main Menu
    title !== null ? console.log(`${title}\n\n`) : null;

    options.forEach((opt, i, arr) => {
        console.log(`${i + 1}: ${opt}\n`);

        if(i == arr.length - 1){
            prompt.get({
                properties: {
                  select: {
                    pattern: RegExp(`^[1-${i + 1}]$`),
                    message: 'Please select a number from the choices above',
                    required: true
                  }
                }
              }, (err, res) => {
                if(err){ return console.log(err);}
            
                handleChoice("main", res.select);
            });
        }
    });
}


module.exports = { MainMenu, handleChoice, promptMenu };