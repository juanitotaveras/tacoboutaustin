---?image=assets/image/austin_skyline.jpg

---

# Tacoboutaustin

### Where to eat, where to stay, and what to do in Austin, Texas.

---

## Juanito Taveras
- I'm finishing college next week. I enjoy making multi-media content.
- I worked mainly on front-end content. I made drawings and animations for the site, and wrote a lot of JSX code to put together our React components, such as Searching, Highlighting, and Loading components.

---


## James Crabtree

- I'm a junior CS student focusing on AI and game development
- I worked on the back-end side of the website and was mainly responsible for server management, data scraping, and api searching, sorting, and filtering

--- 

## Caroline Shi
- I'm a third year student and a unicorn (a native Austinite!)
- I worked on the front-end, including writing React components and unit tests. Specifically, I worked on things such as the sorting, filtering, splash page, and grid cards. 

---
## An Vo
 - I moved to the U.S about five years ago.
 - I worked mostly on the back-end.
 - I created tables, relationships, API endpoints and wrote unit tests.

---

## Eduardo Campos
 - I’m a third year CS student, currently working at Synopsys.
 - Born and raised in San Luis Potosi, Mexico.
 - I worked on the front-end of the website.
 - Mainly on the details page for each model, overall look and feel and some documentation.

---

# DEMO
## Prepare to be amazed

---

## Unit test screenshot

--- 


# Self-Critique

--- 

## What did we do well? - Frontend

- The Splash Page is beautiful. |
- The logo, loading animation, and rating icons are custom-made, original, and relevant to the site. |
- The site is very user-friendly, easy to navigate, and looks good overall. |
- We implemented our own pagination and highlighting components without dependencies.
- Filtering and sorting work very well also.
- Our site also looks pretty good on mobile devices.

---

## What did we do well? -  Backend

- Our data models are structured in a very logical and clean way.
- Our API is easy-to-use and has many options for developers.
- We don't use Flask RESTless, and our API is custom-made.
- We also did categories, searching, and filtering on the backend.

---

## What did we learn?

- We learned how to design an attractive site using React and Bootstrap.
- We learend how to make API calls to our own API and other APIs, and how to organize and display this data efficiently.
- We learned how to create tables in our database and query data using SQLAlchemy.
- We learned how to work as a team and depend on one another <3.

---

## What can we do better?
- Our API could have closeby places as a separate endpoint.
- We would have a search bar in the navigation bar instead of the word "Search".
- We could have a way for users to submit ratings and reviews for places.
- We could make improvements on mobile.

---

## What puzzles us?
- We would also like to save filters and user preferences when users navigate throughout the site - we can use cookies for this, but we didn't put time into implementing these details.
- We would like to get better data, but found it difficult because the best APIs were closed off to us.

---


# Other-critique - Learn2Earn

---

## What did they do well?

- When the user goes back from another page their filters are not lost.
- They have loading icons for everything, which is nice.
- Their search returns lots of results and works very well.

---

## What did we learn from their api / website?

- Their API allows you to use a subject ID under the course endpoint to see all the courses related to a subject.
- Their filters use a dropdown menu, which inspired us to do a similar design.
- We like how they have a summary of their data on their Splash Page.

---

## What can they do better?

- Detail pages could have more information and interactivity.

- Their images are low resolution and are frequently duplicated.


---

## What puzzles us about their api / website?

- On their courses page, you can filter by subject but the subject is not shown on the Course cards.


--- 

# VISUALIZATION


## Tips!

<br>

@fa[arrows gp-tip](Press F to go Fullscreen)

@fa[microphone gp-tip](Press S for Speaker Notes)

---?image=assets/image/kyle-gregory-devaras.jpg

## Template Features

- Code Presenting |
- Repo Source, Static Blocks, GIST |
- Custom CSS Styling |
- Slideshow Background Image |
- Slide-specific Background Images |
- Custom Logo, TOC, and Footnotes |

---?code=sample/go/server.go&lang=golang&title=Golang File

@[1,3-6](Present code found within any repo source file.)
@[8-18](Without ever leaving your slideshow.)
@[19-28](Using GitPitch code-presenting with (optional) annotations.)

---?image=assets/image/john-reign-abarintos.jpg

@title[JavaScript Block]

<p><span class="slide-title">JavaScript Block</span></p>

```javascript
// Include http module.
var http = require("http");

// Create the server. Function passed as parameter
// is called on every request made.
http.createServer(function (request, response) {
  // Attach listener on end event.  This event is
  // called when client sent, awaiting response.
  request.on("end", function () {
    // Write headers to the response.
    // HTTP 200 status, Content-Type text/plain.
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    // Send data and end response.
    response.end('Hello HTTP!');
  });

// Listen on the 8080 port.
}).listen(8080);
```

@[1,2](You can present code inlined within your slide markdown too.)
@[9-17](Displayed using code-syntax highlighting just like your IDE.)
@[19-20](Again, all of this without ever leaving your slideshow.)

---?gist=onetapbeyond/494e0fecaf0d6a2aa2acadfb8eb9d6e8&lang=scala&title=Scala GIST

@[23](You can even present code found within any GitHub GIST.)
@[41-53](GIST source code is beautifully rendered on any slide.)
@[57-62](And code-presenting works seamlessly for GIST too, both online and offline.)

---?image=assets/image/kyle-gregory-devaras.jpg

## Template Help

- [Code Presenting](https://github.com/gitpitch/gitpitch/wiki/Code-Presenting)
  + [Repo Source](https://github.com/gitpitch/gitpitch/wiki/Code-Delimiter-Slides), [Static Blocks](https://github.com/gitpitch/gitpitch/wiki/Code-Slides), [GIST](https://github.com/gitpitch/gitpitch/wiki/GIST-Slides) 
- [Custom CSS Styling](https://github.com/gitpitch/gitpitch/wiki/Slideshow-Custom-CSS)
- [Slideshow Background Image](https://github.com/gitpitch/gitpitch/wiki/Background-Setting)
- [Slide-specific Background Images](https://github.com/gitpitch/gitpitch/wiki/Image-Slides#background)
- [Custom Logo](https://github.com/gitpitch/gitpitch/wiki/Logo-Setting), [TOC](https://github.com/gitpitch/gitpitch/wiki/Table-of-Contents), and [Footnotes](https://github.com/gitpitch/gitpitch/wiki/Footnote-Setting)

---?image=assets/image/kyle-gregory-devaras.jpg

## Go GitPitch Pro!

<br>
<div class="left">
    <i class="fa fa-user-secret fa-5x" aria-hidden="true"> </i><br>
    <a href="https://gitpitch.com/pro-features" class="pro-link">
    More details here.</a>
</div>
<div class="right">
    <ul>
        <li>Private Repos</li>
        <li>Private URLs</li>
        <li>Password-Protection</li>
        <li>Image Opacity</li>
        <li>SVG Image Support</li>
    </ul>
</div>

---?image=assets/image/kyle-gregory-devaras.jpg

### Questions?

<br>

@fa[twitter gp-contact](@gitpitch)

@fa[github gp-contact](gitpitch)

@fa[medium gp-contact](@gitpitch)

---?image=assets/image/gitpitch-audience.jpg

@title[Download this Template!]

### Get your presentation started!
### [Download this template @fa[external-link gp-download]](https://gitpitch.com/template/download/space)

