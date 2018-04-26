---?image=assets/image/austin_skyline.jpg

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
- test content

---
## An Vo
 - I moved to the U.S about five years ago.
 - I worked mostly on the back-end.
 - I created tables, relationships, API endpoints and wrote unit tests.

---

## Eduardo Campos
 - test content

---

---

# DEMO
## Prepare to be amazed

---

## Unit test screenshot

--- 


# Self-Critique

##What did we do well?

###Frontend

- We completely remodeled our site for Phase 4. Now that we had almost everything working, we could mainly focus on the aesthetics of our site. We made the Splash Page fullscreen and beautiful. We redesigned our logo and made it larger and made the text inside more legible. We added actual tacos instead of a numerical rating for all our cards. We re-designed our Search page to make it more intuitive and are using tabs instead of divs to categorize our search results. We also put significant time into making our time more mobile-friendly by making everything look appropriate for mobile devices. We had a loading animations for the search pages.

---

###Backend

- For the backend, we combined three models: Restaurant, Hotel, and Attraction into one model, Place. The three models inherit from the Place model and also have their own unique data. We also refactored all the backend to reduce duplicate code. We scraped and implemented a category, zip code, open hours and distances system. The two most complex systems were category and distance. Category needs to have many-to-many relationship with Place model, and distance needs to have two many-to-one relationships with Place. Now, each place has the distances between it and all other places that are calculated using latitude and longitude stored in the Distance table.

- The real question is: what _didn't_ we do well?

---

##What did we learn?

- We learned how to use custom-made images to make our site really POP. We learned how to refactor our code and make it modular and portable.

- We became familiar with implementing and using relationships in our database, especially one-to-many and many-to-many relationships. We learned how to write queries that involve joining tables and group fields.

---

##What can we do better?

- There is a lot that we would do if we had more time.

- We would have a search bar in the navigation bar instead of the word "Search". We would make the navigation bar collapse and stay fixed at the top of the page while the user scrolls down - we did not have time to do this.

##What puzzles us?

- Though our site looks fine on mobile devices, it could use a lot more work - the navigation bar still looks strange on smart phones.

- We would also like to save filters and user preferences when users navigate throughout the site - we can use cookies for this, but we didn't put time into implementing these details.

---

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

