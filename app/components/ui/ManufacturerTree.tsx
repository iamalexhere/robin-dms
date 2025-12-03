import React, { useState } from 'react';
import { type HierarchyNode } from './HierarchyDetails';

interface ManufacturerTreeProps {
    data: HierarchyNode[];
    onSelect?: (node: HierarchyNode) => void;
    selectedNodeId?: string | null;
}

const TreeNode = ({
    node,
    level,
    onSelect,
    selectedNodeId
}: {
    node: HierarchyNode;
    level: number;
    onSelect?: (node: HierarchyNode) => void;
    selectedNodeId?: string | null;
}) => {
    const [isOpen, setIsOpen] = useState(true); // Default open for better visibility
    const hasChildren = node.children && node.children.length > 0;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasChildren) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = () => {
        if (onSelect) {
            onSelect(node);
        }
    };

    // Indentation based on level
    const paddingLeft = `${level * 20}px`;
    const isSelected = selectedNodeId === node.id;

    // Icons based on type
    const getIcon = () => {
        switch (node.hierarchyAttribute?.toLowerCase() || node.type) {
            case 'manufacturer':
                return (
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                );
            case 'brand':
                return (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                );
            case 'model':
                return (
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                );
        }
    };

    return (
        <div>
            <div
                className={`flex items-center py-2 px-2 cursor-pointer rounded transition-colors ${level === 0 ? 'mb-1' : ''} ${isSelected ? 'bg-blue-600/30 border border-blue-500/50' : 'hover:bg-white/5 border border-transparent'}`}
                style={{ paddingLeft }}
                onClick={handleSelect}
            >
                {/* Expand/Collapse Icon */}
                <div
                    className="w-6 h-6 flex items-center justify-center mr-1 hover:bg-white/10 rounded"
                    onClick={handleToggle}
                >
                    {hasChildren ? (
                        <svg
                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    ) : (
                        <span className="w-4 h-4" />
                    )}
                </div>

                {/* Type Icon */}
                <div className="mr-3">
                    {getIcon()}
                </div>

                {/* Node Name */}
                <div className="flex-1">
                    <span className={`font-medium ${isSelected ? 'text-blue-300' : 'text-gray-200'}`}>{node.name}</span>
                    {node.code && (
                        <span className="ml-2 text-xs text-gray-500">({node.code})</span>
                    )}
                </div>
            </div>

            {/* Children */}
            {isOpen && hasChildren && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                    {node.children!.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            onSelect={onSelect}
                            selectedNodeId={selectedNodeId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function ManufacturerTree({ data, onSelect, selectedNodeId }: ManufacturerTreeProps) {
    return (
        <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-4 overflow-hidden h-full">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Hierarchy</h3>
                <span className="text-xs text-gray-400">
                    {data.length} Roots
                </span>
            </div>
            <div className="space-y-1 overflow-y-auto max-h-[600px] pr-2">
                {data.map((node) => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        level={0}
                        onSelect={onSelect}
                        selectedNodeId={selectedNodeId}
                    />
                ))}
            </div>
        </div>
    );
}
