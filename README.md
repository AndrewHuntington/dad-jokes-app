# Dad Jokes App

An app that displays random "dad jokes" pulled from [icanhazdadjoke's API](https://icanhazdadjoke.com/). The user can vote on jokes he/she likes or dislikes, which in turn will affect the order of the jokes displayed. The user can also request more jokes with the push of a button. All jokes and votes are saved to the browser's localStorage. No joke should be displayed more than once.

### [Try it live](https://andrewhuntington.github.io/dad-jokes-app/)

# Screen Shot

![Screenshot of Todo App](/other/ss.png "Dad Jokes App")

# Installation and Setup Instructions

Clone down the repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm start`

To Visit App:

`http://localhost:3000`

# Technologies Used

- React
- JavaScript
- CSS
- git / GitHub
- [Axios](https://www.axios.com)
- [styled-components](https://styled-components.com)
- [animate.css](https://animate.style/)
- [lodash](https://lodash.com)
- [UUID](https://npmjs.com/package/uuid)

# Reflection

This is a project that was built for Colt Steele's excellent [The Modern React Bootcamp](https://www.udemy.com/course/modern-react-bootcamp) on Udemy. The main purpose of this project is to solidify my understanding of the React component lifecycle primarily by using componentDidMount to fetch data from an API. Secondary objectives were to review how to retrieve data using asynchronous JavaScript and to put into use all other React concepts learned up until now. These objectives are very similiar to my previous project, [Card Dealer](https://andrewhuntington.github.io/react-cards-api-project/).

My biggest hurdles with this project were related to the styling/CSS. I tried to copy the original project as closely as possible without looking at the source code (I only stole the color values for the background and the button component.) However it is not a one-to-one replication, and one will notice small differences if he/she were to compare it with the original. For example, my emojis do not have box-shadows as I couldn't recreate the effect in a pleasing manner. Also, my original plan was to primarily rely on styled-components and break my project into more components, however I ran into state issues, thus the result is a kind of sloppy implementation of styled components along with more traditional stylesheets.

Despite the issues listed above, I am pretty happy with the outcome. Additionally, although my implementation is not perfect, I do feel I learned a bit more about how to use the styled-components library. For example, I am now comfortable with the way styled-components implements styling child elements.

# Additional Acknowledgements

This readme is based on a template called the [Peronsal project README template](https://gist.github.com/martensonbj/6bf2ec2ed55f5be723415ea73c4557c4) by GitHub user [martensonbj](https://gist.github.com/martensonbj).

This project was bootstrapped with `react-create-app`. I tried my best to mimic the design of the original without looking at the source code. All other code is my own.

Copyright 2021, Andrew Huntington.
