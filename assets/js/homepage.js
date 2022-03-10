// form elements 
const userFormEl = document.querySelector("#user-form")
const nameInputEl = document.querySelector("#username")

// display repos elements
const repoContainerEl = document.querySelector("#repos-container")
const repoSearchTerm = document.querySelector("#repo-search-term")

// Handles fetching the data from the api
const getUserRepos = function(user) {
  const apiUrl = `https://api.github.com/users/${user}/repos`

  fetch(apiUrl)
  .then(function(response) {
    // Successful Request
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user)
      })
    } else {
      alert("Error: Github User Not Found")
    }
  })
  .catch(function(error) {
    alert("Unable to connect to GitHub")
  })
}

// Handles submission of the form
const formSubmitHandler = function(event) {
  event.preventDefault()
  
  // get value from input element 
  const username = nameInputEl.value.trim()

  if (username) {
    getUserRepos(username)
    nameInputEl.value = ""
  } else {
    alert("Please enter a Github username")
  }
}

userFormEl.addEventListener("submit", formSubmitHandler)

// Handles displaying the data gotten from the api
const displayRepos = function(repos, searchTerm) {
  // check if api returned any repos 
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found."
    return
  }

  console.log(repos)
  console.log(searchTerm)

  // clear out old content 
  repoContainerEl.textContent = ""
  repoSearchTerm.textContent = searchTerm

  // loop over repos 
  for (let i = 0; i < repos.length; i++) {
    //format repo name 
    const repoName = repos[i].owner.login + "/" + repos[i].name 

    // create a container for each repo 
    const repoEl = document.createElement("div")
    repoEl.classList = "list-item flex-row justify-space-between align-center"

    // create a span element to hold repository name 
    const titleEl = document.createElement("span")
    titleEl.textContent = repoName

    // append span to container 
    repoEl.appendChild(titleEl)

    // code to add the issues to the page 
    
    // create a status element
    const statusEl = document.createElement("span")
    statusEl.classList = "flex-row align-center"

    // check if the current repo has issues or not 
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = `<i class="fas fa-times status-icon icon-danger"></i> ${repos[i].open_issues_count} issues`
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
    }

    // append to container
    repoEl.appendChild(statusEl)

    // append container to the dom 
    repoContainerEl.appendChild(repoEl)
  }
}