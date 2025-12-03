import React from 'react';
import { type HierarchyNode } from './HierarchyDetails';

interface OrgChartProps {
    data: HierarchyNode[];
}

const ChartNode = ({ node }: { node: HierarchyNode }) => {
    const hasChildren = node.children && node.children.length > 0;

    // Color coding based on type
    const getTypeColor = () => {
        switch (node.hierarchyAttribute?.toLowerCase() || node.type) {
            case 'manufacturer': return 'border-blue-500 bg-blue-500/10 text-blue-300';
            case 'brand': return 'border-green-500 bg-green-500/10 text-green-300';
            case 'model': return 'border-purple-500 bg-purple-500/10 text-purple-300';
            default: return 'border-gray-500 bg-gray-500/10 text-gray-300';
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* Node Card */}
            <div className={`
                relative flex flex-col items-center p-3 rounded-lg border-2 
                min-w-[140px] max-w-[180px] transition-all hover:scale-105 hover:shadow-lg z-10 bg-[#1e1e1e]
                ${getTypeColor()}
            `}>
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                    {node.hierarchyAttribute || node.type}
                </span>
                <span className="text-sm font-semibold text-center text-white break-words w-full">
                    {node.name}
                </span>
                {node.code && (
                    <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded mt-1 text-gray-400">
                        {node.code}
                    </span>
                )}
            </div>

            {/* Children Container */}
            {hasChildren && (
                <div className="flex flex-col items-center mt-8 relative">
                    {/* Vertical Line from Parent to Horizontal Bar */}
                    <div className="absolute -top-8 left-1/2 w-0.5 h-4 bg-gray-600 -translate-x-1/2"></div>

                    <div className="flex gap-8 relative pt-4">
                        {/* Horizontal Bar connecting children */}
                        {node.children!.length > 1 && (
                            <div className="absolute top-0 left-[calc(50%/var(--child-count))] right-[calc(50%/var(--child-count))] h-0.5 bg-gray-600"></div>
                        )}

                        {node.children!.map((child, index) => (
                            <div key={child.id} className="relative flex flex-col items-center">
                                {/* Vertical Line from Horizontal Bar to Child */}
                                <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-gray-600 -translate-x-1/2"></div>

                                {/* Connector logic for first/last child to horizontal bar */}
                                {node.children!.length > 1 && (
                                    <>
                                        {index === 0 && (
                                            <div className="absolute -top-4 left-1/2 w-[calc(50%+2rem)] h-0.5 bg-gray-600 translate-x-0"></div>
                                        )}
                                        {index === node.children!.length - 1 && (
                                            <div className="absolute -top-4 right-1/2 w-[calc(50%+2rem)] h-0.5 bg-gray-600 translate-x-0"></div>
                                        )}
                                        {index > 0 && index < node.children!.length - 1 && (
                                            <div className="absolute -top-4 left-0 w-full h-0.5 bg-gray-600"></div>
                                        )}
                                    </>
                                )}

                                <ChartNode node={child} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function OrgChart({ data }: OrgChartProps) {
    return (
        <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-8 overflow-auto h-full min-h-[500px]">
            <div className="flex gap-16 justify-center min-w-max pb-12">
                {data.map((rootNode) => (
                    <ChartNode key={rootNode.id} node={rootNode} />
                ))}
            </div>
        </div>
    );
}
