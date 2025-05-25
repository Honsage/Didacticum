import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ContentBlock, HeadingBlock, TextBlock, LatexBlock, ImageBlock } from '../../types/material.types';
import { EditableHeadingBlock } from './heading-block';
import { EditableTextBlock } from './text-block';
import { EditableLatexBlock } from './latex-block';
import { EditableImageBlock } from './image-block';
import * as styles from './edit-blocks.module.css';

interface BlockManagerProps {
    blocks: ContentBlock[];
    onChange: (blocks: ContentBlock[]) => void;
}

export const BlockManager: React.FC<BlockManagerProps> = ({
    blocks,
    onChange
}) => {
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(blocks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update order property for each block
        const updatedBlocks = items.map((block, index) => ({
            ...block,
            order: index
        }));

        onChange(updatedBlocks);
    };

    const handleBlockChange = (index: number, updatedBlock: ContentBlock) => {
        const newBlocks = [...blocks];
        newBlocks[index] = updatedBlock;
        onChange(newBlocks);
    };

    const handleBlockDelete = (index: number) => {
        const newBlocks = blocks.filter((_, i) => i !== index);
        // Update order property for remaining blocks
        const updatedBlocks = newBlocks.map((block, idx) => ({
            ...block,
            order: idx
        }));
        onChange(updatedBlocks);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newBlocks = [...blocks];
        [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
        // Update order property
        const updatedBlocks = newBlocks.map((block, idx) => ({
            ...block,
            order: idx
        }));
        onChange(updatedBlocks);
    };

    const handleMoveDown = (index: number) => {
        if (index === blocks.length - 1) return;
        const newBlocks = [...blocks];
        [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
        // Update order property
        const updatedBlocks = newBlocks.map((block, idx) => ({
            ...block,
            order: idx
        }));
        onChange(updatedBlocks);
    };

    const renderBlock = (block: ContentBlock, index: number, provided: any, snapshot: any) => {
        const commonProps = {
            onDelete: () => handleBlockDelete(index),
            onMoveUp: index > 0 ? () => handleMoveUp(index) : undefined,
            onMoveDown: index < blocks.length - 1 ? () => handleMoveDown(index) : undefined,
            dragHandleProps: provided.dragHandleProps,
            draggableProps: provided.draggableProps,
            innerRef: provided.innerRef,
            isDragging: snapshot.isDragging
        };

        switch (block.type) {
            case 'heading':
                return (
                    <EditableHeadingBlock
                        {...commonProps}
                        block={block as HeadingBlock}
                        onChange={(updatedBlock) => handleBlockChange(index, updatedBlock)}
                    />
                );
            case 'text':
                return (
                    <EditableTextBlock
                        {...commonProps}
                        block={block as TextBlock}
                        onChange={(updatedBlock) => handleBlockChange(index, updatedBlock)}
                    />
                );
            case 'latex':
                return (
                    <EditableLatexBlock
                        {...commonProps}
                        block={block as LatexBlock}
                        onChange={(updatedBlock) => handleBlockChange(index, updatedBlock)}
                    />
                );
            case 'image':
                return (
                    <EditableImageBlock
                        {...commonProps}
                        block={block as ImageBlock}
                        onChange={(updatedBlock) => handleBlockChange(index, updatedBlock)}
                    />
                );
            default:
                return (
                    <div>Неизвестный тип блока</div>
                );
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="blocks">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.blocks}
                    >
                        {blocks.map((block, index) => (
                            <Draggable
                                key={block.id}
                                draggableId={block.id}
                                index={index}
                            >
                                {(provided, snapshot) => renderBlock(block, index, provided, snapshot)}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}; 