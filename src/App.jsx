import RenderColumn from "./components/RenderColumns/RenderColumns";
import Column from "./components/column/Column";
import TaskModal from "./components/taskModal/TaskModal";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ContentProvider } from "./context/ContentContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RenderColumn />,
    children: [
      {
        path: '/:category',
        element: <Column />,
        children: [
          {
            path: 'task/:id',
            element: <TaskModal />,
          }
        ]
      },
      {
        path: '/task/:id',
        element: <TaskModal />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ContentProvider>
        <RouterProvider router={router} />
      </ContentProvider>
    </>
  )
}

export default App