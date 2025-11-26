import React, { useState } from 'react';
import dashboardStats from '~/data/dashboard-stats.json';
import newsData from '~/data/news.json';

// Simple SVG Icons
const WrenchIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);

const BellIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const SmallBellIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

// Types
interface RepairData {
    name: string;
    value: number;
    color: string;
}

interface NewsItem {
    id: number;
    title: string;
    date: string;
    description: string;
}

// Pizza Pie Chart Component
const PizzaPieChart = ({ data }: { data: RepairData[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    const segments = data.map((item, index) => {
        const angle = (item.value / total) * 360;
        const startAngle = currentAngle;
        currentAngle += angle;
        const percentage = ((item.value / total) * 100).toFixed(1);
        return { ...item, startAngle, angle, percentage, index };
    });

    const createSlice = (startAngle: number, angle: number, radius: number, isHovered: boolean) => {
        // Add offset untuk hover effect
        const offset = isHovered ? 8 : 0;
        const centerAngle = startAngle + angle / 2;
        const centerRad = (centerAngle - 90) * (Math.PI / 180);
        const offsetX = Math.cos(centerRad) * offset;
        const offsetY = Math.sin(centerRad) * offset;

        const start = (startAngle - 90) * (Math.PI / 180);
        const end = (startAngle + angle - 90) * (Math.PI / 180);

        const x1 = 120 + offsetX;
        const y1 = 120 + offsetY;
        const x2 = 120 + offsetX + radius * Math.cos(start);
        const y2 = 120 + offsetY + radius * Math.sin(start);
        const x3 = 120 + offsetX + radius * Math.cos(end);
        const y3 = 120 + offsetY + radius * Math.sin(end);

        const largeArc = angle > 180 ? 1 : 0;

        return `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 ${largeArc} 1 ${x3} ${y3} Z`;
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <svg width="280" height="280" viewBox="0 0 240 240">
                    <defs>
                        <filter id="pizzaGlow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="pizzaShadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                        </filter>
                    </defs>

                    {segments.map((segment) => (
                        <g key={segment.index}>
                            <path
                                d={createSlice(segment.startAngle, segment.angle, 100, hoveredIndex === segment.index)}
                                fill={segment.color}
                                stroke="#1f2937"
                                strokeWidth="2"
                                style={{
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    filter: hoveredIndex === segment.index ? 'url(#pizzaShadow) brightness(1.15)' : 'url(#pizzaShadow)',
                                    opacity: hoveredIndex === null || hoveredIndex === segment.index ? 1 : 0.7
                                }}
                                onMouseEnter={() => setHoveredIndex(segment.index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                            {/* Label di tengah slice */}
                            {segment.angle > 30 && (
                                <text
                                    x={120 + 55 * Math.cos((segment.startAngle + segment.angle / 2 - 90) * (Math.PI / 180))}
                                    y={120 + 55 * Math.sin((segment.startAngle + segment.angle / 2 - 90) * (Math.PI / 180))}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="#fff"
                                    fontSize="12"
                                    fontWeight="bold"
                                    style={{
                                        pointerEvents: 'none',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {segment.percentage}%
                                </text>
                            )}
                        </g>
                    ))}
                </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                {segments.map((item) => (
                    <div
                        key={item.index}
                        className="flex items-center gap-2 p-2 rounded-lg transition-all duration-300 cursor-pointer"
                        style={{
                            backgroundColor: hoveredIndex === item.index ? 'rgba(0,0,0,0.3)' : 'transparent',
                            transform: hoveredIndex === item.index ? 'scale(1.05)' : 'scale(1)'
                        }}
                        onMouseEnter={() => setHoveredIndex(item.index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{
                                backgroundColor: item.color,
                                boxShadow: hoveredIndex === item.index ? `0 0 8px ${item.color}` : 'none',
                                transition: 'box-shadow 0.3s ease'
                            }}
                        ></div>
                        <div className="flex-1 min-w-0">
                            <div className="text-white text-xs font-medium truncate">{item.name}</div>
                            <div className="text-gray-400 text-xs">{item.value} ({item.percentage}%)</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DashboardContent = () => {
    // Fetch data from JSON files
    const repairData: RepairData[] = dashboardStats.repairOrders;
    const stats = dashboardStats.statistics;
    const newsItems: NewsItem[] = newsData.news;

    return (
        <div className="p-6">
            {/* Progress Section */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-white">Progress</h2>
                    <WrenchIcon />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Repair Order Chart */}
                    <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-4 shadow-xl border border-amber-600">
                        <h3 className="text-lg font-bold text-orange-400 mb-3">Repair Order</h3>
                        <PizzaPieChart data={repairData} />
                    </div>

                    {/* Statistics Card 1 */}
                    <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-4 shadow-xl border border-amber-600 flex flex-col justify-center">
                        <div className="space-y-3">
                            <div className="bg-black bg-opacity-30 rounded-xl p-4 hover:bg-opacity-40 transition-all duration-200">
                                <p className="text-amber-300 text-sm font-medium">Total Orders</p>
                                <p className="text-3xl font-bold text-white mt-1">{stats.totalOrders.value}</p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="text-green-400 text-xs">{stats.totalOrders.trend === 'up' ? '↑' : '↓'} {stats.totalOrders.change}</span>
                                    <span className="text-gray-400 text-xs">{stats.totalOrders.changeLabel}</span>
                                </div>
                            </div>
                            <div className="bg-black bg-opacity-30 rounded-xl p-4 hover:bg-opacity-40 transition-all duration-200">
                                <p className="text-amber-300 text-sm font-medium">Completion Rate</p>
                                <p className="text-3xl font-bold text-white mt-1">{stats.completionRate.value}{stats.completionRate.unit}</p>
                                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.completionRate.value}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Card 2 */}
                    <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-4 shadow-xl border border-amber-600 flex flex-col justify-center">
                        <div className="space-y-3">
                            <div className="bg-black bg-opacity-30 rounded-xl p-4 hover:bg-opacity-40 transition-all duration-200">
                                <p className="text-amber-300 text-sm font-medium">Active Users</p>
                                <p className="text-3xl font-bold text-white mt-1">{stats.activeUsers.value}</p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="text-green-400 text-xs">{stats.activeUsers.trend === 'up' ? '↑' : '↓'} {stats.activeUsers.change}</span>
                                    <span className="text-gray-400 text-xs">{stats.activeUsers.changeLabel}</span>
                                </div>
                            </div>
                            <div className="bg-black bg-opacity-30 rounded-xl p-4 hover:bg-opacity-40 transition-all duration-200">
                                <p className="text-amber-300 text-sm font-medium">Avg. Response Time</p>
                                <p className="text-3xl font-bold text-white mt-1">{stats.avgResponseTime.value}</p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="text-green-400 text-xs">{stats.avgResponseTime.trend === 'down' ? '↓' : '↑'} {stats.avgResponseTime.change}</span>
                                    <span className="text-gray-400 text-xs">{stats.avgResponseTime.changeLabel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News & Events Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-white">News & Event</h2>
                    <BellIcon />
                </div>

                <div className="space-y-4">
                    {newsItems.map((news) => (
                        <div
                            key={news.id}
                            className="bg-gradient-to-r from-amber-700 to-amber-900 rounded-2xl pt-3 px-4 pb-4 shadow-xl border border-amber-600 hover:shadow-amber-500/20 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-2">{news.title}</h3>
                                    <p className="text-amber-200 text-sm mb-2">{news.description}</p>
                                    <p className="text-amber-400 text-xs font-medium">{news.date}</p>
                                </div>
                                <div className="ml-4">
                                    <div className="bg-orange-500 bg-opacity-20 rounded-full p-3">
                                        <SmallBellIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;