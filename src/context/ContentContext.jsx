import { createContext, useEffect, useState } from "react";

const ContentContext = createContext({});

export const ContentProvider = ({ children }) => {
  const [taskCounter, setTaskCounter] = useState(5);
  // läser in dummy data ifall inte det finns data i localSorage
  const [columns, setColumns] = useState(() => {
      const storedColumns = JSON.parse(localStorage.getItem('columns'));
      return storedColumns || [{
        title: 'Todo',
        id: 1,
        tasks: []
      }, {
        title: 'Doing',
        id: 2,
        tasks: [{
          header: 'skejt', date: 'så ofta som möjligt', content: 'i betongen!!', id: 1
        }, {
          header: 'matlista', date: new Date().toLocaleDateString(), content: 'mat lista för veckan.', id: 2
        }]
      }, {
        title: 'Done',
        id: 3,
        tasks: [{
          header: 'shopping', date: '2024-05-29', content: 'mat på ica', id: 3
        }]
      }];
  });

  // sparar alla columner/tasks i localStorage
  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  return (
    <ContentContext.Provider
      value={{ columns, setColumns, taskCounter, setTaskCounter }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;