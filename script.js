document.addEventListener("DOMContentLoaded", async function () {
    const username = 'selfmanish01'; // my github username 
    const token = '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';
    //  use your own token here.

    const userDetails = document.getElementById('userDetails');
    const repoList = document.getElementById('repoList');

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const apiUrl = (endpoint) => `https://api.github.com${endpoint}`;

    const fetchData = async (url) => {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
    };

    const fetchUserDetails = async () => {
        const userApiUrl = apiUrl(`/users/${username}`);
        return fetchData(userApiUrl);
    };

    const fetchUserRepositories = async () => {
        const repoApiUrl = apiUrl(`/users/${username}/repos`);
        return fetchData(repoApiUrl);
    };

    const renderUserDetails = (user) => {
        const userItem = document.createElement('div');
        userItem.className = 'detailItem';

        const profilePhoto = document.createElement('img');
        profilePhoto.src = user.avatar_url;
        profilePhoto.alt = 'Profile Photo';
        profilePhoto.width = 100;
        userItem.appendChild(profilePhoto);

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('userDetailsContainer');

        const nameElement = document.createElement('h2');
        nameElement.textContent = user.name || username;
        detailsContainer.appendChild(nameElement);

        if (user.bio) {
            const bioElement = document.createElement('p');
            bioElement.textContent = user.bio;
            detailsContainer.appendChild(bioElement);
        }

        if (user.twitter_username) {
            const twitterLink = document.createElement('a');
            twitterLink.href = `https://twitter.com/${user.twitter_username}`;
            twitterLink.textContent = `Twitter: @${user.twitter_username}`;
            detailsContainer.appendChild(twitterLink);
        }

        if (user.location) {
            const locationElement = document.createElement('p');
            locationElement.textContent = `Location: ${user.location}`;
            detailsContainer.appendChild(locationElement);
        }

        const githubLink = document.createElement('a');
        githubLink.href = user.html_url;
        githubLink.textContent = `GitHub: ${user.login}`;
        detailsContainer.appendChild(githubLink);

        userItem.appendChild(detailsContainer);
        userDetails.appendChild(userItem);
    };

    const renderUserRepositories = (repos) => {
        repos.forEach(repo => {
            const repoItem = document.createElement('div');
            repoItem.className = 'repoItem';

            const repoTitle = document.createElement('h3');
            repoTitle.textContent = repo.name;
            repoItem.appendChild(repoTitle);

            if (repo.description) {
                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description;
                repoItem.appendChild(repoDescription);
            }

            const repoLanguage = document.createElement('p');
            repoLanguage.textContent = `Language: ${repo.language || 'Not specified'}`;
            repoItem.appendChild(repoLanguage);

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = 'View on GitHub';
            repoItem.appendChild(repoLink);

            repoList.appendChild(repoItem);
        });
    };

    const handleError = (error, message) => {
        console.error(message, error);
    };

    try {
        const user = await fetchUserDetails();
        renderUserDetails(user);

        const repos = await fetchUserRepositories();
        renderUserRepositories(repos);
    } catch (error) {
        handleError(error, 'Error during initialization:');
    }
});
