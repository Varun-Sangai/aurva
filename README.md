## Food Explorer
### Technologies Used

* **React**: For building and managing the UI components efficiently.

* **Tailwind CSS**: For rapid and consistent styling, ensuring a responsive design.

* **React Flow**: For creating and managing the node-based interface.

* **TypeScript**: For adding static typing, improving code quality and maintainability.

* **TanStack Query**: For efficient data fetching and state management.

* **Class Variance Authority**: For dynamically managing class names in reusable components.

* **Tailwind Merge**: For merging Tailwind CSS class names to avoid conflicts.

* **Tabler Icons**: For providing a set of clean and modern icons.

* **Vite**: For fast development and build processes, offering a modern alternative to traditional bundlers.

### Features

* **Initial Node**: The application starts with an "Explore" node centered on the screen.                           Clicking this node displays the top 5 meal categories.

* **Category Selection**: Selecting a meal category node opens a "View Meals" node. Clicking on                           this node displays the top 5 meals filtered by the selected category.

* **Meal Details**: Clicking on a meal node presents three options:
    * **View Ingredients**:Opens a node showing up to 5 ingredients associated with the meal.
    * **View Tags**: Opens a node displaying up to 5 tags associated with the meal.
    * **View Details**: Opens a sidebar with detailed information about the meal, including   proper loading indicators.

* **Dynamic Node Behavior**: Clicking on an already open node will close it. Clicking on a different node will close the currently open one and open the new node, ensuring a clear and organized view.This works level-wise—for example, if there are five categories and one is open, clicking on the same category will close it, while clicking on another will close the open category and open the new one.
* **Focus on Node Flow**: When a new node opens, the focus shifts to that part of the UI, ensuring the user's attention is directed to the relevant information.

* **Loader Handling**:  A loader is omitted for node transitions to avoid negatively impacting user experience. If the API server fails or data fetching encounters issues, an error message will notify the user.

* **Hover Highlighter**: Nodes are highlighted on hover for improved user interaction.

* **Mobile Responsive**: Designed with Tailwind CSS to be fully responsive, ensuring usability across different devices.

### Installation

To run the project locally:

Clone the project

```bash
  git clone https://github.com/Varun-Sangai/aurva.git
```

Go to the project directory

```bash
  cd aurva
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
