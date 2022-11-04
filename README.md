# Warframe Manager Client

Angular client created for resource management in [MMO Warframe](https://www.warframe.com/), allows you to view the total required resources to create an item, view resource extraction sites and what resources can be obtained at the same time, and also allows you to store information about items which the user already has and view items that have not yet been improved.

## Getting Started

For the client to work, you need a configured and working web service from this repository: [Warframe Manager API](https://github.com/michaelenoroexe/warframeManager)
Clone repository 
Change web server address in src/environments/environment.ts

![2022-11-04_18-21-13](https://user-images.githubusercontent.com/86874761/200035011-deec50f7-00c6-4d6a-b100-00fe473a3fe8.png)

Next, to launch the test server for development, enter the command in the console: `ng serve`. Next route to address http://localhost:4200/. 
The application will automatically reload if you change any of the source files.
Or use the command ` ng build ` to build a project, project files will be located in the folder: dist/

## Main application functionality
### Providing general information about in-game items
- #### *View game [resources](https://warframe.fandom.com/wiki/Resources), which cannot be created, and only can receive in alternative ways*
On page ***Resources/Table*** you can view a list of all resources.

![2022-11-04_18-56-04](https://user-images.githubusercontent.com/86874761/200035048-02e246a8-0eae-42e9-a9fd-ceb0ebae3268.png)

- #### *View game items that are obtained as a result of creation from other resources or items*
On page ***Arsenal/Crafting*** you can view a list of all items, their components required to create, the number of credits needed to create, as well as the time of the creation of items.

![2022-11-04_18-56-45](https://user-images.githubusercontent.com/86874761/200035067-e3beb435-d46b-43fe-859d-19f70b9415b6.png)

On page Arsenal/Table you can view a list of items without additional information.
- #### *View drop places of core resources*
You can view drop places on the page: ***Resources/Location***

![2022-11-04_19-00-43](https://user-images.githubusercontent.com/86874761/200035135-915f8624-80c5-4ba2-9c34-36b138e227a2.png)

- #### *View all resources whose drop places intersect with the drop place of the selected resource*
When you click on the required resource on the tab ***Resources/Location*** you can see all drop places of this resource and all resources that can be received with it.

![2022-11-04_19-06-47](https://user-images.githubusercontent.com/86874761/200035175-f3f12710-cb44-4edb-84f4-7d5f98a0ddb1.png)

### Displaying user information
- #### *User profile*
When registering, it becomes possible to store information about the user, for example, the user profile. You can change your profile information on the ***Account*** tab

![2022-11-04_19-08-34](https://user-images.githubusercontent.com/86874761/200035209-aa465c00-0a48-4a63-89e0-b60be752aa7c.png)

- #### *User Items*
Also, during authorization, you can store and change the number of items the user has

![2022-11-04_19-10-00](https://user-images.githubusercontent.com/86874761/200035254-313b6e7c-9514-4eb0-99e0-3b1fbe1594fb.png)
