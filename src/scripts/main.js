/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display
let postElement = document.querySelector(".postList");
let navElement = document.querySelector("nav");
let entryElement = document.querySelector(".entryForm")

import { NavBar } from "./nav/NavBar.js"
import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from './feed/PostList.js'
import { footer } from './footer/footer.js'

const showNavBar = () => {
	const navLocation = document.querySelector("nav");
	navLocation.innerHTML = NavBar();
}

const showPostList = () => {
  const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showFooter = () => {
	const footerLocation = document.querySelector('footer');
	footerLocation.innerHTML = footer();
}


const startGiffyGram = () => {
	showNavBar();
	showPostList();
	showFooter();
}

startGiffyGram();

getUsers()
.then(data => {
    console.log("User Data", data)
})

//-------------Event Listeners-------------//

const mainElement = document.querySelector('main');

mainElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
		const yearAsNum = parseInt(event.target.value)
		console.log(`User wants to see posts since ${yearAsNum}`)
	}
})

mainElement.addEventListener("click", event => {
	if (event.target.id === "directMessageIcon") {
		alert("You clicked the pen. Eventually this will open messages. For now, enjoy this box.")
	}
})

mainElement.addEventListener("click", event => {
	if (event.target.id === "go-home") {
		alert("You clicked the jar. Eventually this will take you back to 'home', but for now, you get a box.")
	}
})

mainElement.addEventListener("click", event => {
	if (event.target.id.startsWith("edit")) {
		alert("See console and click again.")
		console.log("post clicked:", event.target.id.split("--"));
		console.log("the id is", event.target.id.split("--")[1])
	}
})