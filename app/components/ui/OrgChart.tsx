import React, { useState } from 'react';
import { type HierarchyNode } from './HierarchyDetails';

interface OrgChartProps {
    data: HierarchyNode[];
}

const ChartNode = ({
    node,
    isFirst,
    isLast,
    isOnly
}: {
    node: HierarchyNode;
    isFirst?: boolean;
    isLast?: boolean;
    isOnly?: boolean;
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    // Glassmorphism & Color coding based on type
    const getTypeStyles = () => {
        const base = "backdrop-blur-md border shadow-lg transition-all duration-300";
        switch (node.hierarchyAttribute?.toLowerCase() || node.type) {
            case 'manufacturer':
                return `${base} bg-blue-900/30 border-blue-500/30 text-blue-100 hover:bg-blue-900/50 hover:border-blue-400 hover:shadow-blue-900/20`;
            case 'brand':
                return `${base} bg-emerald-900/30 border-emerald-500/30 text-emerald-100 hover:bg-emerald-900/50 hover:border-emerald-400 hover:shadow-emerald-900/20`;
            case 'model':
                return `${base} bg-purple-900/30 border-purple-500/30 text-purple-100 hover:bg-purple-900/50 hover:border-purple-400 hover:shadow-purple-900/20`;
            default:
                return `${base} bg-gray-800/30 border-gray-600/30 text-gray-200 hover:bg-gray-800/50`;
        }
    };

    return (
        <li className="relative flex flex-col items-center px-4 pt-4 float-left text-center list-none">
            {/* 
                Connectors (The "Genealogy Tree" CSS Pattern) 
                These lines connect this node to its siblings and parent.
            */}
            {!isOnly && (
                <>
                    {/* Horizontal Line Left (connects to left sibling) */}
                    <div className={`absolute top-0 right-1/2 h-4 border-t-2 border-gray-600/50 w-[50%] 
                        ${isFirst ? 'border-none' : ''} 
                        ${isLast ? 'rounded-tr-xl border-r-2' : ''}
                    `}></div>

                    {/* Horizontal Line Right (connects to right sibling) */}
                    <div className={`absolute top-0 left-1/2 h-4 border-t-2 border-gray-600/50 w-[50%] 
                        ${isLast ? 'border-none' : ''}
                        ${isFirst ? 'rounded-tl-xl border-l-2' : ''}
                    `}></div>
                </>
            )}

            {/* Vertical Line Up (for single child) */}
            {isOnly && (
                <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-gray-600/50 -ml-px"></div>
            )}

            {/* Node Card */}
            <div
                className={`
                    relative flex flex-col items-center p-4 rounded-xl
                    min-w-[160px] max-w-[200px] cursor-pointer group z-10
                    ${getTypeStyles()}
                `}
                onClick={handleToggle}
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                        {node.hierarchyAttribute || node.type}
                    </span>
                    {hasChildren && (
                        <span className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    )}
                </div>

                <span className="text-base font-bold text-center break-words w-full leading-tight mb-2">
                    {node.name}
                </span>

                {node.code && (
                    <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded-full text-white/70 border border-white/5">
                        {node.code}
                    </span>
                )}

                {/* Connection Point (Bottom) */}
                {hasChildren && isExpanded && (
                    <div className="absolute -bottom-2 w-3 h-3 bg-gray-500 rounded-full border-2 border-[#2a2a2a] z-20"></div>
                )}
            </div>

            {/* Children Container */}
            {hasChildren && isExpanded && (
                <div className="relative flex justify-center pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Vertical Line Down from Parent */}
                    <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-gray-600/50 -ml-px"></div>

                    <ul className="flex justify-center p-0 m-0 list-none">
                        {node.children!.map((child, index) => (
                            <ChartNode
                                key={child.id}
                                node={child}
                                isFirst={index === 0}
                                isLast={index === node.children!.length - 1}
                                isOnly={node.children!.length === 1}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
};

export default function OrgChart({ data }: OrgChartProps) {
    return (
        <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-8 overflow-auto h-full min-h-[600px] 
            bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/50 via-[#1a1a1a] to-[#1a1a1a]">
            <ul className="flex justify-center p-0 m-0 list-none min-w-max pt-8">
                {data.map((rootNode, index) => (
                    <ChartNode
                        key={rootNode.id}
                        node={rootNode}
                        isOnly={data.length === 1}
                        isFirst={index === 0}
                        isLast={index === data.length - 1}
                    />
                ))}
            </ul>
        </div>
    );
}
