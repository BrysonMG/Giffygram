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









// const loggedInUser = {
// 	id: 1,
// 	name: "Bryan",
// 	email: "bryan@bn.com"
// }

// export const getLoggedInUser = () => {
// 	return loggedInUser;
// }