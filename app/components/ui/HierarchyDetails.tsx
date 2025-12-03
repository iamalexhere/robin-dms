import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Input } from './Input';

export interface HierarchyNode {
    id: string;
    name: string;
    type: 'manufacturer' | 'brand' | 'model';
    code?: string;
    description?: string;
    isActive?: boolean;
    hierarchyAttribute?: string;
    effectiveDate?: string;
    children?: HierarchyNode[];
}

interface HierarchyDetailsProps {
    node: HierarchyNode | null;
    onSave: (updatedNode: HierarchyNode) => void;
    onCancel: () => void;
    mode: 'view' | 'edit' | 'add';
}

export default function HierarchyDetails({ node, onSave, onCancel, mode }: HierarchyDetailsProps) {
    const [formData, setFormData] = useState<Partial<HierarchyNode>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (node) {
            setFormData({ ...node });
        } else {
            setFormData({
                isActive: true,
                effectiveDate: new Date().toISOString().split('T')[0]
            });
        }
        setErrors({});
    }, [node, mode]);

    const handleChange = (field: keyof HierarchyNode, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.hierarchyAttribute) newErrors.hierarchyAttribute = 'Hierarchy Attribute is required';
        if (!formData.code) newErrors.code = 'Hierarchy Code is required';
        if (!formData.description) newErrors.description = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSave(formData as HierarchyNode);
        }
    };

    const isReadOnly = mode === 'view';

    if (!node && mode === 'view') {
        return (
            <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-8 text-center text-gray-400">
                Select a node to view details
            </div>
        );
    }

    return (
        <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white">
                    {mode === 'add' ? 'Add New Hierarchy' : mode === 'edit' ? 'Edit Hierarchy' : 'Hierarchy Details'}
                </h3>
                {mode !== 'view' && (
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
                        {mode.toUpperCase()} MODE
                    </span>
                )}
            </div>

            <div className="space-y-6">
                {/* Hierarchy Attribute */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Hierarchy Attribute <span className="text-red-500">*</span>
                    </label>
                    <select
                        className={`w-full bg-black/20 border ${errors.hierarchyAttribute ? 'border-red-500' : 'border-gray-600'} rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50`}
                        value={formData.hierarchyAttribute || ''}
                        onChange={(e) => handleChange('hierarchyAttribute', e.target.value)}
                        disabled={isReadOnly}
                    >
                        <option value="">Select Attribute</option>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Brand">Brand</option>
                        <option value="Model">Model</option>
                    </select>
                    {errors.hierarchyAttribute && <p className="text-red-500 text-xs mt-1">{errors.hierarchyAttribute}</p>}
                </div>

                {/* Hierarchy Code */}
                <Input
                    variant="text"
                    label="Hierarchy Code"
                    placeholder="Enter code"
                    value={formData.code || ''}
                    onChange={(e) => handleChange('code', e.target.value)}
                    disabled={isReadOnly}
                    error={errors.code}
                // required
                />

                {/* Description */}
                <Input
                    variant="text"
                    label="Description"
                    placeholder="Enter description"
                    value={formData.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    disabled={isReadOnly}
                    error={errors.description}
                // required
                />

                {/* Active Checkbox */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive || false}
                        onChange={(e) => handleChange('isActive', e.target.checked)}
                        disabled={isReadOnly}
                        className="w-4 h-4 rounded border-gray-600 bg-black/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-300">
                        Active?
                    </label>
                </div>

                {/* Action Buttons */}
                {!isReadOnly && (
                    <div className="flex gap-3 pt-4 border-t border-gray-700">
                        <Button variant="primary" size="md" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant="ghost" size="md" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
