# MyWatchlist
Semester project for Web Engineering lecture at DHBW in 2022.
<br/>
<h2>Short description</h2>
The idea behind the MyWatchlist web application is to offer users a simple and centralized way to keep track of movies and series they have already watched or saved for later. In addition, the website offers a provider-independent search function and the feature to manage multiple lists separately. The watchlists can be shared with friends via their own profile, even if they do not have their own account at MyWatchlist. Apart from the search and the suggestions on the movie detail pages, further recommendations can be discovered on the start page. These films and series, which change daily, follow the current popularity ratings or trends and can also be added to a watchlist directly from the slider with just a few clicks.
<br/><br/>
In the implementation, a special focus is on a clear and modern UI design, which allows the user to intuitively condition the website. A special concern are also the aspects of security and data minimization.

<h2>Technology overview and architecture</h2>
<b>Frontend:</b> ReactJS, TypeScript, TailwindCSS
<br/><b>Backend/Server:</b> Spring Boot, Java, PostgreSQL, Caddy, Docker
<br/><br/>

<img src="https://user-images.githubusercontent.com/88625959/199614095-36386c1c-f10a-41e5-b0cb-87853b7ce9af.png" width=800 height=225>

<b>Figure 1:</b> <i>Architecture of MyWatchlist</i>
<br/><br/>
Figure 1 shows the architecture of the web application and the backend. The client calls the application via the URL https://mywatchlist.server-welt.com and gets it delivered by Caddy. The web application also makes requests to the backend and the API. To ensure that the connection to the backend is also secure through HTTPS, another URL is used for this purpose. This URL is also received by Caddy. However, Caddy only acts as a reverse proxy and forwards the request to the backend. This then processes the request and sends back a response. For security reasons, only the backend has access to the database. Thus, there is only a connection locally on the server. Caddy, the backend and the PostgreSQL database all run in a Docker container on the Ubuntu server.

<h2>Components and implementation</h2>
<h3>Frontend</h3>
The frontend is divided into different subpages, at least virtually, which means that only one page is delivered from the web server, but a specific page can be called up under a defined path. This routing or subpages, was implemented with the help of the library "react-router". These subpages can be called partially only if the user is logged in. If the user is not logged in, he will be redirected to the start page. This also looks different if the user is logged in or not.
<br/>
This functionality is also implemented in the user's profile. Depending on how the user has set it, the profile is publicly viewable or not. By default, the profile is set to private. If the profile is public, the lists of the account will be publicly visible and can be shared with others.
<br/>
Several methods have been implemented for handling the JSON web tokens that the frontend gets back from the backend on login. The token and the corresponding username are initially stored in local storage, so they are always retained if the page is reloaded or similar. Unlike cookies, however, they are not retained after the browser is closed and the user must log in again accordingly. If the token has expired, it will not be accepted and the user will have to log in again.
<br/>
The profile picture is generated automatically with the help of the library "DiceBear". You only have to specify a seed, which in our case is the username, which is always unique. The images are all licensed under Creative Commons 1.0 (CC0 1.0 Public Domain) and therefore freely available.
<br/>
For icons we used the library "Heroicons", because they are available for free. For alerts or notifications we used two libraries. For the alerts or modals, for example to add a movie or series to a list, we used the library "sweetalert2". For the so-called toast, for example to display a small notification at the bottom, the library "react-hot-toast" was used. 
<br/>
For all requests, whether to the backend or to the TMBD API, the JavaScript internal fetch API is used, with which HTTP requests can be made.

<h3>Backend</h3>
The architecture was divided into three parts, as shown in the figure. The top layer is the frontend and sends HTTP requests to the backend. The backend is the second layer and is responsible for the logic, accepting HTTP requests and database access. This ensures that data storage is separated from the frontend and database access can be managed centrally. The architecture of the backend is also divided into three layers. This logically separates the areas of responsibility and thus makes the software more maintainable. The first layer of the backend called "API Layer" takes care of the HTTP requests. It forwards the incoming requests to the next layer and sends the response back to the frontend. The next layer "Service Layer" is responsible for validating the requests and prepares the response. The last layer "Database Access Layer" takes care of the database access and e.g. makes changes in the database or searches for certain entries. The lowest layer is the database and is responsible for data management.

<h3>Database</h3>

<img src="https://user-images.githubusercontent.com/88625959/199619524-171dc9c3-8fe4-4cf1-8aaf-9910b6f68502.png" width=339 height=372>

<b>Figure 2:</b> <i>Database modelling</i>
<br/>
* <b>user-account:</b> Will hold all user data
* <b>watchlist:</b> All watchlists of a user are stored here
* <b>watchlist_entry:</b> All title entries are stored here and assigned to a specific watchlist
* <b>title_type:</b> Each watchlist entry has a type (show or movie).
* <b>tv_info:</b> If a title is a show, all episodes and to which season it belongs are stored here

<h2>Screenshots</h2>

![Screenshot 2022-06-25 182748](https://user-images.githubusercontent.com/88625959/199620870-1f91bbc6-4d07-4292-a737-568aa6784f10.png)

<b>Figure 3:</b> <i>Welcome page</i>
<br/><br/>

![Screenshot 2022-06-25 182935](https://user-images.githubusercontent.com/88625959/199620962-237fd1af-cba5-4897-b2d1-b4e281be15a9.png)

<b>Figure 4:</b> <i>Start page</i>
<br/><br/>

![Screenshot 2022-06-25 183036](https://user-images.githubusercontent.com/88625959/199621038-05e5013c-b362-4cdd-a01d-a5462b39c018.png)

<b>Figure 5:</b> <i>Movie detail page</i>
<br/><br/>

![Screenshot 2022-06-25 183354](https://user-images.githubusercontent.com/88625959/199621457-60496574-b61b-4800-a139-d596eaefdc60.png)

<b>Figure 6:</b> <i>Search page</i>
<br/><br/>

![Screenshot 2022-06-25 183202](https://user-images.githubusercontent.com/88625959/199621481-226ca1a7-072e-45b9-b58c-12ed43bbc95a.png)
<b>Figure 7:</b> <i>Edit/manage lists</i>
<br/><br/>

![Screenshot 2022-06-25 183123](https://user-images.githubusercontent.com/88625959/199623350-cd6d2d76-9dcd-46c8-82ec-52cdfcc347dc.png)

<b>Figure 8:</b> <i>Public user profile</i>
<br/><br/>

![Screenshot 2022-06-25 183140](https://user-images.githubusercontent.com/88625959/199623468-a7766563-a6bd-41a1-a3e3-8915bc20073c.png)

<b>Figure 9:</b> <i>Settings page</i>
<br/>

<h2>Legal notice</h2>

This product uses the TMDB API but is not endorsed or certified by TMDB.
