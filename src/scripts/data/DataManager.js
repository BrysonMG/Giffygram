export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}

let postCollection = [];

export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
      .then(response => response.json())
      .then(parsedResponse => {
        postCollection = parsedResponse
        return parsedResponse;
      })
  }

//To not alter the original state of postCollection, make a copy and return that.
export const usePostCollection = () => {
    return [...postCollection]
}

export const createPost = (postObj) => {
  return fetch("http://localhost:8088/posts", { //To post, fetch takes two arguments. The location and an object
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj) //This line takes in whatever is passed into the function and converts it to JSON format
  })
    .then(response => response.json()) //This line takes the response after the post was made and converts it from JSON to an array of objects
}

export const deletePost = postId => {
  return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }

  })
      .then(response => response.json())
      .then(getPosts)
}

export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`)
    .then(response => response.json())
}

export const updatePost = postObj => {
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())
      .then(getPosts)
}



const loggedInUser = {
	id: 1,
	name: "Bryan",
	email: "bryan@bn.com"
}

export const getLoggedInUser = () => {
	return {...loggedInUser};
}