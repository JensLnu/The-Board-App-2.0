import Header from '../header/Header';
import TaskModal from '../taskModal/TaskModal';
import Column from '../column/Column';
import ContentContext from '../../context/ContentContext';
import './renderColumns.css'
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

// retunerar alla kolumner i'columns' om 'isShowColumns' false
// 'isShowColumns' blir true om man klickar på en kolumn titel eller resize pilarna i kolumn headern
// kör 'TaskModal'
const RenderColumn = () => {
    const [showColumn, setShowColumn] = useState({});
    const [isShowColumn, setIsShowColumn] = useState(false);
    const { columns } = useContext(ContentContext);
    const { category } = useParams();

    // varje gång 'category' som är kolumn titlen i urlen uppdateras
    // kontroleras om användaren klickat på en kolumn
    // sparar klickad kolumn i ett localt state 'showColumn'
    // renderar bara den klickade kolumnen
    useEffect(() => {
        const foundColumn = columns.find(c => c.title === category);
        if (foundColumn) {
            setShowColumn(foundColumn);
            setIsShowColumn(true);
        } else setIsShowColumn(false);
    }, [category, columns]);

    return (
        <>
            <Header />
            <main className='main-content'>
                {!isShowColumn ? (
                    columns.map(column => <Column
                        key={column.id}
                        column={column}
                        isShowColumn={isShowColumn} />
                    )) : (
                    <Column column={showColumn} isShowColumn={isShowColumn} width={80} />
                )}
                <TaskModal />
            </main>
        </>
    )
}

export default RenderColumn