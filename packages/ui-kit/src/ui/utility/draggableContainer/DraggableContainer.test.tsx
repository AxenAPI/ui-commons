import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import DraggableContainer from './DraggableContainer';

// Мокаем dnd-kit, чтобы не было ошибок в jsdom и drag&drop не мешал unit-тестам
jest.mock('@dnd-kit/core', () => {
  const original = jest.requireActual('@dnd-kit/core');
  return {
    ...original,
    DndContext: ({ children }: any) => <div data-testid="dnd-context">{children}</div>,
  };
});
jest.mock('@dnd-kit/sortable', () => {
  const original = jest.requireActual('@dnd-kit/sortable');
  return {
    ...original,
    SortableContext: ({ children }: any) => <div data-testid="sortable-context">{children}</div>,
  };
});

describe('DraggableContainer', () => {
  // Проверяет, что все элементы отображаются
  it('renders all draggable items', () => {
    const items = [
      { id: '1', key: '1', children: <div>Item 1</div> },
      { id: '2', key: '2', children: <div>Item 2</div> },
    ];
    render(<DraggableContainer items={items} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  // Проверяет, что onDragEndIndices не вызывается без действия
  it('does not call onDragEndIndices without drag', () => {
    const items = [
      { id: '1', key: '1', children: <div>Item 1</div> },
      { id: '2', key: '2', children: <div>Item 2</div> },
    ];
    const onDragEndIndices = jest.fn();
    render(<DraggableContainer items={items} onDragEndIndices={onDragEndIndices} />);
    expect(onDragEndIndices).not.toHaveBeenCalled();
  });

  // Проверяет, что flex-пропсы применяются (по наличию flex-контейнера)
  it('applies flex props to Flex container', () => {
    const items = [{ id: '1', key: '1', children: <div>Item 1</div> }];
    render(<DraggableContainer items={items} gap={10} vertical justify="center" align="flex-end" />);
    // Теперь ищем Flex по data-testid
    expect(screen.getByTestId('draggable-flex-container')).toBeInTheDocument();
  });

  // Проверяет, что при пустом items ничего не рендерится
  it('renders nothing if items is empty', () => {
    render(<DraggableContainer items={[]} />);
    expect(screen.queryByText(/Item/)).not.toBeInTheDocument();
  });

  // Проверяет, что компонент корректно размонтируется
  it('unmounts without errors', () => {
    const items = [{ id: '1', key: '1', children: <div>Item 1</div> }];
    const { unmount } = render(<DraggableContainer items={items} />);
    expect(() => unmount()).not.toThrow();
  });
});
