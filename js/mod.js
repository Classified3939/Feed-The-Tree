let modInfo = {
	name: "Feed The Tree",
	id: "feedTheTreeC39",
	author: "Classified39",
	pointsName: "points",
	modFiles: ["tree.js","vanilla.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("v",11);
}

function randomBonus(){
	let chance = Math.random() * 100;
	let bonus = 20;
	if (chance <= 1)
	{
		player.points = player.points.add(bonus);
	}
	else if (chance <= 3 && hasUpgrade("v",24)){
		player.points = player.points.add(bonus);
	}
}

function lowPointsBonus(gain){
	if (!hasUpgrade("v",13)) return;
	if (player.points.lte(10)) gain = gain.mul(3);
	else if (player.points.lte(100) && hasUpgrade("v",22)) gain = gain.mul(3);
	return gain;
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("v",15)) gain = new Decimal(3);
	if (hasUpgrade("v",13)) gain = lowPointsBonus(gain);
	if (hasUpgrade("v",21)) randomBonus();
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}