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


const startGiffyGram = () => {
	showNavBar();
	showPostList();
}

startGiffyGram();

getUsers()
.then(data => {
    console.log("User Data", data)
})