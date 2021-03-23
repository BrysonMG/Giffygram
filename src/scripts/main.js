/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

//Get a reference to the location on the DOM where the app will display
let postElement = document.querySelector(".postList");
let navElement = document.querySelector("nav");
let entryElement = document.querySelector(".entryForm")

import { NavBar } from "./nav/NavBar.js"
import { getPosts, getUsers, usePostCollection } from "./data/DataManager.js"
import { PostList } from './feed/PostList.js'
import { footer } from './footer/footer.js'
import { createPost, deletePost } from './data/DataManager.js'
import { PostEntry } from './feed/PostEntry.js'

const showNavBar = () => {
	const navLocation = document.querySelector("nav");
	navLocation.innerHTML = NavBar();
}

const showPostList = () => {
  const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts.reverse());
	})
}

const showFooter = () => {
	const footerLocation = document.querySelector('footer');
	footerLocation.innerHTML = footer();
}

const showPostEntry = () => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
}


const startGiffyGram = () => {
	showNavBar();
	showPostEntry();
	showPostList();
	showFooter();
}

startGiffyGram();

// getUsers()
// .then(data => {
//     console.log("User Data", data)
// })

const showFilteredPosts = (year) => {
	const epoch = Date.parse(`01/01/${year}`);
	const filteredData = usePostCollection().filter(eachPost => {
		if (eachPost.timestamp >= epoch) {
			return eachPost
		}
	})
	const postElement = document.querySelector(".postList");

	postElement.innerHTML = PostList(filteredData);
}



//-------------Event Listeners-------------//

const mainElement = document.querySelector('main');

mainElement.addEventListener("change", event => {
	if (event.target.id === "yearSelection") {
		const yearAsNum = parseInt(event.target.value)
		console.log(`User wants to see posts since ${yearAsNum}`)
		//Call a function that filters based on year passed into it
		showFilteredPosts(yearAsNum)
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

mainElement.addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		showPostEntry() //This just resets the HTML to the blank template
	}
  })

mainElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
		const postId = event.target.id.split("__")[1];
		deletePost(parseInt(postId))
		.then(response => {
		showPostList();
		})
	}
}
)

  mainElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: 1,
		  timestamp: Date.now()
	  }
  
	// be sure to import from the DataManager
		createPost(postObject)
	  	.then(response => {
			  showPostList();
			  showPostEntry();
		  })
	}
  })