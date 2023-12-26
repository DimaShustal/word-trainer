import { FC, ReactNode } from 'react';
import { useDrag, useDrop } from 'react-dnd';

type DraggableItemProps = {
  id: number;
  children: ReactNode;
  index: number;
  moveCard: (fromIndex: number, toIndex: number) => void;
};

type DraggedItem = {
  id: number;
  index: number;
};

const DraggableItem: FC<DraggableItemProps> = ({ id, children, index, moveCard }) => {
  const [, ref] = useDrag({
    type: 'card',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover: (draggedItem: DraggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return <div ref={node => ref(drop(node))}>{children}</div>;
};

export default DraggableItem;
