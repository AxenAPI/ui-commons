import { CloseOutlined } from '@ant-design/icons';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tag } from './Tag';

describe('/ui/utility/tag/Tag.tsx', () => {
  test('renders with text (children)', () => {
    render(<Tag>Example text</Tag>);
    expect(screen.getByText('Example text')).toBeInTheDocument();
  });

  test('renders with text prop', () => {
    render(<Tag text="Text prop" />);
    expect(screen.getByText('Text prop')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    const icon = <span>icon</span>;
    render(<Tag icon={icon}>Example text</Tag>);
    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  test('renders a closable tag and closes it on click', async () => {
    const user = userEvent.setup();
    render(
      <Tag isClosable closeIcon={<CloseOutlined />}>
        Example text
      </Tag>
    );
    const closeButton = screen.getByRole('img');
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    await waitFor(() => {
      // Проверяем, что тег скрыт (ant-tag-hidden) на корневом элементе
      const tagRoot = screen.queryByText('Example text')?.closest('.ant-tag');
      expect(tagRoot).toHaveClass('ant-tag-hidden');
    });
  });

  test('renders with checked state (isCheckable)', () => {
    const onCheck = jest.fn();
    render(
      <Tag isCheckable isChecked onCheck={onCheck}>
        Example text
      </Tag>
    );
    fireEvent.click(screen.getByText('Example text'));
    expect(onCheck).toHaveBeenCalled();
  });

  test('renders with checked state (isCheckableBorder)', () => {
    const onCheck = jest.fn();
    render(
      <Tag isCheckableBorder isChecked onCheck={onCheck}>
        Example text
      </Tag>
    );
    fireEvent.click(screen.getByText('Example text'));
    expect(onCheck).toHaveBeenCalled();
  });

  test('renders with border', () => {
    render(<Tag isBordered>Example text</Tag>);
    const tagRoot = screen.getByText('Example text').closest('.ant-tag');
    expect(tagRoot).toHaveStyle({ borderStyle: 'solid' });
  });

  test('renders with dashed border', () => {
    render(<Tag isDashed>Example text</Tag>);
    const tagRoot = screen.getByText('Example text').closest('.ant-tag');
    expect(tagRoot).toHaveStyle({ borderStyle: 'dashed' });
  });

  test('renders with color prop', () => {
    render(<Tag color="orange">Example text</Tag>);
    // Проверяем, что цвет применился (цвет зависит от темы, поэтому только existence)
    expect(screen.getByText('Example text')).toBeInTheDocument();
  });

  test('renders with status prop', () => {
    render(<Tag status="success">Example text</Tag>);
    expect(screen.getByText('Example text')).toBeInTheDocument();
  });

  test('applies custom class to the tag', () => {
    render(<Tag className="custom-class">Example text</Tag>);
    const tagRoot = screen.getByText('Example text').closest('.ant-tag');
    expect(tagRoot).toHaveClass('custom-class');
  });

  test('applies custom styles', () => {
    const style = { width: '200px' };
    render(<Tag style={style}>Example text</Tag>);
    const tagRoot = screen.getByText('Example text').closest('.ant-tag');
    expect(tagRoot).toHaveStyle({ width: '200px' });
  });

  test('renders with showTooltip, tooltip appears on hover', async () => {
    render(<Tag showTooltip text="Очень длинный текст, который не помещается в одну строку" />);
    const tagText = screen.getByText('Очень длинный текст, который не помещается в одну строку');
    userEvent.hover(tagText);
    const tooltip = await screen.findByText('Очень длинный текст, который не помещается в одну строку');
    expect(tooltip).toBeInTheDocument();
  });

  test('unmounts without errors', () => {
    const { unmount } = render(<Tag>Example text</Tag>);
    expect(() => unmount()).not.toThrow();
  });
});
