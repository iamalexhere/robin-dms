import React, { useState } from 'react';
import ManufacturerTree from '../ManufacturerTree';
import HierarchyDetails, { type HierarchyNode } from '../HierarchyDetails';
import OrgChart from '../OrgChart';
import { Button } from '../Button';
import hierarchyData from '../../../data/manufacturer-hierarchy.json';

// Simple SVG Icon for Hierarchy
const HierarchyIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

const ManufacturerHierarchyContent = () => {
    // State for data (simulating DB)
    const [data, setData] = useState<HierarchyNode[]>(hierarchyData as HierarchyNode[]);
    const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
    const [mode, setMode] = useState<'view' | 'edit' | 'add'>('view');
    const [viewType, setViewType] = useState<'tree' | 'chart'>('tree');

    // Helper to find and update node in tree
    const updateNodeInTree = (nodes: HierarchyNode[], updatedNode: HierarchyNode): HierarchyNode[] => {
        return nodes.map(node => {
            if (node.id === updatedNode.id) {
                return { ...node, ...updatedNode };
            }
            if (node.children) {
                return { ...node, children: updateNodeInTree(node.children, updatedNode) };
            }
            return node;
        });
    };

    // Helper to add child node
    const addChildToNode = (nodes: HierarchyNode[], parentId: string, newNode: HierarchyNode): HierarchyNode[] => {
        return nodes.map(node => {
            if (node.id === parentId) {
                return { ...node, children: [...(node.children || []), newNode] };
            }
            if (node.children) {
                return { ...node, children: addChildToNode(node.children, parentId, newNode) };
            }
            return node;
        });
    };

    // Helper to delete node
    const deleteNodeFromTree = (nodes: HierarchyNode[], nodeId: string): HierarchyNode[] => {
        return nodes.filter(node => node.id !== nodeId).map(node => {
            if (node.children) {
                return { ...node, children: deleteNodeFromTree(node.children, nodeId) };
            }
            return node;
        });
    };

    const handleSelect = (node: HierarchyNode) => {
        if (mode === 'view') {
            setSelectedNode(node);
        }
    };

    const handleSave = (updatedNode: HierarchyNode) => {
        if (mode === 'edit') {
            setData(prev => updateNodeInTree(prev, updatedNode));
            setSelectedNode(updatedNode);
        } else if (mode === 'add' && selectedNode) {
            const newNode = { ...updatedNode, id: `new-${Date.now()}`, children: [] };
            setData(prev => addChildToNode(prev, selectedNode.id, newNode));
        }
        setMode('view');
    };

    const handleDelete = () => {
        if (selectedNode && window.confirm(`Are you sure you want to delete ${selectedNode.name}?`)) {
            setData(prev => deleteNodeFromTree(prev, selectedNode.id));
            setSelectedNode(null);
            setMode('view');
        }
    };

    return (
        <div className="p-6 h-full flex flex-col">
            {/* Header Section */}
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-white">Manufacturer Hierarchy</h2>
                        <HierarchyIcon />
                    </div>
                    <p className="text-gray-400">Manage manufacturer structure and relationships</p>
                </div>

                {/* View Switcher */}
                <div className="bg-[#2a2a2a] p-1 rounded-lg border border-gray-700 flex gap-1">
                    <button
                        onClick={() => setViewType('tree')}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${viewType === 'tree'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Tree View
                    </button>
                    <button
                        onClick={() => setViewType('chart')}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${viewType === 'chart'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Org Chart
                    </button>
                </div>
            </div>

            {/* Main Content */}
            {viewType === 'tree' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                    {/* Left Column: Tree View & Actions */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        {/* Action Bar */}
                        <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-3 flex gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                disabled={!selectedNode || mode !== 'view'}
                                onClick={() => setMode('add')}
                                className="flex-1"
                            >
                                + Add Child
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                disabled={!selectedNode || mode !== 'view'}
                                onClick={() => setMode('edit')}
                                className="flex-1"
                            >
                                Update
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                disabled={!selectedNode || mode !== 'view'}
                                onClick={handleDelete}
                                className="flex-1"
                            >
                                Delete
                            </Button>
                        </div>

                        {/* Tree Component */}
                        <div className="flex-1 min-h-0">
                            <ManufacturerTree
                                data={data}
                                onSelect={handleSelect}
                                selectedNodeId={selectedNode?.id}
                            />
                        </div>
                    </div>

                    {/* Right Column: Details Form */}
                    <div className="lg:col-span-2">
                        <HierarchyDetails
                            node={selectedNode}
                            mode={mode}
                            onSave={handleSave}
                            onCancel={() => setMode('view')}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex-1 min-h-0">
                    <OrgChart data={data} />
                </div>
            )}
        </div>
    );
};

export default ManufacturerHierarchyContent;