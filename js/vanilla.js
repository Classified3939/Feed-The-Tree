addLayer("v", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#567d46",                       // The color for this layer, which affects many elements.
    resource: "Vanilla Points",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: function(){
        let gain = new Decimal(10);
        if (hasUpgrade("v",12)) gain = gain.div(2);
        if (hasUpgrade("v",14)) gain = gain.div(2);
        return gain;
    },              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    getResetGain(){
        let gain = getResetGain(this.layer,useType="normal");
        if (hasUpgrade("v",23) && player.points.gte(100)) gain = gain.mul(5);
        return gain; 
    },

    upgrades: {
        11:{
            title: "Punch Tree",
            description: "Generate 1 point per second.",
            cost: new Decimal(1),
        },
        12:{
            title: "Logs into Planks",
            description: "Half Vanilla Point cost.",
            cost: new Decimal(1),
            unlocked(){return hasUpgrade("v",11)},
        },
        13:{
            title: "Make Crafting Table",
            description: "When points are below 10, multiply gain by 3",
            cost: new Decimal(3),
            unlocked(){return hasUpgrade("v",12)},
        },
        14:{
            title: "Wooden Pickaxe",
            description: "Half Vanilla Point cost again.",
            cost: new Decimal(5),
            unlocked(){return hasUpgrade("v",13)},
        },
        15:{
            title: "Mine Cobblestone",
            description: "Base Point gain increased to 3",
            cost: new Decimal(10),
            unlocked(){return hasUpgrade("v",14)},
        },
        21:{
            title: "Stone Pickaxe",
            description: "Every tick, 1% chance to gain an extra 20 points.",
            cost: new Decimal(25),
            unlocked(){return hasUpgrade("v",15)},
        },
        22:{
            title: "8 Stone = Furnace",
            description: "Crafting Table bonus now lasts until 100 points.",
            cost: new Decimal(80),
            unlocked(){return hasUpgrade("v",21)},
        },
        23:{
            title: "Iron Smelting",
            description: "Vanilla Resets with over 100 points give 5x Vanilla Points",
            cost: new Decimal(120),
            unlocked(){return hasUpgrade("v",22)},
        },
        24:{
            title: "Isn't it Iron-Pick",
            description: "Stone Pickaxe bonus is improved to a 3% chance per tick.",
            cost: new Decimal(200),
            unlocked(){return hasUpgrade("v",23)},
        },
        25:{
            title: "Lava in an Iron Bucket",
            description: "Point gen multiplied by log3(Vanilla Points)",
            cost: new Decimal(250),
            unlocked() {return hasUpgrade("v",24)},
        }
    },
    hotkeys: [
        {
            key: "v", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "v: reset your points for Vanilla points", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.v.unlocked) doReset("v") },
        }
    ],
})